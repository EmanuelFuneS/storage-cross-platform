"use client";
import FilesCard from "@/components/card-items/fileCard";
import { RecentFile } from "@/lib/types/schema.db";
import { Typography } from "@workspace/ui/components";
import React from "react";

interface RecentPageProps {
  data: any;
}

const RecentPage = ({ data }: RecentPageProps) => {
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
      <section className="w-full h-full overflow-hidden md:h-full flex flex-col justify-center  md:flex md:flex-row md:justify-start md:flex-wrap md:overflow-y-scroll gap-1 py-2 px-2">
        {data.map((el: RecentFile, idx: number) => (
          <FilesCard key={idx} data={el.File} />
        ))}
      </section>
    </div>
  );
};

export default RecentPage;
