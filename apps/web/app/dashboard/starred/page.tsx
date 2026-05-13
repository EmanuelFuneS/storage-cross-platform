"use client";
import StarredPage from "./_components/StarredPage";
import useGetStarredFiles from "@/lib/hooks/useGetStarredFiles";

const Page = () => {
  const { data } = useGetStarredFiles();

  if (!data) return <>...Loading</>;

  return <StarredPage data={data} />;
};

export default Page;
