import { createContext, useContext, useEffect, useState } from "react";
import { IAppContextData, IAppProviderProps } from "./types";
import { OnBoardingLayout } from "../../components/templates";
import { DefaultLayout } from "../../components/templates/DefaultLayout";
import { useLocation } from "react-router-dom";
import { getRoutes } from "../../util/helpers/routing";
import { startsWith } from "lodash";
import { PrivateRoutes, PublicRoutes } from "../../../config/routing";
import {
  ToastElement,
  ToastElementProps,
} from "../../components/atoms/ToastElement";
import { useAuth } from "../AuthContext";
import { LoaderElement } from "../../components/atoms";

export const AppContext = createContext<IAppContextData>({} as IAppContextData);

export const AppProvider = ({ children }: IAppProviderProps) => {
  const { isAuthenticated, token } = useAuth();
  const location = useLocation();
  const hiddenRoutes = getRoutes({ hide: true })
  const privateRoutes = getRoutes({ private: true }).filter(x => !hiddenRoutes.includes(x));
  const publicRoutes = getRoutes({ private: false });

  const [isPrivate, setIsPrivate] = useState(false);
  const [toast, setToast] = useState<ToastElementProps>();
  const [loading, setLoading] = useState(false);

  const handleSetToast = (config?: ToastElementProps): void => {
    setToast({
      ...config,
      type: config?.type,
      show: !toast?.show ?? false,
    });
  };

  const handleSetLoading = (show: boolean): void => {
    setLoading(show);
  };

  const handleSetPrivate = () => {
    const isPrivateRoutes = privateRoutes.some((route) =>
      startsWith(location.pathname, route.route)
    );
    const isPublicRoutes = publicRoutes.some((route) =>
      startsWith(location.pathname, route.route)
    );

    setIsPrivate(isPrivateRoutes && !isPublicRoutes && token !== undefined);
  };

  useEffect(() => {
    handleSetPrivate();
    handleSetLoading;
  }, [isPrivate, location, isAuthenticated, loading]);

  return (
    <AppContext.Provider value={{ handleSetToast, toast, handleSetLoading }}>
      <LoaderElement show={loading} />
      <ToastElement {...toast} />
      {!isPrivate && (
        <OnBoardingLayout
          headerText="Gestão"
          secondaryText="Faça login e comece a usar!"
          className="text-gray-900"
        >
          <PublicRoutes />
        </OnBoardingLayout>
      )}
      {isPrivate && (
        <DefaultLayout>
          <PrivateRoutes />
        </DefaultLayout>
      )}
    </AppContext.Provider>
  );
};

export const useRoute = () => {
  const context = useContext(AppContext);
  return context;
};
