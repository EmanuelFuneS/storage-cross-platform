import { Card, Typography } from "@workspace/ui/components";
import React from "react";

const Page = () => {
  return (
    <div className="w-full h-full">
      <div className="my-10">
        <Typography as="h1" type="headline">
          Storage Usage
        </Typography>
        <Typography as="p" type="body">
          You've used {10} of your total capacity. Consider refining your
          collection or upgrade your plan.
        </Typography>
      </div>
      <div className="my-10 w-full h-auto flex  space-x-5 space-y-5">
        <Card scale={false} className="w-full h-60">Stat storage</Card>
        <Card scale={false} className="w-1/2 xl:w-1/3 h-75">Upgrade Plan</Card>
      </div>
      <div className="my-10">
        <Card scale={false} className="w-full h-80">
          table
        </Card>
      </div>
    </div>
  );
};

export default Page;
