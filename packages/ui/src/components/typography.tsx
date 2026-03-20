import React, { type JSX } from "react";

const typeText: Record<string, string> = {
  display: "text-6xl font-black",
  headline: "text-3xl font-bold",
  title: "text-xl font-semibold ",
  body: "text-sm font-normal",
};

function Typography({
  children,
  as,
  className,
  type,
}: {
  children: React.ReactNode;
  as: string;
  className?: string;
  type: string;
}): JSX.Element {
  switch (as) {
    case "h1":
      return <h1 className={`${className} ${typeText[type]}`}>{children}</h1>;
    case "h2":
      return <h2 className={`${className} ${typeText[type]}`}>{children}</h2>;
    case "h3":
      return <h3 className={`${className} ${typeText[type]}`}>{children}</h3>;
    case "h4":
      return <h4 className={`${className} ${typeText[type]}`}>{children}</h4>;
    case "h5":
      return <h5 className={`${className} ${typeText[type]}`}>{children}</h5>;
    case "h6":
      return <h3 className={`${className} ${typeText[type]}`}>{children}</h3>;
    case "p":
      return <p className={`${className} ${typeText[type]}`}>{children}</p>;
    case "span":
      return (
        <span className={`${className} ${typeText[type]}`}>{children}</span>
      );
    default:
      return <p className={`${className} ${typeText[type]}`}>{children}</p>;
  }
}

export default Typography;
