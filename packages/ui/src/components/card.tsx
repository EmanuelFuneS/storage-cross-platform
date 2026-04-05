import { type JSX } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  scale?: boolean;
  border?: boolean
}

export default function Card({
  className,
  children,
  scale = true,
  border = true,
}: CardProps): JSX.Element {
  return (
    <div
      className={`${className} ${scale && "hover:scale-105  transform transition-transform duration-300"} ${border && "rounded-xl"}  flex flex-col justify-center  bg-elevated dark:bg-secondary shadow-2xl`}
    >
      {children}
    </div>
  );
}
