/*
* app.js
* Enya App Entry Point - Splash Pages
* Created: Summer 2021
* Purpose: The starting point for Enya's JS for splash pages.
*/
import state, { initState } from "commonComponents/stateManager";
import * as urlParamsManager from "commonComponents/urlParamsManager";
import * as pageManager from "commonComponents/pageManager";
import * as utils from "utils/utilities";
import * as layout from "./components/layout";
import * as donation from "./components/donation";
import * as popovers from "./components/popovers";

import "../scss/main.scss";

window.Enya = window.Enya || {};

// Pages can pass settings into Enya using this object.
window.splashSettings = window.splashSettings || {};

window.Enya.initEnyaModule = function(enyaOptions) {
  // Process the options passed in, saving them to our global state object.
  initState(enyaOptions);

  // Process any custom URL params.
  urlParamsManager.init();

  // Splash pages have a small layout manager of their own.
  // We need to initialize the splash layout component before the main
  // pageManager, so we can register our event listener first.
  layout.init();

  // Detect the page type and set up the page layout watcher.
  pageManager.init();

  donation.init();

  popovers.init();

  // Expose certain elements to global scope, for convenience in the console and for external scripts to hook into.
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
  pageTypeEnya: "splash",
  ...window.splashSettings
};

const enyaModuleOptions = {
  pageSettings
};

if (document.readyState !== "loading") {
  // Let's kickstart this thing.
  window.Enya.initEnyaModule(enyaModuleOptions);
} else {
  document.addEventListener("DOMContentLoaded", function() {
    window.Enya.initEnyaModule(enyaModuleOptions);
  });
}
