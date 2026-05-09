import React from "react";
import { useQuery } from "@tanstack/react-query";

const useGetTypes = () => {
  return useQuery({
    queryKey: ["types"],
    queryFn: async () => {
      const res = await fetch(`/api/types`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    },
  });
};

export default useGetTypes;
