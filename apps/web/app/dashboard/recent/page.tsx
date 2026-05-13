"use client";
import useGetRecentsFiles from "@/lib/hooks/useGetRecentsFiles";
import RecentPage from "./_components/RecentPage";

const Page = () => {
  const { data } = useGetRecentsFiles();

  if (!data) return <>...Loading</>;

  return <RecentPage data={data} />;
};

export default Page;
