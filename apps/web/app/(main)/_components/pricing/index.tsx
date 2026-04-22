import { Typography } from "@workspace/ui/components";
import React from "react";
import PricingCard from "@/components/card-items/pricingCard";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="max-h-100 flex flex-col items-center justify-center min-h-screen m-10 lg:m-5 py-15"
    >
      <Typography as="h3" type="headline">
        Simple, transparent pricing
      </Typography>
      <Typography as="p" type="body">
        Choose the plan that fits your digital life.
      </Typography>

      <div className="w-full flex flex-col lg:flex-row justify-between items-center my-10 gap-4">
        <PricingCard
          plan="Free"
          price={0}
          features={["5GB Secure Storage", "Basic Sharing", "Mobile Access"]}
        />
        <PricingCard
          plan="Pro"
          price={12}
          features={[
            "10GB Cloud Storage",
            "Advance Security",
            "Offline File Access",
            "Priority Support",
          ]}
        />
        <PricingCard
          plan="Company"
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
