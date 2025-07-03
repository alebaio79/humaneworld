/*
* app.js
* Enya App Entry Point - Advocacy Pages
* Created: Winter 2021
* Purpose: The starting point for Enya's JS.
*/

import "../scss/main.scss";
import state, { initState } from "commonComponents/stateManager";
import * as sentry from "commonComponents/sentry";
import * as validation from './components/validation';
import * as pageManager from "commonComponents/pageManager";
import * as utils from "utils/utilities";
import * as dataLayer from "commonComponents/dataLayer";
import * as advocacyForm from "./components/advocacyForm";
import * as consentModal from "commonComponents/consentModal";
import * as internationalizer from "commonComponents/internationalizer";
import * as geolocator from "commonComponents/geolocator";
import * as french from "./components/lang/french";

// Initialize our JS error-monitoring service.
sentry.init("advocacy-forms");

window.Enya = window.Enya || {};

// Pages can pass settings into Enya using this object.
window.pageConfigSettings = window.pageConfigSettings || {};

window.Enya.initEnyaModule = function(enyaOptions) {
  // Process the options passed in, saving them to our global state object.
  initState(enyaOptions);

  // Detect the page type and set up the page layout watcher. This call needs to
  // happen before the calls to redirector, geolocator, and internationalizer,
  // because we need to detect error pages and thanks pages right at the top.
  pageManager.init();

  if (state.thisPage.isFrench) {
    french.init();
  }

  if (state.thisPage.isHSI && !state.thisPage.isThanksPage) {
    // Start the geolocator. We do this here so that we get the location data as
    // early as possible.
    geolocator.init();

    internationalizer.init();
  }

  dataLayer.init();

  advocacyForm.init();

  // The load order is causing consentModal.init() to run before
  // state.thisPage.enableEmailConsentModal has been set.
  // No reason to initialize the modal until the page has fully loaded.
  window.addEventListener("load", (e) => {
    consentModal.init();
  });

  validation.init();

  // Expose certain elements to global scope, for convenience in the console and
  // for external scripts to hook into.
  window.Enya.state = state;
  window.Enya.advocacyForm = advocacyForm;
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
  pageTypeEnya: "advocacy",
  ...window.pageConfigSettings
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
