import { createContext, useContext, useEffect, useState } from "react";
import { IAuthContextData, IAuthProviderProps } from "./types";
import { useGlobal } from "../GlobalContext";
import axios from "axios";
import UserService from "../../../services/UserService";
import { useQuery } from "react-query";
import { AuthModel } from "../../../models/Auth.model";
import AuthService from "../../../services/AuthService";
import { UserModel } from "../../../models/User.model";

export const AuthContext = createContext<IAuthContextData>(
  {} as IAuthContextData
);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<UserModel | undefined>();
  const { navigate } = useGlobal();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const handleSetUserInfo = (data: UserModel) => {
    setUserInfo(data);
  };

  const { data: info } = useQuery(
    "user-info",
    () => UserService.getFullUserInfo(),
    {
      retry: false,
      enabled: token !== null && token !== undefined && token !== "",
      refetchOnWindowFocus: false,
      onSuccess: (info) => {
        handleSetUserInfo(info);
      },
    }
  );

  useEffect(() => {
    if (!isAuthenticated) {
      if (!token) {
        navigate("/login");
      }
    }
  }, [isAuthenticated]);

  const login = async (data: AuthModel): Promise<boolean> => {
    try {
      const result = await AuthService.login(data);

      setIsAuthenticated(true);
      setToken(result.token);
      localStorage.setItem("token", result.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${result.token}`;

      navigate("/");
      return true;
    } catch (error) {
      setIsAuthenticated(false);
      setToken(null);
      navigate("/login");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      console.error("Erro durante o login:", error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserInfo(undefined);
    setToken(null);
    navigate("/login");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  const value: IAuthContextData = {
    isAuthenticated,
    login,
    logout,
    token,
    userInfo,
    handleSetUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): IAuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};
