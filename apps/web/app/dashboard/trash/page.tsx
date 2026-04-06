import { Button, Typography } from "@workspace/ui/components";
import { Trash } from "@workspace/ui/lib";
import React from "react";

const Page = () => {
  return (
    <div className="w-full h-full">
      <section className="my-10 flex justify-between">
        <div>
          <Typography as="h1" type="headline">
            Trash
          </Typography>
          <Typography as="p" type="body">
            Items in trash will be deleted forever after 30 days.
          </Typography>
        </div>
        <div>
          <Button className="h-10 flex items-center w-35 space-x-2">
            <Trash size={13} />
            <Typography as="p" type="body">
              Empty Trash
            </Typography>
          </Button>
        </div>
      </section>
      <section className="bg-orange-500 w-full h-4/5">
        items
      </section>
    </div>
  );
};

export default Page;
