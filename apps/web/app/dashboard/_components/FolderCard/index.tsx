import { Folder } from "@/lib/types/schema.db";
import { Typography } from "@workspace/ui/components";
import { FolderIcon } from "@workspace/ui/lib";
import Link from "next/link";
import React from "react";

interface FolderCardProps {
  folder: Folder;
  setDepth: () => void;
}

const FolderCard = ({ folder, setDepth }: FolderCardProps) => {
  return (
    <Link
      href={`/dashboard?parent=${folder.id}`}
      onClick={() => folder && setDepth()}
    >
      <div className="bg-card-nested flex flex-col items-start h-30 w-30 p-4 text-foreground rounded-2xl">
        <FolderIcon size={70} />
        <Typography as="p" type="body">
          {folder.name}
        </Typography>
      </div>
    </Link>
  );
};

export default FolderCard;
