import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const useGetFilesByFolder = () => {
  const searchParams = useSearchParams();
  const parentId = searchParams.get("parent") as string;
  return useQuery({
    queryKey: ["files", parentId],
    queryFn: async () => {
      let param;
      if (parentId !== null) {
        param = `/parent/${encodeURIComponent(parentId)}`;
      } else {
        param = "/parent/root";
      }

      const res = await fetch(`/api/files${param}`, {
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

export default useGetFilesByFolder;
