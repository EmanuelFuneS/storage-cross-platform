"use client";
import useGetFileById from "@/lib/hooks/useGetFileById";
import { Button, Card, Typography } from "@workspace/ui/components";
import React, { useEffect, useState } from "react";
import { downloadFile } from "@/lib/utils/FileUtils";
import FileHelper from "@/lib/utils/FileHelper";
import Image from "next/image";
import useDeleteFile from "@/lib/hooks/useDeleteFile";
import useAddRecentFile from "@/lib/hooks/useAddRecentFile";
import { Star, File as FileIcon, Divide } from "@workspace/ui/lib";
import useStarFile from "@/lib/hooks/useStarFile";

import { Document, Page, pdfjs } from "react-pdf";
import Editor from "@monaco-editor/react";
import { File } from "@/lib/types/schema.db";

interface FileDetailProps {
  id: string;
  onClose: () => void;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const distUrl = `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/`;

const FileDetail = ({ id, onClose }: FileDetailProps) => {
  const { data } = useGetFileById({ id });
  const { mutateAsync } = useDeleteFile();

  const { mutateAsync: addHistory } = useAddRecentFile();
  const { mutateAsync: starFile } = useStarFile();

  const handleStarred = async () => {
    try {
      if (data && data.id) {
        await starFile({
          fileId: data.id,
          value: data.is_starred ? false : true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const history = async () => {
      await addHistory({ fileId: id });
    };

    if (id) {
      history();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await mutateAsync(id);

      if (res.ok) {
        onClose();
      }
    } catch (error) {
      console.error("Error in Delete Action", error);
    }
  };

  if (!data)
    return (
      <div className="w-60 h-60 flex items-center justify-center">
        <Typography as="p" type="title">
          ...Loading
        </Typography>
      </div>
    );

  return (
    <div className="min-w-100 my-5 space-y-4 capitalize">
      <Card
        scale={false}
        className="w-full p-3 flex flex-row items-center justify-between"
      >
        <Button
          scale={true}
          variant="danger"
          onClick={handleDelete}
          className="m-0"
        >
          <Typography as="p" type="body">
            Delete
          </Typography>
        </Button>
        <div className="mx-auto">
          <Star
            onClick={handleStarred}
            size={35}
            className={`${data.is_starred ? "text-yellow-300 hover:text-foreground" : " hover:text-yellow-300"} cursor-pointer`}
          />
        </div>
        <Button
          scale={true}
          className="m-0"
          onClick={async () => {
            const response = await downloadFile(data.s3_key);
            if (typeof response === "string" && response) {
              window.open(response, "_blank");
            }
            onClose();
          }}
        >
          <Typography as="p" type="body">
            Download
          </Typography>
        </Button>
      </Card>

      <div className="max-h-125">
        {distUrl && <FilePreview type={data?.type?.name} file={data} />}
      </div>
    </div>
  );
};

export const FilePreview = ({
  type,
  file,
  compact,
}: {
  type: string;
  file: File;
  compact?: boolean;
}) => {
  switch (type) {
    case "audio":
      const urlAudio = `${distUrl}${file.s3_key}`;
      return (
        <div className="min-w-60 flex items-center justify-center bg-black/30 rounded-xl py-10 px-2">
          <audio controlsList="nodownload" controls style={{ width: "100%" }}>
            <source src={urlAudio} type={`audio/${file.extension}`} />
          </audio>
        </div>
      );

    case "video":
      const urlVideo = `${distUrl}${file.s3_key}`;
      return (
        <div className="w-full h-80 bg-black/30 rounded-xl py-10 flex items-center justify-center lg:max-w-125 relative">
          <video
            controlsList="nodownload"
            controls
            style={{ width: "100%", maxHeight: "100%", height: "auto" }}
          >
            <source src={urlVideo} type={`video/${file.extension}`} />
          </video>
          <div className="absolute top-10 left-10 z-50 pointer-events-none  text-elevated text-2xl lg:text-xl">
            {file.name} . . . {FileHelper.formatSize(Number(file.size))}
          </div>
        </div>
      );

    case "document":
      return (
        <DocumentFile subType={file.extension} file={file} compact={compact} />
      );

    case "image":
      return (
        distUrl && (
          <div
            className={`relative flex flex-col items-center rounded-xl justify-center bg-black/30 ${compact ? "min-h-70 py-10 px-3" : "p-0"}`}
          >
            <div className="relative">
              <Image
                src={distUrl + file.s3_key}
                alt={`${file.name} Image`}
                width={100}
                height={100}
                className={`object-contain  ${compact ? "w-60 h-60" : "w-full min-h-100"}`}
              />
              <div className="absolute left-0 z-50 pointer-events-none text-elevated bg-black/50  text-xs lg:text-xl flex items-center justify-center w-full">
                <Typography as="span" type="body">
                  {file.name.slice(0, compact ? 7 : -4)} {" "}. . .{" "}
                  {FileHelper.formatSize(Number(file.size))}
                </Typography>
              </div>
            </div>
          </div>
        )
      );

    default:
      return (
        <div className="min-h-80 bg-black/30 rounded-xl p-4 flex items-center justify-center">
          <FileIcon size={190} />
        </div>
      );
  }
};

export const DocumentFile = ({
  subType,
  file,
  compact,
}: {
  subType: string;
  file: File;
  compact?: boolean;
}) => {
  const [content, setContent] = useState<{ type: string; data: File } | null>(
    null,
  );

  useEffect(() => {
    handleFileType(subType, file);
  }, []);

  const handleFileType = async (subType: string, file: any) => {
    switch (subType) {
      case "pdf":
        setContent({ type: "pdf", data: file });
        break;

      default:
        const text = await file.text();
        setContent({ type: "text", data: text });
    }
  };

  const renderContent = () => {
    if (!content) return <>...Loading</>;
    switch (content.type) {
      case "pdf":
        const pdfUrl = `${distUrl}${content.data.s3_key}`;
        if (compact) {
          return (
            <div className="w-full flex justify-center">
              <div className="w-full flex items-start min-h-60 max-h-60 max-w-60 shadow-lg rounded-xl overflow-hidden">
                <Document file={pdfUrl}>
                  <Page
                    pageNumber={1}
                    width={240}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              </div>
            </div>
          );
        }
        return (
          <div className="w-full flex justify-center">
            <Document file={pdfUrl}>
              <Page
                pageNumber={1}
                width={800}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        );
      default:
        const txtUrl = `${distUrl}${content.data.s3_key}`;
        return (
          <Editor
            height={"600px"}
            defaultLanguage="plaintext"
            value={txtUrl}
            options={{ readOnly: true }}
          />
        );
    }
  };

  return (
    <div className="file-preview-container z-50 bg-black/30 rounded-xl py-10 px-3">
      {renderContent()}
    </div>
  );
};

export default FileDetail;
