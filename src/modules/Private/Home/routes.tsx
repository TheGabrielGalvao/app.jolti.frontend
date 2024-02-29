import { HouseSimple } from "phosphor-react";
import { GenericPage } from "../../../core/components/templates/GenericPage";
import {
  EPositionItemMenu,
  ERouteStatus,
} from "../../../core/types/Navigation";

export const homeRoutes = {
  id: 1,
  name: "home",
  label: "Home",
  icon: <HouseSimple />,
  order: 1,
  position: EPositionItemMenu.MIDDLE,
  route: "/",
  element: <GenericPage text="Bem vindo!" />,
  status: ERouteStatus.MAKING,
  private: true,
};
