import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

interface UseGetFileByIdProps {
  id: string;
}

const useGetFileById = ({ id }: UseGetFileByIdProps) => {
  return useQuery({
    queryKey: ["file", id],
    queryFn: async () => {
      const res = await fetch(`/api/files/${encodeURIComponent(id)}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }).then((r) => r.json());

      return res;
    },
  });
};

export default useGetFileById;
