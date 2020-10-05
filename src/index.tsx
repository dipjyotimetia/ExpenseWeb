import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import App from "./App";

Sentry.init({
    dsn: "https://98316c0e57574ee7afdfca9dc6f29f67@o263555.ingest.sentry.io/5223763",
    integrations: [
      new Integrations.BrowserTracing(),
    ],
    tracesSampleRate: 1.0,
  });

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
