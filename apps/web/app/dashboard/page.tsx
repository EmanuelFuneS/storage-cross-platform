import { Button, Card, Typography } from "@workspace/ui/components";
import React from "react";

const typeFiles = ["All Files", "Images", "Documents", "Videos", "Audio"];

const Page = () => {
  return (
    <div>
      <div className="my-10 flex justify-between">
        <div>
          <Typography as="h1" type="headline">
            My Files
          </Typography>
          <Typography as="p" type="body">
            Manage and organize your personal cloud storage efficiently.
          </Typography>
        </div>
        <div className="w-100 flex items-center gap-4">
          <Button className="w-full h-10">New Folder</Button>
          <Button className="w-full h-10">New File</Button>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-5">
        <Card className="w-full h-35 p-5">total storage</Card>
        <Card className="w-full h-35 p-5">File stored</Card>
        <Card className="w-full h-35 p-5">shared links</Card>
      </div>
      <div className="w-full lg:w-2/3 my-10 flex items-center justify-between">
        {typeFiles.map((type) => (
          <Card scale={false} className="p-2">
            {type}
          </Card>
        ))}
      </div>
      <div className="my-10 w-full h-110">
        <Card scale={false} className="w-full h-full p-5">
          Table
        </Card>
      </div>
    </div>
  );
};

export default Page;
