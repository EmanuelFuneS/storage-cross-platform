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
  border = false,
  rounded = true,
}: CardProps): JSX.Element {
  return (
    <div
      className={`${className} ${scale && "hover:scale-105  transform transition-transform duration-300"} ${rounded && "rounded-xl"} ${border && "border-gray-700"}  flex flex-col justify-center  bg-elevated dark:bg-secondary shadow-2xl`}
    >
      {children}
    </div>
  );
}
