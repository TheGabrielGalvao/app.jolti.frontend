import { createContext, useContext } from "react";
import { IGlobalContextData, IGlobalProviderProps } from "./types";
import { QueryClient, QueryClientProvider } from "react-query";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

export const GlobalContext = createContext<IGlobalContextData>(
  {} as IGlobalContextData
);

export const GlobalProvider = ({ children }: IGlobalProviderProps) => {
  const navigate = useNavigate();
  return (
    <GlobalContext.Provider value={{ navigate }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  return context;
};
