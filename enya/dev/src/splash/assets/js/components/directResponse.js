/*
* directResponse.js
* HSUS Engaging Networks Forms - Enya 2021
* Created: Summer 2021
* Purpose: Component for managing the particular needs of the Direct Response page.
*/

import state from "commonComponents/stateManager";

const profiles = {
  rescueanimalsnow: 33346,
  joinhumanesociety: 33347,
  helpprotectanimals: 33348,
  preventcruelty: 33350
};

// Get a profile ID for a name.
export function getProfileID() {
  const attributionName = getAttributionName();
  let profileID = "";
  if (typeof profiles[attributionName] !== "undefined") {
    profileID = profiles[attributionName];
  }
  return profileID;
}

// Get the name of the source for this direct response page from the tracking ID.
export function getAttributionName() {
  if (!state.activeURLParams) return;
  if (!isDirectResponseSplash()) return;

  let attributionName = "";
  const currentTrackingID = state.activeURLParams["ea.tracking.id"];
  if (typeof currentTrackingID !== "undefined") {
    attributionName = currentTrackingID;
  }

  return attributionName;
}

export function isDirectResponseSplash() {
  if (document.querySelector("body.enya-splash.splash-direct")) {
    return true;
  } else {
    return false;
  }
}
