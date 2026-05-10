import * as cdk from "aws-cdk-lib/core";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambdaNode from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as secretmanager from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import { AppService } from "../constructs/app-service";
import { PostgresDatabase } from "../constructs/postgres-db";
import { StorageBucket } from "../constructs/storage-bucket";
import { SeedRuner } from "../constructs/seed-runner";

interface AppStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
  db: PostgresDatabase;
  dbSecurityGroup: ec2.ISecurityGroup;
  dbSecret: secretmanager.ISecret;
  storageBucket: StorageBucket;
  imageTag: string;
  presignedUrl: string;
  authSecret: string;
  repository: ecr.IRepository;
  environment: string;
}

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    const {
      vpc,
      db,
      storageBucket,
      imageTag,
      presignedUrl,
      dbSecret,
      repository,
      authSecret,
      environment,
    } = props;

    const cluster = new ecs.Cluster(this, `StorageCluster-${environment}`, {
      vpc,
    });

    const appService = new AppService(this, `StorageService-${environment}`, {
      vpc,
      cluster,
      repository,
      containerPort: 3000,
      imageTag,
      environment: {
        NODE_ENV: "production",
        BUCKET_NAME: storageBucket.bucket.bucketName,
        PRESIGNED_LAMBDA_URL: presignedUrl,
        AUTH_SECRET: authSecret,
      },
      secrets: {
        DB_USER: ecs.Secret.fromSecretsManager(dbSecret, "username"),
        DB_PASSWORD: ecs.Secret.fromSecretsManager(dbSecret, "password"),
        DB_HOST: ecs.Secret.fromSecretsManager(dbSecret, "host"),
        DB_PORT: ecs.Secret.fromSecretsManager(dbSecret, "port"),
        DB_NAME: ecs.Secret.fromSecretsManager(dbSecret, "dbname"),
      },
    });

    const seedRunner = new SeedRuner(this, `SeedRunner-${environment}`, {
      vpc,
      cluster,
      securityGroup: appService.service.connections.securityGroups[0],
      repository,
      imageTag,
      environment: {
        NODE_ENV: environment,
      },
      secrets: {
        DB_USER: ecs.Secret.fromSecretsManager(dbSecret, "username"),
        DB_PASSWORD: ecs.Secret.fromSecretsManager(dbSecret, "password"),
        DB_HOST: ecs.Secret.fromSecretsManager(dbSecret, "host"),
        DB_PORT: ecs.Secret.fromSecretsManager(dbSecret, "port"),
        DB_NAME: ecs.Secret.fromSecretsManager(dbSecret, "dbname"),
      },
      seedCommand: ["npm", "run", "seed:all"],
    });

    seedRunner.taskDefinition.taskRole.addToPrincipalPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["rds-db:connect"],
        resources: ["*"],
      }),
    );

    const seedLambda = new lambdaNode.NodejsFunction(this, `SeedLambda-${environment}`, {
      entry: "src/seed.ts",
      runtime: lambda.Runtime.NODEJS_20_X,
      timeout: cdk.Duration.minutes(1),
      environment: {
        CLUSTER_ARN: cluster.clusterArn,
        TASK_DEF_ARN: seedRunner.taskDefinition.taskDefinitionArn,
        SUBNET_IDS: vpc.privateSubnets.map((s) => s.subnetId).join(","),
        SECURITY_GROUP_IDS: appService.connections.securityGroups[0].securityGroupId,
      },
    });

    seedRunner.taskDefinition.grantRun(seedLambda);

    new cdk.CfnOutput(this, `SeedLambdaName-${environment}`, {
      value: seedLambda.functionName,
    });

    appService.connections.allowTo(
      new ec2.Connections({
        securityGroups: [props.dbSecurityGroup],
      }),
      ec2.Port.tcp(5432),
    );

    storageBucket.grantReadWrite(appService.service.taskDefinition.taskRole);

    const alb = new elbv2.ApplicationLoadBalancer(this, `alb-${environment}`, {
      vpc,
      internetFacing: true,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
    });

    appService.connections.allowFrom(alb, ec2.Port.tcp(3000));

    const listener = alb.addListener(`HttpListener-${environment}`, {
      port: 80,
    });

    listener.addTargets(`StorageTarget-${environment}`, {
      port: 3000,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targets: [appService.service],
      healthCheck: {
        path: "/api/health",
        healthyHttpCodes: "200",
        interval: cdk.Duration.seconds(60),
      },
    });

    new cdk.CfnOutput(this, `AppUrl-${environment}`, {
      value: `http://${alb.loadBalancerDnsName}`,
      description: "App Url",
    });
  }
}
