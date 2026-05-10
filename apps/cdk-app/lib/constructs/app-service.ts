import * as cdk from "aws-cdk-lib/core";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecr from "aws-cdk-lib/aws-ecr";
import { Construct } from "constructs";

export interface AppServiceProps {
  vpc: ec2.IVpc;
  cluster: ecs.ICluster;
  repository: ecr.IRepository;
  imageTag?: string;
  cpu?: number;
  memory?: number;
  containerPort?: number;
  environment?: Record<string, string>;
  secrets?: Record<string, ecs.Secret>;
}
export class AppService extends Construct {
  public readonly service: ecs.FargateService;
  public readonly connections: ec2.Connections;

  constructor(scope: Construct, id: string, props: AppServiceProps) {
    super(scope, id);
    const {
      vpc,
      cluster,
      repository,
      imageTag,
      cpu = 512,
      memory = 1024,
      containerPort = 3000,
      environment = {},
      secrets = {},
    } = props;

    const taskDefinition = new ecs.FargateTaskDefinition(
      this,
      "StorageTaskDef",
      {
        cpu,
        memoryLimitMiB: memory,
      },
    );

    taskDefinition.addContainer("StorageContainer", {
      image: ecs.ContainerImage.fromEcrRepository(repository, imageTag),
      //image: ecs.ContainerImage.fromRegistry("nginx:latest"),
      portMappings: [{ containerPort }],
      environment,
      secrets,
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: id,
      }),
    });

    const securityGroup = new ec2.SecurityGroup(this, "SecurityGroup", {
      vpc,
      description: `Security groud for ${id}`,
      allowAllOutbound: true,
    });

    this.service = new ecs.FargateService(this, "Service", {
      cluster,
      taskDefinition,
      securityGroups: [securityGroup],
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      desiredCount: 1,
      enableExecuteCommand: true,
    });

    this.connections = this.service.connections;
  }
}
