import { Suspense } from "react";
import FilesPage from "./_components/FilesPage";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <FilesPage />
    </Suspense>
  );
};

export default Page;
