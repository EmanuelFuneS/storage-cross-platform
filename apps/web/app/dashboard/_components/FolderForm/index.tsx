import useCreateFolder from "@/lib/hooks/useCreateFolder";
import {
  createFolderSchema,
  folderSchema,
  ICreateFolderForm,
} from "@/lib/schema/folder.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Input } from "@workspace/ui/components";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FolderFormProps {
  parentId: string;
  onClose: () => void;
}

const FolderForm = ({ parentId, onClose }: FolderFormProps) => {
  const { mutate } = useCreateFolder();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ICreateFolderForm>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      name: "",
      parentId: parentId,
    },
  });

  const onSubmit: SubmitHandler<ICreateFolderForm> = async (data) => {
    try {
      await mutate(data);
      onClose();
    } catch (error) {
      console.error("Folder Creation Failed", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-10 gap-4 my-5 py-5"
    >
      <Input<ICreateFolderForm>
        register={register}
        errors={errors}
        name="name"
        label="name"
      />
      <Button type="submit" className="w-full">
        Create
      </Button>
    </form>
  );
};

export default FolderForm;
