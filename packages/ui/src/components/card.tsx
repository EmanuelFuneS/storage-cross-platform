import { type JSX } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ className, children }: CardProps): JSX.Element {
  return <div className={`${className} flex flex-col justify-center`}>{children}</div>;
}
