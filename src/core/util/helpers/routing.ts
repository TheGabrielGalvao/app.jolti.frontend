import { filter, find } from "lodash";
import { navigation } from "../../../config/navigation";
import { Module, Page } from "../../types/Navigation";

export const getRoutes = (filters: Module) => {
  const filteredModules = filter(navigation, filters) as Module[];
  const filteredRoutes = filteredModules.flatMap((module) => {
    if (module.pages) {
      const filteredPages = filter(module.pages, filters) as Page[];
      return [module, ...filteredPages];
    }
    return module;
  });
  return filteredRoutes as Module[];
};

export const getPages = (filters: Module) => {
  const feature: Module = find(navigation, filters) as Module;
  return feature.pages as Page[];
};

export const getRouteInfo = (filters: Module) => {
  const feature: Module = find(navigation, filters) as Module;
  return feature;
};

export const isPrivateRoute = (pathname: string) => {
  const routes = getRoutes({ private: true });
  const route = find(routes, { route: pathname });

  if (!route?.private) {
    return false;
  }
};
