/*
* app.js
* Enya App Entry Point - Donation Pages
* Created: Winter 2021
* Purpose: The starting point for Enya's JS.
*/

import state, { initState } from "commonComponents/stateManager";
import * as sentry from "commonComponents/sentry";
import * as urlParamsManager from "commonComponents/urlParamsManager";
import * as pageManager from "commonComponents/pageManager";
import * as dataLayer from "commonComponents/dataLayer";
import * as donationForm from "./components/donationForm";
import * as validation from "./components/validation";
import * as consentModal from "commonComponents/consentModal";
import * as monthlyModal from "./components/monthlyModal";
import * as pgUpsellModal from "./components/pgUpsellModal";

import * as thanksManager from "./components/thanksManager";
import * as utils from "utils/utilities";
import * as spinner from "commonComponents/spinner";
import * as internationalizer from "commonComponents/internationalizer";
import * as geolocator from "commonComponents/geolocator";
import * as redirector from "./components/redirector";

import "../scss/main.scss";

// Initialize our JS error-monitoring service.
sentry.init();

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

  dataLayer.init();

  // Process any custom URL params. These include built-in EN params like 
  // transaction.donationAmt.
  urlParamsManager.init();

  if (state.thisPage.isHSI) {
    // We need to init the redirector before the geolocator, because the
    // geolocator relies on data that the redirector has after init.
    redirector.init();
    geolocator.init();
    internationalizer.init();
  }

  if (!state.thisPage.isThanksPage) {
    donationForm.init();
    validation.init();
    // Wait to initialize the modals until the page has fully loaded.
    window.addEventListener('load', e => {
      consentModal.init();
      monthlyModal.init();
    });

    // Add fail-safe, if location data doesn't arrive within a certain timespan.
    setTimeout(() => {
      if (state.thisPage.enableEmailConsentModal && !consentModal.modalInited) {
        consentModal.init();
      }
    }, 10000);
  } else {
    thanksManager.init();
    pgUpsellModal.init();
  }

  // Expose certain elements to global scope, for convenience in the console and for external scripts to hook into.
  window.Enya.state = state;
  window.Enya.utils = utils;
  window.Enya.spinner = spinner;
  if (!state.thisPage.isThanksPage) {
    window.Enya.showMonthlyModal = monthlyModal.showMonthlyModal;
    window.Enya.donationForm = donationForm;
  }

  // Update the currently selected amount.
  // Fixes this bug: https://github.com/hsus/project-enya/issues/255
  if (typeof state.thisPage.amountObject !== "undefined") {
    setTimeout(() => {
      state.thisPage.amountObject.load();
    }, 500);
  }

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
  pageTypeEnya: "donation",
  submitLabel: "Donate",
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

// Commenting to trigger a commit, so we can make a pull request.
