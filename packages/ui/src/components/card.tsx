import { type JSX } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ className, children }: CardProps): JSX.Element {
  return <div className={`${className} rounded-xl flex flex-col justify-center hover:scale-105  transform transition-transform duration-300 bg-elevated dark:bg-secondary shadow-2xl`}>{children}</div>;
}
