import { clsx } from "clsx";
import { IconProps } from "phosphor-react";
import { HTMLAttributes, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Module } from "../../types/Navigation";
import { TextElement } from "./TextElement";
import { BaseComponentProps } from "./types";

export interface SidebarElementProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode | [];
  open?: boolean;
  size?: "sm" | "lg";
}

export interface NavbarSectionItemProps extends SidebarElementProps {
  icon?: React.ComponentType<IconProps> | ReactNode;
  label?: string | ReactNode;
}

export interface NavbarSectionItemRouteProps extends BaseComponentProps {
  itemMenu?: Module;
  open?: boolean;
}

const SidebarRoot = ({
  children,
  className,
  open,
  size = "sm",
  ...props
}: SidebarElementProps) => {
  return (
    <aside
      className={clsx(
        "h-screen p-5  pt-0 relative duration-300 flex flex-col text-2xl py-0 px-1 bg-card shadow-default shadow-lg border-r border-r-default",
        {
          "w-20": !open,
          "w-56": open,
        },
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
};

const SidebarNav = ({
  children,
  className,
  open,
  size = "sm",
  ...props
}: SidebarElementProps) => {
  return (
    <nav className="flex flex-col w-full items-start justify-between h-full p-1">
      {children}
    </nav>
  );
};

const SidebarNavSection = ({
  children,
  className,
  open,
  size = "sm",
  ...props
}: SidebarElementProps) => {
  return <ul className="flex flex-col gap-2 w-full">{children}</ul>;
};

const SidebarNavSectionItem = ({
  className,
  open,
  icon,
  label,
}: NavbarSectionItemProps) => {
  return (
    <li
      className={clsx(
        "flex items-center w-full text-menuText hover:bg-primary hover:text-menuTextActtive transition-all duration-300 cursor-pointer p-3 rounded-lg",
        {
          "justify-center": !open,
          "justify-start gap-4": open,
        },
        className
      )}
    >
      <>
        {icon}
        <TextElement
          asChild={false}
          className={clsx("origin-left duration-200", {
            hidden: !open,
            block: open,
          })}
        >
          {label}
        </TextElement>
      </>
    </li>
  );
};

const SidebarNavSectionItemRoute = ({
  className,
  open,
  itemMenu,
  onClick,
}: NavbarSectionItemRouteProps) => {
  return (
    <li
      className={clsx(
        "flex items-center w-full text-menuText text-3xl hover:bg-primary hover:text-menuTextActtive transition-all duration-300 cursor-pointer rounded-lg",
        {
          "justify-center": !open,
          "justify-start gap-4": open,
        },
        className
      )}
    >
      <NavLink
        to={itemMenu?.route || ""}
        end={itemMenu?.exact}
        className={({ isActive, isPending }) =>
          clsx("flex w-full items-center p-3 rounded-lg", {
            "justify-center": !open,
            "justify-start gap-4": open,
            "text-menuTextActtive bg-primary": isActive,
            "text-menuText bg-transparent": isPending,
          })
        }
        onClick={onClick}
      >
        <>
          {itemMenu?.icon}
          <TextElement
            asChild={false}
            className={clsx("origin-left duration-200 text-inherit", {
              hidden: !open,
              block: open,
            })}
          >
            {itemMenu?.label}
          </TextElement>
        </>
      </NavLink>
    </li>
  );
};

SidebarNav.displayName = "Sidebar.Nav";
SidebarRoot.displayName = "Sidebar.Root";
SidebarNavSection.displayName = "Sidebar.NavSection";
SidebarNavSectionItem.displayName = "Sidebar.NavSectionItem";
SidebarNavSectionItemRoute.displayName = "Sidebar.NavSectionItemRoute";

export const SidebarElement = {
  Nav: SidebarNav,
  Root: SidebarRoot,
  NavSection: SidebarNavSection,
  NavSectionItem: SidebarNavSectionItem,
  NavSectionItemRoute: SidebarNavSectionItemRoute,
};
