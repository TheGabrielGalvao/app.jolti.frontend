import { IconProps, X } from "phosphor-react";
import { ReactNode, useEffect } from "react";
import { ButtonElement } from "./ButtonElement";
import { HeadingElement } from "./HeadingElement";
import { TextElement } from "./TextElement";
import clsx from "clsx";
import { useRoute } from "../../context/RouteContext";

export interface ToastElementProps {
  icon?: ReactNode;
  title?: string;
  date?: string;
  message?: string;
  show?: boolean;
  type?: "info" | "warning" | "danger" | "success" | "default";
}

export const ToastElement = ({
  icon,
  date,
  message,
  title,
  show,
  type,
}: ToastElementProps) => {
  const { handleSetToast, toast } = useRoute();

  useEffect(() => {
    if (toast?.show) {
      const timer = setTimeout(() => {
        handleSetToast({
          show: false,
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div
      className={clsx({
        "flex justify-center items-center w-full max-w-full h-14 right-2 top-20 bottom-0 absolute ":
          show,
        hidden: !show,
      })}
    >
      <div
        className={clsx(
          {
            "bg-success/10 border-success text-success": type === "success",
            "bg-info/10 border-info text-info": type === "info",
            "bg-danger/10 border-danger text-danger": type === "danger",
            "bg-warning/10 border-warning text-warning":
              type === "warning",
            "bg-default border-default text-default":
              !type || type === "default",
          },
          "flex items-center justify-between rounded-t-lg bg-clip-padding px-4 py-2 rounded-lg border transition-all animate-bounce duration-200"
        )}
      >
        <p className="flex items-center justify-between gap-2 w-full ">
          <span className="flex gap-2 items-center ">
            {icon}
            <TextElement size="sm">{message}</TextElement>
          </span>

          <ButtonElement
            type="button"
            className="shadow-none rounded-none border-none "
            onClick={() => handleSetToast()}
          >
            <X size={16} weight="bold" />
          </ButtonElement>
        </p>
      </div>
      {/* <div className="break-words rounded-b-lg px-4 py-4 text-success flex items-center justify-center">
        {icon}
        <TextElement size="sm">{title}</TextElement>
      </div> */}
    </div>
  );
};
