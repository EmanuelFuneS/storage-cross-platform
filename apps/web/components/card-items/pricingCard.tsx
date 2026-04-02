import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import Typography from "@workspace/ui/components/typography";
import Link from "next/link";
import React from "react";

interface PricingCardProps {
  plan: "Free" | "Pro" | "Company";
  price: number;
  features: string[];
}

const PricingCard = ({ plan, price, features }: PricingCardProps) => {
  return (
    <Card className="w-85 min-h-100 flex flex-col justify-start p-5 rounded-xl">
      <div className="m-1 py-6">
        <Typography as="p" type="title">
          {plan.toUpperCase()}
        </Typography>
        <Typography as="p" type="headline" className="text-5xl">
          ${price}
        </Typography>
      </div>
      <div className="w-full">
        <Link href={`/auth/sign-up?plan=${plan}`} className="w-full">
          <Button className="w-full hover:bg-blue-300">
            {plan === "Free"
              ? "Get started"
              : plan === "Pro"
                ? "Choose Pro"
                : "Contact Sales"}
          </Button>
        </Link>
      </div>
      <div className="flex flex-col space-y-4 my-5">
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
