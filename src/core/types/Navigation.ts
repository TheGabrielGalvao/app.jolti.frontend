import { IconProps } from "phosphor-react/src/lib";
import { ReactNode } from "react";

export interface Page {
  id: number;
  name: string;
  label?: string;
  showInFeatureMenu?: boolean;
  element?: ReactNode;
  icon?: React.ComponentType<IconProps> | ReactNode;
  position?: EPositionItemMenu;
  route: string;
  order?: number;
  exact?: boolean;
  private?: boolean;
  routeContext?: ERouteContext;
  status?: ERouteStatus;
}

export interface Module {
  id?: number | string;
  name?: string;
  label?: string;
  icon?: React.ComponentType<IconProps> | ReactNode;
  route?: string;
  element?: ReactNode;
  pages?: Page[];
  exact?: boolean;
  position?: EPositionItemMenu;
  order?: number;
  initialPage?: string;
  private?: boolean;
  status?: ERouteStatus;
  onClick?: () => void;
  hide?: boolean
}

export enum EPositionItemMenu {
  TOP = "top",
  MIDDLE = "middle",
  BOTTOM = "bottom",
}

export enum ERouteStatus {
  ERROR = 0,
  MAKING = 1,
  OK = 2,
  MAN = 4,
}

export enum ERouteContext {
  COMMON = 0,
  ONBOARDING = 1,
}

export interface SimpleNavigationProps {
  navigation: Page[];
}

export interface NestedNavigationProps {
  navigation: Module[];
}
