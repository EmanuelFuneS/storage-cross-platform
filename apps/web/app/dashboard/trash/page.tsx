"use client";
import React from "react";
import { Button, Card, Typography } from "@workspace/ui/components";
import { Trash } from "@workspace/ui/lib";
import { File } from "@/lib/types/schema.db";
import Image from "next/image";
import useGetDeletedFiles from "@/lib/hooks/useGetDeletedFiles";

const distUrl = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/`;

//here delete file in s3

//here handle restore file

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
          <Card
            key={idx}
            className="w-70 h-70 flex flex-col items-center justify-start space-y-4"
          >
            <div className="m-2">
              <Typography as="p" type="body">
                {el.name}
              </Typography>
            </div>
            <div className="max-h-60 w-full">
               <Image
                src={distUrl + el.s3_key}
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
