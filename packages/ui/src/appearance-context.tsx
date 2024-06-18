import { ParentProps, createContext, onMount, useContext } from "solid-js";
import { NOVU_CSS_IN_JS_STYLESHEET_ID } from "./constants";
import { createClassFromCssString, cssObjectToString } from "./useStyle";

export type CSSProperties = {
  [key: string]: string | number;
};

export type ElementStyles = string | CSSProperties;

export type Elements = {
  button?: ElementStyles;
  root?: ElementStyles;
};

export type Variables = {
  colors: {
    primary: string;
  };
};

export type AppearanceContextType = {
  variables?: Variables;
  elements?: Elements;
};

const AppearanceContext = createContext<AppearanceContextType | undefined>(
  undefined
);

type AppearanceProviderProps = ParentProps & {
  elements?: Elements;
};

export const descriptorToCssInJsClass: Record<string, string> = {};

export const AppearanceProvider = (props: AppearanceProviderProps) => {
  let styleElement!: HTMLStyleElement;

  onMount(() => {
    for (const key in props.elements) {
      const elements = props.elements;
      if (elements.hasOwnProperty(key)) {
        const value = elements[key as keyof Elements];
        if (typeof value === "object") {
          // means it is css in js object
          const cssString = cssObjectToString(value);
          const classname = createClassFromCssString(styleElement, cssString);
          descriptorToCssInJsClass[key] = classname;
        }
      }
    }
  });

  return (
    <>
      {/* elements CSS in JS stylesheet */}
      <style
        ref={(el) => {
          styleElement = el;
        }}
        scoped
        id={NOVU_CSS_IN_JS_STYLESHEET_ID}
      />
      <AppearanceContext.Provider value={{ elements: props.elements || {} }}>
        {props.children}
      </AppearanceContext.Provider>
    </>
  );
};

export function useAppearance() {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error("useAppearance must be used within an AppearanceProvider");
  }
  return context;
}
