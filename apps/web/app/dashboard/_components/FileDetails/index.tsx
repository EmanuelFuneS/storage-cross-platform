"use client";
import useGetFileById from "@/lib/hooks/useGetFileById";
import { Button, Typography } from "@workspace/ui/components";
import React, { useEffect } from "react";
import { deleteFile, downloadFile } from "@/lib/utils/FileUtils";
import FileHelper from "@/lib/utils/FileHelper";
import Image from "next/image";
import globalEnv from "@repo/env";
import useDeleteFile from "@/lib/hooks/useDeleteFile";
import useAddRecentFile from "@/lib/hooks/useAddRecentFile";

interface FileDetailProps {
  id: string;
  onClose: () => void;
}

const distUrl = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/`;

const FileDetail = ({ id, onClose }: FileDetailProps) => {
  const { data } = useGetFileById({ id });
  const { mutateAsync } = useDeleteFile();

  const { mutateAsync: addHistory } = useAddRecentFile();

  useEffect(() => {
    const history = async () => {
      await addHistory({ fileId: id });
    };

    if (id) {
      history();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await mutateAsync(id);

      if (res.ok) {
        onClose();
      }
    } catch (error) {
      console.error("Error in Delete Action", error);
    }
  };

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
        <Button scale={true} variant="danger" onClick={handleDelete}>
          Delete
        </Button>
        {/* Soft Delete */}
      </div>
      <Typography as="h1" type="title">
        {data.name}
      </Typography>
      <div className="w-full min-h-55 bg-orange-50">
        {distUrl && (
          <Image
            src={distUrl + data.s3_key}
            alt={`${data.name} Image`}
            width={100}
            height={100}
            className="object-contain w-full h-full"
          />
        )}
      </div>
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
