"use client";
import { Typography, Card } from "@workspace/ui/components";
import { ShieldHalf, RefreshCw, UsersRound } from "@workspace/ui/lib";
import React from "react";

interface FeatureCardProps {
  title: string;
  icon: "shield" | "reload" | "users";
  children: React.ReactNode;
}

const IconManager = (icon: string) => {
  switch (icon) {
    case "shield":
      return (
        <div className="bg-secondary p-2 max-w-13 rounded-2xl">
          <ShieldHalf size={35} className="text-tertiary"/>
        </div>
      );
    case "reload":
      return (
        <div className="bg-secondary p-2 max-w-13 rounded-2xl">
          <RefreshCw size={35} className="text-tertiary"/>
        </div>
      );
    default:
      return (
        <div className="bg-secondary p-2 max-w-13 rounded-2xl">
          <UsersRound size={35} className="text-tertiary"/>
        </div>
      );
  }
};

const FeatureCard = ({ title, icon, children }: FeatureCardProps) => {
  return (
    <Card className="w-80 lg:w-full h-70 p-6 flex flex-col justify-between">
      <div className="">{icon && IconManager(icon)}</div>
      <div className="my-2">
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
