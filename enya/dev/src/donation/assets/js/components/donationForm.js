/*
* donationForm.js
* HSUS Donation Forms - Enya 2021
* Enya Donation Form Controller
* Created: Winter 2021
* Purpose: Main controller for donation form as a whole.
*/

import state from "commonComponents/stateManager";
import EnForm from "commonEvents/en-form";
import DonationAmount from "commonEvents/donation-amount";
import DonationFrequency from "commonEvents/donation-frequency";
import LiveVariables from "commonEvents/live-variables";

import * as amountSection from "./amountSection";
import * as premiumManager from "./premiumManager";
import * as optInsManager from "commonComponents/optInsManager";
import * as tribute from "./tribute";
import * as introSection from "./introSection";
import * as supporterInfo from "commonComponents/supporterInfo";
import * as payment from "commonComponents/payment";
import * as applePay from "./applePay";
import * as submitSection from "./submitSection";
import * as readMore from "commonComponents/readMore";
import * as header from "./header";
import * as footer from "./footer";
import * as tooltips from "commonComponents/tooltips";
import * as storageHelpers from "commonHelpers/storageHelpers";
import * as fieldHelpers from "commonHelpers/fieldHelpers";
import * as fraudFighter from "commonComponents/fraudFighter";
import * as feeCover from "./feeCover";
import * as symbolicGifts from "./symbolicGifts";
import * as ecardDonation from "./ecardDonation";
import * as countdownClock from "./countdownClock";

// Handles to the ENGrid objects. Assigned below.
let formObject;
let amountObject;
let frequencyObject;
let liveVariables;

export function init() {
  // Set up listeners for various events.
  initFormObject();
  initAmountObject();
  initFrequencyObject();
  initLiveVariables();
  startFormListeners();

  // Set up the sections.
  header.init();
  introSection.init();
  amountSection.init();
  premiumManager.init();
  tribute.init();
  supporterInfo.init();
  ecardDonation.init();
  payment.init();
  fraudFighter.init();
  feeCover.init();
  applePay.init();
  submitSection.init();
  footer.init();

  // Initialize the tooltips.
  tooltips.init();

  // Initialize read more.
  readMore.init();

  // Initialize the opt-ins.
  optInsManager.init();

  // Initialize the countdown clock.
  // This will do nothing if there's no clock on the page.
  countdownClock.init();

  if (typeof state.thisPage.isSymbolicGivingPage !== "undefined" &&
      state.thisPage.isSymbolicGivingPage) {
    symbolicGifts.init();
  } else {
    // After all sections have had a chance to subscribe to our listeners,
    // load the current values.
    loadFrequency();
    loadAmount();

    // After everything else runs, change the donation amount and frequency if 
    // there are params for them.
    amountSection.setFrequencyAndAmountFromParams();

    // Fail-safe method to prevent showing monthly fields when one-time is 
    // selected. Or vice versa.
    setTimeout(() => {
      amountSection.fixFrequencyUIMismatch();
    }, 500);
  }

  // Remove the autocomplete=tel attributes that EN adds to all input "tel"
  // types. But don't remove from phone field.
  fieldHelpers.cleanUpAutocompleteTel();
}

// Set up listeners for submit, error, and more.
function initFormObject() {
  // The EnForm class manages the handle to the form button itself.
  formObject = new EnForm();

  // Save this handle to state.
  state.thisPage.formObject = formObject;
}

// Set up listeners amount changes.
function initAmountObject() {
  amountObject = new DonationAmount(
    "transaction.donationAmt",
    "transaction.donationAmt.other"
  );

  // Save this handle to state.
  state.thisPage.amountObject = amountObject;
}

// Set up listener for frequency changes.
function initFrequencyObject() {
  frequencyObject = new DonationFrequency("transaction.recurrpay");

  // Save this handle to state.
  state.thisPage.frequencyObject = frequencyObject;
}

// Add event listeners and connect to DOM.
function initLiveVariables() {
  liveVariables = new LiveVariables(state.thisPage.submitLabel);
  state.thisPage.liveVariables = liveVariables;
}

// When EN submit and error events fire, dispatch the event to subscribers of the formObject.
// Remember that we have to set the formObject's "submit" boolean to true
// when we want the submit to go through.
function startFormListeners() {
  if (!formObject) return;

  // Use EN's callback to handle submission changes.
  // But make sure we don't overwrite an existing submit handler.
  if (typeof window.enOnSubmit === 'function') {
    const oldOnSubmit = window.enOnSubmit;
    window.enOnSubmit = () => {
      return oldOnSubmit() && handleSubmit();
    };
  } else {
    window.enOnSubmit = handleSubmit;
  }

  // Use EN's callback to handle errors.
  // But make sure we don't overwrite an existing error handler.
  if (typeof window.enOnError === 'function') {
    const oldOnError = window.enOnError;
    window.enOnError = () => {
      return oldOnError() && handleError();
    };
  } else {
    window.enOnError = handleError;
  }
}

function handleSubmit() {
  formObject.dispatchSubmit();

  // We're counting the number of times a user submits the page, so that we can
  // block them if they do it too many times.
  fraudFighter.incrementSubmitCounter();

  // Adding circuit breaker to cancel submission by known bad actors. Form will
  // not submit for blocklisted emails, or if there have been too many submits
  // and server rejections, but no error will appear.
  if (fraudFighter.isEmailBlocklisted() || fraudFighter.hasTooManySubmits()) {
    return false;
  } else {
    return formObject.submit;
  }
}

function handleError() {
  formObject.dispatchError();
}

function loadFrequency() {
  if (!frequencyObject) return;
  frequencyObject.load();

  // TODO: Call this function only on error pages.
  setTimeout(() => {
    restoreFrequency();
  }, 0);
}

function loadAmount() {
  if (!amountObject) return;
  amountObject.load();

  // TODO: Call this function only on error pages.
  setTimeout(() => {
    restoreAmount();
  }, 1000);
}

export function saveFrequency() {
  if (!frequencyObject) return;
  if (!storageHelpers.isSessionStorageEnabled()) return;
  try {
    sessionStorage.setItem("enyaFrequency", frequencyObject.frequency);
  } catch (error) {
    console.log(
      "🚀 ~ file: donationForm.js:208 ~ saveFrequency: sessionStorage not available."
    );
    console.log(error);
  }
}

export function saveAmount() {
  if (!amountObject) return;
  if (!storageHelpers.isSessionStorageEnabled()) return;

  try {
    sessionStorage.setItem("enyaAmount", amountObject.amount);
  } catch (error) {
    console.log(
      "🚀 ~ file: donationForm.js:222 ~ saveAmount: sessionStorage not available."
    );
    console.log(error);
  }
}

export function restoreFrequency() {
  if (!frequencyObject) return;
  let savedFrequency;
  if (!storageHelpers.isSessionStorageEnabled()) return;
  try {
    savedFrequency = sessionStorage.getItem("enyaFrequency");
  } catch (error) {
    console.log(
      "🚀 ~ file: donationForm.js:236 ~ restoreFrequency: sessionStorage not available."
    );
    console.log(error);
  }
  if (savedFrequency) {
    frequencyObject.frequency = savedFrequency === "monthly" ? "Y" : "N";
    frequencyObject.load();
  }
  // If savedFrequency is one-time, clear out the premium product variant hidden
  // field, but only if the premium section is hidden.
  if (savedFrequency === "single") {
    setTimeout(() => {
      premiumManager.clearPremium();
    }, 3000);
  }
}

export function restoreAmount() {
  if (!amountObject) return;
  let savedAmount;
  if (!storageHelpers.isSessionStorageEnabled()) return;
  try {
    savedAmount = Number(sessionStorage.getItem("enyaAmount"));
  } catch (error) {
    console.log(
      "🚀 ~ file: donationForm.js:261 ~ restoreAmount: sessionStorage not available."
    );
    console.log(error);
  }
  if (savedAmount) {
    amountObject.setAmount(savedAmount);
    // Trigger change event so that EN fee cover logic will update.
    const otherField = document.getElementsByName(
      "transaction.donationAmt.other"
    )[0];
    if (otherField) {
      otherField.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
}

// Wrapper function that stores certain form values.
export function saveFormValues() {
  saveAmount();
  saveFrequency();
  supporterInfo.save();
}
