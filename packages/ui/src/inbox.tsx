import {
  AppearanceContextType,
  AppearanceProvider,
} from "./appearance-context";
import { useStyle } from "./useStyle";

type InboxProps = {
  appearance?: Pick<AppearanceContextType, "elements" | "variables">;
};

export const Inbox = (props: InboxProps) => {
  return (
    <AppearanceProvider
      elements={props.appearance?.elements}
      variables={props.appearance?.variables}
    >
      <InternalInbox />
    </AppearanceProvider>
  );
};

const InternalInbox = () => {
  const style = useStyle();

  return (
    <div class={style("novu", "root")}>
      <button class={style("tw-bg-red-500", "button")}>test</button>
    </div>
  );
};
