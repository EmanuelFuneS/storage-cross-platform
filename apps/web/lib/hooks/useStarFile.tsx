import { useMutation, useQueryClient } from "@tanstack/react-query";

const useStarFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["starFile"],
    mutationFn: async (data: { fileId: string; value: boolean }) => {
      const res = await fetch(`/api/files/starred`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());

      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });
};

export default useStarFile;
