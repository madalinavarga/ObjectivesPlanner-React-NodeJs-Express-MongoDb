import { createContext, useState } from "react";

//Step 3
type Props = {
  children: React.ReactNode;
};

//Step 4 -> value/functions used by children
type ContextReturn = {
  token: string;
  setToken: (token: string) => void;
};

//Step 1 -> create context with type
export const RootContext = createContext<ContextReturn | undefined>(undefined);

//Step 2 create function ( naming convention "ContextProvider" -> Step 3 {children}
export function ContextProvider({ children }: Props) {
  const [token, setToken] = useState("");
  //mendatory value
  return <RootContext.Provider value={{ token, setToken }}>{children}</RootContext.Provider>;
}
