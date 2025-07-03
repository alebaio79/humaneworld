/*
* feeCover.js
* HSUS Engaging Networks Forms - Enya 2021
* Created: Fall 2021
* Purpose: Manage processing-fee addition to total.
*/

import state from "commonComponents/stateManager";
import * as utils from "utils/utilities";

let feeCoverAmount = 0;
let newAmount = 0;
let feeCoverCheckbox, feeCoverElement;

// A flag that helps us keep track of the checkbox's activation.
// Note that the fee cover can be active but unchecked.
export let isFeeCoverActive = false;

// Donation amounts over this limit will trigger Enya to deactivate the fee
// cover checkbox.
const feeCoverLimit = 499;

// A flag that tells us whether the previous donation amount triggered
// the fee cover to turn itself off. If it did, then when we show it again,
// we need to check the box too.
let wasFeeCoverOverLimit = false;

export function init() {
  initFeeCoverCheckbox();
  if (!feeCoverCheckbox) return;
  // Subscribe to changes in amount.
  if (typeof state.thisPage.amountObject !== "undefined") {
    state.thisPage.amountObject.onAmountChange.subscribe((amount) => {
      updateProcessingFee();
    });
  }

  // Subscribe to error event, so we can update the amount total once more.
  if (state.thisPage.formObject) {
    state.thisPage.formObject.onError.subscribe(() => {
      updateProcessingFee();
    });
  }
}

function updateProcessingFee() {
  toggleFeeCoverBasedOnAmount();
  setFeeCoverAmount();
  setNewAmount();
  updateFeeCoverDisplay();

  if (!feeCoverCheckbox) return;
  if (feeCoverCheckbox.checked) {
    updateSubmitButton();
    // Note: this timeout duration needs to be longer than the one for
    // restoreAmount in donationForm.js
    setTimeout(() => {
      updateMonthlyModalOneTime();
    }, 1000);
  }
}

// Set handles to the fee cover checkbox and its parent element.
// And add change event listener.
function initFeeCoverCheckbox() {
  feeCoverCheckbox = document.getElementById("en__field_transaction_feeCover");
  if (!feeCoverCheckbox) return;

  feeCoverElement = feeCoverCheckbox.closest(".en__field--feeCover");

  feeCoverCheckbox.addEventListener("change", function () {
    updateProcessingFee();
    updateSubmitButton();
    // Note: this timeout duration needs to be longer than the one for
    // restoreAmount in donationForm.js.
    setTimeout(() => {
      updateMonthlyModalOneTime();
    }, 1000);
  });
  activateFeeCover();
}

function setFeeCoverAmount() {
  const feeCoverPercentage = 0.03;
  if (typeof state.thisPage.amountObject !== "undefined") {
    feeCoverAmount = parseFloat(state.thisPage.amountObject.amount * feeCoverPercentage).toFixed(2);
  }
}

function setNewAmount() {
  if (!state.thisPage.amountObject) return;
  if (!feeCoverCheckbox) return;
  if (feeCoverCheckbox.checked) {
    newAmount = parseFloat(state.thisPage.amountObject.amount) + parseFloat(feeCoverAmount);
  } else {
    newAmount = parseFloat(state.thisPage.amountObject.amount);
  }
  newAmount = newAmount.toFixed(2);
}

function updateFeeCoverDisplay() {
  const feeCoverDisplay = document.querySelector(".processing-fee-cover-amount");
  if (!feeCoverDisplay) return;

  const amountText = utils.formatAmountForLocaleAndCurrency(
    feeCoverAmount,
    "en-US",
    state.thisPage.selectedCurrency || "USD"
  );

  feeCoverDisplay.innerHTML = `${amountText}`;
}

function updateSubmitButton() {
  const submitButton = document.querySelector(".dynamic-giving-button");
  if (!submitButton) return;
  if (!feeCoverCheckbox) return;
  if (!state.thisPage.frequencyObject) return;
  if (newAmount === 0) return;

  let submitLabelText = "Donate";

  const newAmountText = utils.formatAmountForLocaleAndCurrency(
    newAmount,
    "en-US",
    state.thisPage.selectedCurrency || "USD"
  );

  let frequencyText = state.thisPage.frequencyObject.frequency === "single" ? "" : " Monthly";

  let submitLabel = `${submitLabelText} ${newAmountText} ${frequencyText}`;

  if (state.thisPage.isFrench) {
    submitLabelText = "Faire un don";
    frequencyText = state.thisPage.frequencyObject.frequency === "single" ? "" : " mensuel";
    submitLabel = `${submitLabelText} ${frequencyText} de ${newAmountText} `;
  }

  submitButton.innerHTML = submitLabel;
}

function updateMonthlyModalOneTime() {
  // Get the current total, including fee.
  const totalWithFeeElement = document.querySelector("[data-token='amount-total']");
  if (!totalWithFeeElement) return;
  const totalWithFee = totalWithFeeElement.innerHTML.replace(/A|CA/g, "");
  const upsellOneTimeAmountElement = document.querySelector(
    "#monthly-modal-no #one-time-modal-amount"
  );
  if (!upsellOneTimeAmountElement) return;
  upsellOneTimeAmountElement.innerHTML = totalWithFee;
}

// This function returns the new donation total, with the fee, if fee-cover
// checkbox is checked.
// The Apple Pay component, for one, relies on this function.
export function getNewDonationTotal() {
  if (!state.thisPage.amountObject || !state.thisPage.amountObject.amount) {
    return false;
  }
  let newDonationTotal = state.thisPage.amountObject.amount;
  const totalWithFeeElement = document.querySelector(
    "[data-token='amount-total']"
  );
  if (totalWithFeeElement) {
    newDonationTotal = totalWithFeeElement.innerHTML.replace(/\$|,/g, '');
  }
  return newDonationTotal;
}

// Unhides the fee cover checkbox element.
function activateFeeCover() {
  showFeeCover();
  isFeeCoverActive = true;
}

// Unchecks and hides the fee cover checkbox element.
function deactivateFeeCover() {
  uncheckFeeCover();
  hideFeeCover();
  isFeeCoverActive = false;
}

function checkFeeCover() {
  if (!feeCoverCheckbox) return;
  feeCoverCheckbox.checked = true;
}

function uncheckFeeCover() {
  if (!feeCoverCheckbox) return;
  feeCoverCheckbox.checked = false;
}

function showFeeCover() {
  if (feeCoverElement) {
    feeCoverElement.classList.remove("hidden");
  };
}

function hideFeeCover() {
  if (feeCoverElement) {
    feeCoverElement.classList.add("hidden");
  };
}

// Tests if the donation amount selected is over a certain limit.
function isAmountOverLimit() {
  if (typeof state.thisPage.amountObject === "undefined") return false;
  if (isNaN(state.thisPage.amountObject.amount)) return false;
  if (state.thisPage.amountObject.amount > feeCoverLimit) return true;
}

// This function will show the fee cover if the selected donation amount is 
// at or below the limit.
function toggleFeeCoverBasedOnAmount() {
  if (isAmountOverLimit()) {
    wasFeeCoverOverLimit = true;
    deactivateFeeCover();
  } else {
    if (wasFeeCoverOverLimit) {
      activateFeeCover();
    } else {
      showFeeCover();
    }
    wasFeeCoverOverLimit = false;
  }
}

export function isFeeCoverActiveAndChecked() {
  if (!feeCoverCheckbox || !isFeeCoverActive) return false;

  if (isFeeCoverActive && feeCoverCheckbox.checked) {
    return true;
  } else {
    return false;
  }
}
