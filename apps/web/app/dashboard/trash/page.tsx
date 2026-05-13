"use client";
import { Suspense } from "react";
import useGetDeletedFiles from "@/lib/hooks/useGetDeletedFiles";
import ClientWrapper from "@/components/clientWrapper";
import TrashPage from "./_components/TrashPage";

//here delete file in s3

//here handle restore file
//here handle all delete files

const Page = () => {
  const { data } = useGetDeletedFiles();

  if (!data) return <>...loding</>;

  return (
    <Suspense>
      <ClientWrapper>
        <TrashPage data={data} />
      </ClientWrapper>
    </Suspense>
  );
};

export default Page;
