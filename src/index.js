import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";
import "react-virtualized/styles.css";

import "./assets/css/style.css";

import App from "./app";
import withStyledComponentSSR from "./HOC/withStyledComponentSSR";
import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://7f0d00fb2bb84ad5a3fc961253482a93@o4504433520082944.ingest.sentry.io/4504433608425472",
  integrations: [new BrowserTracing()],
  environment: process.env.NODE_ENV || 'unknown',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

export default withStyledComponentSSR(App);
