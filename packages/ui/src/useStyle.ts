import { createMemo } from "solid-js";
import { Elements, useAppearance } from "./appearance-context";
import { cn } from "./lib/utils/cn";

export const useStyle = () => {
  const appearance = useAppearance();
  const style = createMemo(() => {
    return (classNames: string, descriptor?: keyof Elements) => {
      return cn(
        `nv-${descriptor}`, // this is the targetable classname for customers
        classNames, // default novu styles
        descriptor ? appearance.elements[descriptor] : "" // overrides via appearance prop (TODO: Handle CSS in JS)
      );
    };
  });

  return style();
};
