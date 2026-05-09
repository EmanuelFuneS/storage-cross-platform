import React from "react";
import {
  File as FileIcon,
  FileImage,
  FileVideoCamera,
  FileText,
  FileVolume,
  Star,
} from "@workspace/ui/lib";
import { Typography } from "@workspace/ui/components";
import { File } from "@/lib/types/schema.db";
import { useTypeStore } from "@/lib/stores";
import useStarFile from "@/lib/hooks/useStarFile";

interface FileCardProps {
  data: File;
  modal: (fileId: string) => void;
  setId?: () => void;
}

const FileCard = ({ data, modal, setId }: FileCardProps) => {
  const { types } = useTypeStore();

  const typeName = types.find((type) => type.id === data.typeId)?.name;

  const Icon = FileTypeRender(typeName || "");

  if (!data) return <>...Loading</>;

  return (
    <div
      className="flex flex-col items-center justify-center w-30 h-30 rounded-2xl p-4 hover:scale-105  transform transition-transform duration-300 cursor-pointer"
      onClick={() => modal(data.id!)}
    >
      <div className="w-full flex justify-end">
        <Star
          size={15}
          className={`${data.is_starred ? "text-yellow-300" : ""}`}
        />
      </div>
      <div>
        {Icon}
        <Typography as="p" type="body">
          {data.name.substring(0, 9)}
        </Typography>
      </div>
    </div>
  );
};

function FileTypeRender(type: string) {
  switch (type) {
    case "image":
      return <FileImage size={70} />;
    case "video":
      return <FileVideoCamera size={70} />;
    case "audio":
      return <FileVolume size={70} />;
    case "document":
      return <FileText size={70} />;
    default:
      return <FileIcon size={70} />;
  }
}

export default FileCard;
