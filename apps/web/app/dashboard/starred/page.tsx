import { Typography } from "@workspace/ui/components";
import React from "react";

const Page = () => {
  return <div>
    <div className="my-10">
      <Typography as="h1" type="headline">
        Starred
      </Typography>
      <Typography as="p" type="body">
        Pick up exactly where you left
      </Typography>
    </div>
  </div>;
};

export default Page;
