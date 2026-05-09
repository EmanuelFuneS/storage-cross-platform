import * as cdk from "aws-cdk-lib/core";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import { Construct } from "constructs";
import { StorageBucket } from "../constructs/storage-bucket";
import { Presigned } from "../constructs/presigned";

interface StorageStackPorps extends cdk.StackProps {
  environment: string;
}

export class StorageStack extends cdk.Stack {
  public readonly storageBucket: StorageBucket;
  public readonly distribution: string;
  public readonly presignedUrl: string;
  public readonly repository: ecr.IRepository;

  constructor(scope: Construct, id: string, props: StorageStackPorps) {
    super(scope, id, props);

    const { environment } = props;

    this.storageBucket = new StorageBucket(this, `StorageBucket-${environment}`, {
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      versioned: true,
    });

    const oac = new cloudfront.CfnOriginAccessControl(
      this,
      `OAC-${environment}`,
      {
        originAccessControlConfig: {
          name: `storage-oac-${environment}`,
          originAccessControlOriginType: "s3",
          signingBehavior: "always",
          signingProtocol: "sigv4",
        },
      },
    );

    const corsCachePolicy = new cloudfront.CachePolicy(
      this,
      `CorsCachePolicy-${environment}`,
      {
        cachePolicyName: `CORS-S3-Origin-${environment}`,
        comment: "Include Origin header for cors",
        defaultTtl: cdk.Duration.days(1),
        maxTtl: cdk.Duration.days(365),
        minTtl: cdk.Duration.seconds(1),
        headerBehavior: cloudfront.CacheHeaderBehavior.allowList("Origin"),
      },
    );

    const dist = new cloudfront.Distribution(this, `Distribution-${environment}`, {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(
          this.storageBucket.bucket,
          {
            originAccessControlId: oac.getAtt("Id").toString(),
          },
        ),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: corsCachePolicy,
      },
      defaultRootObject: "",
    });
    const distributionId = dist.distributionId;
    this.storageBucket.addCloudFrontAccess(distributionId);

    const repository = new ecr.Repository(this, `StorageRepository-${environment}`, {
      repositoryName: `storage-app-${environment}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      emptyOnDelete: true,
    });

    this.repository = repository;

    const presigned = new Presigned(this, `PresignedUrl-${environment}`, {
      bucket: this.storageBucket.bucket,
    });

    this.presignedUrl = presigned.functionUrl.url;

    new cdk.CfnOutput(this, `PresignedFunctionUrl-${environment}`, {
      value: presigned.functionUrl.url,
    });

    new cdk.CfnOutput(this, `DistributionURL-${environment}`, {
      value: `https://${dist.domainName}`,
    });
  }
}
