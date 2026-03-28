import React from "react";
import LoginForm from "./_components/loginForm";

const Page = () => {
  return (
    <div className="h-screen flex justify-center items-center lg:space-x-5">
      <div className="hidden lg:block lg:w-1/3 lg:h-3/4 bg-blue-300 rounded-2xl"></div>
      <LoginForm />
    </div>
  );
};

export default Page;
