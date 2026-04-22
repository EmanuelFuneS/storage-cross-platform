import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface useGetFoldersProps {
  parentId: string | null;
}

const useGetFolders = () => {
  const searchParams = useSearchParams();
  const parentId = searchParams.get("parent") as string;
  return useQuery({
    queryKey: ["folders", parentId],
    queryFn: async () => {
      let param = "";
      if (parentId !== null) {
        param = `/${encodeURIComponent(parentId)}`;
      }

      const res = await fetch(`/api/folders${param}`, {
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

export default useGetFolders;
