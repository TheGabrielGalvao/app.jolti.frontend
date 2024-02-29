import { ReactNode } from "react";
import { Module } from "../../types/Navigation";
import { NavigateFunction } from "react-router-dom";

export interface IGlobalContextData {
  navigation?: Module[];
  navigate: NavigateFunction;
  // handleRedirect: (route: string) => void
}

export interface IGlobalProviderProps {
  children?: ReactNode;
}
