import { type JSX } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  scale?: boolean;
}

export function Card({
  className,
  children,
  scale = true,
}: CardProps): JSX.Element {
  return (
    <div
      className={`${className} ${scale && "hover:scale-105  transform transition-transform duration-300"} rounded-xl flex flex-col justify-center  bg-elevated dark:bg-secondary shadow-2xl`}
    >
      {children}
    </div>
  );
}
