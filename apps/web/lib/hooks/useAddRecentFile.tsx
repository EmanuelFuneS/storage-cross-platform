import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddRecentFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["recentFile"],
    mutationFn: async (data: { fileId: string }) => {
      const res = await fetch("/api/recents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((r) => r.json());
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recentsFiles"] });
    },
  });
};

export default useAddRecentFile;
