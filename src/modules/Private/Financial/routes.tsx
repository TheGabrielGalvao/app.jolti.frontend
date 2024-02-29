import { CurrencyDollarSimple } from "phosphor-react";
import { GenericPage } from "../../../core/components/templates/GenericPage";
import { EPositionItemMenu, Module } from "../../../core/types/Navigation";
import { Faturamento } from "./pages/Faturamento";
import { Dashboard } from "./pages/Dashboard";
import { FeatureProvider } from "../../../core/components/templates/FeatureProvider";
import { Transactions } from "./pages/Transactions";
import { Appointments } from "./pages/Appointments";

export const financialRoutes: Module = {
  id: 3,
  name: "finance",
  label: "Financeiro",
  icon: <CurrencyDollarSimple />,
  order: 3,
  position: EPositionItemMenu.MIDDLE,
  route: "/financial",
  element: (
    <FeatureProvider
      title="Financeiro"
      rootPath="/financial"
      initialPath="dashboard"
    />
  ),
  private: true,
  pages: [
    {
      id: 50,
      name: "dashboard",
      route: "/financial/dashboard",
      label: "Dashboard",
      showInFeatureMenu: true,
      element: <Dashboard />,
      private: true,
    },
    {
      id: 51,
      name: "transactions",
      route: "/financial/transactions",
      showInFeatureMenu: true,
      label: "Transações",
      element: <Transactions />,
      private: true,
    },
    {
      id: 52,
      name: "appointments",
      route: "/financial/appointments",
      showInFeatureMenu: true,
      label: "Compromissos",
      element: <Appointments />,
      private: true,
    },

    {
      id: 53,
      name: "faturamento",
      route: "/financial/faturamento",
      showInFeatureMenu: true,
      label: "Faturamento",
      element: <Faturamento />,
      private: true,
    },
  ],
};
