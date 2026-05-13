"use client";
import useStorageStatus from "@/lib/hooks/useStorageStatus";
import FileHelper from "@/lib/utils/FileHelper";
import { Button, Card, Typography } from "@workspace/ui/components";
import React, { useMemo } from "react";
import StorageStatBar from "./_components/StorageStatBar";
import FileTypeStat from "./_components/FileTypeStat";
import useStorageStats from "@/lib/hooks/useStorageStats";
import { StorageBar } from "@/lib/types/common";

const Page = () => {
  const { data: storage } = useStorageStatus();

  const { data } = useStorageStats();

  const statBar: StorageBar = useMemo(() => {
    return {
      capacity: storage?.capacity ?? 0,
      usedPerTypes: (data?.fileStats ?? []).map((el) => ({
        type: el.typeName,
        size: el.totalSize,
      })),
    };
  }, [storage, data]);

  if (!storage) return <>...Loading</>;
  return (
    <div className="w-full h-full">
      <div className="my-10">
        <Typography as="h1" type="headline">
          Storage Usage
        </Typography>
        <Typography as="p" type="body">
          You've used {FileHelper.formatSize(storage.used)} of your total
          capacity. Consider refining your collection or upgrade your plan.
        </Typography>
      </div>
      <div className="my-10 w-full h-auto flex flex-col lg:flex-row  space-x-5 space-y-5">
        <Card scale={false} className="w-full h-60">
          <div className="p-4">
            <Typography as="p" type="title">
              Total Capacity
            </Typography>

            <Typography as="p" type="headline">
              {FileHelper.formatSize(storage.used)}/
              {FileHelper.formatSize(storage.capacity)}
            </Typography>
          </div>
          <div className="h-[30%] px-4">
            <StorageStatBar data={statBar!} />
          </div>
          <div className="h-[60%] p-4">
            <FileTypeStat data={data?.fileStats} />
          </div>
        </Card>
        <Card
          scale={false}
          className="w-full lg:w-1/3 h-45 lg:h-75 space-y-10 flex justify-center p-4"
        >
          <div className="h-[60%] space-y-4">
            <Typography as="p" type="headline">
              Elevate Your Plan
            </Typography>
            <Typography as="p" type="body">
              Unlock more cloud storage, and features.
            </Typography>
          </div>
          <Button className="w-full">Upgrade Plan</Button>
        </Card>
      </div>
      {/* <div className="my-10">
        <Card scale={false} className="w-full h-80">
          table
        </Card>
      </div> */}
    </div>
  );
};

export default Page;
