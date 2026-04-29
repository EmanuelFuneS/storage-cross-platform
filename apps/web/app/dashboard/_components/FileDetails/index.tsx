"use client";
import useGetFileById from "@/lib/hooks/useGetFileById";
import { Button, Typography } from "@workspace/ui/components";
import React from "react";

interface FileDetailProps {
  id: string;
}

const FileDetail = ({ id }: FileDetailProps) => {
  const { data } = useGetFileById({ id });

  if (!data)
    return (
      <div className="w-60 h-60 flex items-center justify-center">
        <Typography as="p" type="title">
          ...Loading
        </Typography>
      </div>
    );

  return (
    <div className="w-auto my-5 space-y-4 capitalize">
      <div className="">
        <Button scale={true} variant="danger">Delete</Button>
        {/* Soft Delete */}
      </div>
      <Typography as="h1" type="title">
        {data.name}
      </Typography>
      <div className="w-full min-h-55 bg-orange-50">image</div>
      <div className="py-4 space-y-4">
        <Typography as="p" type="body">
          Type: {data.type.name}
        </Typography>
        <Typography as="p" type="body">
          Size: {data.size}
        </Typography>
      </div>
      <div className="flex justify-between ">
        <Button scale={true} className="w-full">Download</Button>
      </div>
    </div>
  );
};

export default FileDetail;
