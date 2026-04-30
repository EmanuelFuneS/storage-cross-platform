"use client";
import useGetRecentsFiles from "@/lib/hooks/useGetRecentsFiles";
import { RecentFile } from "@/lib/types/schema.db";
import { Card, Typography } from "@workspace/ui/components";
import Image from "next/image";
import React from "react";

const distUrl = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/`;

const Page = () => {
  const cards = new Array(10).fill("");

  const { data } = useGetRecentsFiles();

  console.log(data);

  if (!data) return <>...Loading</>;

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
      <section className="w-full h-190 flex flex-wrap overflow-y-scroll gap-4 py-5 px-2">
        {data.map((el: RecentFile, idx: number) => (
          <Card key={idx} className="w-70 h-70 flex flex-col items-center justify-start space-y-4">
            <div className="m-2">
              <Typography as="p" type="body">
                {el.File.name}
              </Typography>
            </div>
            <div className="max-h-60 w-full">
              <Image
                src={distUrl + el.File.s3_key}
                alt=""
                width={100}
                height={100}
                className="object-center w-full h-full rounded-b-xl"
              />
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Page;
