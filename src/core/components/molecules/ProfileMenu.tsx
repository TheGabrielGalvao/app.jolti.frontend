import React, { useState } from "react";
import { UserModel } from "../../../models/User.model";
import { useAuth } from "../../context/AuthContext";
import { CaretDown, Power, UserCircle } from "phosphor-react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { TextElement } from "../atoms";
import { NavLink } from "react-router-dom";

export const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, userInfo } = useAuth();

  const profileMenuItems = [
    {
      label: "Dados Cadastrais",
      icon: UserCircle,
      route: "/users/account",
    },
    {
      label: "Sair",
      icon: Power,
      route: "/login",
      action: () => logout(),
    },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center justify-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          {/* <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            /> */}
          <UserCircle size={36} />
          <TextElement size="md" className="capitalize font-normal">
            {userInfo?.userName}
          </TextElement>
          <CaretDown
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, route, action }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <NavLink to={route ?? ""}>
              <MenuItem
                key={label}
                onClick={() => {
                  closeMenu();
                  isLastItem ? () => logout() : () => {};
                }}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            </NavLink>
          );
        })}
      </MenuList>
    </Menu>
  );
};
