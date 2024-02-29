import { ClipboardText } from "phosphor-react";
import { GenericPage } from "../../../core/components/templates/GenericPage";
import { EPositionItemMenu, Module } from "../../../core/types/Navigation";
import { FeatureProvider } from "../../../core/components/templates/FeatureProvider";
import { InventoryAdjustment } from "./features/InventoryAdjustment/pages/InventoryAdjustment";

export const stockRoutes: Module = {
  id: 300,
  name: "stock",
  label: "Estoque",
  icon: <ClipboardText />,
  order: 8,
  position: EPositionItemMenu.MIDDLE,
  route: "/stock",
  element: (
    <FeatureProvider
      title="Estoque"
      rootPath="/stock"
      initialPath="adjustments"
    />
  ),
  private: true,
  pages: [
    {
      id: 301,
      name: "adjustments",
      route: "/stock/adjustments",
      label: "Ajuste de Estoque",
      showInFeatureMenu: true,
      element: <InventoryAdjustment />,
      private: true,
    },
    
  ],
};
