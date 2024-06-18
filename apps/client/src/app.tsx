import { Inbox } from "@repo/ui";
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, createSignal } from "solid-js";
import "./app.css";

export default function App() {
  const [color, setColor] = createSignal("black");
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>SolidStart - Basic</Title>
          <a href="/">Index</a>
          <a href="/about">About</a>
          <Inbox
            appearance={{
              variables: {
                colors: {
                  primary: "#ebb523", //orange
                },
              },
              elements: {
                button: {
                  backgroundColor: "var(--novu-colors-primary-900)",
                }, // can also do var(--novu-colors-primary-alpha-100)
              },
            }}
          />
          <button>solid start button</button>
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
