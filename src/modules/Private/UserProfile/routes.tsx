import { Page } from "../../../core/types/Navigation";
import { UserProfileForm } from "./pages/UserProfileForm";
import { UserProfileList } from "./pages/UserProfileList";

export const userProfileRoutes: Page[] = [
  {
    id: 63,
    name: "new-profile",
    label: "Novo",
    route: "/users/profile/new",
    element: <UserProfileForm />,
    private: true,
  },
  {
    id: 64,
    name: "edit-profile",
    label: "Editar",
    route: "/users/profile/edit/:uuid",
    element: <UserProfileForm />,
    private: true,
    exact: false,
  },
  {
    id: 65,
    name: "list-profile",
    label: "Perfil de Acesso",
    showInFeatureMenu: true,
    route: "/users/profile/list",
    element: <UserProfileList />,
    private: true,
  },
];
