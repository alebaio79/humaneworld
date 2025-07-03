/*
* payment.js
* HSUS Engaging Networks Forms - Enya 2021
* Enya Payment Section Controller
* Created: Winter 2021
* Purpose: Manage activity related to the payment information section of Enya forms.
*/

import state from "./stateManager";
import * as pageManager from "./pageManager";
import Cleave from "cleave.js";
import * as utils from "utils/utilities";

// Handles to fields in this section.
let paymentSourceSection;
let paymentSourceRadios;
let paymentTypeField;

// Handles to the credit card field DOM element and the Cleave instance for it.
let cardNumberField;
let cleaveCardField;

// Map card names to the two-letter abbreviations used by the payment type
// field.
const cardTypes = {
  amex: "AX",
  discover: "DI",
  mastercard: "MC",
  visa: "VI"
};

const cardTypesIATS = {
  amex: "amex",
  discover: "discover",
  mastercard: "mc",
  visa: "visa"
};

export function init() {
  initPaymentSourceSection();
  initPaymentTypeField();
  initCreditCardFields();
  moveBankNote();

  // After all of Enya is ready, update the hidden payment type dropdown to
  // match the visible payment source radios. We need a delay here to allow the
  // EN JS to fire first.
  document.addEventListener("enyaReady", function() {
    setTimeout(() => {
      updatePaymentType();
    }, 2000);
  });
}

// Set handle to credit/bank/paypal buttons section, and add a class
// so it's more semantic to target in the Sass.
function initPaymentSourceSection() {
  // In HSUS instance, the Payment Source field is NOT_TAGGED_81.
  // In HSI instance, the Payment Source field is NOT_TAGGED_113.
  // In WLT instance, the Payment Source field is NOT_TAGGED_37.
  // TODO: Find a better way of targeting this field.
  paymentSourceSection = document.querySelector(
    ".en__field--NOT_TAGGED_81, .enya-wlt .en__field--NOT_TAGGED_37, .enya-hsi .en__field--NOT_TAGGED_113"
  );

  if (!paymentSourceSection) return;

  paymentSourceSection.classList.add("payment-source-section");

  initPaymentSourceRadios();

  startPaymentSourceListener();
}

// Add class to each payment source radio.
// And add click/change handler, to update hidden payment type.
function initPaymentSourceRadios() {
  // In HSUS instance, the Payment Source field is NOT_TAGGED_81.
  // In HSI instance, the Payment Source field is NOT_TAGGED_113.
  // In WLT instance, the Payment Source field is NOT_TAGGED_37.
  // TODO: Find a better way of targeting this field.
  paymentSourceRadios = paymentSourceSection.querySelectorAll(
    "input[name*=NOT_TAGGED_81], .enya-wlt input[name*=NOT_TAGGED_37], .enya-hsi input[name*=NOT_TAGGED_113]"
  );

  if (!paymentSourceRadios) return;

  paymentSourceRadios.forEach((thisRadio) => {
    thisRadio.classList.add("payment-source-radio");
    if (thisRadio.value === "Bank") {
      thisRadio.classList.add("payment-source-radio-bank");
      const bankFieldItem = thisRadio.closest(".en__field__item");
      if (bankFieldItem) {
        bankFieldItem.classList.add("payment-choice-bank");
      }
    } else if (thisRadio.value === "Credit") {
      thisRadio.classList.add("payment-source-radio-credit");
      const creditFieldItem = thisRadio.closest(".en__field__item");
      if (creditFieldItem) {
        creditFieldItem.classList.add("payment-choice-credit");
      }
    } else if (thisRadio.value === "PayPal") {
      thisRadio.classList.add("payment-source-radio-paypal");
      const payPalFieldItem = thisRadio.closest(".en__field__item");
      if (payPalFieldItem) {
        payPalFieldItem.classList.add("payment-choice-paypal");
      }
    }
  });

  // Set state for this choice and add flag to the body.
  const checkedPaymentSource = document.querySelector(
    ".payment-source-radio:checked"
  );
  if (checkedPaymentSource) {
    state.thisPage.paymentSourceSelected = checkedPaymentSource.value.toLowerCase();
  }
  pageManager.updatePageClasses();
}

// Set handle to paymentType field. Other functions will use this handle.
function initPaymentTypeField() {
  paymentTypeField = document.querySelector(
    "#en__field_transaction_paymenttype"
  );
}

// Set up the credit card fields.
function initCreditCardFields() {
  initCardNumberField();
  initCardExpirationField();
  initCVVField();
  wrapExpireAndCVV();
}

// Set handle to cardNumber field. Other functions will use this handle.
function initCardNumberField() {
  cardNumberField = document.querySelector(
    "#en__field_transaction_ccnumber"
  );

  if (!cardNumberField) return;

  // Add autocomplete="off".
  cardNumberField.setAttribute("autocomplete", "off");

  // Convert this field into a Cleave autoformat input.
  cleaveCardField = new Cleave(cardNumberField, {
    creditCard: true,
    onCreditCardTypeChanged: function(type) {
      handleCardNumberChange(type);
    }
  });
}

function initCardExpirationField() {
  const cardExpirationField = document.querySelector("#en__field_transaction_ccexpire");

  if (!cardExpirationField) return;

  cardExpirationField.setAttribute("autocomplete", "off");
  if (cardExpirationField.tagName === "INPUT") {
    cardExpirationField.setAttribute("placeholder", "MM/YY");
    cardExpirationField.addEventListener("keyup", handleCardExpirationChange);
  }
}

function initCVVField() {
  const cardCVVField = document.querySelector(
    "#en__field_transaction_ccvv"
  );

  if (!cardCVVField) return;

  cardCVVField.setAttribute("autocomplete", "off");
}

// Move expire and cvv rows inside a container so we can put them side by side.
function wrapExpireAndCVV() {
  const fields = utils.getAll(".en__field--ccexpire, .en__field--ccvv");
  utils.wrapAll(fields, "div", "expire-cvv-wrapper");
}

// Listen for changes to payment source radios.
function startPaymentSourceListener() {
  if (!paymentSourceRadios) return;

  ["change", "click"].forEach(eventName => {
    paymentSourceRadios.forEach((thisRadio) => {
      thisRadio.addEventListener(
        eventName,
        handlePaymentSourceChange
      );
    });
  });
}

// Autodetect credit card type, set value of hidden payment type field,
// and add a class to the card number field, which shows a card type image.
function handleCardNumberChange(cardType) {
  // Update the payment type field.
  setPaymentTypeForCredit(cardType);

  // Mark the card number field with a class name denoting this card type.
  updateCardNumberClass(cardType);
}

function getRawValueForCard() {
  if (!cleaveCardField) return false;
  return cleaveCardField.getRawValue();
}

export function setCardFieldValueToRaw() {
  if (!cardNumberField) return false;
  cardNumberField.value = getRawValueForCard();
}

function handleCardExpirationChange(event) {
  const thisTarget = event.target;
  if (!thisTarget) return;

  // capture what key was pressed
  const key = event.keyCode || event.charCode;

  // If key is del or backspace, exit the function
  if (key === 8 || key === 46) return;

  const cardExpirationValue = thisTarget.value.toLowerCase();

  thisTarget.value = formatCardExpiration(cardExpirationValue);
}

// When the payment source changes, update the payment type field.
function handlePaymentSourceChange(event) {
  const thisTarget = event.target;
  if (!thisTarget) return;

  const paymentSourceValue = thisTarget.value.toLowerCase();

  // Update the payment type field.
  if (paymentSourceValue === "credit" || paymentSourceValue === "cc") {
    setPaymentTypeForCredit();
  }

  if (paymentSourceValue === "bank" || paymentSourceValue === "ec") {
    setPaymentTypeForBank();
    state.thisPage.paymentSourceSelected = "bank";
  }

  if (paymentSourceValue === "paypal") {
    setPaymentTypeForPayPal();
    state.thisPage.paymentSourceSelected = "paypal";
  }

  if (paymentSourceValue === "apple pay") {
    setPaymentTypeForApplePay();
    state.thisPage.paymentSourceSelected = "applepay";
  }

  // Save this choice in state and add a flag to the body.
  state.thisPage.paymentSourceSelected = paymentSourceValue;
  pageManager.updatePageClasses();
}

// Update the paymentType hidden select.
function setPaymentTypeForCredit(cardType) {
  if (!paymentTypeField) return;

  const cardTypeToken = getCardTypeToken(cardType);

  // If the cardTypeToken comes back blank, set the payment type field to
  // Visa. Otherwise, the form won't submit. EN server-side processing will
  // handle the error.
  if (cardTypeToken === "") {
    paymentTypeField.value = "VI";
  } else {
    paymentTypeField.value = cardTypeToken;
  }

  // For Apple Pay, we have an event listener for when the value changes.
  paymentTypeField.dispatchEvent(new Event("change"));
}

function setPaymentTypeForBank() {
  if (!paymentTypeField) return;

  // Vantiv requires ACH as the value here, not Bank.
  paymentTypeField.value = "ACH";

  // For Apple Pay, we have an event listener for when the value changes.
  paymentTypeField.dispatchEvent(new Event("change"));
}

function setPaymentTypeForPayPal() {
  if (!paymentTypeField) return;

  paymentTypeField.value = "PayPal";

  // For Apple Pay, we have an event listener for when the value changes.
  paymentTypeField.dispatchEvent(new Event("change"));
}

function setPaymentTypeForApplePay() {
  if (!paymentTypeField) return;

  paymentTypeField.value = "applepay";

  // For Apple Pay, we have an event listener for when the value changes.
  paymentTypeField.dispatchEvent(new Event("change"));
}

function updateCardNumberClass(cardType) {
  if (!cardNumberField) return;
  if (!cardType) {
    cardType = "unknown";
  }

  cardNumberField.classList.remove("amex", "discover", "mastercard", "visa");
  cardNumberField.classList.add(cardType.toLowerCase());
}

// Return a two-letter token for a card type.
// This is necessary because of the two-letter values we use in EN.
// CMK12202022: Updated this function to know about IATS values.
function getCardTypeToken(cardType) {
  let token = "";
  if (cardTypes && cardTypes[cardType]) {
    token = cardTypes[cardType];
  }

  // Revise for IATS values.
  if (state.thisPage.isIATSForm) {
    if (cardTypesIATS && cardTypesIATS[cardType]) {
      token = cardTypesIATS[cardType];
    }
  }
  return token;
}

function moveBankNote() {
  const bankNoteBlock = document.querySelector(".bank-note-block");
  const bankAccountTypeBlock = document.querySelector(
    ".en__field--bankAccountType"
  );

  if (bankNoteBlock && bankAccountTypeBlock) {
    // Move the note before the account type dropdown.
    bankAccountTypeBlock.prepend(bankNoteBlock);
  }
}

// Function that masks the cc expiry field.
// Source: https://stackoverflow.com/a/61703838/135196
function formatCardExpiration(string) {
  return string
    .replace(
      /[^0-9]/g,
      "" // To allow only numbers
    )
    .replace(
      /^([2-9])$/g,
      "0$1/" // To handle 3 > 03
    )
    .replace(
      /^(1{1})[3-9]{1}$/g,
      "$1"
    )
    .replace(
      /^(1{1})([3-9]{1})$/g,
      "0$1/$2" // 13 > 01/3
    )
    .replace(
      /^0{1,}/g,
      "0" // To handle 00 > 0
    )
    .replace(
      /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
      "$1/$2" // To handle 113 > 11/3
    )
    .replace(
      /^([0-1]{1}[0-9]{1})$/g,
      "$1/"
    );
}

// Update the hidden payment type select to match the selected payment source
// radio. This is necessary on page load, because payment source can come from
// the server with a value other than the default.
function updatePaymentType() {
  const checkedPaymentSourceRadio = document.querySelector(
    ".payment-source-radio:checked"
  );
  const paymentSourceRadioCredit = document.querySelector(
    ".payment-source-radio-credit"
  );
  if (checkedPaymentSourceRadio) {
    checkedPaymentSourceRadio.dispatchEvent(new Event("change"));
  } else {
    // If no payment source radio is checked by default on page load, check the
    // credit one.
    if (paymentSourceRadioCredit) {
      paymentSourceRadioCredit.click();
      console.log("Clicked on credit because no payment source radio was selected.");
    }
  }
  // This is a hack. We need to make sure that Apple Pay does not get selected
  // as the payment type if it's not available on this form.
  setTimeout(() => {
    if (
      state.thisPage.isApplePaySelected &&
      !state.thisPage.isApplePayEnabled
    ) {
      if (paymentSourceRadioCredit) {
        // Trigger a click on the Credit payment source radio.
        paymentSourceRadioCredit.click();
        console.log("Clicked on credit because Apple Pay is not available.");
      }
    }
  }, 2000);
}

// Function that makes sure the payment type is set to PayPal if the payment
// source radio for PayPal is checked.
export function confirmPayPalPaymentType() {
  console.log("confirmPayPalPaymentType fired.");
  const payPalSourceRadio = document.querySelector(
    ".payment-source-radio-paypal"
  );
  if (!payPalSourceRadio) return;
  if (payPalSourceRadio.checked) {
    console.log("Confirming payment type setting for PayPal.");
    setPaymentTypeForPayPal();
  }
}
