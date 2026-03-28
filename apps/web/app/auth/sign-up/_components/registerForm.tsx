"use client";
import { IRegisterForm, registerFromSchema } from "@/lib/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@workspace/ui/components/card";
import Typography from "@workspace/ui/components/typography";
import React from "react";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: errors,
  } = useForm<IRegisterForm>({
    resolver: zodResolver(registerFromSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      planId: "",
    },
  });

  return (
    <Card className=" lg:w-1/3 h-3/4 rounded-2xl bg-amber-200 p-10 ">
      <Typography as="h1" type="headline">
        Welcome
      </Typography>
      <form>dasdas</form>
    </Card>
  );
};

export default RegisterForm;
