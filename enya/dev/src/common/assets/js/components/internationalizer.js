/*
* internationalizer.js
* HSUS Engaging Networks Forms - Enya 2022
* Created: Spring 2022
* Purpose: Manages settings that depend on the user's country/locale.
*/

import state from "./stateManager";
import * as geolocator from "./geolocator";

let userCountry;
export let userCountryReady = false;

// Default settings are most conservative/GDPR-compliant.
const countrySettings = {
  precheckEmailOptIn: false,
  enableEmailModal: true,
  showGiftAid: false,
  showMobilePhone: false,
  precheckSMS: false,
  donationFooterVersion: "default"
};

export function init() {
  initUserCountry();
}

function initUserCountry() {
  if (state.thisPage.enyaLocationDataReady) {
    userCountry = geolocator.getLocationCountry();
    userCountryReady = true;
    updateSettingsForCountry();
  } else {
    document.addEventListener("enyaLocationDataReady", function() {
      userCountry = geolocator.getLocationCountry();
      userCountryReady = true;
      updateSettingsForCountry();
    });
  }

  // Add fail-safe, if location data doesn't arrive within a certain timespan.
  setTimeout(() => {
    if (!state.thisPage.enyaLocationDataReady) {
      updateSettingsForCountry();
    }
  }, 10000);
}

function updateSettingsForCountry() {
  if (userCountry) {
    setPrecheckEmailOptIn();
    setPrecheckSMS();
    setEnableEmailModal();
    setShowGiftAid();
    setShowMobilePhone();
    setDonationFooterVersion();
  }

  // Every time we change country settings here, we need to update state.
  saveCountrySettingsToState();
}

export function getCountrySettings() {
  return countrySettings;
}

function saveCountrySettingsToState() {
  // Save the updated settings to state.
  state.countrySettings = countrySettings;
}

function setPrecheckEmailOptIn() {
  if (!userCountry) return;
  countrySettings.precheckEmailOptIn = shouldPrecheckEmail();
}

function setPrecheckSMS() {
  if (!userCountry) return;
  countrySettings.precheckSMS = shouldPrecheckSMS();
}

function setEnableEmailModal() {
  if (!userCountry) return;
  if (countrySettings.precheckEmailOptIn) {
    countrySettings.enableEmailModal = false;
  }
}

function setShowGiftAid() {
  if (!userCountry) return;
  if (userCountry.code === "GB") {
    countrySettings.showGiftAid = true;
  }
}

function setShowMobilePhone() {
  if (!userCountry) return;
  if (userCountry.code === "US") {
    countrySettings.showMobilePhone = true;
  }
}

function shouldPrecheckEmail() {
  if (!userCountry) return false;
  const dontPrecheckList = [
    "GB",
    "CA"
  ];
  if (userCountry.isInEU || dontPrecheckList.includes(userCountry.code)) {
    return false;
  } else {
    return true;
  }
}

function shouldPrecheckSMS() {
  if (!userCountry) return false;
  if (userCountry.code === "US") {
    return true;
  } else {
    return false;
  }
}

function setDonationFooterVersion() {
  if (!userCountry) return;

  if (userCountry.isInEU) {
    countrySettings.donationFooterVersion = "EU";
  } else {
    switch (userCountry.code) {
      case "US":
      case "AU":
        countrySettings.donationFooterVersion = "default";
        break;
      case "CA":
        countrySettings.donationFooterVersion = "CA";
        break;
      case "GB":
        countrySettings.donationFooterVersion = "GB";
        break;
      default:
        // Do nothing. Leave at default value.
    }
  }
}
