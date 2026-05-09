import { Suspense } from "react";
import FilesPage from "./_components/FilesPage";
import ClientWrapper from "@/components/clientWrapper";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <ClientWrapper>
        <FilesPage />
      </ClientWrapper>
    </Suspense>
  );
};

export default Page;
