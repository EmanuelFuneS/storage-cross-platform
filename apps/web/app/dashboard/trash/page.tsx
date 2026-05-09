"use client";
import React from "react";
import { Button, Card, Typography } from "@workspace/ui/components";
import { Trash } from "@workspace/ui/lib";
import { File } from "@/lib/types/schema.db";
import useGetDeletedFiles from "@/lib/hooks/useGetDeletedFiles";
import FilesCard from "@/components/card-items/fileCard";

//here delete file in s3

//here handle restore file
//here handle all delete files

const Page = () => {
  const { data } = useGetDeletedFiles();

  if (!data) return <>...loding</>;

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

export default Page;
