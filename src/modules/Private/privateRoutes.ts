import { Module } from "../../core/types/Navigation";
import { contactRoutes } from "./Contacts/routes";
import { financialRoutes } from "./Financial/routes";
import { homeRoutes } from "./Home/routes";
import { productRoutes } from "./Products/routes";
import { settingsRoutes } from "./Settings/routes";
import { stockRoutes } from "./Stock/routes";
import { userRoutes } from "./Users/routes";

export const privateRoutes: Module[] = [
  homeRoutes,
  userRoutes,
  productRoutes,
  contactRoutes,
  financialRoutes,
  stockRoutes,
  settingsRoutes,
];
