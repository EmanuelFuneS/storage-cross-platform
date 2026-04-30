import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaNode from "aws-cdk-lib/aws-lambda-nodejs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

interface PresignedProps {
  bucket: s3.Bucket;
}

export class Presigned extends Construct {
  public readonly functionUrl: lambda.FunctionUrl;
  constructor(scope: Construct, id: string, props: PresignedProps) {
    super(scope, id);

    const { bucket } = props;

    const fn = new lambdaNode.NodejsFunction(this, "PresignedUrlFn", {
      entry: "src/presigned.ts",
      environment: {
        BUCKET_NAME: bucket.bucketName,
      },
    });

    //bucket.grantPut(fn);

    fn.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
        resources: [`${bucket.bucketArn}/*`],
      }),
    );

    this.functionUrl = fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });
  }
}
