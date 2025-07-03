/*
 * app.js
 * Enya App Entry Point - The Hub Pages
 * Created: Winter 2021
 * Purpose: The starting point for Enya's JS.
 */

import "../scss/main.scss";
import * as utils from "utils/utilities";
import * as dataLayer from "commonComponents/dataLayer";
import * as validation from './components/validation';
import * as hub from "./components/hub";

window.Enya = window.Enya || {};

// Pages can pass settings into Enya using this object.
window.pageConfigSettings = window.pageConfigSettings || {};

window.Enya.initEnyaModule = function() {
  dataLayer.init();
  hub.init();
  validation.init();

  // Expose certain elements to global scope, for convenience in the console and
  // for external scripts to hook into.
  window.Enya.hub = hub;
  window.Enya.validation = validation;
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
  pageTypeEnya: "thehub",
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
