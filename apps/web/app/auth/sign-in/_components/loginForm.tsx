"use client";
import React, { useEffect } from "react";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginForm, loginFormSchema } from "@/lib/schema/user.schema";
import Button from "@workspace/ui/components/button";
import Card from "@workspace/ui/components/card";
import Input from "@workspace/ui/components/input";
import Tooltip from "@workspace/ui/components/tooltip";
import Typography from "@workspace/ui/components/typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AtSign } from "@workspace/ui/lib";

const LoginForm = () => {
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(true);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const fillTestUser = () => {
    setValue("email", "admin@gmial.com");
    setValue("password", "admin");
  };

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error && !result.ok) {
      console.error(result.error);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <Card scale={false} className="w-full h-full p-6">
      <div className="flex items-start justify-between">
        <div>
          <Typography as="h1" type="headline">
            Welcome
          </Typography>
          <Typography as="p" type="body">
            Please complete form for Login
          </Typography>
        </div>
        {process.env.NEXT_PUBLIC_ENV === "development" && (
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                fillTestUser();
                setShowTooltip(false);
              }}
              className="cursor-pointer shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              Auto-Login
            </button>
            <Tooltip show={showTooltip} onClose={() => setShowTooltip(false)}>
              Click for auto complete fields
            </Tooltip>
          </div>
        )}
      </div>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-10 gap-4 my-5 py-5"
      >
        <Input<ILoginForm>
          register={register}
          errors={errors}
          name="email"
          label="email"
        />
        <Input<ILoginForm>
          register={register}
          errors={errors}
          name="password"
          label="password"
        />
        <div className="flex flex-col space-y-2">
          <Link href={""}>
            <Typography as="p" type="body">
              Forgot Password
            </Typography>
          </Link>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
      </form>
      <div className="w-full h-10 flex my-2 items-center justify-center">
        <Typography as="p" type="body">
          OR CONTINUE WITH
        </Typography>
      </div>
      <div className="w-full ">
        <Button scale={true} className="w-full flex justify-center space-x-1">
          <AtSign size={18} />
          <Typography as="p" type="body">
            Email
          </Typography>
        </Button>
      </div>
    </Card>
  );
};

export default LoginForm;
