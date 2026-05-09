import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRestoreFile = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["restore", "files", id],
    mutationFn: async () => {
      const res = await fetch(`/api/files/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "applicaction/json",
        },
      }).then((res) => res.json());

      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });
};

export default useRestoreFile;
