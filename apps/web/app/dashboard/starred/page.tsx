"use client";
import { Suspense } from "react";
import ClientWrapper from "@/components/clientWrapper";
import StarredPage from "./_components/StarredPage";
import useGetStarredFiles from "@/lib/hooks/useGetStarredFiles";

const Page = () => {
  const { data } = useGetStarredFiles();

  if (!data) return <>...Loading</>;

  return (
    <Suspense>
      <ClientWrapper>
        <StarredPage data={data} />
      </ClientWrapper>
    </Suspense>
  );
};

export default Page;
