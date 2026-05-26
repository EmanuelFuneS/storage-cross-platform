"use client";
import dynamic from "next/dynamic";
import useGetContents from "@/lib/hooks/useGetContents";
import { File, Folder } from "@/lib/types/schema.db";
import { Typography, Button, Modal, Card } from "@workspace/ui/components";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import FileForm from "../FileForm";
import FolderForm from "../FolderForm";
import FilterFiles from "../FilterFiles";
import FileCard from "../FileCard";
import FolderCard from "../FolderCard";
import { useTypeStore } from "@/lib/stores";

const FileDetail = dynamic(() => import("../FileDetails"), { ssr: false });

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
  const defaultFilter = { maxSize: 0, minSize: 0, type: "" };

  const [filter, setFilter] = useState(defaultFilter);
  const [appliedFilter, setAppliedFilter] = useState(defaultFilter);

  const [isModalFolderOpen, setIsModalFolderOpen] = useState(false);
  const [isModalFileOpen, setIsModalFileOpen] = useState(false);
  const [isModalFileDetailOpen, setIsModalFileDetailOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const { data } = useGetContents();
  const { types } = useTypeStore();

  const files = data?.files ?? [];

  const filteredFiles = React.useMemo(() => {
    if (!files.length) return [];
    return files.filter((file: File) => {
      if (appliedFilter.type) {
        const typeName = types.find((t) => t.id === file.typeId)?.name;
        if (typeName !== appliedFilter.type) return false;
      }
      const fileSize = Number(file.size);
      if (appliedFilter.minSize > 0 && fileSize < appliedFilter.minSize * 1024)
        return false;
      if (appliedFilter.maxSize > 0 && fileSize > appliedFilter.maxSize * 1024)
        return false;
      return true;
    });
  }, [files, appliedFilter, types]);

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
      <FilterFiles
        filter={filter}
        onFilterChange={(f) => setFilter(f)}
        onApply={() => setAppliedFilter({ ...filter })}
        onClear={() => {
          setFilter(defaultFilter);
          setAppliedFilter(defaultFilter);
        }}
        types={types || []}
      />
      <div className="my-5 w-full h-145">
        <Card
          scale={false}
          className="flex flex-col justify-start w-full h-auto md:h-full"
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
            {data?.folders?.map((folder: Folder, idx: number) => (
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

            {data ? (
              filteredFiles.length > 0 ? (
                filteredFiles.map((file: File, idx: number) => (
                  <FileCard key={idx} data={file} modal={openDetails} />
                ))
              ) : (
                <p className="text-secondary text-sm col-span-full text-center py-10">
                  No files match the current filters.
                </p>
              )
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
