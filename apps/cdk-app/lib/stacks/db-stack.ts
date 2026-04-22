import * as cdk from "aws-cdk-lib/core";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import { Construct } from "constructs";
import { PostgresDatabase } from "../constructs/postgres-db";

interface DBStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}

export class DBStack extends cdk.Stack {
  public readonly db: PostgresDatabase;
  public readonly dbSecurityGroup: ec2.ISecurityGroup;
  public readonly databaseUrlSecret: ecs.Secret;

  constructor(scope: Construct, id: string, props: DBStackProps) {
    super(scope, id, props);

    const { vpc } = props;

    this.db = new PostgresDatabase(this, "postgresDatabase", {
      vpc: vpc,
      databaseName: "storage_db",
    });

    this.dbSecurityGroup = this.db.connections.securityGroups[0];

    const username = this.db.secret
      ?.secretValueFromJson("username")
      .unsafeUnwrap();
    const password = this.db.secret
      ?.secretValueFromJson("password")
      .unsafeUnwrap();
    const host = this.db.secret?.secretValueFromJson("host").unsafeUnwrap();
    const port = this.db.secret?.secretValueFromJson("port").unsafeUnwrap();
    const dbName = this.db.secret?.secretValueFromJson("dbname").unsafeUnwrap();

    this.databaseUrlSecret = ecs.Secret.fromSecretsManager(
      this.db.secret!,
      "url",
    );
  }
}
