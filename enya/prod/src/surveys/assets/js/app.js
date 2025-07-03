/*
* app.js
* Enya App Entry Point - Survey and Signup Pages
* Created: Winter 2021
* Purpose: The starting point for Enya's JS for email sign-up, survey, data
* capture, and email subscription pages.
*/

import '../scss/main.scss';
import state, { initState } from "commonComponents/stateManager";
import * as pageManager from "commonComponents/pageManager";
import * as utils from "utils/utilities";
import * as dataLayer from "commonComponents/dataLayer";
import * as urlParamsManager from "commonComponents/urlParamsManager";
import * as surveyForm from './components/surveyForm';
import * as consentModal from "commonComponents/consentModal";
import * as internationalizer from "commonComponents/internationalizer";
import * as geolocator from "commonComponents/geolocator";

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

  if (state.thisPage.isHSI && !state.thisPage.isThanksPage) {
    // Start the geolocator. We do this here so that we get the location data as
    // early as possible.
    geolocator.init();

    internationalizer.init();
  }

  dataLayer.init();

  // Process any custom URL params. These include built-in EN params.
  urlParamsManager.init();

  surveyForm.init();

  if (!state.thisPage.isThanksPage) {
    // Wait to initialize the modals until the page has fully loaded.
    window.addEventListener("load", (e) => {
      consentModal.init();
    });

    // Add fail-safe, if location data doesn't arrive within a certain timespan.
    setTimeout(() => {
      if (state.thisPage.enableEmailConsentModal && !consentModal.modalInited) {
        consentModal.init();
      }
    }, 10000);
  }

  // Expose certain elements to global scope, for convenience in the console and
  // for external scripts to hook into.
  window.Enya.state = state;
  window.Enya.surveyForm = surveyForm;
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
  pageTypeEnya: "survey",
  submitLabel: "Submit",
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
