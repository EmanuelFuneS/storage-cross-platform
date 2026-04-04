import * as rds from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";
import { RdsDatabase, RdsDatabaseProps } from "./rds-database";
import { Connections } from "aws-cdk-lib/aws-ec2";

export interface PostgresDatabaseProps extends Omit<
  RdsDatabaseProps,
  "engine"
> {
  version?: rds.PostgresEngineVersion;
}

export class PostgresDatabase extends RdsDatabase {
  constructor(scope: Construct, id: string, props: PostgresDatabaseProps) {
    super(scope, id, {
      ...props,
      engine: rds.DatabaseInstanceEngine.postgres({
        version: props.version ?? rds.PostgresEngineVersion.VER_16_10,
      }),
    });
  }

  protected defaultPort(): number {
    return 5432;
  }
}
