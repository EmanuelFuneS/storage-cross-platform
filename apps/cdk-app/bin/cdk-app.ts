#!/usr/bin/env node
import * as cdk from "aws-cdk-lib/core";
import { NetworkStack } from "../lib/stacks/network-stack";
import { DBStack } from "../lib/stacks/db-stack";
import { AppStack } from "../lib/stacks/app-stack";
import { StorageStack } from "../lib/stacks/storage-stack";

const app = new cdk.App();
const imageTag = process.env.IMAGE_TAG || "latest";

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const networkStack = new NetworkStack(app, "network-stack", {
  stackName: "network-stack",
  env,
});

const storageStack = new StorageStack(app, "storage-stack", {
  stackName: "storage-stack",
  env,
});

const dbStack = new DBStack(app, "db-stack", {
  stackName: "db-stack",
  vpc: networkStack.vpc,
  env,
});

new AppStack(app, "storage-app-stack", {
  env,
  vpc: networkStack.vpc,
  db: dbStack.db,
  dbSecurityGroup: dbStack.dbSecurityGroup,
  dbSecret: dbStack.dbSecret,
  imageTag: imageTag,
  sotrageBucket: storageStack.storageBucket,
  presignedUrl: storageStack.presignedUrl,
  authSecret: process.env.AUTH_SECRET!,
  repository: storageStack.repository,
});
