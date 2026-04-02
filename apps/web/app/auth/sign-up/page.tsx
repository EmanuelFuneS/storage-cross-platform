"use client";
import React from "react";
import RegisterForm from "./_components/registerForm";
import MobileIcon from "@/public/icon_app_illustration.png";
import Image from "next/image";
import Typography from "@workspace/ui/components/typography";
import { Card } from "@workspace/ui/components/card";
import useGetPlanIdByName from "@/lib/hooks/useGetPlansByName";

const Page = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const planName = searchParams.get("plan") || "basic";

  const { data } = useGetPlanIdByName({ name: planName });

  return (
    <div className="h-screen flex justify-center items-center space-x-5">
      <Card
        scale={false}
        className="hidden lg:block lg:w-1/3 lg:h-3/4 lg:flex-col"
      >
        <div className="h-1/3 flex flex-col justify-center items-center">
          <Typography as="h1" type="headline">
            Try In Mobile Device
          </Typography>
          <Typography as="p" type="body">
            Next time feature
          </Typography>
        </div>
        <div className="h-2/3 w-full flex justify-center">
          <Image
            src={MobileIcon}
            alt="Mobile Icon"
            className="w-auto h-full object-cover "
          />
        </div>
      </Card>
      {data && <RegisterForm planId={data} />}
    </div>
  );
};

export default Page;
