import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateFileForm } from "../schema/file.schema";
import { IResponseApi } from "../types/common";

const useCreateFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create", "file"],
    mutationFn: async (data: ICreateFileForm): Promise<IResponseApi> => {
      const res = await fetch("/api/files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((r) => r.json());
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files", "userStorage"] });
    },
  });
};

export default useCreateFile;
