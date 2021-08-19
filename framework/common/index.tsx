import { createContext, ReactNode, useContext } from "react";
import { getConfig } from "@framework/api/config";

const ApiContext = createContext({});
const config = getConfig();

interface ApiProviderProps {
  children: ReactNode | ReactNode[];
}

export const ApiProvider = ({ children }: ApiProviderProps) => {
  return <ApiContext.Provider value={config}>{children}</ApiContext.Provider>;
};

export const useApiProvider = () => {
  return useContext(ApiContext);
};
