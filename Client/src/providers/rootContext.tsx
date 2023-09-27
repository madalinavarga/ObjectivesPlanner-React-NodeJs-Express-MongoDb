import { createContext, useEffect, useState } from "react";
import { refreshToken } from "../services/auth";

//Step 3
type Props = {
  children: React.ReactNode;
};

//Step 4 -> value/functions used by children
type ContextReturn = {
  token: string;
  setToken: Function; // (token: string) => void;
};

//Step 1 -> create context with type
export const RootContext = createContext<ContextReturn | undefined>(undefined);

//Step 2 create function ( naming convention "ContextProvider" -> Step 3 {children}
export function ContextProvider({ children }: Props) {
  const [token, setToken] = useState("");

  useEffect(() => {
    setTimeout(() => {
      getRefreshToken(token);
    }, 14 * 1000 * 60);
  }, [token]);

  const getRefreshToken = async (token: string) => {
    const newToken = await refreshToken(token);
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  //mendatory value
  return <RootContext.Provider value={{ token, setToken }}>{children}</RootContext.Provider>;
}
