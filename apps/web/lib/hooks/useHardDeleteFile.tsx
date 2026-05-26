import { useMutation, useQueryClient } from "@tanstack/react-query";

interface HardDeleteParams {
  s3Key: string;
  fileId: string;
}

const useHardDeleteFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["hard", "delete"],
    mutationFn: async ({
      s3Key,
      fileId,
    }: HardDeleteParams): Promise<boolean> => {
      const s3Res = await fetch(`/api/s3`, {
        method: "POST",
        body: JSON.stringify({
          action: "delete",
          s3Key: s3Key,
        }),
      });
      const s3Data = await s3Res.json();

      if (!s3Data.deleted && !s3Data.success) {
        throw new Error(s3Data.message || "Failed to delete from s3");
      }

      const apiRes = await fetch(`/api/files/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileId: fileId }),
      });
      const apiData = await apiRes.json();

      if (!apiRes.ok || !apiData.ok) {
        throw new Error(apiData.message || "Failed to delete from api");
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["deleted"]})
    },
  });
};

export default useHardDeleteFile;
