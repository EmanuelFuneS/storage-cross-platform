import * as cdk from "aws-cdk-lib/core";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export interface SeedRunnerProps {
  vpc: ec2.IVpc;
  cluster: ecs.ICluster;
  repository: ecr.IRepository;
  imageTag?: string;
  environment: Record<string, string>;
  secrets?: Record<string, ecs.Secret>;
  securityGroup: ec2.ISecurityGroup;
  seedCommand: string[];
}

export class SeedRuner extends Construct {
  public readonly taskDefinition: ecs.FargateTaskDefinition;

  constructor(scope: Construct, id: string, props: SeedRunnerProps) {
    super(scope, id);

    const {
      vpc,
      cluster,
      securityGroup,
      repository,
      imageTag,
      environment = {},
      secrets = {},
      seedCommand,
    } = props;

    this.taskDefinition = new ecs.FargateTaskDefinition(this, "SeedTaskDef", {
      cpu: 256,
      memoryLimitMiB: 512,
    });

    this.taskDefinition.addContainer("SeedContainer", {
      image: ecs.ContainerImage.fromEcrRepository(repository, imageTag),
      command: seedCommand,
      environment,
      secrets,
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: `${id}-seeds`,
      }),
      essential: true,
    });
  }
}
