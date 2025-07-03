/*
* monthlyModal.js
* HSUS Donation Forms - Enya 2021
* Enya Monthly Modal Controller
* Created: Winter 2021
* Purpose: Control the behavior of the monthly upsell modal.
*/

import state from "commonComponents/stateManager";
import * as feeCover from "./feeCover";
import * as utils from "utils/utilities";
import A11yDialog from "a11y-dialog";

// Set this flag to true if we find the monthly modal container on the page.
let monthlyModalExists = false;

// Handle to the modal "dialog" element. This is an A11yDialog instance.
let monthlyModalDialog;
export let monthlySuggestedAmount;
const amountMethod = "levels"; // Possible values: "algorithm" or "levels".
export let upsellYesClicked = false;

export function init() {
  if (!state.thisPage.enableMonthlyModal) return;

  initMonthlySuggestedAmount();
  initMonthlyModal();
  startButtonListeners();

  // Preload the upsell image so there's no delay when it appears.
  preloadMonthlyModalImage();
}

// Initialize suggested monthly amount to the default.
function initMonthlySuggestedAmount() {
  if (!state.thisPage.monthlyModalDefaultAmount) return;
  monthlySuggestedAmount = state.thisPage.monthlyModalDefaultAmount;

  // Subscribe to changes in amount.
  state.thisPage.amountObject.onAmountChange.subscribe((amount) => updateMonthlySuggestedAmount());
}

function updateMonthlySuggestedAmount() {
  if (!state.thisPage.frequencyObject) return;
  if (!state.thisPage.monthlyModalDefaultAmount) return;
  if (!state.thisPage.amountObject) return;
  if (!monthlySuggestedAmount) return;

  // Only update the amount if the frequency is one-time.
  // If current frequency is monthly, reset the suggested amount to the default.
  if (state.thisPage.frequencyObject.frequency === "monthly") {
    monthlySuggestedAmount = state.thisPage.monthlyModalDefaultAmount;
  } else {
    if (amountMethod === "algorithm") {
      // Set upsell suggested amount. Use algorithm method.
      monthlySuggestedAmount = calculateMonthlyAmount(state.thisPage.amountObject.amount);
    } else if (amountMethod === "levels") {
      // Set upsell suggested amount. Use levels method.
      monthlySuggestedAmount = getMonthlyForOneTime(state.thisPage.amountObject.amount);
    } else {
      // If the amountMethod is something else, use the algorithm method.
      monthlySuggestedAmount = calculateMonthlyAmount(state.thisPage.amountObject.amount);
    }
  }

  // Safeguard: if monthlySuggestedAmount comes back as NaN, set to default.
  if (isNaN(monthlySuggestedAmount) || monthlySuggestedAmount === "") {
    monthlySuggestedAmount = state.thisPage.monthlyModalDefaultAmount;
  }
}

function initMonthlyModal() {
  // A11yDialog will insert the modal as a sibling to this mainContent element.
  const mainContent = document.querySelector("#page-wrapper");
  const monthlyModalContainer = document.querySelector("#monthly-modal");

  // If there's no monthly modal content on this page, get out.
  if (!monthlyModalContainer) return;

  // Set flag so we know that there is a monthly modal on this page.
  monthlyModalExists = true;

  monthlyModalDialog = new A11yDialog(monthlyModalContainer, mainContent);
  state.thisPage.monthlyModalDialog = monthlyModalDialog;

  if (state.thisPage.formObject) {
    // Don't subscribe to submit event if email consent modal is enabled.
    // That modal will trigger the monthly modal directly.
    if (!state.thisPage.enableEmailConsentModal) {
      state.thisPage.formObject.onSubmit.subscribe(() => {
        showMonthlyModal();
      });
    }
  }
}

export function showMonthlyModal() {
  // Don't proceed if any of our state vars are falsy.
  if (!monthlyModalDialog) return;
  if (!state.thisPage.frequencyObject) return;
  if (!state.thisPage.formObject) return;
  if (!state.thisPage.amountObject) return;

  // Submit the form if the monthly modal has been shown, and it's not currently
  // visible on the page.
  if (
    state.thisPage.monthlyModalShown &&
    !state.thisPage.isMonthlyModalVisible
  ) {
    doFinalSubmit();
    return;
  }

  // If the email consent modal is enabled, and it hasn't been submitted yet,
  // get out. The email consent modal will call showMonthlyModal after the user
  // clicks Yes or No.
  if (state.thisPage.enableEmailConsentModal && !state.thisPage.emailConsentModalProcessed) {
    return;
  }

  // Show the modal to one-time donors who've chosen an amount
  // that's less than the cutoff amount.
  if (shouldShowMonthlyModal()) {
    // Avoid form submission so users can see the modal.
    state.thisPage.formObject.submit = false;

    // Refresh the monthly suggested amount, in case the fee cover comes into
    // play.
    updateMonthlySuggestedAmount();

    // Remove the classes that allow automatic updates of the live amounts.
    const monthlyAmountSpan = document.querySelector("#monthly-modal-amount");
    const oneTimeAmountSpan = document.querySelector("#one-time-modal-amount");

    if (monthlyAmountSpan) {
      monthlyAmountSpan.classList.remove("live-giving-upsell-amount");
      // Show suggested amount in monthlyAmountSpan.
      monthlyAmountSpan.textContent = formatAmount(monthlySuggestedAmount);

      // But if the fee cover is active, we need to display the additional
      // amount that the fee cover will add. But we don't want to add this
      // amount to the monthlySuggestedAmount, or else the page will double the
      // fee cover if the user clicks Yes.
      if (feeCover.isFeeCoverActiveAndChecked()) {
        monthlyAmountSpan.textContent = formatAmount(
          parseFloat(monthlySuggestedAmount) + parseFloat(monthlySuggestedAmount * 0.03)
        );
      }
    }

    if (oneTimeAmountSpan) {
      oneTimeAmountSpan.classList.remove("live-giving-amount");
    }

    monthlyModalDialog.show();
    state.thisPage.monthlyModalShown = true;
    state.thisPage.isMonthlyModalVisible = true;
  }
}

// Show the modal to one-time donors who've chosen an amount
// that's less than the cutoff amount.
export function shouldShowMonthlyModal() {
  if (!state.thisPage.frequencyObject) return;
  if (!state.thisPage.amountObject) return;
  if (!monthlyModalExists) return;
  if (state.thisPage.frequencyObject.frequency === "single" &&
      state.thisPage.amountObject.amount < state.thisPage.monthlyModalCutoffAmount) {
    return true;
  } else {
    return false;
  }
}

export function hideMonthlyModal() {
  if (!monthlyModalDialog) return;
  monthlyModalDialog.hide();
  state.thisPage.isMonthlyModalVisible = false;
}

// Handle Yes and No button clicks.
function startButtonListeners() {
  const modalYes = document.querySelector("#monthly-modal-yes");
  const modalNo = document.querySelector("#monthly-modal-no");

  if (!modalYes || !modalNo) return;

  modalYes.addEventListener("click", (event) => {
    handleYes(event);
  });

  modalNo.addEventListener("click", (event) => {
    handleNo(event);
  });
}

function handleYes(event) {
  if (!state.thisPage.frequencyObject) return;
  if (!state.thisPage.amountObject) return;
  if (!state.thisPage.formObject) return;

  // Save the one-time amount that had been selected.
  const oneTimeAmount = state.thisPage.amountObject.amount;

  // We need to save the monthly suggested amount before we change the
  // frequency to monthly.
  const savedMonthlySuggestedAmount = monthlySuggestedAmount;

  // Find and select monthly giving
  const enFieldRecurrpay = document.querySelector(
    ".en__field--recurrpay input[value='Y']"
  );
  if (enFieldRecurrpay) {
    // We need to trigger a click and not just set the value to true. The click
    // will fire the field update that changes the hidden source code to the
    // monthly one.
    enFieldRecurrpay.click();
  }

  // Find the hidden radio select that needs to be selected when entering an "Other" amount.
  const enFieldOtherAmountRadio = document.querySelector(
    ".en__field--donationAmt input[value='other']"
  );
  if (enFieldOtherAmountRadio) {
    enFieldOtherAmountRadio.checked = true;
  }

  // Enter the other amount and remove the "en__field__item--hidden" class from the input's parent.
  const enFieldOtherAmount = document.querySelector(
    "input[name='transaction.donationAmt.other']"
  );
  if (enFieldOtherAmount) {
    enFieldOtherAmount.value = savedMonthlySuggestedAmount;
    state.thisPage.amountObject.load();
    state.thisPage.frequencyObject.load();
    if (enFieldOtherAmount.parentElement) {
      enFieldOtherAmount.parentElement.classList.remove(
        "en__field__item--hidden"
      );
    }
  }

  recordUpsellChoice("yes", oneTimeAmount);
  hideMonthlyModal();
  doFinalSubmit();
}

function handleNo(event) {
  recordUpsellChoice("no");
  hideMonthlyModal();
  doFinalSubmit();
}

function doFinalSubmit() {
  // For Apple Pay, we don't want the form to submit here. Instead, we need to
  // trigger a click on the Apple Pay button.
  if (state.thisPage.isApplePaySelected) {
    const applePayButton = document.getElementById("apple-pay-button");
    if (applePayButton) {
      applePayButton.click();
    }
  } else {
    // Enable form submission and then submit.
    state.thisPage.formObject.submit = true;
    state.thisPage.formObject.submitForm();
  }
}

function recordUpsellChoice(choice, oneTimeAmount = null) {
  let upsellField;
  // HSUS and HSI use different untagged fields to record upsell choice.
  if (state.thisPage.isHSI) {
    upsellField = document.querySelector("[name='transaction.othamt1']");
  } else {
    upsellField = document.querySelector("[name='transaction.othamt4']");
  }

  if (upsellField === null) return;

  if (!choice) return;
  if (choice === "yes") {
    // The Apple Pay component reads this value.
    upsellYesClicked = true;
    // Update the hidden othamt4 field.
    upsellField.value = `Yes. One-time was ${oneTimeAmount}.`;
  }
  if (choice === "no") {
    // Update the hidden othamt4 field.
    upsellField.value = "No";
  }
}

function calculateMonthlyAmount(amount) {
  const lowestLimit = 1.25;
  const multiplier = 1.2;
  const newAmount = Math.min(Math.floor(Math.max(Math.floor(Math.sqrt((amount / (((365.25 / 12) / 7)))) * multiplier), lowestLimit) * ((362.25 / 12) / 7)), amount);
  return `${newAmount}.00`;
}

function getMonthlyForOneTime(oneTimeAmount = 0) {
  // Set default, which will apply to one-time between 5 and 13.
  let monthlyAmount = 5;
  switch (true) {
    case oneTimeAmount <= 9:
      // Use the default
      break;
    case oneTimeAmount <= 14:
      monthlyAmount = 6;
      break;
    case oneTimeAmount <= 24:
      monthlyAmount = 8;
      break;
    case oneTimeAmount <= 29:
      monthlyAmount = 10;
      break;
    case oneTimeAmount <= 49:
      monthlyAmount = 12;
      break;
    case oneTimeAmount <= 74:
      monthlyAmount = 17;
      break;
    case oneTimeAmount <= 99:
      monthlyAmount = 21;
      break;
    case oneTimeAmount <= 149:
      monthlyAmount = 25;
      break;
    case oneTimeAmount <= 199:
      monthlyAmount = 30;
      break;
    case oneTimeAmount <= 249:
      monthlyAmount = 34;
      break;
    case oneTimeAmount <= 299:
      monthlyAmount = 38;
      break;
    case oneTimeAmount <= 349:
      monthlyAmount = 45;
      break;
    case oneTimeAmount <= 399:
      monthlyAmount = 50;
      break;
    default:
      break;
  }

  return `${monthlyAmount}.00`;
}

function formatAmount(amount) {
  const formattedAmount = utils.formatAmountForLocaleAndCurrency(
    amount,
    "en-US",
    state.thisPage.selectedCurrency || "USD"
  );

  return formattedAmount;
}

// Loads modal image in the background, before the modal is shown.
function preloadMonthlyModalImage() {
  if (!state.thisPage.monthlyModalImagePreloaded) {
    const modalImage = document.querySelector(
      "#monthly-modal .monthly-modal-image"
    );

    if (!modalImage) return;

    const modalImageStyles = window.getComputedStyle(modalImage);
    let modalImageUrl = modalImageStyles["background-image"];
    modalImageUrl = /^url\((['"]?)(.*)\1\)$/.exec(modalImageUrl);

    // If matched, retrieve url, otherwise "".
    modalImageUrl = modalImageUrl ? modalImageUrl[2] : "";

    if (modalImageUrl !== "") {
      const preloadedImage = new Image();
      preloadedImage.src = modalImageUrl;
      state.thisPage.monthlyModalImagePreloaded = true;
    }
  }
}
