/*
* sentry.js
* HSUS Engaging Networks Forms - Enya 2022
* Created: Summer 2022
* Purpose: Monitor JS errors using the Sentry service.
* Note: Installation and setup article for Sentry here:
* https://docs.sentry.io/platforms/javascript/
*/

import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

// This DSN is the project-specific one for donation forms. Get it from Sentry
// JS install article, or from this page:
// https://sentry.io/settings/[account-name]/projects/[project-name]/keys/
let sentryDsn = "https://c9b4d6038f1d4e688241f8fd9ee31ddd@o1327460.ingest.sentry.io/6588438";

// Set this to whatever we want. Or use `process.env.npm_package_version` for a
// dynamic release version.
let sentryRelease = "donation-forms@1.0.0";

// Set tracesSampleRate to 1.0 to capture 100% of transactions for performance
// monitoring. Change this to a lower value for production.
const sentrySampleRate = 0.05;

export function init(projectName = "") {
  if (projectName === "advocacy-forms") {
    sentryDsn = "https://ec7223fbe5f5419586b8d6a63cfe66c4@o1327460.ingest.sentry.io/4504181013741568";
    sentryRelease = "advocacy-forms@1.0.0";
  }

  Sentry.init({
    dsn: sentryDsn,
    release: sentryRelease,
    integrations: [new BrowserTracing()],
    tracesSampleRate: sentrySampleRate
  });
}
