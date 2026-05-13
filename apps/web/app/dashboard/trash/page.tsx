"use client";
import useGetDeletedFiles from "@/lib/hooks/useGetDeletedFiles";
import TrashPage from "./_components/TrashPage";

const Page = () => {
  const { data } = useGetDeletedFiles();

  if (!data) return <>...loding</>;

  return <TrashPage data={data} />;
};

export default Page;
