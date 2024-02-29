import { AddressBook } from "phosphor-react";
import { EPositionItemMenu } from "../../../core/types/Navigation";
import { ContactForm } from "./pages/ContactForm";
import { ContactList } from "./pages/ContactList";
import { FeatureProvider } from "../../../core/components/templates/FeatureProvider";

export const contactRoutes = {
  id: 2,
  name: "contacts",
  label: "Contatos",
  icon: <AddressBook />,
  order: 2,
  position: EPositionItemMenu.MIDDLE,
  route: "/contacts",
  element: (
    <FeatureProvider title="Contatos" rootPath="/contacts" initialPath="list" />
  ),
  private: true,
  pages: [
    {
      id: 60,
      name: "new",
      label: "Novo",
      route: "/contacts/new",
      element: <ContactForm />,
      private: true,
    },
    {
      id: 61,
      name: "edit",
      label: "Edição",
      route: "/contacts/edit/:uuid",
      element: <ContactForm />,
      private: true,
      exact: false,
    },
    {
      id: 61,
      name: "list",
      route: "/contacts/list",
      element: <ContactList />,
      private: true,
    },
  ],
};
