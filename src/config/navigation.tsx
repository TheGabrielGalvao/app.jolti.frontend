import { Module } from "../core/types/Navigation";
import { privateRoutes, publicRoutes } from "../modules";

export const navigation: Module[] = [...privateRoutes, ...publicRoutes];
