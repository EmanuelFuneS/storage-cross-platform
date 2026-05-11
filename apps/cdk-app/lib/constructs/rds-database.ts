import * as cdk from "aws-cdk-lib/core";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as rds from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";

export interface RdsDatabaseProps {
  vpc: ec2.IVpc;
  databaseName: string;
  adminUsername?: string;
  instanceType?: ec2.InstanceType;
  allocatedStorage?: number;
  multiAz?: boolean;
  removalPolicy?: cdk.RemovalPolicy;
  engine: rds.IInstanceEngine;
  parameterGroup?: rds.IParameterGroup;
  parameters?: Record<string, string>;
}

export abstract class RdsDatabase extends Construct {
  public readonly endpoint: rds.Endpoint;
  public readonly secret: NonNullable<rds.DatabaseInstance["secret"]>;
  public readonly connections: ec2.Connections;

  constructor(scope: Construct, id: string, props?: RdsDatabaseProps) {
    super(scope, id);

    const {
      vpc,
      databaseName,
      adminUsername = "dbadmin",
      instanceType = ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO,
      ),
      allocatedStorage = 20,
      multiAz = false,
      removalPolicy = cdk.RemovalPolicy.SNAPSHOT,
      parameterGroup,
      parameters,
      engine,
    } = props!;

    const securityGroup = new ec2.SecurityGroup(this, "SecurityGroup", {
      vpc,
      description: `Security group for ${id} PostgreSQL instance`,
      allowAllIpv6Outbound: false,
    });

    /* securityGroup.addIngressRule(
      ec2.Peer.ipv4(vpc.vpcCidrBlock),
      ec2.Port.tcp(5432),
      `Allow ${engine.engineType} from within the vpc`,
    ); */

    const instance = new rds.DatabaseInstance(this, "Instance", {
      engine,
      instanceType,
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      securityGroups: [securityGroup],
      databaseName,
      port: this.defaultPort(),
      credentials: rds.Credentials.fromGeneratedSecret(adminUsername, {
        secretName: `${id.toLocaleLowerCase()}-credentials`,
      }),
      allocatedStorage,
      maxAllocatedStorage: allocatedStorage,
      storageType: rds.StorageType.GP2,
      multiAz,
      deletionProtection: false,
      backupRetention: cdk.Duration.days(0),
      removalPolicy,
      parameterGroup,
      parameters,
    });

    if (!instance.secret) {
      throw new Error(
        `${id}: secret was not generated. Use Credentials.fromGeneratedSecret`,
      );
    }

    this.endpoint = instance.instanceEndpoint;
    ((this.secret = instance.secret),
      (this.connections = instance.connections));
  }
  protected abstract defaultPort(): number;
}
