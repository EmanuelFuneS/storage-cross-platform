"use client";
import useGetFolders from "@/lib/hooks/useGetFolders";
import { File, Folder } from "@/lib/types/schema.db";
import { Typography, Button, Modal, Card } from "@workspace/ui/components";
import { FolderIcon } from "@workspace/ui/lib";
import Link from "next/link";
import React, { useState } from "react";
import FileForm from "../FileForm";
import FolderForm from "../FolderForm";
import useGetFilesByFolder from "@/lib/hooks/useGetFilesByFolder";
import FileCard from "../FileCard";
import FolderCard from "../FolderCard";

const typeFiles = ["All Files", "Images", "Documents", "Videos", "Audio"];

const FilesPage = () => {
  const searchParams = new URLSearchParams();
  const parentId = searchParams.get("parent") || null;

  const [depthNavigation, setDepthNavigation] = useState<
    {
      name: string;
      id: string | undefined;
    }[]
  >([
    {
      name: "Root",
      id: undefined,
    },
  ]);

  const [isModalFolderOpen, setIsModalFolderOpen] = useState(false);
  const [isModalFileOpen, setIsModalFileOpen] = useState(false);
  const [isModalFileOptionsOpen, setIsModalFileOptionsOpen] = useState(false);

  const { data } = useGetFolders();
  const { data: files } = useGetFilesByFolder();

  const removeNavigation = (link: { name: string; id: string | undefined }) => {
    setDepthNavigation((prev) => {
      const index = prev.findIndex((item) => item.id === link.id);
      return prev.slice(0, index + 1);
    });
  };

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
        <div className="w-40 lg:w-100 h-full flex flex-col lg:flex-row items-center gap-4">
          <Button
            className="w-full lg:h-10 px-1"
            onClick={() => setIsModalFolderOpen(true)}
          >
            New Folder
          </Button>
          <Button
            className="w-full lg:h-10"
            onClick={() => setIsModalFileOpen(true)}
          >
            New File
          </Button>
          <Modal
            isOpen={isModalFileOpen}
            onClose={() => setIsModalFileOpen(false)}
          >
            <FileForm
              parentId={parentId || ""}
              onClose={() => setIsModalFileOpen(false)}
            />
          </Modal>
          <Modal
            isOpen={isModalFolderOpen}
            onClose={() => setIsModalFolderOpen(false)}
          >
            <h1>Folder Form</h1>
            <FolderForm
              parentId={parentId || ""}
              onClose={() => setIsModalFolderOpen(false)}
            />
          </Modal>
        </div>
      </div>
      <div className="w-full lg:w-2/3 my-5 flex items-center justify-between">
        {typeFiles.map((type, idx: number) => (
          <Card key={idx} scale={false} className="p-2">
            {type}
          </Card>
        ))}
      </div>
      <div className="my-5 w-full h-170">
        <Card
          scale={false}
          className="flex flex-col justify-start w-full h-full"
        >
          <Modal
            isOpen={isModalFileOptionsOpen}
            onClose={() => setIsModalFileOptionsOpen(false)}
          >
            <h1>file options</h1>
          </Modal>
          <div className="flex m-4">
            {depthNavigation &&
              depthNavigation.map((link, idx) => (
                <Link
                  key={idx}
                  className="text-foreground mx-1"
                  href={
                    typeof link.id !== "undefined"
                      ? `/dashboard?parent=${link.id}`
                      : "/dashboard"
                  }
                  onClick={() => removeNavigation(link)}
                >
                  <p>
                    {link.name}
                    {" -> "}
                  </p>
                </Link>
              ))}
          </div>
          <div className="p-5 grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2">
            {data?.map((folder: Folder, idx: number) => (
              <FolderCard
                key={idx}
                folder={folder}
                setDepth={() =>
                  setDepthNavigation((prev) => [
                    ...prev,
                    {
                      name: folder.name!,
                      id: folder.id!,
                    },
                  ])
                }
              />
            ))}

            {files ? (
              files?.data.map((file: File, idx: number) => (
                <FileCard
                  key={idx}
                  data={file}
                  modal={() => setIsModalFileOptionsOpen(true)}
                />
              ))
            ) : (
              <p>Load files</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FilesPage;
