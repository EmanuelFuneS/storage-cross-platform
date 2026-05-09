import { useMutation } from "@tanstack/react-query";

interface HardDeleteParams {
  s3Key: string;
  fileId: string;
}

const useHardDeleteFile = () => {
  return useMutation({
    mutationKey: ["hard", "delete"],
    mutationFn: async ({
      s3Key,
      fileId,
    }: HardDeleteParams): Promise<boolean> => {
      try {
        const s3Response: Promise<{ deleted: boolean; success: boolean }> =
          await fetch(`/api/s3`, {
            method: "POST",
            body: JSON.stringify({
              action: "delete",
              s3Key: s3Key,
            }),
          }).then((res) => res.json());

        const { deleted, success } = await s3Response;

        if (!deleted && !success) {
          throw new Error("Failed to delete from s3");
        }

        const apiResponse: Promise<{ ok: boolean }> = fetch(
          `/api/files/delete`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ fileId: fileId }),
          },
        ).then((res) => res.json());

        const { ok } = await apiResponse;

        if (!ok) {
          throw new Error(`Failed to delete from api`);
        }

        return true;
      } catch (error) {
        console.error("Error in hard Delete", error);
        throw error;
      }
    },
  });
};

export default useHardDeleteFile;
