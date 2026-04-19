import React from "react";
import Image from "next/image";
import LoginForm from "./_components/loginForm";
import { Card, Typography } from "@workspace/ui/components";
import MobileIcon from "@/public/icon_app_illustration.png";

const Page = () => {
  return (
    <div className="h-screen flex justify-center items-center lg:space-x-5">
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
      <div className="lg:w-1/3 h-3/4">
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
