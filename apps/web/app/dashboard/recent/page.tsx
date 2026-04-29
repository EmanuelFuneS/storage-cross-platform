import { Typography } from "@workspace/ui/components";
import React from "react";

const Page = () => {
  const cards = new Array(10).fill("");
  return (
    <div>
      <section className="my-10">
        <div>
          <Typography as="h1" type="headline">
            Recent Files
          </Typography>
          <Typography as="p" type="body">
            Your latest activity
          </Typography>
        </div>
      </section>
      <section className="w-full h-190 flex flex-wrap overflow-y-scroll">
        {cards.map((el, idx) => (
          <div key={idx} className="w-60 h-60 bg-orange-300 m-5">{el}</div>
        ))}
      </section>
    </div>
  );
};

export default Page;
