import { Gear } from "phosphor-react";
import { GenericPage } from "../../../core/components/templates/GenericPage";
import {
  EPositionItemMenu,
  ERouteStatus,
} from "../../../core/types/Navigation";

export const settingsRoutes = {
  id: 5,
  name: "settings",
  label: "Ajustes",
  icon: <Gear />,
  order: 3,
  position: EPositionItemMenu.BOTTOM,
  route: "/settings",
  element: <GenericPage text="Configurações" />,
  status: ERouteStatus.MAKING,
  private: true,
};
