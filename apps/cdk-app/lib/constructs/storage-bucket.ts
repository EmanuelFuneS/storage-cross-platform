import * as cdk from "aws-cdk-lib/core";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export interface StorageBucketProps {
  removalPolicy?: cdk.RemovalPolicy;
  versioned?: boolean;
}

export class StorageBucket extends Construct {
  public readonly bucket: s3.Bucket;
  constructor(scope: Construct, id: string, props: StorageBucketProps = {}) {
    super(scope, id);

    const { removalPolicy = cdk.RemovalPolicy.DESTROY, versioned = false } =
      props;

    this.bucket = new s3.Bucket(this, "Bucket", {
      removalPolicy,
      versioned,
      autoDeleteObjects: removalPolicy === cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      cors: [
        {
          allowedMethods: [
            s3.HttpMethods.GET,
            s3.HttpMethods.PUT,
            s3.HttpMethods.POST,
            s3.HttpMethods.DELETE,
          ],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"],
        },
      ],
    });
  }
  grantReadWrite(grantes: iam.IGrantable): iam.Grant {
    return this.bucket.grantReadWrite(grantes);
  }
}
