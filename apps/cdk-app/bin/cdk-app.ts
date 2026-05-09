#!/usr/bin/env node
import * as cdk from "aws-cdk-lib/core";
import { NetworkStack } from "../lib/stacks/network-stack";
import { DBStack } from "../lib/stacks/db-stack";
import { AppStack } from "../lib/stacks/app-stack";
import { StorageStack } from "../lib/stacks/storage-stack";

const app = new cdk.App();
const environmet = process.env.ENVIRONMENT || "dev";
const imageTag = process.env.IMAGE_TAG || "latest";

if (!["dev", "staging", "prod"].includes(environmet)) {
  throw new Error(
    `Invalid environment: ${environmet}. Must be dev, staging, or prod.`,
  );
}

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const prefix = `storage-${environmet}`;
const stackName = (name: string) => `${prefix}${name}`;

const networkStack = new NetworkStack(app, stackName("network"), {
  stackName: stackName("network"),
  env,
});

const storageStack = new StorageStack(app, stackName("storage"), {
  stackName: stackName("storage"),
  env,
});

const dbStack = new DBStack(app, stackName("db"), {
  stackName: stackName("db"),
  vpc: networkStack.vpc,
  env,
});

new AppStack(app, stackName("app"), {
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

cdk.Tags.of(app).add("Environment", environmet);
cdk.Tags.of(app).add("Project", "storage");
