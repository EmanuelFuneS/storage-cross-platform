#!/usr/bin/env node
import * as cdk from "aws-cdk-lib/core";
import { CdkAppStack } from "../lib/utils/cdk-app-stack";
import { Ec2Stack } from "../lib/utils/ec2-stack";
import { RdsStack } from "../lib/utils/rds-stack";
import { NetworkStack } from "../lib/stacks/network-stack";
import { DBStack } from "../lib/stacks/db-stack";

const app = new cdk.App();

const network = new NetworkStack(app, "network-stack", {
  stackName: "network-stack",
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

new DBStack(app, "db-stack", {
  vpc: network.vpc,
  stackName: "db-stack",
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
