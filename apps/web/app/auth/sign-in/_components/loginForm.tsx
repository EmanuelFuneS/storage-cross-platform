import React from "react";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginForm, loginFormSchema } from "@/lib/schema/user.schema";

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
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input type="text" />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="text" />
          {errors.password && <p>{errors.password?.message}</p>}
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
