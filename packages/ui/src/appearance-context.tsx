import { ParentProps, createContext, useContext } from "solid-js";

export type CSSProperties = {
  [key: string]: string | number;
};

export type ElementStyles = string | CSSProperties;

export type Elements = {
  button?: ElementStyles;
  root?: ElementStyles;
};

export type AppearanceContextType = {
  elements: Elements;
  styleElement: HTMLStyleElement | null;
};

const AppearanceContext = createContext<AppearanceContextType | undefined>(
  undefined
);

type AppearanceProviderProps = ParentProps & {
  elements?: Elements;
};

export const AppearanceProvider = (props: AppearanceProviderProps) => {
  let styleElement: HTMLStyleElement | null = null;

  if (typeof window !== "undefined") {
    styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
  }

  return (
    <AppearanceContext.Provider
      value={{ elements: props.elements || {}, styleElement }}
    >
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
