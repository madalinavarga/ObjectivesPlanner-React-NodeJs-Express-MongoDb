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
    if (!token) return;

    const timeout = setTimeout(() => {
      getRefreshToken();
    }, 13 * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [token]);

  const getRefreshToken = async () => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    const newToken = await refreshToken(tokenFromLocalStorage!);
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  //mendatory value
  return <RootContext.Provider value={{ token, setToken }}>{children}</RootContext.Provider>;
}
