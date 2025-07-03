/*
 * emailVerifier.js
 * HSUS Engaging Networks Forms - Enya 2023
 * Created: Spring 2023
 * Purpose: Manages email verification by calling out to AtData's FreshAddress
 * legacy API and returning the results. Real-time API doc is here: https://atdata.freshdesk.com/helpdesk/attachments/6124049213. Client-side integration doc is here: https://humanesociety.sharepoint.com/:b:/s/marketingteam/EVt7fiB-XwNOhFDgZ2C5Z20BBbPSD7TK5vKF4_T5P9nZxw?e=Dac8m9
 */

import state from "./stateManager";
import * as utils from "utils/utilities";
import * as storageHelpers from "commonHelpers/storageHelpers";

export const result = {};

export function init() {
  // Flag the fact that email verification is active, so other
  // components can behave accordingly.
  state.thisPage.isEmailVerificationActive = true;
}

// Clear out the result object and set it back to its defaults.
function initResultObject() {
  result.emailTested = "";
  result.isServiceError = false;
  result.isOtherError = false;
  result.isVerified = undefined;
  result.userMessage = "";
  result.finding = "";
  result.comment = "";
  result.commentCode = "";

  // Expose the result object to window scope for easier debugging.
  window.Enya.emailVerifierResult = result;
}

export function callFreshAddressValidate(email, verifierCallback) {
  // We don't want to proceed if jQuery is not defined, because the FreshAddress
  // library depends on it. And if the FreshAddress object is not defined, then
  // we can't continue.
  if (
    typeof window.jQuery === "undefined" ||
    typeof window.FreshAddress === "undefined"
  ) {
    return;
  }

  // Check session storage for previous lookups for this email address.
  const enyaEmailDataFromStorage = getEmailDataFromStorage();
  if (enyaEmailDataFromStorage !== null) {
    // Check if the previously tested email address matches the current email.
    // If it does, then return the stored data and skip the rest of this
    // function.
    if (email === enyaEmailDataFromStorage.emailTested) {
      verifierCallback(enyaEmailDataFromStorage);
      return;
    }
  }

  // Clear out our result object for every call.
  initResultObject();
  result.emailTested = email;

  // See FreshAddress client-side library reference for full list of options
  // (link is at the top of this file). Some of these are set to the default
  // value, but they're included for reference. true = block; false = allow
  // Note: On July 18, 2023, we decided to set emps to false here, to allow
  // people to submit email addresses even if they're on the Do Not Email
  // registry. See this task for details:
  // https://humanesociety.atlassian.net/browse/HSICAN-490
  const freshAddressOptions = {
    complain: false,
    emps: false,
    language: true,
    role: false,
    rtc_timeout: 1200
  };

  window.FreshAddress.validateEmail(email, freshAddressOptions)
    .then((response) => {
      processVerification(response, verifierCallback);
    })
    .catch((error) => {
      // Deal with API call error. This should only happen if there's a problem
      // with the connection to the API.
      console.log("FreshAddress error: %o", error);

      // Set a flag that tells the caller we're having trouble.
      result.isServiceError = true;

      // Flag the fact that email verification is not active, so other
      // components can behave accordingly.
      state.thisPage.isEmailVerificationActive = false;

      // Call the callback.
      if (typeof verifierCallback === "function") {
        verifierCallback(result);
      }
    });
}

function processVerification(response, verifierCallback) {
  // Save some values from the FreshAddress response object to our result
  // object.
  result.finding = response.getFinding();
  result.comment = response.getComment();
  result.commentCode = response.getCommentCode();

  if (response.isServiceError()) {
    result.isServiceError = true;
  }

  if (response.isValid()) {
    result.isVerified = true;
    // Check if a suggestion is available.
    if (response.hasSuggest()) {
      // Valid, with Suggestion: Provide opportunity for user to correct.
      result.userMessage = "We may have detected a typo.";
      result.userMessage += " Did you mean to type ";
      result.userMessage += response.getSuggEmail() + "?";
    }
  }

  if (response.isError() || response.isWarning()) {
    // Allow warnings with comment code B (invalid email address) to pass
    // through as verified.
    if (response.isWarning() && result.commentCode === "B") {
      result.isVerified = true;
    } else {
      result.isVerified = false;
      // Set error message.
      result.userMessage = improveErrorMessage(response.getErrorResponse()) + ".";
      // Check if a suggestion is available.
      if (response.hasSuggest()) {
        result.userMessage += " Did you mean to type ";
        result.userMessage += response.getSuggEmail() + "?";
      }
    }
  }
  if (typeof verifierCallback === "function") {
    // Save this result to session storage, with a timestamp.
    saveEmailDataToStorage();
    verifierCallback(result);
  }
}

function improveErrorMessage(errorMessage) {
  let improvedMessage = "";
  switch (errorMessage) {
    case "The email address you entered cannot be registered":
      improvedMessage = "The email address you entered cannot be verified";
      return improvedMessage;
    default:
      return utils.curlies(errorMessage);
  }
}

// Store the results of our FreshAddress lookup to local storage, so we can
// reuse that data when necessary, and avoid duplicate calls to the API. We
// chose local storage because the value will persist across browser tabs, and
// when the user closes and reopens their browser. This will help reduce calls
// to the API.
function saveEmailDataToStorage() {
  const now = new Date().getTime();
  if (!storageHelpers.isLocalStorageEnabled()) return;
  try {
    localStorage.setItem("enyaEmailDataCreated", now);
    localStorage.setItem("enyaEmailData", JSON.stringify(result));
  } catch (error) {
    console.log(
      "🚀 ~ file: emailVerifier.js:169 ~ saveEmailDataToStorage: localStorage not available."
    );
    console.log(error);
  }
}

// Retrieve the email verification data from storage if it doesn't exceed the
// max age. Check the timestamp and toss out the data if it's too old.
function getEmailDataFromStorage() {
  const maxAgeAllowedInHours = 1;
  const maxAgeAllowedInMilliseconds = maxAgeAllowedInHours * 60 * 60 * 1000;
  const now = new Date().getTime();

  // We want emailDataFromStorage to be null by default, reliably.
  let emailDataFromStorage = null;
  let enyaEmailDataCreated = null;

  if (!storageHelpers.isLocalStorageEnabled()) return null;

  try {
    enyaEmailDataCreated = localStorage.getItem("enyaEmailDataCreated");
    if (enyaEmailDataCreated === null) {
      // There's no timestamp, so return null.
      // We don't want to use the data if there's no timestamp, so remove it.
      localStorage.removeItem("enyaEmailData");
      return null;
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: emailVerifier.js:198 ~ getEmailDataFromStorage: localStorage not available."
    );
    console.log(error);
    return null;
  }

  const ageOfLocationData = now - enyaEmailDataCreated;

  if (!isNaN(ageOfLocationData) && ageOfLocationData <= maxAgeAllowedInMilliseconds) {
    emailDataFromStorage = localStorage.getItem("enyaEmailData");
  }

  // Convert all "null-ish" values to actual null.
  if (
    emailDataFromStorage === null ||
    emailDataFromStorage === undefined ||
    emailDataFromStorage.trim() === ""
  ) {
    emailDataFromStorage = null;
  } else {
    emailDataFromStorage = JSON.parse(emailDataFromStorage);
  }
  return emailDataFromStorage;
}
