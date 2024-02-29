import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import { ReactNode } from "react";

export interface HeadingElementProps {
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export const HeadingElement = ({
  size = "md",
  children,
  asChild,
  className,
}: HeadingElementProps) => {
  const Comp = asChild ? Slot : "h2";
  return (
    <Comp
      className={clsx(
        "font-sans font-bold",
        {
          "text-lg": size === "sm",
          "text-xl": size === "md",
          "text-2xl": size === "lg",
        },
        className
      )}
    >
      {children}
    </Comp>
  );
};
