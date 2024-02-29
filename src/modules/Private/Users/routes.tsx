import { UsersThree } from "phosphor-react";
import { EPositionItemMenu, Module } from "../../../core/types/Navigation";
import { UserForm } from "./pages/UserForm";
import { UserList } from "./pages/UserList";
import { FeatureProvider } from "../../../core/components/templates/FeatureProvider";
import { userProfileRoutes } from "../UserProfile/routes";

export const userRoutes: Module = {
  id: 8,
  name: "users",
  label: "Usuários",
  icon: <UsersThree />,
  order: 2,
  position: EPositionItemMenu.MIDDLE,
  hide: true,
  route: "/users",
  element: (
    <FeatureProvider
      title="Usuários"
      rootPath="/users"
      initialPath="/users/list"
    />
  ),
  private: true,
  pages: [
    {
      id: 60,
      name: "new-user",
      label: "Novo",
      route: "/users/new",
      element: <UserForm />,
      private: true,
    },
    {
      id: 61,
      name: "edit-user",
      label: "Editar",
      route: "/users/edit/:uuid",
      element: <UserForm />,
      private: true,
      exact: false,
    },
    {
      id: 62,
      name: "list-user",
      label: "Usuários",
      showInFeatureMenu: true,
      route: "/users/list",
      element: <UserList />,
      private: true,
    },

    ...userProfileRoutes,
  ],
};
