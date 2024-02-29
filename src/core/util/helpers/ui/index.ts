import { filter, find } from "lodash";
import { navigation } from "../../../../config/navigation";
import { EPositionItemMenu } from "../../../types/Navigation";

export const getMenuByPosition = (position: EPositionItemMenu) => {
  const data = filter(navigation, { position: position });

  return data;
};

export const getRouteByFilter = (path: string) => {
  const route = find(navigation, { route: path });
  return route;
};
