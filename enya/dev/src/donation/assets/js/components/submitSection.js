/*
* submitSection.js
* HSUS Engaging Networks Forms - Enya 2021
* Enya Submit Section Controller
* Created: Winter 2021
* Purpose: Manage activity related to the form submit section of Enya forms.
*/

import state from "commonComponents/stateManager";
import * as fieldHelpers from "commonHelpers/fieldHelpers";
import * as donationForm from "./donationForm";
import * as payment from "commonComponents/payment";
import * as spinner from "commonComponents/spinner";
import * as ecardDonation from "./ecardDonation";

// Handle to the submit button.
let submitButton;

export function init() {
  if (state.thisPage.formObject) {
    state.thisPage.formObject.onSubmit.subscribe(() => handleSubmit());
  }
  initSubmitButton();
}

function initSubmitButton() {
  submitButton = document.querySelector(".en__submit button");
  if (!submitButton) return;
  submitButton.classList.add("enya-donation-submit");
  submitButton.classList.add("dynamic-giving-button");

  if (state.thisPage.isFrench) {
    state.thisPage.submitLabel = "Faire un don";
  }
}

export function handleSubmit() {
  // Strip formatting from credit card field.
  payment.setCardFieldValueToRaw();

  // A fail-safe to make sure the PayPal payment type is set properly.
  payment.confirmPayPalPaymentType();

  donationForm.saveFormValues();

  if (state.thisPage.isEcardDonation) {
    ecardDonation.saveEcardDonationValues();
  }

  // Uncheck the SMS opt-in if phone field is blank.
  fieldHelpers.unCheckSMSOptInIfPhoneBlank();

  if (state.thisPage.isHSI) {
    fieldHelpers.checkSMSOptInIfPhoneFull();
  }

  // Show the spinner in the Donate button.
  spinner.showDonateButtonSpinner();
}
