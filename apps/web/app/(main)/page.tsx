import Features from "@/app/(main)/_components/feature";
import Hero from "@/app/(main)/_components/hero";
import Pricing from "@/app/(main)/_components/pricing";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col space-y-10">
      <Hero />
      <Features />
      <Pricing />
    </div>
  );
};

export default Page;
