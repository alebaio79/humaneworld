/*
* amountSection.js
* HSUS Donation Forms - Enya 2021
* Enya Amount Section Controller
* Created: Winter 2021
* Purpose: Manage activity related to the donation amount section of Enya forms.
*/

import state from "commonComponents/stateManager";
import * as pageManager from "commonComponents/pageManager";
import * as currency from "./currency";
import * as otherAmounts from "./otherAmounts";
import * as premiumManager from "./premiumManager";
import * as utils from "utils/utilities";
import * as monthlyPush from "./monthlyPush";

// Handle to this section in DOM.
let amountSection;

export function init() {
  // Get handle to amount section on form. TODO: Delete if we don't need.
  amountSection = document.querySelector(".en__component.amount-section-block");

  currency.init();

  // Init the donation levels.
  initDonationLevels();

  // Fire event handlers when one-time/monthly switcher changes.
  watchRecurrpayField();

  monthlyPush.init();

  // Conditional ask arrays depend on the profile ID.
  saveProfileIDToField();

  // After everything has inited, update the currency if there's a URL param for it.
  currency.setCurrencyFromParam();
}

function initDonationLevels() {
  otherAmounts.init();
}

// Taken from 4Site's ENGrid project.
function watchRecurrpayField() {
  // This is the wrapper around the inputs.
  const enFieldRecurrpay = document.querySelector(".en__field--recurrpay");

  // These are the inputs themselves.
  const transactionRecurrpay = document.getElementsByName(
    "transaction.recurrpay"
  );

  // Looks like we don't need this var. TODO: Delete if that's true.
  const enFieldRecurrpayStartingValue = document.querySelector(
    "input[name='transaction.recurrpay']:checked"
  );

  let enFieldRecurrpayCurrentValue = document.querySelector(
    "input[name='transaction.recurrpay']:checked"
  );

  const handleEnFieldRecurrpay = (e) => {
    enFieldRecurrpayCurrentValue = document.querySelector(
      "input[name='transaction.recurrpay']:checked"
    );
    if (!enFieldRecurrpayCurrentValue) return;
    if (enFieldRecurrpayCurrentValue.value.toLowerCase() === "y") {
      state.thisPage.isMonthlySelected = true;
      state.thisPage.isOneTimeSelected = false;
    } else if (enFieldRecurrpayCurrentValue.value.toLowerCase() === "n") {
      state.thisPage.isMonthlySelected = false;
      state.thisPage.isOneTimeSelected = true;
    }
    pageManager.updatePageClasses();
    updateSelectAmountHeader();
  };

  // Check Giving Frequency on page load.
  if (enFieldRecurrpay) {
    enFieldRecurrpayCurrentValue = document.querySelector(
      "input[name='transaction.recurrpay']:checked"
    );
    if (!enFieldRecurrpayCurrentValue) return;
    if (enFieldRecurrpayCurrentValue.value.toLowerCase() === "y") {
      state.thisPage.isMonthlySelected = true;
      state.thisPage.isOneTimeSelected = false;
    } else if (enFieldRecurrpayCurrentValue.value.toLowerCase() === "n") {
      state.thisPage.isMonthlySelected = false;
      state.thisPage.isOneTimeSelected = true;
    }
    pageManager.updatePageClasses();
    updateSelectAmountHeader();
  }

  // Watch each Giving Frequency radio input for a change.
  if (transactionRecurrpay) {
    Array.from(transactionRecurrpay).forEach(e => {
      e.addEventListener("change", handleEnFieldRecurrpay);
    });
  }
}

// Change the text of this header, based on one-time or monthly.
function updateSelectAmountHeader() {
  if (!amountSection) return;
  const amountHeader = amountSection.querySelector(
    ".en__field--donationAmt label:first-of-type"
  );
  if (!amountHeader) return;
  if (typeof state.thisPage.isMonthlySelected !== "undefined") {
    if (state.thisPage.isMonthlySelected) {
      amountHeader.textContent = "Select Monthly Gift Amount";
      if (state.thisPage.isFrench) {
        amountHeader.textContent = "Sélectionnez le montant de votre don mensuel";
      }
    } else {
      amountHeader.textContent = "Select One-Time Gift Amount";
      if (state.thisPage.isFrench) {
        amountHeader.textContent = "Sélectionnez le montant de votre don ponctuel";
      }
    }
  }
}

export function setFrequencyAndAmountFromParams() {
  if (!state.thisPage.amountObject) return;
  if (!state.thisPage.frequencyObject) return;
  if (!state.activeURLParams) return;
  let newAmount, newFrequency;

  // We need to set the frequency first, then the amount, because these
  // functions trigger clicks on the UI. The correct set of amount buttons
  // needs to be displayed, for one-time or monthly, when we set the amount.
  if (typeof state.activeURLParams["transaction.recurrpay"] !== "undefined") {
    // This param value could be lowercase or uppercase. We need it uppercase.
    newFrequency = state.activeURLParams["transaction.recurrpay"].toUpperCase();
  }

  // Update the frequency.
  if (typeof newFrequency !== "undefined") {
    if (newFrequency === "Y" || newFrequency === "N") {
      state.thisPage.frequencyObject.frequency = newFrequency;
    }
  }

  if (typeof state.activeURLParams["transaction.donationAmt"] !== "undefined") {
    newAmount = parseFloat(state.activeURLParams["transaction.donationAmt"]);
  }

  if (typeof newAmount !== "undefined" && !isNaN(newAmount)) {
    // We need to wait to trigger this update until after the built-in EN Set
    // Value has fired. Note that this delay causes a flicker in the Other
    // amount field. Users momentarily see a value in that field, on page load,
    // before the correct amount button gets selected. So we need to keep this
    // delay as short as possible.
    setTimeout(() => {
      state.thisPage.amountObject.setAmount(newAmount);
    }, 100);
  }
}

// Compare the value of the label above the donation amount buttons to the 
// selected frequency. If they don't match, click the unselected frequency 
// button to fix.
// This function is necessary because the EN swap list and set value field 
// updates were not firing correctly, especially when the user clicks their 
// Back button after submitting the form.
export function fixFrequencyUIMismatch() {
  if (!state.thisPage.frequencyObject) return;
  const monthlyFrequencyField = document.querySelector(
    "input[name='transaction.recurrpay'][value='Y']"
  );
  const oneTimeFrequencyField = document.querySelector(
    "input[name='transaction.recurrpay'][value='N']"
  );
  if (!monthlyFrequencyField) return;
  if (!oneTimeFrequencyField) return;

  const frequencySelectLabel = document.querySelector(
    ".en__field--donationAmt label:first-child");
  if (!frequencySelectLabel) return;

  const labelContent = frequencySelectLabel.innerHTML;

  let isUISingle;

  if (labelContent === "Select One-Time Gift Amount") {
    isUISingle = true;
  } else {
    isUISingle = false;
  }

  // If the frequency selected doesn't match the label content,
  // trigger a click on the non-selected frequency. Then another click on the selected one.
  if (state.thisPage.frequencyObject.frequency === "single" && !isUISingle) {
    monthlyFrequencyField.click();
    oneTimeFrequencyField.click();
    // We need to remove the value from the hidden
    // "transaction.selprodvariantid" field when the UI is one-time (in most
    // cases). See clearPremium() for details. Timeout needed to allow the UI to
    // hide the premium block before we clear the premium value.
    setTimeout(() => {
      premiumManager.clearPremium();
    }, 3000);
    console.log("Executed fix for UI mismatch. UI was monthly but selected frequency is single.");
    return;
  }

  if (state.thisPage.frequencyObject.frequency === "monthly" && isUISingle) {
    oneTimeFrequencyField.click();
    monthlyFrequencyField.click();
    // frequencySelectLabel.innerHTML = "Select Monthly Gift Amount";
    console.log("Executed fix for UI mismatch. UI was single but selected frequency is monthly.");
  }
}

// Conditional ask-array default values need to know the profile ID, if any.
// This function makes that value available in the amount section.
// The Current Profile ID field needs to be added to the form in Page Builder
// to make this work. If that field doesn't exist, this function will fail 
// silently.
function saveProfileIDToField() {
  let currentProfileID = "";
  if (typeof state.activeURLParams !== "undefined" &&
      typeof state.activeURLParams["ea.profile.id"] !== "undefined") {
    if (utils.isNumeric(state.activeURLParams["ea.profile.id"])) {
      currentProfileID = state.activeURLParams["ea.profile.id"];
    }
  }

  const currentProfileField = document.querySelector(
    "#en__field_supporter_questions_1142012"
  );

  if (currentProfileField) {
    currentProfileField.value = currentProfileID;
  }
}
