import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from '@sentry/browser';

import App from "./App";

Sentry.init({dsn: "https://98316c0e57574ee7afdfca9dc6f29f67@o263555.ingest.sentry.io/5223763"});

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
