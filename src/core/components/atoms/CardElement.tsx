import clsx from "clsx";
import { BaseComponentProps } from "./types";

export interface CardElementProps extends BaseComponentProps {}

export const CardElement = ({ children, className }: CardElementProps) => {
  return (
    <div
      className={clsx("flex w-full p-4 rounded-2xl overflow-hidden", className)}
    >
      {children}
    </div>
  );
};
