import { IRegisterForm, registerFromSchema } from "@/lib/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
    <div>
      <form></form>
    </div>
  );
};

export default RegisterForm;
