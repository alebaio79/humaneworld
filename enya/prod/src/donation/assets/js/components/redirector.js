/*
* redirector.js
* HSUS Engaging Networks Forms - Enya 2022
* Created: Spring 2022
* Purpose: Manage the redirect behavior for HSI's UK and non-UK forms.
* Notes:
* Each HSI donation form is really two forms: a "global" form and a
* UK-only form. This is necessary because we use a different gateway provider
* for UK forms, and EN doesn't allow us to have multiple gateway providers on
* a single donation form.
*
* The "sister" forms need to redirect to one another. One thing that triggers
* the redirect is a change in the selected currency.
*/

import state from "commonComponents/stateManager";
import * as urlParamsManager from "commonComponents/urlParamsManager";
import * as pageHelpers from "commonHelpers/pageHelpers";
import * as storageHelpers from "commonHelpers/storageHelpers";

export let currentFormID = null;
export let sisterFormID = null;
const hsusBaseURL = "https://secured.humanesociety.org/page/";
const hsiBaseURL = "https://donate.hsi.org/page/";
let hasRedirected = false;

export function init() {
  initCurrentFormID();
  initSisterFormID();
  // Save all the params we care about in session storage, so we can re-create
  // them when we redirect.
  urlParamsManager.storeManagedParameters();
}

function initCurrentFormID() {
  currentFormID = pageHelpers.getPageId();
}

function initSisterFormID() {
  if (state.thisPage.isHSI) {
    if (typeof window.pageJson.externalReference7 !== "undefined") {
      sisterFormID = window.pageJson.externalReference7;
    }
  }
}

export function redirect() {
  if (state.thisPage.selectedCurrency === "GBP") {
    if (!state.thisPage.isUKForm) {
      hasRedirected = true;
      saveRedirectFlagToStorage();
      redirectToSister();
    }
  } else {
    if (state.thisPage.isUKForm) {
      hasRedirected = true;
      saveRedirectFlagToStorage();
      redirectToSister();
    }
  }
}

function redirectToSister() {
  if (sisterFormID) {
    const sisterFormURL = getDonationURLForID(sisterFormID);
    if (sisterFormURL) {
      window.location.href = sisterFormURL;
    } else {
      console.error("Can't redirect because sisterFormURL isn't valid.");
    }
  } else {
    console.error("Can't redirect because sisterFormID isn't valid.");
  }
}

function getDonationURLForID(formID = "") {
  let baseURL, newURL;
  const currentURL = new URL(window.location.href);

  if (state.thisPage.isHSI) {
    baseURL = hsiBaseURL;
  } else {
    baseURL = hsusBaseURL;
  }

  if (formID) {
    newURL = new URL(`${baseURL}${formID}/donate/1`);
    const managedParams = urlParamsManager.loadManagedParameters();
    const searchParams = new URLSearchParams(currentURL.search);

    // We always need to remove the "val" param when redirecting. That gets
    // added by EN server when an error is returned. If we leave that param in
    // the URL, we get a redirect loop.
    searchParams.delete("val");

    if (managedParams) {
      managedParams.forEach(thisParam => {
        searchParams.set(thisParam.name, thisParam.value);
      });
      newURL.search = searchParams.toString();
    }
  }

  return newURL;
}

function saveRedirectFlagToStorage() {
  if (!storageHelpers.isSessionStorageEnabled()) return;
  try {
    sessionStorage.setItem("enyaHasRedirected", hasRedirected);
  } catch (error) {
    console.log(
      "🚀 ~ file: redirector.js:112 ~ saveRedirectFlagToStorage: sessionStorage not available."
    );
    console.log(error);
  }
}

export function getRedirectFlagFromStorage() {
  let flag;
  if (!storageHelpers.isSessionStorageEnabled()) return;
  try {
    flag = sessionStorage.getItem("enyaHasRedirected");
  } catch (error) {
    console.log(
      "🚀 ~ file: redirector.js:125 ~ getRedirectFlagFromStorage: sessionStorage not available."
    );
    console.log(error);
  }
  return flag;
}

export function removeRedirectFlagFromStorage() {
  if (!storageHelpers.isSessionStorageEnabled()) return;
  try {
    sessionStorage.removeItem("enyaHasRedirected");
  } catch (error) {
    console.log(
      "🚀 ~ file: redirector.js:138 ~ removeRedirectFlagFromStorage: sessionStorage not available."
    );
    console.log(error);
  }
}
