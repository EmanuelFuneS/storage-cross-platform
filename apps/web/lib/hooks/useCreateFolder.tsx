import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateFolderForm } from "../schema/folder.schema";

const useCreateFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create", "folder"],
    mutationFn: async (data: ICreateFolderForm) => {
      const res = await fetch("/api/folders", {
        method: "POST",
        headers: {
          "Content-type": "apllication/json",
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
};

export default useCreateFolder;
