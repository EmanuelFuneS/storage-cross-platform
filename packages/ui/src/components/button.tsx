"use client";

import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button className={`${className} py-2 px-4 mx-auto bg-background rounded-xl shadow-lg text-foreground`} onClick={onClick}>
      {children}
    </button>
  );
};
