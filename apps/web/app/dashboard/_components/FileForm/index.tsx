"use client";
import { fileSchema, ICreateFileForm } from "@/lib/schema/file.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "@workspace/ui/components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileMinus, FileType } from "@workspace/ui/lib";
import useCreateFile from "@/lib/hooks/useCreateFile";
import { IResponseApi } from "@/lib/types/common";
import { useTypeStore } from "@/lib/stores";

interface FileFormProps {
  parentId: string;
  onClose: () => void;
}

interface Response {
  success: boolean;
  url?: string;
  s3Key?: string;
  downloadUrl?: string;
  deleted?: boolean;
}

console.log("URL", process.env.NEXT_PUBLIC_PRESIGNED_URL);

const FileForm = ({ parentId, onClose }: FileFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [typeName, setTypeName] = useState<string | null>(null);

  const { isInitialized, types } = useTypeStore();

  const typeId = useMemo(() => {
    const found = types.find((type) => type.name === typeName);
    return found?.id ?? null;
  }, [typeName, types]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<ICreateFileForm>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      folderId: parentId,
      typeId: "",
      name: "",
      size: 0,
      s3_key: "",
    },
  });

  const { mutateAsync } = useCreateFile();

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      maxFiles: 1,
      multiple: false,
      onDrop: async (files: File[]) => {
        const file = files[0];
        if (file) {
          const { name, type: fileType, size } = file;
          const [type, subType] = fileType.split("/");
          console.log(type);

          if (type) setTypeName(type);

          setSelectedFile(file);
          setValue("name", name);
          setValue("size", size);
        }
      },
    });
  console.log(typeId);

  const onSubmit: SubmitHandler<ICreateFileForm> = async (data) => {
    console.log("Form Data:", data);
    try {
      let presignedUrl;
      let s3_Key;
      if (selectedFile) {
        const response = await fetch(`/api/s3`, {
          method: "POST",
          body: JSON.stringify({
            action: "upload",
            fileName: selectedFile.name,
            fileType: selectedFile.type,
          }),
        }).then((r) => r.json());

        const { url, s3Key: key } = await response;
        console.log(url, key);

        presignedUrl = url;
        s3_Key = key;
      }
      console.log("presignedUrl", presignedUrl);
      const result: IResponseApi = await mutateAsync({
        ...data,
        typeId: typeId!,
        s3_key: s3_Key,
      });
      if (presignedUrl && result.ok) {
        const uploadFile = await fetch(presignedUrl, {
          method: "PUT",
          body: selectedFile,
          headers: {
            "Content-Type": selectedFile!.type,
          },
        });
        console.log(uploadFile);
        if (uploadFile.ok) {
          onClose();
        }
      }
    } catch (error) {
      console.error("File Creation Failed", error);
    }
  };

  console.log(getValues());

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-10 gap-4 my-5 py-5"
    >
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}`}
      >
        <input className="h-full w-full" {...getInputProps()} />
        {isDragActive ? (
          <p>Drop one file here</p>
        ) : (
          <p>drag one file o select file</p>
        )}
      </div>

      {acceptedFiles.length > 0 && (
        <ul>
          {acceptedFiles.map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
      )}

      <p>{parentId}</p>
      <Button type="submit" className="w-full">
        Create
      </Button>
    </form>
  );
};

export default FileForm;
