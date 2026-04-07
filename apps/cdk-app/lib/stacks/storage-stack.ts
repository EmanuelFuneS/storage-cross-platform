import * as cdk from "aws-cdk-lib/core";
import { Construct } from "constructs";
import { StorageBucket } from "../constructs/storage-bucket";

export class StorageStack extends cdk.Stack {
  public readonly storageBucket: StorageBucket;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.storageBucket = new StorageBucket(this, "StorageBucket", {
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      versioned: true,
    });
  }
}
