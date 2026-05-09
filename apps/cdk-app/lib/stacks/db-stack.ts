import * as cdk from "aws-cdk-lib/core";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as secretmanager from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import { PostgresDatabase } from "../constructs/postgres-db";

interface DBStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
  environment: string;
}

export class DBStack extends cdk.Stack {
  public readonly db: PostgresDatabase;
  public readonly dbSecurityGroup: ec2.ISecurityGroup;
  public readonly dbSecret: secretmanager.ISecret;

  constructor(scope: Construct, id: string, props: DBStackProps) {
    super(scope, id, props);

    const { vpc, environment } = props;

    this.db = new PostgresDatabase(this, `postgresDatabase-${environment}`, {
      vpc: vpc,
      databaseName: `storage_db_${environment}`,
    });

    this.dbSecurityGroup = this.db.connections.securityGroups[0];

    this.dbSecret = this.db.secret!;
  }
}
