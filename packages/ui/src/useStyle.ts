import { createMemo } from "solid-js";
import { Elements, useAppearance } from "./appearance-context";
import { cn } from "./lib/utils/cn";

export const useStyle = () => {
  const appearance = useAppearance();
  const style = createMemo(() => {
    return (className: string, descriptor?: keyof Elements) => {
      const appearanceClassnames =
        descriptor && typeof appearance.elements[descriptor] === "string"
          ? appearance.elements[descriptor]
          : "";
      const appearanceCssInJs =
        descriptor && typeof appearance.elements[descriptor] === "object"
          ? appearance.elements[descriptor]
          : {};

      return cn(
        `nv-${descriptor}`, // this is the targetable classname for customers
        className, // default styles
        appearanceClassnames // overrides via appearance prop (TODO: Handle CSS in JS)
      );
    };
  });

  return style();
};
