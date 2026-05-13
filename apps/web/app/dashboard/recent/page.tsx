"use client";
import { Suspense } from "react";
import ClientWrapper from "@/components/clientWrapper";
import useGetRecentsFiles from "@/lib/hooks/useGetRecentsFiles";
import RecentPage from "./_components/RecentPage";

const Page = () => {
  const { data } = useGetRecentsFiles();

  if (!data) return <>...Loading</>;

  return (
    <Suspense>
      <ClientWrapper>
        <RecentPage data={data} />
      </ClientWrapper>
    </Suspense>
  );
};

export default Page;
