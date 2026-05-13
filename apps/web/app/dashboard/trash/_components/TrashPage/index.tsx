"use client";
import FilesCard from "@/components/card-items/fileCard";
import { Typography, Button } from "@workspace/ui/components";
import { Trash } from "@workspace/ui/lib";
import { File } from "@/lib/types/schema.db";
import React from "react";

interface TrashPageProps {
  data: any;
}

const TrashPage = ({ data }: TrashPageProps) => {
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
      <section className="w-full h-190 flex flex-wrap overflow-y-scroll gap-4 py-5 px-2">
        {data.map((el: File, idx: number) => (
          <FilesCard key={idx} data={el} option={true} />
        ))}
      </section>
    </div>
  );
};

export default TrashPage;
