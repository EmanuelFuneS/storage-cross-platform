import React from "react";
import {
  File as FileIcon,
  FileImage,
  FileVideoCamera,
  FileText,
  FileVolume,
} from "@workspace/ui/lib";
import { Typography } from "@workspace/ui/components";
import { File } from "@/lib/types/schema.db";

interface FileCardProps {
  data: File;
  modal: () => void;
}

const FileCard = ({ data, modal }: FileCardProps) => {
  const [firstType, especificType] = data.type.split("/");
  const Icon = FileTypeRender(firstType || "");
  return (
    <div
      className="flex flex-col items-center justify-center w-30 h-30 rounded-2xl p-4 hover:scale-105  transform transition-transform duration-300 cursor-pointer"
      onClick={modal}
    >
      {Icon}
      <Typography as="p" type="body">
        {data.name.substring(0, 7)}-{especificType}
      </Typography>
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
