/*
* footer.js
* HSUS Engaging Networks Forms - Enya 2021
* Created: Winter 2021
* Purpose: Manage the content of the footer.
*/

import state from "commonComponents/stateManager";
import * as internationalizer from "commonComponents/internationalizer";

let nonprofitTextVersions, donorCareTextVersions;
let copyrightHolder;

export function init() {
  initFooterContent();
  moveCustomText();
}

function initFooterContent() {
  // For HSI, show the correct version of the footer for the user's country.
  if (state.thisPage.isHSI) {
    let countrySettings;
    initFooterTextVersions();
    if (internationalizer.userCountryReady) {
      countrySettings = internationalizer.getCountrySettings();
      showFooterContentForCountry(countrySettings);
    } else {
      // On some forms, we're ignoring the country detection, so we need to call
      // this manually.
      if (state.thisPage?.ignoreDetectedCountry || state.thisPage?.isFriendsHSIForm) {
        showFooterContentForCountry(countrySettings);
      }
      document.addEventListener("enyaLocationDataReady", function() {
        countrySettings = internationalizer.getCountrySettings();
        showFooterContentForCountry(countrySettings);
      });
    }

    // Add fail-safe, if location data doesn't arrive within a certain timespan.
    setTimeout(() => {
      if (!internationalizer.userCountryReady) {
        countrySettings = internationalizer.getCountrySettings();
        showFooterContentForCountry(countrySettings);
      }
    }, 10000);
  }

  initCopyrightHolder();
}

function initFooterTextVersions() {
  nonprofitTextVersions = document.querySelectorAll(
    "#page-footer .nonprofit-text"
  );
  donorCareTextVersions = document.querySelectorAll(
    "#page-footer .donor-care-text"
  );
}

function showFooterContentForCountry(countrySettings) {
  let footerVersion;

  if (typeof countrySettings !== "undefined" &&
      typeof countrySettings.donationFooterVersion !== "undefined") {
    footerVersion = countrySettings.donationFooterVersion.toLowerCase();
  }

  // For UK form, we need to always show the UK version.
  if (state.thisPage.isUKForm) {
    footerVersion = "gb";
  }

  // For Friends of HSI form, we need to always show that version.
  if (state.thisPage.isFriendsHSIForm) {
    footerVersion = "friends-hsi";
  }
  switchFooterVersions(footerVersion);
}

// Move custom text from its text block to a spot in the footer.
function moveCustomText() {
  const customText = document.querySelector(".footer-custom-text-content");
  if (!customText) return;

  const customTextContainer = document.querySelector(
    ".footer-custom-text-container"
  );
  if (!customTextContainer) return;

  customTextContainer.appendChild(customText);
  customTextContainer.classList.remove("hidden");
}

export function updateFooterForCurrency(currency) {
  if (state.thisPage.isFriendsHSIForm) return;
  const footerVersion = getFooterVersionForCurrency(currency).toLowerCase();
  switchFooterVersions(footerVersion);
}

function switchFooterVersions(footerVersion) {
  if (!nonprofitTextVersions || !donorCareTextVersions) return;

  nonprofitTextVersions.forEach(element => {
    element.classList.remove("hidden");
    if (element.classList.contains(`nonprofit-text-${footerVersion}`)) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  });
  donorCareTextVersions.forEach(element => {
    element.classList.remove("hidden");
    if (element.classList.contains(`donor-care-text-${footerVersion}`)) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  });
}

function getFooterVersionForCurrency(currency) {
  let footerVersion = "default";
  switch (currency) {
    case "USD":
    case "AUD":
      footerVersion = "default";
      break;
    case "CAD":
      footerVersion = "CA";
      break;
    case "EUR":
      footerVersion = "EU";
      break;
    case "GBP":
      footerVersion = "GB";
      break;
    default:
      break;
  }
  return footerVersion;
}

function initCopyrightHolder() {
  copyrightHolder = document.querySelector("#page-footer .copyright-holder");
  if (!copyrightHolder) return;

  // Update for Friends form.
  if (state.thisPage.isFriendsHSIForm && !state.thisPage.isFrench) {
    copyrightHolder.textContent = "Friends of Humane Society International";
  }
}
