import { useQuery } from "@tanstack/react-query";
import { UserStorage } from "../types/schema.db";

const useStorageStatus = () => {
  return useQuery({
    queryKey: ["user", "storage"],
    queryFn: async (): Promise<UserStorage> => {
      const res = await fetch("/api/storage", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      return result.data;
    },
  });
};

export default useStorageStatus;
