import * as cdk from "aws-cdk-lib/core";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class Ec2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //code

    const defaultVpc = ec2.Vpc.fromLookup(this, "VPC", {
      isDefault: true,
    });

    const role = new iam.Role(this, "simple-instance-1-role", {
      assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
    });

    const securityGroup = new ec2.SecurityGroup(this, "simple-instance-1-sg", {
      vpc: defaultVpc,
      allowAllOutbound: true,
      securityGroupName: "simple-instance-1-sg",
    });

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      "Allows SSH access from Internet",
    );

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      "Allows HTTP access from Internet",
    );

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(443),
      "Allows HTTPS access from Internet",
    );

    const instance = new ec2.Instance(this, "simple-instance-1", {
      vpc: defaultVpc,
      role: role,
      securityGroup: securityGroup,
      instanceName: "simple-instance-1",
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO,
      ),
      machineImage: ec2.MachineImage.latestAmazonLinux2(),
      keyName: "simple-instance-1-key",
    });

    new cdk.CfnOutput(this, "simple-instance-1-output", {
      value: instance.instancePublicIp,
    });
  }
}
