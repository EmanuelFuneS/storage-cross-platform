import React from "react";
import { useQuery } from "@tanstack/react-query";

export interface UseGetPlanByNameProps {
  name: string;
}

const useGetPlanIdByName = ({ name }: UseGetPlanByNameProps) => {
  return useQuery({
    queryKey: ["plansByName", name],
    queryFn: async () => {
      //fetch("/api/plan?plan=basic"))
      const res = await fetch(`/api/plan?plan=${encodeURIComponent(name)}`, {
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

export default useGetPlanIdByName;
