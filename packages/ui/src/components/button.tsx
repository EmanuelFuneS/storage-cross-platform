"use client";

import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={`${className} cursor-pointer py-2 px-4 mx-auto bg-background dark:bg-primary rounded-xl shadow-lg text-foreground`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
