import * as cdk from "aws-cdk-lib/core";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import * as secretmanager from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import { AppService } from "../constructs/app-service";
import { PostgresDatabase } from "../constructs/postgres-db";
import { StorageBucket } from "../constructs/storage-bucket";

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
      environment
    } = props;

    const cluster = new ecs.Cluster(this, `StorageCluster-${environment}`, { vpc });

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

    appService.connections.allowFrom(alb, ec2.Port.tcp(80));

    const listener = alb.addListener(`HttpListener-${environment}`, { port: 80 });

    listener.addTargets(`StorageTarget-${environment}`, {
      port: 3000,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targets: [appService.service],
      healthCheck: {
        path: "/health",
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
