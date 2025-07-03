/*
* urlParamsManager.js
* HSUS Engaging Networks Forms - Enya 2021
* Created: Winter 2021
* Purpose: Central place for managing the custom URL parameters that Enya 
* responds to. Also manages some built-in EN params, like transaction.donationAmt.
*
*/

import state from "commonComponents/stateManager";
import * as storageHelpers from "commonHelpers/storageHelpers";

// This is a URLSearchParams instance.
// See https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams for 
// what we can do with it.
let currentSearchParams;

/**
  * managedParameters is an array containing the names of all the custom params that Enya knows about. It also contains the names of some standard EN params, to make it easier for Enya to read their values.
  * Enya can save these parameters to session storage, too, if needed.
  * Add new custom URL param names to the array, and Enya will keep track of them in state.

  What the Params Mean
  * "v=m" sets a splash page to show the monthly donation form.
  * "ap=test" tells the donation form to use the test Apple Pay merchant ID, if available.
  * "sap=0" will disable and hide Apple Pay on a form.
  * "sfc=1" will show the fee cover checkbox, if available.
  * "cfc=1" will check the fee cover checkbox on page load, if available.
  * "rd_dfid=FORMID" will tell an advo which donation page to redirect to.
  * "stas=1" will scroll the page to the amount section on load.
  * "hp=1" will hide the premium section.
  * "hl=1" will show the Humane Leaders blurb (on select forms).
*/
export const managedParameters = [
  "transaction.donationAmt",
  "transaction.recurrpay",
  "transaction.paycurrency",
  "ea.tracking.id",
  "ea.profile.id",
  "v",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "en_txn6",
  "en_txn7",
  "en_txn8",
  "en_txn9",
  "en_txn10",
  "rd_dfid",
  "ap",
  "sfc",
  "sap",
  "cfc",
  "stas",
  "mode",
  "hp",
  "hl"
];

export function init() {
  initCurrentSearchParams();
  processManagedParameters();
}

function initCurrentSearchParams() {
  currentSearchParams = getCurrentSearchParams();
}

// Cycle through the list of custom params Enya knows about.
// If any are found and are valid, save them to state.
function processManagedParameters() {
  if (!managedParameters) return;

  managedParameters.forEach(managedParam => {
    checkURLForManagedParam(managedParam);
  });
}

function checkURLForManagedParam(managedParam) {
  if (!currentSearchParams) return;
  const managedParamValueInURL = currentSearchParams.get(managedParam);
  if (!managedParamValueInURL) return;
  saveManagedParamToState(managedParam, managedParamValueInURL);
}

function saveManagedParamToState(managedParamName, managedParamValue) {
  if (!state.activeURLParams) return;
  const trimmedValue = managedParamValue.trim().replace(/\s/g, "");
  state.activeURLParams[managedParamName] = trimmedValue;
}

// Save a set of parameters we care about to session storage.
export function storeManagedParameters() {
  const currentSearchParams = getCurrentSearchParams();
  if (!storageHelpers.isSessionStorageEnabled()) return;
  try {
    managedParameters.forEach(managedParam => {
      const urlParam = currentSearchParams.get(managedParam);
      if (urlParam && typeof urlParam === 'string' && urlParam.length) {
        sessionStorage.setItem(managedParam, urlParam);
      }
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: urlParamsManager.js:109 ~ storeManagedParameters: sessionStorage not available."
    );
    console.log(error);
  }
};

export function loadManagedParameters() {
  const params = [];
  if (!storageHelpers.isSessionStorageEnabled()) return;
  managedParameters.forEach(managedParam => {
    try {
      const storedParam = sessionStorage.getItem(managedParam);
      if (storedParam) {
        params.push({
          name: managedParam,
          value: storedParam
        });
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: urlParamsManager.js:129 ~ loadManagedParameters: sessionStorage not available."
      );
      console.log(error);
    }
  });
  return params.length ? params : false;
};

// Retrieve all the params from the current URL.
export function getCurrentSearchParams() {
  return new URLSearchParams(new URL(window.location).search);
}

export function removeManagedParameterFromStorage(managedParam = null) {
  if (!storageHelpers.isSessionStorageEnabled()) return;
  try {
    sessionStorage.removeItem(managedParam);
  } catch (error) {
    console.log(
      "🚀 ~ file: urlParamsManager.js:148 ~ removeManagedParameterFromStorage: sessionStorage not available."
    );
    console.log(error);
  }
}
