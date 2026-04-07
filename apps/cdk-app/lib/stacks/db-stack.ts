import * as cdk from "aws-cdk-lib/core";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { PostgresDatabase } from "../constructs/postgres-db";

interface DBStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}

export class DBStack extends cdk.Stack {
  public readonly db: PostgresDatabase;
  public readonly dbSecurityGroup: ec2.ISecurityGroup;

  constructor(scope: Construct, id: string, props: DBStackProps) {
    super(scope, id, props);

    const { vpc } = props;

    this.db = new PostgresDatabase(this, "postgresDatabase", {
      vpc: vpc,
      databaseName: "storage_db",
    });

    this.dbSecurityGroup = this.db.connections.securityGroups[0];
  }
}
