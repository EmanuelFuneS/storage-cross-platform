"use client";
import useGetFileById from "@/lib/hooks/useGetFileById";
import { Button, Typography } from "@workspace/ui/components";
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
    <div className="min-w-60 my-5 space-y-4 capitalize">
      <div className="w-full  flex items-center justify-between">
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

        <Star
          onClick={handleStarred}
          size={35}
          className={`${data.is_starred ? "text-yellow-300 hover:text-foreground" : " hover:text-yellow-300"} cursor-pointer`}
        />
      </div>
      <Typography as="h1" type="title">
        {data.name}
      </Typography>
      <div className=" max-h-125">
        {distUrl && <FilePreview type={data?.type?.name} file={data} />}
      </div>
      <div className="py-4 space-y-4">
        <Typography as="p" type="body">
          Type: {data.type?.name}
        </Typography>
        <Typography as="p" type="body">
          Size: {FileHelper.formatSize(Number(data.size))}
        </Typography>
      </div>
      <div className="flex justify-between ">
        <Button
          scale={true}
          className="w-full"
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
      </div>
    </div>
  );
};

export const FilePreview = ({ type, file }: { type: string; file: File }) => {
  switch (type) {
    case "audio":
      const urlAudio = `${distUrl}${file.s3_key}`;
      return (
        <div className="">
          <audio controls style={{ width: "100%" }}>
            <source src={urlAudio} type={`audio/${file.extension}`} />
          </audio>
        </div>
      );

    case "video":
      const urlVideo = `${distUrl}${file.s3_key}`;
      return (
        <div className="w-full h-full flex justify-center items-center lg:max-w-125">
          <video
            controls
            style={{ width: "100%", maxHeight: "100%", height: "auto" }}
          >
            <source src={urlVideo} type={`video/${file.extension}`} />
          </video>
        </div>
      );

    case "document":
      return <DocumentFile subType={file.extension} file={file} />;

    case "image":
      return (
        distUrl && (
          <Image
            src={distUrl + file.s3_key}
            alt={`${file.name} Image`}
            width={100}
            height={100}
            className="object-contain w-full h-full"
          />
        )
      );

    default:
      return (
        <div className="w-full h-full flex justify-center items-end">
          <FileIcon size={180} />
        </div>
      );
  }
};

export const DocumentFile = ({
  subType,
  file,
}: {
  subType: string;
  file: File;
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
        return <PdfPreview url={pdfUrl} />;
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

  return <div className="file-preview-container">{renderContent()}</div>;
};

const PdfPreview = ({ url }: { url: string }) => {
  const [pageWidth, setPageWidth] = useState(200);

  useEffect(() => {
    const updateWidth = () => {
      const container = document.getElementById("pdf-container");
      if (container) {
        setPageWidth(Math.min(container.clientWidth - 32, 800));
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div id="pdf-container" className="w-full flex justify-center">
      <div className="w-full flex items-center max-h-65 md:max-h-125 shadow-lg rounded-md overflow-auto">
        <Document file={url}>
          <Page
            pageNumber={1}
            width={pageWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
};

export default FileDetail;
