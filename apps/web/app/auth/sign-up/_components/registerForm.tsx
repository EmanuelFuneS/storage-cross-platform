"use client";
import useRegisterUser from "@/lib/hooks/useRegisterUser";
import { IRegisterForm, registerFromSchema } from "@/lib/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import Input from "@workspace/ui/components/input";
import Typography from "@workspace/ui/components/typography";
import { int } from "drizzle-orm/mysql-core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export interface RegisterFormProps {
  planId: string;
}

const RegisterForm = ({ planId }: RegisterFormProps) => {
  const router = useRouter();
  const { mutate } = useRegisterUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IRegisterForm>({
    resolver: zodResolver(registerFromSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      planId: planId,
    },
  });

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    console.log("Form Data:", data);
    try {
      await mutate(data);
      router.push("/auth/sign-in");
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };
  /* console.log("Errors:", errors);
  console.log("Form:", getValues()); */

  return (
    <Card scale={false} className="lg:w-1/3 h-3/4 p-6">
      <Typography as="h1" type="headline">
        Welcome
      </Typography>
      <Typography as="p" type="body">
        Please complete form for Register
      </Typography>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-10 gap-4 my-5 py-5"
      >
        <Input<IRegisterForm>
          register={register}
          errors={errors}
          name="name"
          label="name"
        />
        <Input<IRegisterForm>
          register={register}
          errors={errors}
          name="email"
          label="email"
        />
        <Input<IRegisterForm>
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
            Register
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
    </Card>
  );
};

export default RegisterForm;
