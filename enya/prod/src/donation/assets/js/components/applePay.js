/*
 * applePay.js
 * HSUS Engaging Networks Forms - Enya 2021
 * Created: Summer 2021
 * Purpose: Managing Apple Pay interactions.
 */

import state from "commonComponents/stateManager";
import * as pageManager from "commonComponents/pageManager";
import * as storageHelpers from "commonHelpers/storageHelpers";
import * as pageHelpers from "commonHelpers/pageHelpers";
import * as utils from "utils/utilities";
import * as validationHelpers from "commonHelpers/validationHelpers";
import * as monthlyModal from "./monthlyModal";
import * as submitSection from "./submitSection";
import * as feeCover from "./feeCover";

// Completely turn off all Apple Pay behavior on all donation forms.
// Hard-setting this to false, which allows all donation forms to display Apple
// Pay to Safari users who have it configured. Note that adding sap=0 to a
// donation form URL will set killApplePay to true, and hide Apple Pay on that
// form. See initKillApplePay() below.
let killApplePay = false;

// DOM elements
let pageForm;
let paymentTypeField;

const merchantIdentifierPrelive = "merchant.com.humane.prelive";
const merchantIdentifierProduction = "merchant.com.humane1.prod";

// Set to production by default
let merchantIdentifier = merchantIdentifierProduction;
const merchantDomainName = "secured.humanesociety.org";
const merchantDisplayName = "The Humane Society of the United States";

// We'll fill in the session identifier below.
let merchantSessionIdentifier = "";
const merchantNonce = 'fake-nonce';
const merchantEpochTimestamp = '1467051059';
const merchantSignature = 'fake-signature';

// Validation
const merchantCountryCode = 'US';
const merchantCurrencyCode = 'USD';

// Disable Discover on Apple Pay for now. Subsequent monthly donations using
// Apple Pay backed by Discover were failing.
// const merchantSupportedNetworks = ['visa', 'masterCard', 'amex', 'discover'];
const merchantSupportedNetworks = ['visa', 'masterCard', 'amex'];
const merchantCapabilities = ['supports3DS'];
const merchantTotalLabel = "The HSUS";

const applePaySectionMarkup = `
  <div id="apple-pay-section" class="disabled">
    <div id="apple-pay-button" hidden></div>
    <p id="apple-pay-message" hidden>
      <strong>Please choose a different payment method.</strong><br>
      This browser may not support Apple Pay or your Apple Pay account may not be configured correctly. If you are using Safari on a supported device, make sure your Apple Pay account includes all necessary information, including billing address and a valid credit card.
    </p>
  </div>
`;

// Handles to each donor information input. We'll set these handles and then use
// them to hide and fill the inputs.
let firstNameInput;
let lastNameInput;
let emailInput;
let address1Input;
let address2Input;
let cityInput;
let stateInput;
let postcodeInput;
let countryInput;
let phoneInput;
let donorInfoInputs;

export function init() {
  initKillApplePay();
  initPageForm();
  initDonorInfoInputs();
  initPaymentTypeField();
  markApplePaySourceOption();
  initMerchantSessionIdentifier();
  initApplePay();
}

function initKillApplePay() {
  // If there's a URL param that tells us to deactivate, do so.
  // Otherwise, Apple Pay will be enabled on this form.
  if (typeof state.activeURLParams["sap"] !== "undefined") {
    if (state.activeURLParams["sap"] === "0") {
      killApplePay = true;
    }
  }
}

function initPageForm() {
  pageForm = pageHelpers.getFormElement();
}

function initDonorInfoInputs() {
  firstNameInput = document.querySelector("#en__field_supporter_firstName");
  lastNameInput = document.querySelector("#en__field_supporter_lastName");
  emailInput = document.querySelector("#en__field_supporter_emailAddress");
  address1Input = document.querySelector("#en__field_supporter_address1");
  address2Input = document.querySelector("#en__field_supporter_address2");
  cityInput = document.querySelector("#en__field_supporter_city");
  stateInput = document.querySelector("#en__field_supporter_region");
  postcodeInput = document.querySelector("#en__field_supporter_postcode");
  countryInput = document.querySelector("#en__field_supporter_country");
  phoneInput = document.querySelector("#en__field_supporter_phoneNumber2");

  // We'll need this array of inputs later, for applying behavior to all donor
  // fields.
  donorInfoInputs = [
    firstNameInput,
    lastNameInput,
    emailInput,
    address1Input,
    address2Input,
    cityInput,
    stateInput,
    postcodeInput,
    countryInput,
    phoneInput
  ];
}

// Set the handle to the payment type field, and add event listener.
// Hides or shows the Apple Pay section.
function initPaymentTypeField() {
  paymentTypeField = document.querySelector("[name='transaction.paymenttype']");
  addPaymentTypeListeners();
}

function addPaymentTypeListeners() {
  if (!paymentTypeField) return;

  if (hasApplePayPaymentType()) {
    // Add the listener and then fire its handler once, on page load.
    paymentTypeField.addEventListener('change', function() {
      handlePaymentTypeChange();
    });

    // We need a delay before we call this on page load, to allow the apple-pay-section to be created first.
    setTimeout(() => {
      handlePaymentTypeChange();
    }, 1000);
  }
}

function handlePaymentTypeChange() {
  if (!paymentTypeField) return;
  if (paymentTypeField.value === 'applepay') {
    showApplePaySection();
    hideDonorInfoFields();
    hideSubmitButton();
  } else {
    hideApplePaySection();
    showDonorInfoFields();
    showSubmitButton();
  };
}

// Returns true if Apple Pay appears as an option in the payment type field.
function hasApplePayPaymentType() {
  if (!paymentTypeField) return false;
  if (!pageForm) return false;

  let hasApplePaymentType = false;
  for (let i = 0; i < paymentTypeField.length; i++) {
    if (paymentTypeField.options[i].value === 'applepay') {
      hasApplePaymentType = true;
    }
  }
  return hasApplePaymentType;
}

// Add a class to Apple Pay source radio field, so we can hide as needed.
// We use CSS to hide the field. See _digital-wallets.scss for more.
function markApplePaySourceOption() {
  const applePaySourceOption = document.querySelector(
    "input[value='Apple Pay']"
  );
  if (!applePaySourceOption) return;
  const parentField = applePaySourceOption.closest(".en__field__item");
  if (parentField) {
    parentField.classList.add("apple-pay-source-option-field");
  }
}

function initMerchantSessionIdentifier() {
  merchantSessionIdentifier = pageHelpers.getSessionID();
}

function initApplePay() {
  if (!hasApplePayPaymentType()) return;
  // Save the Apple Pay-ready flag to the state and then update the body classes.
  state.thisPage.hasApplePayPaymentType = true;
  pageManager.updatePageClasses();
  if (!killApplePay) {
    insertApplePaySection();
    insertPaymentTokenInput();
    initMerchantIdentifier();
    enableApplePayButton();
  }
}

function initMerchantIdentifier() {
  if (!state.activeURLParams) return;

  if (typeof state.activeURLParams["ap"] !== "undefined") {
    if (state.activeURLParams["ap"] === "test") {
      merchantIdentifier = merchantIdentifierPrelive;
    } else {
      merchantIdentifier = merchantIdentifierProduction;
    }
  }
}

function enableApplePayButton() {
  if (window.ApplePaySession) {
    const promise = window.ApplePaySession.canMakePaymentsWithActiveCard(
      merchantIdentifier
    );
    promise.then(function(canMakePayments) {
      if (canMakePayments) {
        console.log('This device can make Apple Pay payments.');
        movePaymentSection();
        showApplePayButton();
        hideApplePayErrorMessage();
        addApplePaySectionClickHandler();
        // Save the Apple Pay-enabled flag to the state, and then update body
        // classes.
        state.thisPage.isApplePayEnabled = true;
        pageManager.updatePageClasses();
      } else {
        console.log('This device/browser cannot make Apple Pay payments.');
        hideApplePayButton();
        showApplePayErrorMessage();
      }
    }).catch(error => {
      console.error(error);
      hideApplePayButton();
      showApplePayErrorMessage();
    });
  } else {
    console.log('This device/browser cannot make Apple Pay payments.');
    // Apple Pay is not available in this browser.
    hideApplePaySection();
  }
}

function insertApplePaySection() {
  document.getElementsByClassName("en__submit")[0].parentNode
    .append(utils.stringToHTML(applePaySectionMarkup));
  document.getElementById('apple-pay-button').addEventListener('click', onPayClicked);
}

// To work with the upsell, we need to have the parent element of the Apple Pay
// button respond to clicks, not the button itself. Pointer events are disabled
// on the button itself.
function addApplePaySectionClickHandler() {
  const applePaySection = document.getElementById("apple-pay-section");
  const applePayButton = document.getElementById("apple-pay-button");
  if (!applePaySection || !applePayButton) return;
  applePaySection.addEventListener("click", (event) => {
    if (!monthlyModal.shouldShowMonthlyModal()) {
      applePayButton.click();
    } else {
      // If email or phone are not valid, bail.
      const emailIsValid = validateEmail();
      const phoneIsValid = validatePhone();
      if (!emailIsValid || !phoneIsValid) return;

      monthlyModal.showMonthlyModal();
    }
  });
}

function insertPaymentTokenInput() {
  if (!pageForm) return false;

  const input = document.createElement("input");
  input.setAttribute("type", "hidden");
  input.setAttribute("name", "PkPaymentToken");
  pageForm.appendChild(input);
}

function sendPaymentToken(token) {
  return new Promise(function(resolve, reject) {
    resolve(true);
  });
}

function onPayClicked() {
  // If email or phone are not valid, bail.
  const emailIsValid = validateEmail();
  const phoneIsValid = validatePhone();
  if (!emailIsValid || !phoneIsValid) return;

  // Clear out any validation errors on hidden fields.
  resetValidationForHiddenDonorInfoInputs();

  // Fill the token from sessionStorage if we already have one.
  updateToken();

  try {
    const request = {
      supportedNetworks: merchantSupportedNetworks,
      merchantCapabilities,
      countryCode: merchantCountryCode,
      currencyCode: merchantCurrencyCode,
      requiredShippingContactFields: [
        "postalAddress",
        "name"
      ],
      lineItems: getLineItems(),
      total: {
        label: merchantTotalLabel,
        amount: getDonationAmount(),
        type: 'final'
      }
    };
    if (!getDonationAmount()) {
      alert("Please select a donation amount.");
      return;
    }
    const session = new window.ApplePaySession(3, request);
    session.onvalidatemerchant = function(event) {
      performValidation(event.validationURL).then(function(merchantSession) {
        session.completeMerchantValidation(merchantSession);
      });
    };
    session.onpaymentauthorized = function(event) {
      fillDonorInfoInputs(event.payment.shippingContact);
      sendPaymentToken(event.payment.token).then(function(success) {
        updateToken(JSON.stringify(event.payment.token));
        document.getElementsByClassName("en__submit")[0].hidden = false;
        document.getElementsByClassName("en__component--page")[0].submit();
        submitSection.handleSubmit();
      });
    };
    session.oncancel = function(event) {
      console.log("session.oncancel was called.");
      resetValidationForHiddenDonorInfoInputs();
      // alert("You cancelled. Sorry it didn't work out.");
    };
    session.begin();
  } catch (e) {
    console.log(e.message);
  }
}

function updateToken(token) {
  let finalToken = "";

  // If the token is blank, see if we have one in storage.
  if (!token) {
    const storedToken = getTokenFromStorage();
    if (storedToken) {
      finalToken = storedToken;
    }
  } else {
    // Token is not blank. Copy it to hidden input and store it.
    finalToken = token;
    saveTokenToStorage(token);
  }
  document.getElementsByName("PkPaymentToken")[0].value = finalToken;
}

function validateEmail() {
  if (!emailInput) return;
  validationHelpers.validate(emailInput);
  return emailInput.checkValidity();
}

function validatePhone() {
  if (!phoneInput) return;
  validationHelpers.validate(phoneInput);
  return phoneInput.checkValidity();
}

// Move the payment section above the Your Information fields.
// This way, we can hide those fields for Apple Pay users before they get
// to them.
function movePaymentSection() {
  const paymentHeader = document.querySelector(".payment-heading-block");
  const paymentSection = document.querySelector(".payment-section-block");
  const yourInfoHeading = document.querySelector(
    ".your-information-heading-block"
  );
  if (!paymentHeader || !paymentSection || !yourInfoHeading) return;

  yourInfoHeading.before(paymentHeader);
  yourInfoHeading.before(paymentSection);
}

function getLineItems() {
  const lineItems = [];

  if (state.thisPage.isMonthlySelected) {
    // If this is a monthly gift, add line items related to that.
    const monthlyLineItem = {
      type: "final",
      label: "Monthly Donation",
      paymentTiming: "recurring",
      amount: getDonationAmount(),
      recurringPaymentStartDate: new Date(),
      recurringPaymentIntervalUnit: "month"
    };
    lineItems.push(monthlyLineItem);
  }
  return lineItems;
}

// Copy data we received from Apple into the appropriate form input.
function fillDonorInfoInputs(donorInfoFromApple) {
  if (typeof donorInfoFromApple === "undefined") return;
  if (firstNameInput && typeof donorInfoFromApple.givenName !== "undefined") {
    firstNameInput.value = donorInfoFromApple.givenName;
  }
  if (lastNameInput && typeof donorInfoFromApple.familyName !== "undefined") {
    lastNameInput.value = donorInfoFromApple.familyName;
  }
  if (address1Input && typeof donorInfoFromApple.addressLines !== "undefined") {
    address1Input.value = donorInfoFromApple.addressLines[0] ? donorInfoFromApple.addressLines[0] : "";
  }
  if (address2Input && typeof donorInfoFromApple.addressLines !== "undefined") {
    address2Input.value = donorInfoFromApple.addressLines[1] ? donorInfoFromApple.addressLines[1] : "";
  }
  if (cityInput && typeof donorInfoFromApple.locality !== "undefined") {
    cityInput.value = donorInfoFromApple.locality;
  }
  if (stateInput && typeof donorInfoFromApple.administrativeArea !== "undefined") {
    stateInput.value = donorInfoFromApple.administrativeArea;
  }
  if (postcodeInput && typeof donorInfoFromApple.postalCode !== "undefined") {
    postcodeInput.value = donorInfoFromApple.postalCode;
  }
  if (countryInput && typeof donorInfoFromApple.countryCode !== "undefined") {
    countryInput.value = donorInfoFromApple.countryCode.toUpperCase();
  }
}

function performValidation(url) {
  return new Promise(function(resolve, reject) {
    const merchantSession = {};
    merchantSession.merchantIdentifier = merchantIdentifier;
    merchantSession.merchantSessionIdentifier = merchantSessionIdentifier;
    merchantSession.nonce = merchantNonce;
    merchantSession.domainName = merchantDomainName;
    merchantSession.epochTimestamp = merchantEpochTimestamp;
    merchantSession.signature = merchantSignature;
    const validationData = "&merchantIdentifier=" + merchantIdentifier + "&merchantDomain=" + merchantDomainName + "&displayName=" + merchantDisplayName;
    const validationUrl = '/ea-dataservice/rest/applepay/validateurl?url=' + url + validationData;
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      const data = JSON.parse(this.responseText);
      resolve(data);
    };
    xhr.onerror = reject;
    xhr.open('GET', validationUrl);
    xhr.send();
  });
}

function getDonationAmount() {
  let donationAmount = 0;
  if (state.thisPage.amountObject &&
      state.thisPage.amountObject.amount !== "undefined") {
    donationAmount = state.thisPage.amountObject.amount;
  }
  if (feeCover.isFeeCoverActive && !monthlyModal.upsellYesClicked) {
    // We need to get the final donation amount.
    // State doesn't have it, because the amount in state doesn't include the fee.
    // But for people who've clicked Yes on the upsell, we don't want to use 
    // EN fee-cover total amount, because it's wrong in that case.
    if (feeCover.getNewDonationTotal()) {
      donationAmount = feeCover.getNewDonationTotal();
    }
  }
  return donationAmount;
}

// This function clears the error state from the donor info fields that are
// hidden when Apple Pay is active. This is necessary because of the way the
// upsell works. Called when the user clicks Cancel on the Apple Pay popup. Note
// that this only affects empty inputs, and it doesn't touch the email or mobile
// phone fields.
function resetValidationForHiddenDonorInfoInputs() {
  if (!donorInfoInputs.length) return;
  donorInfoInputs.forEach(thisInput => {
    if (typeof thisInput.value !== "undefined" && thisInput.value === "") {
      if (typeof thisInput.id !== "undefined" &&
          thisInput.id !== "en__field_supporter_emailAddress" &&
          thisInput.id !== "en__field_supporter_phoneNumber2") {
        const thisField = validationHelpers.getFieldForElement(thisInput);
        if (thisField) {
          validationHelpers.resetValidationForField(thisField);
        }
      }
    }
  });
}

/* ----[ Show/Hide Functions ]----------------------------------------------- */

function showSubmitButton() {
  document.getElementsByClassName("en__submit")[0].hidden = false;
}

function hideSubmitButton() {
  document.getElementsByClassName("en__submit")[0].hidden = true;
}

function showApplePayButton() {
  const applePayButton = document.getElementById('apple-pay-button');
  if (applePayButton) {
    applePayButton.hidden = false;
  }
}

function hideApplePayButton() {
  const applePayButton = document.getElementById('apple-pay-button');
  if (applePayButton) {
    applePayButton.hidden = true;
  }
}

function showApplePayErrorMessage() {
  const applePayMessage = document.getElementById('apple-pay-message');
  if (applePayMessage) {
    applePayMessage.hidden = false;
  }
}

function hideApplePayErrorMessage() {
  const applePayMessage = document.getElementById('apple-pay-message');
  if (applePayMessage) {
    applePayMessage.hidden = true;
  }
}

function showApplePaySection() {
  const applePaySection = document.getElementById('apple-pay-section');
  const submitButtonResult = document.getElementsByClassName("en__submit");
  let submitButton = null;
  if (submitButtonResult.length === 1) {
    submitButton = submitButtonResult[0];
  }
  if (applePaySection) {
    applePaySection.className = 'enabled';
  }
  if (submitButton) {
    submitButton.hidden = true;
  }
}

function hideApplePaySection() {
  const applePaySection = document.getElementById('apple-pay-section');
  const submitButtonResult = document.getElementsByClassName("en__submit");
  let submitButton = null;
  if (submitButtonResult.length === 1) {
    submitButton = submitButtonResult[0];
  }
  if (applePaySection) {
    applePaySection.className = 'disabled';
  }
  if (submitButton) {
    submitButton.hidden = false;
  }
}

// We don't hide the email or phone inputs here, because we want them to
// be visible to Apple Pay users.
function hideDonorInfoFields() {
  if (!donorInfoInputs.length) return;
  donorInfoInputs.forEach(thisInput => {
    if (thisInput && typeof thisInput.id !== "undefined" &&
        thisInput.id !== "en__field_supporter_emailAddress" &&
        thisInput.id !== "en__field_supporter_phoneNumber2") {
      const thisField = validationHelpers.getFieldForElement(thisInput);
      thisField.hidden = true;
    }
  });
}

// We don't have to filter out the email and phone inputs here, because they
// should already be showing.
function showDonorInfoFields() {
  if (!donorInfoInputs.length) return;
  donorInfoInputs.forEach(thisInput => {
    if (thisInput) {
      const thisField = validationHelpers.getFieldForElement(thisInput);
      thisField.hidden = false;
    }
  });
}
/* ----[ End Show/Hide Functions ]------------------------------------------- */

function saveTokenToStorage(token) {
  // Don't write null value to storage.
  if (token === null) return;
  if (!storageHelpers.isSessionStorageEnabled()) return;

  try {
    sessionStorage.setItem("paymentToken", token);
  } catch (error) {
    console.log(
      "🚀 ~ file: applePay.js:611 ~ saveTokenToStorage: sessionStorage not available."
    );
    console.log(error);
  }
}

function getTokenFromStorage() {
  let token;
  if (!storageHelpers.isSessionStorageEnabled()) return;

  try {
    token = sessionStorage.getItem("paymentToken");
  } catch (error) {
    console.log(
      "🚀 ~ file: applePay.js:625 ~ getTokenFromStorage: sessionStorage not available."
    );
    console.log(error);
  }
  return token;
}

export function removeTokenFromStorage() {
  if (!storageHelpers.isSessionStorageEnabled()) return;
  try {
    sessionStorage.removeItem("paymentToken");
  } catch (error) {
    console.log(
      "🚀 ~ file: applePay.js:638 ~ removeTokenFromStorage: sessionStorage not available."
    );
    console.log(error);
  }
}
