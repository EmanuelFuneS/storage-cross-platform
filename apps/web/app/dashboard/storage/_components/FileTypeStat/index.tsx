import React from "react";
import { Card, Typography } from "@workspace/ui/components";
import { FileStatType } from "@/lib/types/common";
import FileHelper from "@/lib/utils/FileHelper";

import { barColorsTail } from "@/lib/types/common";

interface FileTypeStatProps {
  data: FileStatType[] | undefined;
}

const FileTypeStat = ({ data }: FileTypeStatProps) => {
  if (!data) return <>...Loading</>;
  return (
    <div className="h-full flex  space-x-5">
      {data.length &&
        data.map((stat, idx: number) => (
          <Card
            scale={false}
            className="max-w-26 p-3 flex justify-center items-center"
          >
            <div className="flex items-center space-x-2">
              <div
                className={`${barColorsTail[idx]} w-2.5 h-2.5 rounded-full`}
              ></div>
              <Typography
                as="p"
                type="body"
                className="flex items-center justify-start  capitalize"
              >
                {stat.typeName.endsWith("s")
                  ? stat.typeName
                  : stat.typeName + "s"}
              </Typography>
            </div>
            <Typography as="p" type="body" className="font-bold">
              {FileHelper.formatSize(stat.totalSize)}
            </Typography>
            <Typography as="p" type="body">
              {stat.count} files
            </Typography>
          </Card>
        ))}
    </div>
  );
};

export default FileTypeStat;
