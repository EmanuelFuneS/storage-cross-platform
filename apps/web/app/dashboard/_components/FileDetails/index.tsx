"use client";
import useGetFileById from "@/lib/hooks/useGetFileById";
import { Button, Typography } from "@workspace/ui/components";
import React from "react";
import { deleteFile, downloadFile } from "@/lib/utils/FileUtils";
import FileHelper from "@/lib/utils/FileHelper";

interface FileDetailProps {
  id: string;
  onClose: () => void;
}

const FileDetail = ({ id, onClose }: FileDetailProps) => {
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
        <Button
          scale={true}
          variant="danger"
          onClick={async () => {
            const response = await deleteFile(data.s3_key);
            if (typeof response === "boolean" && response) {
              onClose();
            }
          }}
        >
          Delete
        </Button>
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
          Size: {FileHelper.formatSize(Number(data.size), "KB")}
        </Typography>
      </div>
      <div className="flex justify-between ">
        <Button
          scale={true}
          className="w-full"
          onClick={async () => {
            const response = await downloadFile(data.s3_key);
            if (typeof response === "string" && response) {
              window.open(response, "_blank");
            }
            onClose();
          }}
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default FileDetail;
