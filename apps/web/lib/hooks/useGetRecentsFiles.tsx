import { useQuery } from "@tanstack/react-query";

const useGetRecentsFiles = () => {
  return useQuery({
    queryKey: ["recentsFiles"],
    queryFn: async () => {
      const res = await fetch("/api/recents", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }).then((res) => res.json());

      return res.data;
    },
  });
};

export default useGetRecentsFiles;
