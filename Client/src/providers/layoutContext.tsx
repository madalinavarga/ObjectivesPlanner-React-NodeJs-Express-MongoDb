import { createContext, useState, useContext } from "react";

type Props = {
  children: React.ReactNode;
};

type ContextReturn = {
  selectedId: string | undefined;
  setSelectedId: Function;
  sectionName: string | undefined
  setSectionName: Function
};

const LayoutContext = createContext<ContextReturn | undefined>(undefined);

export function WraperLayout({ children }: Props) {
  const [selectedId, setSelectedId] = useState();
  const [sectionName, setSectionName] = useState();

  return (
    <LayoutContext.Provider value={{ selectedId, setSelectedId,sectionName, setSectionName }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}

export default LayoutContext;
