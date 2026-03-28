"use client";
import { Card } from "@workspace/ui/components/card";
import Typography from "@workspace/ui/components/typography";
import React from "react";

interface FeatureCardProps {
  title: string;
  children: React.ReactNode;
}

const FeatureCard = ({ title, children }: FeatureCardProps) => {
  return (
    <Card className="w-80 lg:w-full h-70 p-6 flex flex-col justify-between rounded-xl  bg-blue-700">
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
