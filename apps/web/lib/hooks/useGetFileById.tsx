import { useQuery } from "@tanstack/react-query";
import { File } from "../types/schema.db";
interface UseGetFileByIdProps {
  id: string;
}

const useGetFileById = ({ id }: UseGetFileByIdProps) => {
  return useQuery({
    queryKey: ["files", "detail", id],
    queryFn: async (): Promise<File> => {
      const res = await fetch(`/api/files/${encodeURIComponent(id)}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }).then((r) => r.json());

      return res.data;
    },
  });
};

export default useGetFileById;
