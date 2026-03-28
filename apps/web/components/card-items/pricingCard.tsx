import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import Typography from "@workspace/ui/components/typography";
import Link from "next/link";
import React from "react";

interface PricingCardProps {
  plan: "basic" | "pro" | "business";
  price: number;
  features: string[];
}

const PricingCard = ({ plan, price, features }: PricingCardProps) => {
  return (
    <Card className="w-85 min-h-100 flex flex-col justify-start p-5 rounded-xl bg-blue-700 hover:scale-105">
      <div className="m-1 py-6">
        <Typography as="p" type="title">
          {plan.toUpperCase()}
        </Typography>
        <Typography as="p" type="headline" className="text-5xl">
          ${price}
        </Typography>
      </div>
      <div className="w-full">
        <Button className="w-full hover:bg-blue-300">
          <Link href="/auth/sign-up">
            {plan === "basic"
              ? "Get started"
              : plan === "pro"
                ? "Choose Pro"
                : "Contact Sales"}
          </Link>
        </Button>
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
