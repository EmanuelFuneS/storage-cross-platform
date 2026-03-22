import * as cdk from "aws-cdk-lib/core";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as rds from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";

export class RdsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    //vpc rds
    const vpc = new ec2.Vpc(this, "DatabaseVpc", {
      maxAzs: 2,
      natGateways: 1,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "Public",
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: "private",
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          cidrMask: 24,
          name: "Isolated",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    //security group rds instance
    const dbSecurityGroup = new ec2.SecurityGroup(this, "DbSecurityGroup", {
      vpc,
      description: "Security group for RDS PostgreSQL",
      allowAllOutbound: false,
    });

    dbSecurityGroup.addIngressRule(
      ec2.Peer.ipv4(vpc.vpcCidrBlock),
      ec2.Port.tcp(5432),
      "Allow PostgreSQL connections from within the vpc",
    );

    //custom parameter group for db tuning
    const parameterGroup = new rds.ParameterGroup(this, "DbParameterGroup", {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_16_10,
      }),
      parameters: {
        log_statement: "all", // Log all SQL statements (dev only!)
        log_min_duration_statement: "1000", // Log queries slower than 1 second
        shared_preload_libraries: "pg_stat_statements",
        max_connections: "200",
      },
    });

    const database = new rds.DatabaseInstance(this, "PostgresDb", {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_16_10,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO,
      ),
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      securityGroups: [dbSecurityGroup],
      //db config
      databaseName: "testdb",
      port: 5432,
      credentials: rds.Credentials.fromGeneratedSecret("dbadmin", {
        secretName: "rds-credentials",
      }),
      //storage settings
      allocatedStorage: 20,
      maxAllocatedStorage: 20,
      storageType: rds.StorageType.GP2,
      //storageEncrypted: true,
      //availability and durability
      multiAz: false,
      deletionProtection: false,
      //bacuk config
      backupRetention: cdk.Duration.days(0),
      /* 
      preferredBackupWindow: "03:00-04:00",
      preferredMaintenanceWindow: "sun:04:00-sun:05:00", */
      //monitoring
      /*
      monitoringInterval: cdk.Duration.seconds(60),
      enablePerformanceInsights: true,
      performanceInsightRetention: rds.PerformanceInsightRetention.DEFAULT, */
      //removal behavior
      removalPolicy: cdk.RemovalPolicy.SNAPSHOT,
      parameterGroup: parameterGroup,
    });

    //Output conn information
    new cdk.CfnOutput(this, "DbEndpoint", {
      value: database.instanceEndpoint.hostname,
      description: "DB endpoint hostname",
    });

    new cdk.CfnOutput(this, "DbPort", {
      value: database.instanceEndpoint.port.toString(),
      description: "DB Port",
    });

    new cdk.CfnOutput(this, "SecretArn", {
      value: database.secret?.secretArn || "N/A",
      description: "ARN of the secret containing database credentials",
    });
  }
}
