import * as cdk from "aws-cdk-lib/core";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { PostgresDatabase } from "../constructs/postgres-db";

interface DBStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}

export class DBStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: DBStackProps) {
    super(scope, id, props);

    const { vpc } = props;

    const db = new PostgresDatabase(this, "postgresDatabase", {
      vpc: vpc,
      databaseName: "storage_app",
    });
  }
}
