import { SignIn } from "phosphor-react";
import { EPositionItemMenu, Module } from "../../../core/types/Navigation";
import { Login } from "./pages/Login";

export const onboardingRoutes: Module = {
  id: 4,
  name: "login",
  label: "Login",
  route: "/login",
  // position: EPositionItemMenu.BOTTOM,
  order: 6,
  icon: <SignIn />,
  element: <Login />,
  private: false,
};
