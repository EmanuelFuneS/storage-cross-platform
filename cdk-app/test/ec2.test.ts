import { Template } from "aws-cdk-lib/assertions";
import * as cdk from "aws-cdk-lib/core";
import { Ec2Stack } from "../lib/stacks/ec2-stack";

test("Check InstanceType and SSH keyname", () => {
  const app = new cdk.App();
  const stack = new Ec2Stack(app, "myTestStack", {
    env: {
      account: "123456789012",
      region: "us-east-1",
    },
  });
  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::EC2::Instance", {
    InstanceType: "t3.micro",
    KeyName: "simple-instance-1-key",
  });
});
