"use client";
import React from "react";
import { signIn, signOut } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginForm, loginFormSchema } from "@/lib/schema/user.schema";
import { Card } from "@workspace/ui/components/card";
import Typography from "@workspace/ui/components/typography";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";
import Logout from "@/components/profile/logout";

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
    <div className=" lg:w-1/3 h-3/4 rounded-2x bg-elevated dark:bg-secondary rounded-2xl p-10 ">
      <Typography as="h1" type="headline">
        Welcome
      </Typography>
      <Typography as="p" type="title">
        Pleas complete form for Login
      </Typography>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-10 gap-4 my-5 py-5"
      >
        <div className="flex flex-col h-15 space-y-2">
          <Typography as="label" type="body">
            Email
          </Typography>
          <input
            className="p-2.5 rounded-xl bg-slate-500"
            type="text"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && (
            <Typography as="span" type="body" className="text-error">
              {errors.email.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col h-15 space-y-2">
          <Typography as="label" type="body">
            Password
          </Typography>
          <input
            className="p-2.5 rounded-xl bg-slate-500"
            type="text"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && (
            <Typography as="span" type="body" className="text-error">
              {errors.password?.message}
            </Typography>
          )}
        </div>
        <div className="my-2">
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
      <div className="w-full flex justify-between">
        <Button>Gmail</Button>
        <Button>Github</Button>
      </div>
      <Logout />
    </div>
  );
};

export default LoginForm;
