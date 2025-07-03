/*
* donation.js
* HSUS Engaging Networks Forms - Enya 2021
* Created: Summer 2021
* Purpose: Responsible for handling dynamic links to donation forms.
*/

import state from "commonComponents/stateManager";
import * as pageManager from "commonComponents/pageManager";
import * as utils from "utils/utilities";
import * as directResponse from "./directResponse";

const baseURL = "https://secured.humanesociety.org/page/";
const mainDonationFormID = "81880";
const defaultOneTimeAmount = 60;
const defaultMonthlyAmount = 25;
const defaultTopButtonTextOneTime = "Donate Now";
const defaultTopButtonTextMonthly = "Help Monthly";

// We use these flags to generate a one-time link on a monthly page,
// or a monthly link on a one-time page.
let oneTimeLinkClicked = false;
let monthlyLinkClicked = false;

// Handle to the amount input at the top of every splash page.
let donateAmountInput;

// Handles to the donate buttons at the top and bottom of every splash page.
let donateButtonTop;
let donateOneTimeLinkTop;
let donateMonthlyLinkTop;
let donateButtonBottom;

// Handle to the hidden frequency input where we keep track of one-time or monthly.
let donateFrequencyInput;

export function init() {
  initDonateAmountInput();
  initDonateButtons();
  initDonateHandlers();
  initFrequency();
}

function initDonateAmountInput() {
  donateAmountInput = document.querySelector("#other-box");
}

function initDonateButtons() {
  donateButtonTop = document.querySelector(".top-donate-button");
  donateOneTimeLinkTop = document.querySelector(".top-donate-one-time-link");
  donateMonthlyLinkTop = document.querySelector(".top-donate-monthly-link");
  donateButtonBottom = document.querySelector(".bottom-donate-button");
}

function initDonateHandlers() {
  if (!donateButtonTop || !donateButtonBottom) return;

  [donateButtonTop, donateOneTimeLinkTop, donateMonthlyLinkTop, donateButtonBottom].forEach(thisButton => {
    if (thisButton) {
      thisButton.addEventListener("click", handleDonateClick);
    }
  });
}

function getDonationAmount() {
  if (!donateAmountInput) return "";
  let donationAmount = parseDonationAmount(donateAmountInput.value);

  // When user hasn't entered an amount, use the default.
  if (donationAmount === "") {
    donationAmount = getDefaultDonationAmount();
  }

  return donationAmount;
}

// Convert donation amount input value to number.
// Returns "" if amount is zero.
// Note that we have to call removeCommas twice: once before we convert to
// Number—because Number returns NaN if string has a comma—and then again after
// getting the formatted amount.
export function parseDonationAmount(amount = "") {
  amount = utils.removeCommas(amount);
  amount = utils.removeSpaces(amount);
  let parsedAmount = Number(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return "";
  } else {
    // Get the formatted amount with no dollar sign.
    parsedAmount = utils.formatAmountUS(parsedAmount, true);
    parsedAmount = utils.removeCommas(parsedAmount);
  }
  return parsedAmount;
}

function getDefaultDonationAmount() {
  let defaultAmount = defaultOneTimeAmount;

  if (state.thisPage.isOneTimeSelected) {
    if (monthlyLinkClicked) {
      defaultAmount = defaultMonthlyAmount;
    }
  }

  if (state.thisPage.isMonthlySelected) {
    if (!oneTimeLinkClicked) {
      defaultAmount = defaultMonthlyAmount;
    }
  }

  return defaultAmount;
}

// Generate a custom donation form URL and redirect to that form.
function handleDonateClick(event) {
  event.preventDefault();
  let buttonClicked = "";

  // Set some flags that we'll use for the link.
  if (event.target.classList.contains("top-donate-one-time-link")) {
    buttonClicked = "top-link-o";

    // We're on a monthly page, but we need a one-time link.
    oneTimeLinkClicked = true;
    monthlyLinkClicked = false;
  } else if (event.target.classList.contains("top-donate-monthly-link")) {
    buttonClicked = "top-link-m";

    // We're on a one-time page, but we need a monthly link.
    oneTimeLinkClicked = false;
    monthlyLinkClicked = true;
  } else if (event.target.classList.contains("top-donate-button")) {
    if (state.thisPage.isOneTimeSelected) {
      buttonClicked = "top-button-o";
    }

    if (state.thisPage.isMonthlySelected) {
      buttonClicked = "top-button-m";
    }
  } else if (event.target.classList.contains("bottom-donate-button")) {
    if (state.thisPage.isOneTimeSelected) {
      buttonClicked = "bottom-button-o";
    }

    if (state.thisPage.isMonthlySelected) {
      buttonClicked = "bottom-button-m";
    }
  }

  updateDonateInput();

  // Redirect to the correct donation form, with params.
  redirectToDonationForm(getDonationLink(getDestinationFormID(), buttonClicked));
}

// Update the value in the donate input with a sanitized result.
function updateDonateInput() {
  donateAmountInput.value = getDonationAmount();
}

function getDonationLink(formID, buttonClicked = "") {
  if (typeof formID === "undefined") {
    formID = mainDonationFormID;
  }
  const donationBaseURL = `${baseURL}${formID}/donate/1`;

  const donateURLParams = {
    "ea.tracking.id": getTrackingIDForLink(buttonClicked),
    "transaction.recurrpay": getFrequencyForLink(),
    "transaction.donationAmt": getDonationAmount()
  };

  // Copy certain params in this splash page's URL to the donate URL.
  copyPageParamsToDonateParams(donateURLParams);

  // For direct response pages, we need to add a profile param.
  // The profile value must be valid, or else the donation form may not load.
  if (directResponse.isDirectResponseSplash()) {
    const profileID = directResponse.getProfileID();
    if (typeof profileID !== "undefined" && profileID) {
      donateURLParams["ea.profile.id"] = profileID;
    }
  }

  const donationFinalLink = utils.getUriWithParams(donationBaseURL, donateURLParams);

  return donationFinalLink;
}

function copyPageParamsToDonateParams(donateURLParams = {}) {
  const paramNames = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "en_txn6",
    "en_txn7",
    "en_txn8",
    "en_txn9",
    "en_txn10"
  ];

  paramNames.forEach(thisParam => {
    const thisParamValue = getParamValueFromState(thisParam);
    if (thisParamValue) {
      donateURLParams[thisParam] = thisParamValue;
    }
  });
}

// Retrieve a param from state.
function getParamValueFromState(paramName = "") {
  if (!state.activeURLParams) return;
  let paramValue = "";
  if (typeof state.activeURLParams[paramName] !== "undefined" &&
      state.activeURLParams[paramName] !== "") {
    paramValue = state.activeURLParams[paramName];
  }
  return paramValue;
}

function getTrackingIDForLink(buttonClicked = "") {
  if (!state.activeURLParams) return;
  let suffix = "ad_splash";
  if (buttonClicked !== "") {
    suffix += "_" + buttonClicked;
  }
  let trackingIDForLink = "";
  const currentTrackingID = state.activeURLParams["ea.tracking.id"];
  if (typeof currentTrackingID !== "undefined" &&
      currentTrackingID !== "") {
    trackingIDForLink = currentTrackingID + "_";
  }

  return trackingIDForLink + suffix;
}

function getFrequencyForLink() {
  let frequencyForLink = "N";

  if (state.thisPage.isOneTimeSelected) {
    if (monthlyLinkClicked) {
      frequencyForLink = "Y";
    } else {
      frequencyForLink = "N";
    }
  }

  if (state.thisPage.isMonthlySelected) {
    if (oneTimeLinkClicked) {
      frequencyForLink = "N";
    } else {
      frequencyForLink = "Y";
    }
  }

  return frequencyForLink;
}

function getDestinationFormID() {
  // Set return value to default.
  let destinationFormID = mainDonationFormID;

  // The destination form ID can be passed in to Enya via splashSettings.
  // See app.js for more.
  if (typeof state.thisPage.destinationFormID !== "undefined") {
    destinationFormID = state.thisPage.destinationFormID;
  }
  return destinationFormID;
}

function redirectToDonationForm(formURL) {
  if (!formURL) return;

  window.location.href = formURL;
}

function initFrequency() {
  // Get handle to hidden frequency input.
  donateFrequencyInput = document.querySelector(".hidden-frequency");
  setFrequencyFromParam();
  updateFrequency();
}

// Set one-time or monthly.
function updateFrequency() {
  if (!donateFrequencyInput) return;

  if (donateFrequencyInput.value.toLowerCase() === "y") {
    state.thisPage.isMonthlySelected = true;
    state.thisPage.isOneTimeSelected = false;
  } else if (donateFrequencyInput.value.toLowerCase() === "n") {
    state.thisPage.isMonthlySelected = false;
    state.thisPage.isOneTimeSelected = true;
  }
  pageManager.updatePageClasses();
  updateDonateButtonText();
  updateDonateAmountPlaceholder();
}

// Enya state automatically stores the "v" param for us. 
// See urlParamsManager in common for more.
function setFrequencyFromParam() {
  if (!donateFrequencyInput) return;
  if (!state.activeURLParams) return;
  if (typeof state.activeURLParams.v !== "undefined" &&
      state.activeURLParams.v === "m") {
    donateFrequencyInput.value = "Y";
    updateFrequency();
  }
}

function updateDonateButtonText() {
  if (!donateButtonTop) return;

  if (state.thisPage.isMonthlySelected) {
    donateButtonTop.textContent = defaultTopButtonTextMonthly;
  } else {
    donateButtonTop.textContent = defaultTopButtonTextOneTime;
  }
}

function updateDonateAmountPlaceholder() {
  if (!donateAmountInput) return;

  if (state.thisPage.isMonthlySelected) {
    donateAmountInput.setAttribute("placeholder", defaultMonthlyAmount);
  } else {
    donateAmountInput.setAttribute("placeholder", defaultOneTimeAmount);
  }
}
