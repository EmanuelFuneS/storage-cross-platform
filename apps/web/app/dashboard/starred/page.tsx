"use client";
import React from "react";
import { Typography } from "@workspace/ui/components";
import { File } from "@/lib/types/schema.db";
import useGetStarredFiles from "@/lib/hooks/useGetStarredFiles";
import FilesCard from "@/components/card-items/fileCard";

const Page = () => {
  const { data } = useGetStarredFiles();

  if (!data) return <>...Loading</>;

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
      <section className="w-full h-190 flex flex-wrap overflow-y-scroll gap-4 py-5 px-2">
        {data.map((el: File, idx: number) => (
          <FilesCard key={idx} data={el} />
        ))}
      </section>
    </div>
  );
};

export default Page;
