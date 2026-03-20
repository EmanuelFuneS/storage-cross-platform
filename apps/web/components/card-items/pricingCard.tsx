import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import Typography from "@workspace/ui/components/typography";
import React from "react";

interface PricingCardProps {
  plan: "basic" | "pro" | "business";
  price: number;
  features: string[];
}

const PricingCard = ({ plan, price, features }: PricingCardProps) => {
  return (
    <Card className="m-4 gap-4 flex flex-col items-start"> 
      <Typography as="p" type="body">
        {plan.toUpperCase()}
      </Typography>
      <Typography as="p" type="title">
        {price}
      </Typography>
      <div className="w-full">

      <Button>
        {plan === "basic"
          ? "Get started"
          : plan === "pro"
            ? "Choose Pro"
            : "Contact Sales"}
      </Button>
      </div>
      <div className="flex flex-col space-y-4 my-4">
        {features.map((feat, idx) => (
          <Typography key={idx} as="span" type="body">
            {feat}
          </Typography>
        ))}
      </div>
    </Card>
  );
};

export default PricingCard;
