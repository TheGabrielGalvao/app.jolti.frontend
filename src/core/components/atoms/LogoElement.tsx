import clsx from "clsx";
import { HtmlHTMLAttributes } from "react";

export const LogoElement = ({
  children,
  className,
}: HtmlHTMLAttributes<HTMLElement>) => {
  return <span className={clsx("", className)}>{children}</span>;
};
