"use client";
import useGetFileById from "@/lib/hooks/useGetFileById";
import React from "react";

interface FileOptionModalProps {
  id: string;
}

const FileOptionModal = ({ id }: FileOptionModalProps) => {
  const { data } = useGetFileById({ id });
  return <div>FileOptionModal</div>;
};

export default FileOptionModal;
