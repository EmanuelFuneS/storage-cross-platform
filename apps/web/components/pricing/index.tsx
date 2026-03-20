import Typography from "@workspace/ui/components/typography";
import React from "react";
import FeatureCard from "../card-items/featureCard";
import PricingCard from "../card-items/pricingCard";

type Props = {};

const Pricing = (props: Props) => {
  return (
    <section id="pricing" className="flex-1 flex flex-col items-center justify-center min-h-screen py-15">
      <Typography as="h3" type="headline">
        Simple, transparent pricing
      </Typography>
      <Typography as="p" type="body">
        Choose the plan that fits your digital life.
      </Typography>

      <div className="w-full flex justify-between items-center">
        <PricingCard
          plan="basic"
          price={0}
          features={["5GB Secure Storage", "Basic Sharing", "Mobile Access"]}
        />
        <PricingCard
          plan="pro"
          price={12}
          features={[
            "10GB Cloud Storage",
            "Advance Security",
            "Offline File Access",
            "Priority Support",
          ]}
        />
        <PricingCard
          plan="business"
          price={0}
          features={[
            "Unlimited Storage",
            "Admin Console",
            "Detailed Audit Logs",
            "Dedicated Manager",
          ]}
        />
      </div>
    </section>
  );
};

export default Pricing;
