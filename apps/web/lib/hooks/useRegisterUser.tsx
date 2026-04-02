import { useMutation } from "@tanstack/react-query";
import React from "react";
import { IRegisterForm } from "../schema/user.schema";

const useRegisterUser = () => {
  return useMutation({
    mutationKey: ["registerUser"],
    mutationFn: async (data: IRegisterForm) => {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();
      return responseData;
    },
  });
};

export default useRegisterUser;
