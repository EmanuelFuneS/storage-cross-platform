import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete", "file"],
    mutationFn: async (fileId: string) => {
      const res = await fetch(`/api/files/${encodeURIComponent(fileId)}`, {
        method: "DELETE",
      }).then((res) => res.json());

      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
    onError: (err) => {
      //alert(err);
    },
  });
};

export default useDeleteFile;
