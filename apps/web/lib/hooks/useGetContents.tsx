import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface ContentsResponse {
  folders: any[];
  files: any[];
}

const useGetContents = () => {
  const searchParams = useSearchParams();
  const parentId = searchParams.get("parent");

  return useQuery<ContentsResponse>({
    queryKey: ["contents", parentId],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (parentId) params.set("parent", parentId);

      const res = await fetch(`/api/contents?${params.toString()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      return res.json();
    },
  });
};

export default useGetContents;
