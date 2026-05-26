import React from "react";
import dynamic from "next/dynamic";
import { Card, Typography } from "@workspace/ui/components";
import {
  ArchiveRestore,
  EllipsisVertical,
  Star,
  Trash2,
} from "@workspace/ui/lib";
import { File } from "@/lib/types/schema.db";
import useRestoreFile from "@/lib/hooks/useRestoreFile";
import useHardDeleteFile from "@/lib/hooks/useHardDeleteFile";
import FileHelper from "@/lib/utils/FileHelper";

const FilePreview = dynamic(
  () =>
    import("@/app/dashboard/_components/FileDetails").then(
      (mod) => mod.FilePreview,
    ),
  { ssr: false },
);

export interface FileCardProps {
  data: File;
  option?: boolean;
}
const distUrl = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/`;

const FilesCard = ({ data, option }: FileCardProps) => {
  const isVideo = data?.type?.name === "video";
  const { mutateAsync: restoreFile } = useRestoreFile(data.id!);
  const { mutate: hardDelete, isPending } = useHardDeleteFile();

  const handleRestore = async () => {
    try {
      await restoreFile();
    } catch (error) {
      console.error(error);
    }
  };

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
    <div
      className={`relative h-80 rounded-xl overflow-hidden flex flex-col items-center justify-start ${isVideo ? "w-[31rem]" : "w-60"}`}
    >
      <div className="p-1 flex w-full items-center justify-between">
        <div
          className={`absolute top-5 left-3 z-50 ${option && "flex justify-between w-18"}`}
        >
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
      <div className="h-auto w-full">
        {distUrl && (
          <FilePreview type={data?.type?.name} file={data} compact={true} />
        )}

        {data.type.name !== "audio" ? (
          <div className="absolute bottom-0 left-0 z-50 pointer-events-none text-elevated bg-transparent  text-xs lg:text-xl flex items-center justify-center w-full">
            <Typography as="span" type="body">
              {data.name.slice(0, 15)} . . .{" "}
              {FileHelper.formatSize(Number(data.size))}
            </Typography>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FilesCard;
