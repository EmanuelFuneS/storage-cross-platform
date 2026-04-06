"use client";
import { Typography, Card } from "@workspace/ui/components";

import React from "react";

interface FeatureCardProps {
  title: string;
  children: React.ReactNode;
}

const FeatureCard = ({ title, children }: FeatureCardProps) => {
  return (
    <Card className="w-80 lg:w-full h-70 p-6 flex flex-col justify-between">
      <div className="my-5">image</div>
      <div className="my-5">
        <Typography as="p" type="title">
          {title}
        </Typography>
      </div>
      <div className="my-4 pr-4">
        <Typography as="p" type="body">
          {children}
        </Typography>
      </div>
    </Card>
  );
};

export default FeatureCard;
