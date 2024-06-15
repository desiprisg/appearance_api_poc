import {
  AppearanceContextType,
  AppearanceProvider,
} from "./appearance-context";
import { useStyle } from "./useStyle";

type InboxProps = {
  appearance?: AppearanceContextType;
};

export const Inbox = (props: InboxProps) => {
  return (
    <AppearanceProvider elements={props.appearance?.elements}>
      <InternalInbox />
    </AppearanceProvider>
  );
};

const InternalInbox = () => {
  const style = useStyle();
  return (
    <div class="novu">
      <button class={style("nv-bg-red-500", "button")}>test</button>
    </div>
  );
};
