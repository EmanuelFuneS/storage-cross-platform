import React from "react";
import { Card, Typography } from "@workspace/ui/components";
import { Star } from "@workspace/ui/lib";
import { File } from "@/lib/types/schema.db";
import Image from "next/image";

export interface FileCardProps {
  data: File;
}
const distUrl = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/`;

const FilesCard = ({ data }: FileCardProps) => {
  return (
    <Card className="w-70 h-70 flex flex-col items-center justify-start space-y-4">
      <div className="p-3 flex w-full items-center justify-between">
        <Typography as="p" type="body" className="capitalize">
          {data.name}
        </Typography>
        <Star
          size={20}
          className={`${data.is_starred ? "text-yellow-300" : ""}`}
        />
      </div>
      <div className="max-h-60 w-full">
        <Image
          src={distUrl + data.s3_key}
          alt=""
          width={100}
          height={100}
          className="object-center w-full h-full rounded-b-xl"
        />
      </div>
    </Card>
  );
};

export default FilesCard;
