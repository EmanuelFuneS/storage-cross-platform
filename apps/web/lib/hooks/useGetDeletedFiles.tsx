import { useQuery } from "@tanstack/react-query";

const useGetDeletedFiles = () => {
  return useQuery({
    queryKey: ["deletedFiles"],
    queryFn: async () => {
      const res = await fetch(`/api/files`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      return res.data;
    },
  });
};

export default useGetDeletedFiles;
