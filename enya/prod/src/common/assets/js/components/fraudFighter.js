/*
* fraudFighter.js
* HSUS Engaging Networks Forms - Enya 2023
* Created: Fall 2023
* Purpose: Collect our anti-fraud functions into a single component.
*/

import state from "./stateManager";
import * as storageHelpers from "commonHelpers/storageHelpers";
import * as pageHelpers from "commonHelpers/pageHelpers";
import * as fieldHelpers from "commonHelpers/fieldHelpers";

const emailBlocklist = [];
let submitCounter = 0;
const maxSubmitsAllowed = 5;
let wasCounterIncremented = false;
let wasFraudBlockTracked = false;

export function init() {
  initEmailBlocklist();
  initSubmitCounter();
}

// Read blocklist text from the DOM and populate an array with blocked email
// addresses.
function initEmailBlocklist() {
  if (!emailBlocklist) return;

  // Get handles to the text block and the div that contains the blocklist.
  const blocklistBlock = document.querySelector(".email-blocklist-block");
  if (!blocklistBlock) return;

  const blocklistWrapper = blocklistBlock.querySelector(
    ".email-blocklist-wrapper"
  );
  if (!blocklistWrapper) return;

  const blocklistEntries = blocklistWrapper.children;
  if (!blocklistEntries.length) return;

  // Read the contents of the blocklist into our array.
  for (const blocklistEntry of blocklistEntries) {
    emailBlocklist.push(blocklistEntry.textContent.trim());
  }

  // Store the array in state so we can access it elsewhere.
  state.thisPage.emailBlocklist = emailBlocklist;

  // After we've pushed all the email addresses onto our array, delete the
  // blocklist block from the DOM, so snoopers can't find it.
  blocklistBlock.remove();
}

function initSubmitCounter() {
  // Retrieve the value of the submit counter in session storage, if any.
  const submitCounterFromStorage = getSubmitCountFromStorage();
  submitCounter = parseInt(submitCounterFromStorage, 10);
  if (isNaN(submitCounter)) {
    submitCounter = 0;
  }
}

// Check the submitted email address against our blocklist. If the submitted
// email address is on the blocklist, we return true, which will stop submission
// of the page.
export function isEmailBlocklisted() {
  let isBlocklisted = false;
  if (!emailBlocklist.length) return false;

  if (emailBlocklist.includes(fieldHelpers.getEmailAddress())) {
    isBlocklisted = true;
    console.log("🛑");
    trackFraudBlockEvent("blocklist");
  }
  return isBlocklisted;
}

export function incrementSubmitCounter() {
  if (typeof submitCounter === "undefined" || isNaN(submitCounter)) return;

  // We want this function to run only once per page refresh. If it's already
  // run, get out.
  if (wasCounterIncremented) return;

  submitCounter++;

  if (!storageHelpers.isSessionStorageEnabled()) return;

  try {
    sessionStorage.setItem("enyaSubmitCounter", submitCounter);
    const now = new Date().getTime();
    sessionStorage.setItem("enyaSubmitCounterLastIncremented", now);
    wasCounterIncremented = true;
  } catch (e) {
    // Silently ignore javascript error when sessionStorage is unavailable.
    // The most likely cause is private browsing mode.
  }
}

// This function returns true if the user has clicked the submit button more
// than the maximum allowed.
export function hasTooManySubmits() {
  if (typeof submitCounter === "undefined" || isNaN(submitCounter)) return false;

  if (submitCounter > maxSubmitsAllowed) {
    console.log("🛑");
    trackFraudBlockEvent("submitCounter");
    return true;
  } else {
    return false;
  }
}

// Retrieve the submit count from storage if it doesn't exceed the
// max age. Check the timestamp and toss out the value if it's too old.
function getSubmitCountFromStorage() {
  const maxAgeAllowedInHours = 1;
  const maxAgeAllowedInMilliseconds = maxAgeAllowedInHours * 60 * 60 * 1000;
  const now = new Date().getTime();

  // We want submitCounterFromStorage to be null by default, reliably.
  let submitCounterFromStorage = null;
  let submitCounterLastIncremented = null;
  if (!storageHelpers.isSessionStorageEnabled()) return null;
  try {
    submitCounterLastIncremented = sessionStorage.getItem(
      "enyaSubmitCounterLastIncremented"
    );
    if (submitCounterLastIncremented === null) {
      // There's no timestamp, so return null. We don't want to use the submit
      // count value if there's no timestamp, so remove it.
      sessionStorage.removeItem("enyaSubmitCounter");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }

  // Make sure the submit count value is not too old.
  const ageOfSubmitCountFromStorage = now - submitCounterLastIncremented;

  if (!isNaN(ageOfSubmitCountFromStorage) && ageOfSubmitCountFromStorage <= maxAgeAllowedInMilliseconds) {
    try {
      submitCounterFromStorage = sessionStorage.getItem("enyaSubmitCounter");
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  return submitCounterFromStorage;
}

function trackFraudBlockEvent(blockType = "") {
  if (!window.dataLayer) return;
  // We want this function to run only once per page refresh. If it's already
  // been run, get out.
  if (wasFraudBlockTracked) return;

  window.dataLayer.push({
    event: "enya_fraud_fighter_block",
    fraud_block_type: blockType,
    page_name: pageHelpers.getPageName(),
    page_id: pageHelpers.getPageId()
  });

  wasFraudBlockTracked = true;
}
