"use client";
import useGetDeletedFiles from "@/lib/hooks/useGetDeletedFiles";
import TrashPage from "./_components/TrashPage";

const Page = () => {
  const { data } = useGetDeletedFiles();

  if (!data) return <div className="my-10">...loding</div>;

  return <TrashPage data={data} />;
};

export default Page;
