import * as cdk from "aws-cdk-lib/core";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import { Construct } from "constructs";
import { StorageBucket } from "../constructs/storage-bucket";
import { Presigned } from "../constructs/presigned";

export class StorageStack extends cdk.Stack {
  public readonly storageBucket: StorageBucket;
  public readonly distribution: string;
  public readonly presignedUrl: string;
  public readonly repository: ecr.IRepository;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.storageBucket = new StorageBucket(this, "StorageBucket", {
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      versioned: true,
    });

    const oac = new cloudfront.CfnOriginAccessControl(this, "OAC", {
      originAccessControlConfig: {
        name: `${this.storageBucket.bucket.bucketName}-oac`,
        originAccessControlOriginType: "s3",
        signingBehavior: "always",
        signingProtocol: "sigv4",
      },
    });

    const dist = new cloudfront.Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(
          this.storageBucket.bucket,
          {
            originAccessControlId: oac.getAtt("Id").toString(),
          },
        ),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: "",
    });
    const distributionId = dist.distributionId;
    this.storageBucket.addCloudFrontAccess(distributionId);

    const repository = new ecr.Repository(this, "StorageRepository", {
      repositoryName: "storage-app",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      emptyOnDelete: true,
    });

    this.repository = repository;

    const presigned = new Presigned(this, "PresignedUrl", {
      bucket: this.storageBucket.bucket,
    });

    this.presignedUrl = presigned.functionUrl.url;

    new cdk.CfnOutput(this, "PresignedFunctionUrl", {
      value: presigned.functionUrl.url,
    });

    new cdk.CfnOutput(this, "DistributionURL", {
      value: `https://${dist.domainName}`,
    });
  }
}
