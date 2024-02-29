import { ReactNode } from "react";
import { AuthModel } from "../../../models/Auth.model";
import { UserModel } from "../../../models/User.model";

export interface IAuthContextData {
  isAuthenticated: boolean;
  userInfo?: UserModel;
  login: (data: AuthModel) => Promise<boolean>;
  logout: () => void;
  handleSetUserInfo: (data: UserModel) => void;
  token: string | null;
}

export interface IAuthProviderProps {
  children?: ReactNode;
}
