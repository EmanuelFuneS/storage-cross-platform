#!/usr/bin/env node
import * as cdk from "aws-cdk-lib/core";
import { CdkAppStack } from "../lib/cdk-app-stack";
import { Ec2Stack } from "../lib/stacks/ec2-stack";

const app = new cdk.App();
/*new CdkAppStack(app, "cdk-stack-test", {
  stackName: "cdk-stack-test",
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

new CdkAppStack(app, "cdk-stack-prod", {
  stackName: "cdk-stack-prod",
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});*/

new Ec2Stack(app, "ec2-stack", {
  stackName: "ec2-stack",
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
