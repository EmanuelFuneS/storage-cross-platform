"use client";

import { ReactNode } from "react";
import { cn } from "../lib";

type Style = "default" | "danger" | "static";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: Style;
  scale?: boolean;
}

const variantStyle: Record<Style, string> = {
  default:
    "py-2 px-4 mx-auto bg-primary dark:bg-primary text-elevated rounded-xl shadow-lg",
  danger:
    "py-2 px-4 mx-auto bg-danger dark:bg-danger text-foreground rounded-xl shadow-lg",
  static:
    "py-2 px-4 mx-auto bg-primary dark:bg-primary text-elevated rounded-xl shadow-lg",
};

export default function Button({
  children,
  className,
  variant = "default",
  scale=false,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={cn(`cursor-pointer ${variantStyle[variant]} ${scale && "hover:scale-105  transform transition-transform duration-300"}`, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
