import * as cdk from "aws-cdk-lib/core";
import { Construct } from "constructs";
import { StorageBucket } from "../constructs/storage-bucket";
import { Presigned } from "../constructs/presigned";

export class StorageStack extends cdk.Stack {
  public readonly storageBucket: StorageBucket;
  public readonly presignedUrl: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.storageBucket = new StorageBucket(this, "StorageBucket", {
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      versioned: true,
    });

    const presigned = new Presigned(this, "PresignedUrl", {
      bucket: this.storageBucket.bucket,
    });

    this.presignedUrl = presigned.functionUrl.url;

    new cdk.CfnOutput(this, "PresignedFunctionUrl", {
      value: presigned.functionUrl.url,
    });
  }
}
