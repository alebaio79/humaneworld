/*
* geolocator.js
* HSUS Engaging Networks Forms - Enya 2022
* Created: Spring 2022
* Purpose: Interface to our geolocation service.
*/

import state from "./stateManager";
import * as storageHelpers from "commonHelpers/storageHelpers";

const locatorServicePrimary = "MaxMind";

// We set undefined properties to null here so that JSON.stringify will save
// them. Otherwise, if they're set to undefined, JSON.stringify throws them out,
// by default.
let enyaLocationData = {
  countryCode: null,
  countryName: null,
  continentCode: null,
  continentName: null,
  isInEU: null
};

export function init() {
  initLocationData();
}

export function getLocationCountry() {
  return {
    code: enyaLocationData.countryCode,
    name: enyaLocationData.countryName,
    isInEU: enyaLocationData.isInEU
  };
}

// Check session storage for data. If there, use that, and don't call the
// service.
function initLocationData() {
  const enyaLocationDataFromStorage = getLocationDataFromStorage();
  if (enyaLocationDataFromStorage === null) {
    if (locatorServicePrimary === "MaxMind") {
      callMaxMind();
    } else {
      console.log("We can only talk to MaxMind right now. Sorry.");
    }
  } else {
    enyaLocationData = enyaLocationDataFromStorage;
    setLocationReady();
  }
}

// Retrieve the location data from storage if it doesn't exceed the max age.
// Check the timestamp and toss out the data if it's too old.
function getLocationDataFromStorage() {
  const maxAgeAllowedInHours = 6;
  const maxAgeAllowedInMilliseconds = maxAgeAllowedInHours * 60 * 60 * 1000;
  const now = new Date().getTime();

  // We want locationDataFromStorage to be null by default, reliably.
  let locationDataFromStorage = null;
  let enyaLocationDataCreated = null;

  if (!storageHelpers.isLocalStorageEnabled()) return null;

  try {
    enyaLocationDataCreated = localStorage.getItem("enyaLocationDataCreated");
    if (enyaLocationDataCreated === null) {
      // There's no timestamp, so return null.
      // We don't want to use the data if there's no timestamp, so remove it.
      localStorage.removeItem("enyaLocationData");
      return null;
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: geolocator.js:74 ~ getLocationDataFromStorage: localStorage not available."
    );
    console.log(error);
    return null;
  }

  const ageOfLocationData = now - enyaLocationDataCreated;

  if (!isNaN(ageOfLocationData) && ageOfLocationData <= maxAgeAllowedInMilliseconds) {
    locationDataFromStorage = localStorage.getItem("enyaLocationData");
  }

  // Convert all "null-ish" values to actual null.
  if (locationDataFromStorage === null || locationDataFromStorage === undefined || locationDataFromStorage.trim() === "") {
    locationDataFromStorage = null;
  } else {
    locationDataFromStorage = JSON.parse(locationDataFromStorage);
  }
  return locationDataFromStorage;
}

function saveLocationDataToStorage() {
  const now = new Date().getTime();
  if (!storageHelpers.isLocalStorageEnabled()) return;
  try {
    localStorage.setItem("enyaLocationDataCreated", now);
    localStorage.setItem("enyaLocationData", JSON.stringify(enyaLocationData));
  } catch (error) {
    console.log(
      "🚀 ~ file: geolocator.js:101 ~ saveLocationDataToStorage: localStorage not available."
    );
    console.log(error);
  }
}

function callMaxMind() {
  if (typeof window.geoip2 !== 'undefined') {
    window.geoip2.country(onMaxMindSuccess, onMaxMindError);
  }
}

const onMaxMindSuccess = function(maxMindSuccessResponse) {
  // Copy MaxMind values to a standard location data object that we can use
  // for any service's results.
  enyaLocationData.countryCode = maxMindSuccessResponse.country.iso_code || null;
  enyaLocationData.countryName = maxMindSuccessResponse.country.names.en || null;
  // If this flag is not present in MaxMind's response, it means it's false.
  // In other words, the EU flag is only there when it's true.
  enyaLocationData.isInEU = maxMindSuccessResponse.country.is_in_european_union || false;
  enyaLocationData.continentCode = maxMindSuccessResponse.continent.code || null;
  enyaLocationData.continentName = maxMindSuccessResponse.continent.names.en || null;
  saveLocationDataToStorage();
  setLocationReady();
};

const onMaxMindError = function(maxMindErrorResponse) {
  console.log("maxMindErrorResponse: %o", maxMindErrorResponse);
  // TODO: Figure out how to proceed if we get an error from MaxMind.
};

// This function is called when the geolocator has finished detecting the user's
// location.
function setLocationReady() {
  // For the page types who use Enya's state mechanism, set a flag.
  state.thisPage.enyaLocationDataReady = true;

  // Save the country data to state.
  state.detectedCountry = getLocationCountry();

  // Fire an event telling the page that location data is ready.
  const enyaLocationDataReady = new Event("enyaLocationDataReady");
  document.dispatchEvent(enyaLocationDataReady);
}
