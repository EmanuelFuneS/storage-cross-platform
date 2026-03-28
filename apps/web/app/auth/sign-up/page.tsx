import React from "react";
import RegisterForm from "./_components/registerForm";

const Page = () => {
  return (
    <div className="h-screen flex justify-center items-center space-x-5">
      <div className="hidden lg:block lg:w-1/3 lg:h-3/4 bg-blue-300 rounded-2xl">
        promotios
      </div>
      <RegisterForm />
    </div>
  );
};

export default Page;
