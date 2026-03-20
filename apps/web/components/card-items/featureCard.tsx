import { Card } from "@workspace/ui/components/card";
import Typography from "@workspace/ui/components/typography";
import React from "react";

interface FeatureCardProps {
  title: string;
  children: React.ReactNode;
}

const FeatureCard = ({ title, children }: FeatureCardProps) => {
  return (
    <Card>
      <Typography as="p" type="title">
        {title}
      </Typography>
      <Typography as="p" type="body">
        {children}
      </Typography>
    </Card>
  );
};

export default FeatureCard;
