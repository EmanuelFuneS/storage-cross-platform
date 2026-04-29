import { Typography } from "@workspace/ui/components";
import React from "react";

const Page = () => {
  return (
    <div>
      <section className="my-10">
        <Typography as="h1" type="headline">
          Starred
        </Typography>
        <Typography as="p" type="body">
          Files you've marked as favorites
        </Typography>
      </section>
    </div>
  );
};

export default Page;
