/*
* app.js
* Enya App Entry Point - Event Pages
* Created: Winter 2021
* Purpose: The starting point for Enya's Event JS.
*/

import "../scss/main.scss";
import * as pageManager from "commonComponents/pageManager";
import * as dataLayer from "commonComponents/dataLayer";
import * as utils from "utils/utilities";
import * as validation from "./components/validation";
import * as eventForm from "./components/eventForm";

window.Enya = window.Enya || {};

// Pages can pass settings into Enya using this object.
window.pageConfigSettings = window.pageConfigSettings || {};

window.Enya.initEnyaModule = function() {
  pageManager.init();
  dataLayer.init();
  eventForm.init();
  validation.init();

  // Expose certain elements to global scope, for convenience in the console and
  // for external scripts to hook into.
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
  pageTypeEnya: "event",
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
