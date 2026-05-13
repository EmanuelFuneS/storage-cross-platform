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
    <div className="h-full flex flex-row-reverse justify-end">
      {data.length &&
        data.map((stat, idx: number) => (
          <Card
            scale={false}
            className="max-w-26 px-5 py-4 flex justify-center items-center mx-3 relative"
          >
            <div className="flex items-center text-start space-x-1 w-full relative">
              <div
                className={`${barColorsTail[idx]} w-2.5 h-2.5 absolute left-[-12] rounded-full`}
              ></div>
              <Typography as="p" type="body" className="capitalize">
                {stat.typeName.endsWith("s")
                  ? stat.typeName
                  : stat.typeName + "s"}
              </Typography>
            </div>
            <Typography as="p" type="body" className="font-bold w-full">
              {FileHelper.formatSize(stat.totalSize)}
            </Typography>
            <Typography as="p" type="body" className="w-full ">
              {stat.count} files
            </Typography>
          </Card>
        ))}
    </div>
  );
};

export default FileTypeStat;
