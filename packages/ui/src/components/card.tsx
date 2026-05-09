import { type JSX } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  scale?: boolean;
  rounded?: boolean;
  border?: boolean;
}

export default function Card({
  className,
  children,
  scale = true,
  border = true,
  rounded = true,
}: CardProps): JSX.Element {
  return (
    <div
      className={`${className} ${scale && "hover:scale-105  transform transition-transform duration-300"} ${rounded && "rounded-xl"} ${border && "border-solid border border-slate-300 dark:border-muted"}    flex flex-col justify-center  bg-elevated dark:bg-card shadow-2xl`}
    >
      {children}
    </div>
  );
}
