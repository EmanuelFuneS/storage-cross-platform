import { useQuery } from "@tanstack/react-query";

const useGetStarredFiles = () => {
  return useQuery({
    queryKey: ["starred", "files"],
    queryFn: async () => {
      const res = await fetch(`/api/files/starred`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      return res.data;
    },
  });
};

export default useGetStarredFiles;
