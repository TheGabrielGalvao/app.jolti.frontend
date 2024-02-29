import { ReactNode } from "react";
import { Module } from "../../types/Navigation";
import { ToastElementProps } from "../../components/atoms/ToastElement";

export interface IAppContextData {
  navigation?: Module[];
  handleSetToast: (config?: ToastElementProps) => void;
  handleSetLoading: (show: boolean) => void;
  toast?: ToastElementProps;
  // handleRedirect: (route: string) => void
}

export interface IAppProviderProps {
  children?: ReactNode;
}
