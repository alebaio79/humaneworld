/*
 * app.js
 * Enya App Entry Point - Ecards
 * Created: Summer 2021
 * Purpose: The starting point for Enya's JS for ecard pages.
 */
import state, { initState } from "commonComponents/stateManager";
import * as urlParamsManager from "commonComponents/urlParamsManager";
import * as pageManager from "commonComponents/pageManager";
import * as dataLayer from "commonComponents/dataLayer";
import * as ecardForm from "./components/ecardForm";
import * as validation from "./components/validation";
import * as thanksManager from "./components/thanksManager";
import * as utils from "utils/utilities";

import "../scss/main.scss";

window.Enya = window.Enya || {};

// Pages can pass settings into Enya using this object.
window.pageConfigSettings = window.pageConfigSettings || {};

window.Enya.initEnyaModule = function(enyaOptions) {
  // Process the options passed in, saving them to our global state object.
  initState(enyaOptions);

  // Process any custom URL params.
  urlParamsManager.init();

  // Detect the page type and set up the page layout watcher.
  pageManager.init();

  dataLayer.init();

  if (!state.thisPage.isThanksPage) {
    ecardForm.init();
    validation.init();
  } else {
    thanksManager.init();
  }

  // Expose certain elements to global scope, for convenience in the console and
  // for external scripts to hook into.
  window.Enya.state = state;
  window.Enya.utils = utils;

  // Fire an event telling the page that Enya has finished initializing.
  const enyaReady = new Event("enyaReady");
  document.dispatchEvent(enyaReady);
  console.groupCollapsed(`This is Enya. 🐇`);
  console.info(`Page type: ${pageSettings.pageTypeEnya}`);
  console.info(`Branch: ${BRANCH}`);
  console.info(`Last commit time: ${LASTCOMMITDATETIME}`);
  console.info(`Last commit hash: ${COMMITHASH.substring(0, 8)}`);
  console.groupEnd();
};

const pageSettings = {
  pageTypeEN: window?.pageJson?.pageType || "",
  pageTypeEnya: "ecard",
  ...window.pageConfigSettings
};

const enyaModuleOptions = {
  pageSettings
};

// Let's kickstart this thing.
if (document.readyState !== "loading") {
  window.Enya.initEnyaModule(enyaModuleOptions);
} else {
  document.addEventListener("DOMContentLoaded", function() {
    window.Enya.initEnyaModule(enyaModuleOptions);
  });
}
