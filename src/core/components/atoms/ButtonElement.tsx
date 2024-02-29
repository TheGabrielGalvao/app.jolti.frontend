import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonElementProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "success" | "danger" | "warning";
  children: ReactNode;
  asChild?: boolean;
}

export const ButtonElement = ({
  children,
  asChild,
  className,
  variant,
  ...props
}: ButtonElementProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={clsx(
        "p-2 rounded text-sm transition-colors focus:ring-2 ring-blue-100 shadow-md",
        {
          "bg-none text-title border border-title hover:text-title/10":
            variant === "default",
          "bg-primary text-white hover:bg-primary/80 shadow-primary/50":
            variant === "primary",
          "bg-success text-white hover:bg-success/80 shadow-success/50":
            variant === "success",
          "bg-danger text-white hover:bg-danger/80 shadow-danger/50":
            variant === "danger",
          "bg-warning text-title hover:bg-warning/80 shadow-warning/50":
            variant === "warning",
        },
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
