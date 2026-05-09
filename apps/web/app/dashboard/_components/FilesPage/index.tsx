"use client";
import useGetFolders from "@/lib/hooks/useGetFolders";
import { File, Folder, Type } from "@/lib/types/schema.db";
import { Typography, Button, Modal, Card } from "@workspace/ui/components";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import FileForm from "../FileForm";
import FolderForm from "../FolderForm";
import useGetFilesByFolder from "@/lib/hooks/useGetFilesByFolder";
import FileCard from "../FileCard";
import FolderCard from "../FolderCard";
import { useTypeStore } from "@/lib/stores";
import FileDetail from "../FileDetails";

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
  //Filters
  const [filer, setFilter] = useState<{
    maxSize: number;
    minSize: number;
    type: string;

    //subtype: string
  }>({
    maxSize: 0,
    minSize: 0,
    type: "",
    //subtype: "",
  });

  const [isModalFolderOpen, setIsModalFolderOpen] = useState(false);
  const [isModalFileOpen, setIsModalFileOpen] = useState(false);
  const [isModalFileDetailOpen, setIsModalFileDetailOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const { data } = useGetFolders();
  const { data: files } = useGetFilesByFolder();
  const { types } = useTypeStore();

  const removeNavigation = (link: { name: string; id: string | undefined }) => {
    setDepthNavigation((prev) => {
      const index = prev.findIndex((item) => item.id === link.id);
      return prev.slice(0, index + 1);
    });
  };

  // Abrir modal con un archivo específico
  const openDetails = (fileId: string) => {
    setSelectedFileId(fileId);
    setIsModalFileDetailOpen(true);
  };

  // Cerrar modal y limpiar selección
  const closeDetails = useCallback(() => {
    setIsModalFileDetailOpen(false);
    // Limpiar después de que la animación de cierre termine (opcional)
    setTimeout(() => setSelectedFileId(null), 300);
  }, []);

  console.log(selectedFileId);

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
            Add File
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
      <div className="flex flex-col">
        {/* Filter section */}
        {/* Search section */}
        <div className="flex space-x-4">
          <Typography as="p" type="body">
            Min Size
          </Typography>
          <Typography as="p" type="body">
            Max Size
          </Typography>
        </div>
        <div className="w-full my-5 flex flex-wrap gap-2">
          {types &&
            types.map((type: Type, idx: number) => (
              <Card key={idx} scale={true} className="p-2 cursor-pointer">
                <Typography as="p" type="body" className="capitalize">
                  {type.name}
                </Typography>
              </Card>
            ))}
        </div>
      </div>
      <div className="my-5 w-full h-155">
        <Card
          scale={false}
          className="flex flex-col justify-start w-full h-full"
        >
          <Modal isOpen={isModalFileDetailOpen} onClose={closeDetails}>
            {selectedFileId && (
              <FileDetail id={selectedFileId} onClose={closeDetails} />
            )}
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
              files.data.map((file: File, idx: number) => {
                return <FileCard key={idx} data={file} modal={openDetails} />;
              })
            ) : (
              <p>...Loading Files</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FilesPage;
