import React from "react";
import { Card, Typography } from "@workspace/ui/components";
import {
  ArchiveRestore,
  EllipsisVertical,
  Star,
  Trash2,
} from "@workspace/ui/lib";
import { File } from "@/lib/types/schema.db";
import Image from "next/image";
import useRestoreFile from "@/lib/hooks/useRestoreFile";
import useHardDeleteFile from "@/lib/hooks/useHardDeleteFile";
import { FilePreview } from "@/app/dashboard/_components/FileDetails";

export interface FileCardProps {
  data: File;
  option?: boolean;
}
const distUrl = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/`;

const FilesCard = ({ data, option }: FileCardProps) => {
  const { mutateAsync: restoreFile } = useRestoreFile(data.id!);
  const { mutate: hardDelete, isPending } = useHardDeleteFile();

  const handleRestore = async () => {
    try {
      await restoreFile();
    } catch (error) {
      console.error(error);
    }
  };

  console.log(data.type);

  const handleDelete = async () => {
    try {
      if (!data) throw new Error("Data is undefined");

      const { s3_key, id } = data;
      if (s3_key && id) {
        await hardDelete({ s3Key: s3_key, fileId: id });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-70 h-70 flex flex-col items-center justify-start space-y-4 p-2">
      <div className="p-3 flex w-full items-center justify-between">
        <Typography as="p" type="body" className="capitalize">
          {data.name.slice(0, 18)}...
        </Typography>
        <div className={`${option && "flex justify-between w-18"}`}>
          <Star
            size={20}
            className={`${data.is_starred ? "text-yellow-300" : ""}`}
          />
          {option && (
            <>
              <ArchiveRestore size={20} onClick={handleRestore} />
              <Trash2 size={20} onClick={handleDelete} />
            </>
          )}
        </div>
      </div>
      <div className="max-h-60 w-full overflow-auto p-4">
        {distUrl && <FilePreview type={data?.type?.name} file={data} />}
      </div>
    </Card>
  );
};

export default FilesCard;
