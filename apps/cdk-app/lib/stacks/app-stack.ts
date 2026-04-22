import * as cdk from "aws-cdk-lib/core";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { Construct } from "constructs";
import { AppService } from "../constructs/app-service";
import { PostgresDatabase } from "../constructs/postgres-db";
import { StorageBucket } from "../constructs/storage-bucket";

interface AppStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
  db: PostgresDatabase;
  dbSecurityGroup: ec2.ISecurityGroup;
  sotrageBucket: StorageBucket;
  imageTag: string;
  presignedUrl: string;
  databaseUrl: ecs.Secret;
}

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    const { vpc, db, sotrageBucket, imageTag, presignedUrl, databaseUrl } =
      props;

    const repository = new ecr.Repository(this, "StorageRepository", {
      repositoryName: "storage-app",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      emptyOnDelete: true,
    });

    const cluster = new ecs.Cluster(this, "StorageCluster", { vpc });

    const appService = new AppService(this, "StorageService", {
      vpc,
      cluster,
      repository,
      containerPort: 3000,
      imageTag,
      environment: {
        NODE_ENV: "production",
        BUCKET_NAME: sotrageBucket.bucket.bucketName,
        PRESIGNED_LAMBDA_URL: presignedUrl,
        AUTH_SECRET: process.env.AUTH_SECRET || "default-dev-token",
      },
      secrets: {
        DATABASE_URL: databaseUrl,
        DB_SECRET: ecs.Secret.fromSecretsManager(db.secret),
        DB_USER: ecs.Secret.fromSecretsManager(db.secret, "username"),
        DB_PASS: ecs.Secret.fromSecretsManager(db.secret, "password"),
        DB_HOST: ecs.Secret.fromSecretsManager(db.secret, "host"),
        DB_PORT: ecs.Secret.fromSecretsManager(db.secret, "port"),
        DB_NAME: ecs.Secret.fromSecretsManager(db.secret, "dbname"),
      },
    });

    appService.connections.allowTo(
      new ec2.Connections({
        securityGroups: [props.dbSecurityGroup],
      }),
      ec2.Port.tcp(5432),
    );

    sotrageBucket.grantReadWrite(appService.service.taskDefinition.taskRole);

    const alb = new elbv2.ApplicationLoadBalancer(this, "alb", {
      vpc,
      internetFacing: true,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
    });

    appService.connections.allowFrom(alb, ec2.Port.tcp(80));

    const listener = alb.addListener("HttpListener", { port: 80 });

    listener.addTargets("StorageTarget", {
      port: 3000,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targets: [appService.service],
      healthCheck: { path: "/health", healthyHttpCodes: "200",
        interval: cdk.Duration.seconds(60),
       },
    });

    new cdk.CfnOutput(this, "AppUrl", {
      value: `http://${alb.loadBalancerDnsName}`,
      description: "App Url",
    });
  }
}
