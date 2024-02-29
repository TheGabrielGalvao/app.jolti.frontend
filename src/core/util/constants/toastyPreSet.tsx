import { Check, Info, Warning, X } from "phosphor-react";
import { ToastElementProps } from "../../components/atoms/ToastElement";

const SUCCESS: ToastElementProps = {
  icon: <Check weight="bold" />,
  type: "success",
};

const DANGER: ToastElementProps = {
  icon: <X weight="bold" />,
  type: "danger",
};

const WARNING: ToastElementProps = {
  icon: <Warning weight="bold" />,
  type: "warning",
};

const INFO: ToastElementProps = {
  icon: <Info weight="bold" />,
  type: "info",
};

export const toastyPreset = {
  SUCCESS,
  INFO,
  WARNING,
  DANGER,
};
