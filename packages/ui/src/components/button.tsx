"use client";

import { ReactNode } from "react";
import { cn } from "../lib";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={cn(
        `cursor-pointer py-2 px-4 mx-auto bg-primary dark:bg-primary text-elevated rounded-xl shadow-lg`,
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
