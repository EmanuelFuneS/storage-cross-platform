import { Typography } from "@workspace/ui/components";
import React from "react";

type Props = {};

const FileTypeStat = (props: Props) => {
  return (
    <div>
      <Typography as="p" type="body">
        type name
      </Typography>
      <Typography as="p" type="body">
        count size total of files
      </Typography>
      <Typography as="p" type="body">
        count files
      </Typography>
    </div>
  );
};

export default FileTypeStat;
