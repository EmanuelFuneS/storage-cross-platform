"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginForm, loginFormSchema } from "@/lib/schema/user.schema";
import { Card } from "@workspace/ui/components/card";
import Typography from "@workspace/ui/components/typography";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
const LoginForm = () => {
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

  const onSubmit: SubmitHandler<ILoginForm> = (data) => console.log(data);

  return (
    <Card className=" lg:w-1/3 h-3/4 rounded-2xl bg-amber-200 p-10 ">
      <Typography as="h1" type="headline">
        Welcome
      </Typography>
      <Typography as="p" type="title">
        Pleas complete form for Login
      </Typography>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-10 my-5 py-5"
      >
        <div className="flex flex-col space-y-2">
          <Typography as="label" type="body">
            Email
          </Typography>
          <input className="bg-blue-50 rounded-lg h-10" type="text" />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="flex flex-col space-y-2">
          <Typography as="label" type="body">
            Password
          </Typography>
          <input className="bg-blue-50 rounded-lg h-10" type="text" />
          {errors.password && <p>{errors.password?.message}</p>}
        </div>
        <Link href={""}>
          <Typography as="p" type="body">
            Forgot Password
          </Typography>
        </Link>
        <Button type="submit" className="w-full">
          Login
        </Button>
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
    </Card>
  );
};

export default LoginForm;
