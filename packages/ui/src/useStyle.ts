import { createMemo, createSignal, onMount } from "solid-js";
import {
  CSSProperties,
  Elements,
  descriptorToCssInJsClass,
  useAppearance,
} from "./appearance-context";
import { cn } from "./lib/utils/cn";

export function cssObjectToString(styles: CSSProperties): string {
  return Object.entries(styles)
    .map(([key, value]) => {
      const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return `${kebabKey}: ${value};`;
    })
    .join(" ");
}

export function createClassFromCssString(
  styleElement: HTMLStyleElement,
  styles: string
) {
  const index = styleElement.sheet?.cssRules.length ?? 0;
  const className = `nv-css-${index}`;
  const rule = `.${className} { ${styles} }`;
  styleElement.sheet?.insertRule(rule, index);

  return className;
}

export const useStyle = () => {
  const appearance = useAppearance();
  const [isServer, setIsServer] = createSignal(true);

  onMount(() => {
    setIsServer(false);
  });

  const styleFuncMemo = createMemo(
    () => (className: string, descriptor?: keyof Elements) => {
      const appearanceClassname =
        descriptor && typeof appearance.elements?.[descriptor] === "string"
          ? (appearance.elements?.[descriptor] as string) || ""
          : "";

      return cn(
        descriptor ? `nv-${descriptor}` : "", // this is the targetable classname for customers
        className, // default styles
        appearanceClassname, // overrides via appearance prop classes
        descriptor && !isServer() ? descriptorToCssInJsClass[descriptor] : ""
      );
    }
  );

  return (className: string, descriptor?: keyof Elements) => {
    return styleFuncMemo()(className, descriptor);
  };
};
