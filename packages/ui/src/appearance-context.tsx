import { ParentProps, createContext, useContext } from "solid-js";

export type Elements = {
  button?: string;
  root?: string;
};

export type AppearanceContextType = {
  elements: Elements;
};

const AppearanceContext = createContext<AppearanceContextType | undefined>(
  undefined
);

type AppearanceProviderProps = ParentProps & {
  elements?: Elements;
};

export const AppearanceProvider = (props: AppearanceProviderProps) => {
  return (
    <AppearanceContext.Provider value={{ elements: props.elements || {} }}>
      {props.children}
    </AppearanceContext.Provider>
  );
};

export function useAppearance() {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error("useAppearance must be used within an AppearanceProvider");
  }
  return context;
}
