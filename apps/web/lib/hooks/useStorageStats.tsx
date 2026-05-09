import { useQuery } from "@tanstack/react-query";
import { StatsReponse } from "../types/common";

const useStorageStats = () => {
  return useQuery({
    queryKey: ["files", "storage", "stats"],
    queryFn: async (): Promise<StatsReponse> => {
      const res = await fetch(`/api/storage/stats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      return res;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export default useStorageStats;
