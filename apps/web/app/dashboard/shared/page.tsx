import { Typography } from "@workspace/ui/components";
import React from "react";

const Page = () => {
  return (
    <div>
      <section className="my-10">
        <Typography as="h1" type="headline">
          Shared Files
        </Typography>
        <Typography as="p" type="body">
          Collaborate and share with others
        </Typography>
      </section>
      <section></section>
    </div>
  );
};

export default Page;
