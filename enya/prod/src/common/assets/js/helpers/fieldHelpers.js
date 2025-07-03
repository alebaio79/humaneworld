/*
* fieldHelpers.js
* HSUS Engaging Networks Forms - Enya 2021
* Created: Winter 2021
* Purpose: Common field support functions. Note: If it's a validation thing, it belongs in the validationHelpers component, not this one.
*/
import * as utils from "utils/utilities";
import state from "commonComponents/stateManager";

// Add placeholder and input mask to phone field.
// h/t https://stackoverflow.com/a/29335409/135196
export function smartenPhoneField(fieldId) {
  const phoneField = document.getElementById(fieldId);
  if (!phoneField) return;

  // Process user input in the phone field.
  phoneField.addEventListener("input", function(event) {
    // Remove US country code.
    event.target.value = event.target.value.replace(/^\+?1/, "");

    // Formats output as 555-555-5555.
    const x = event.target.value.replace(/\D/g, "")
      .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    event.target.value = !x[2]
      ? x[1]
      : x[1] + "-" + x[2] + (x[3] ? "-" + x[3] : "");
  });
}

// For HSUS forms, the SMS opt-in is checked by default and hidden. We need to
// uncheck it upon submission, if the mobile phone field is blank.
export function unCheckSMSOptInIfPhoneBlank() {
  const smsOptIn = getSMSOptIn();
  if (!smsOptIn) return;

  if (isPhoneBlank()) {
    smsOptIn.checked = false;
  }
}

// For HSI forms, the SMS opt-in is unchecked by default and hidden. We need to
// check it upon submission, if the mobile phone field has a value.
export function checkSMSOptInIfPhoneFull() {
  const smsOptIn = getSMSOptIn();
  if (!smsOptIn) return;

  if (!isPhoneBlank()) {
    smsOptIn.checked = true;
  }
}

export function getSMSOptIn() {
  // In the HSUS instance, 842109 is mapped to the SMS opt-in.
  // In the HSI instance, 1270124 is mapped to the SMS opt-in.
  let optInId = "842109";

  if (state.thisPage.isHSI) {
    optInId = "1270124";
  }

  const smsOptIn = document.querySelector(
    `input[type=checkbox][name='supporter.questions.${optInId}']`
  );

  return smsOptIn;
}

export function isPhoneBlank() {
  const phoneField = document.querySelector(
    "#en__field_supporter_phoneNumber2"
  );
  if (!phoneField) return true;

  if (phoneField.value === "") {
    return true;
  } else {
    return false;
  }
}

// Remove the autocomplete=tel attributes that EN adds to all input "tel"
// types. But don't remove from phone field.
export function cleanUpAutocompleteTel() {
  // Find all the fields with autocomplete=tel, but exclude the phone field.
  const fieldsToCleanUp = document.querySelectorAll(
    "[autocomplete=tel]:not([id=en__field_supporter_phoneNumber2])"
  );
  if (!fieldsToCleanUp) return;

  // Remove the autocomplete attribute from each.
  fieldsToCleanUp.forEach(el => {
    removeAutocomplete(el);
  });
}

export function removeAutocomplete(field) {
  if (!field) return;
  if (utils.isElement(field)) {
    field.removeAttribute("autocomplete");
  }
}

export function getEmailAddress() {
  const emailField = document.querySelector(
    "#en__field_supporter_emailAddress"
  );
  if (!emailField) return "";

  return emailField.value;
}

// Mirror value of State in State Affairs Ally - Primary State question field.
export function copyStateToAllyState() {
  const stateField = document.querySelector("#en__field_supporter_region");
  const stateAllyField = document.querySelector(
    "#en__field_supporter_questions_882161"
  );

  if (!stateField || !stateAllyField) return;
  if (stateField.value !== "") {
    stateAllyField.value = stateField.value;
    stateAllyField.dispatchEvent(new Event('change'));
  }
}

// For a given country code, give us a grouping we can use for things like
// changing field labels.
export function getBucketForCountryCode(countryCode = "") {
  let countryBucket = "global";
  switch (countryCode) {
    case "US":
      countryBucket = "US";
      break;
    case "GB":
    case "GG":
    case "IM":
    case "JE":
      countryBucket = "GB";
      break;
    case "CA":
      countryBucket = "CA";
      break;
    case "AU":
      countryBucket = "AU";
      break;

    default:
      if (utils.isCountryInEU(countryCode)) {
        countryBucket = "EU";
      }
      break;
  }

  return countryBucket;
}

export function isFieldRequired(fieldId) {
  const field = document.querySelector('#' + fieldId);
  if (field && field.closest('.en__mandatory')) {
    return true;
  }
  return false;
};

export function autoResizeTextarea(textarea) {
  textarea.parentNode.dataset.replicatedValue = textarea.value;
  textarea.addEventListener('input', textarea => {
    textarea.target.parentNode.dataset.replicatedValue = textarea.target.value;
  });
};

// For a given currency code, get the country code that corresponds.
export function getCountryForCurrency(currency = "") {
  let countryCode = "US";
  switch (currency) {
    case "USD":
      countryCode = "US";
      break;
    case "EUR":
      countryCode = "AT";
      break;
    case "CAD":
      countryCode = "CA";
      break;
    case "AUD":
      countryCode = "AU";
      break;
    case "GBP":
      countryCode = "GB";
      break;

    default:
      break;
  }

  return countryCode;
}

export function shouldWeCheckEmailOptIn(country) {
  let checkEmailOptIn = false;
  switch (country) {
    case "US":
      checkEmailOptIn = true;
      break;
    case "GB":
      checkEmailOptIn = false;
      break;
    case "CA":
      checkEmailOptIn = false;
      break;
    case "AU":
      checkEmailOptIn = true;
      break;

    default:
      if (utils.isCountryInEU(country)) {
        checkEmailOptIn = false;
      }
      break;
  }

  return checkEmailOptIn;
}

export function shouldWeEnableEmailConsent(country) {
  let enableEmailConsent = true;
  switch (country) {
    case "US":
      enableEmailConsent = false;
      break;
    case "GB":
      enableEmailConsent = true;
      break;
    case "CA":
      enableEmailConsent = true;
      break;
    case "AU":
      enableEmailConsent = false;
      break;

    default:
      if (utils.isCountryInEU(country)) {
        enableEmailConsent = true;
      }
      break;
  }

  return enableEmailConsent;
}
