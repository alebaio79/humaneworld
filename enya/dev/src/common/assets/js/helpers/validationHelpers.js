/*
 * validationHelpers.js
 * HSUS Engaging Networks Forms - Enya 2021
 * Created: Winter 2021
 * Purpose: Functions that perform the nitty-gritty for form validation.
 */

/*
Notes:
   - We use the word "field" to refer to the EN parent wrapper for inputs. These
     EN field wrappers have the class "en__field". The field contains one or
     more inputs, a label, maybe an error message, and other stuff.
   - We use the word "input" or "element" for the form input elements
     themselves, such as text inputs, radio buttons, selects, and so on. Inputs
     have the EN class "en__field__input". Almost every input is wrapped by a
     field.
   - "Built-in" error messages come from EN. They have the class
     "en__field__error". Built-in error messages only appear after the user
     clicks the submit button.
   - "Custom" error messages are ones that we create and insert ourselves. They
     have the class "valid-error". Custom error messages can appear after the
     user focuses on a field and then leaves it (that is, on blur).
*/

import * as pageHelpers from "commonHelpers/pageHelpers";
import state from "commonComponents/stateManager";
import * as utils from "utils/utilities";
import * as emailVerifier from "commonComponents/emailVerifier";

// This function sets up validation by looking only at the element type.
export function setValidationByType(element, isRequired = false) {
  if (!element) return;

  if (isRequired) {
    element.required = true;
  }

  switch (element.type) {
    case "email":
      setPatternForElement("email", element);
      element.addEventListener("change", handleChange);
      break;
    case "date":
      // The date input type ignores the pattern attribute, but the text
      // fallback will honor it, in older browers.
      setPatternForElement("dateISO", element);
      element.addEventListener("input", handleInput);
      element.addEventListener("change", handleChange);
      break;
    case "number":
      break;
    case "select-one":
      element.addEventListener("change", handleChange);
      break;
    case "checkbox":
      element.addEventListener("change", handleChange);
      break;
    default:
      if (isRequired) {
        // Check for a non-empty value.
        setPatternForElement("notEmpty", element);
      }
      element.addEventListener("change", handleChange);
  }

  // Don't display browser error messages
  element.addEventListener("oninvalid", (e) => {
    e.preventDefault();
  });
}

// Use this function when you're setting up validation and the element name is
// what's important. Mostly. This function also looks at inputmode.
export function setValidationByNameOrOther(element, isRequired = false) {
  if (!element) return;

  if (isRequired) {
    element.required = true;
  }

  if (element.getAttribute("inputmode") === "decimal") {
    // Check for US currency
    setPatternForElement("currencyUS", element);
    element.addEventListener("input", handleInput);
    element.addEventListener("change", handleChange);
  } else if (
    // Handle email fields that have been configured as type "text" instead of
    // type "email".
    element.type === "text" &&
    element.name.includes("emailAddress")
  ) {
    setPatternForElement("email", element);
    element.addEventListener("change", handleChange);
  } else if (element.name.includes("address1")) {
    // Donation forms need special validation for street address.
    if (pageHelpers.isDonationPage()) {
      setPatternForElement("addressDonation", element);
    } else {
      setPatternForElement("notEmpty", element);
    }
    element.addEventListener("change", handleChange);
  } else if (element.name.includes("phoneNumber")) {
    if (element.required) {
      setPatternForElement("phoneUSRequired", element);
    } else {
      setPatternForElement("phoneUSOptional", element);
    }
    element.setAttribute("maxLength", "12");
    element.addEventListener("change", handleChange);
    element.addEventListener("blur", handleChange);
  } else if (element.name.includes("ccnumber")) {
    setPatternForElement("ccnumber", element);
    element.addEventListener("change", handleChange);
  } else if (element.name.includes("ccexpire")) {
    // Only set the pattern if this is an input, not a select.
    if (element.tagName === "INPUT") {
      setPatternForElement("ccexpire", element);
    }
    element.addEventListener("change", handleChange);
  } else if (element.name.includes("ccvv")) {
    // Check for 3 or 4 digits
    setPatternForElement("ccvv", element);
    element.addEventListener("change", handleChange);
  } else if (element.name.includes("transaction.donationAmt.other")) {
    setValidationForOtherAmount(element);
  } else if (element.name.includes("postcode")) {
    setPatternForElement("postcode", element);
    element.addEventListener("change", handleChange);
  } else if (element.name.includes("supporter.questions.882161")) {
    // This is the state ally primary state field in the HSUS instance.
    // It should be hidden, and will get its value from the state field.
    // We don't want it to be required in case there's a problem with the updating.
    element.required = false;
  }

  // Don't display browser error messages
  element.addEventListener("oninvalid", (e) => {
    e.preventDefault();
  });
}

export function setValidationForOtherAmount(otherAmountElement) {
  if (!otherAmountElement) return;
  // Remove the required attribute and pattern that was added by
  // setValidationByType.
  otherAmountElement.removeAttribute("required");
  removePatternFromElement(otherAmountElement);
  setPatternForElement("otherAmount", otherAmountElement);
}

const handleInput = (e) => {
  e.preventDefault();
  validate(e.target);
};

const handleChange = (e) => {
  e.preventDefault();
  validate(e.target);
};

// This function performs the actual validation for an element.
export function validate(element) {
  const field = getFieldForElement(element);
  if (!field) return;

  // CMK20230207: Leaving the next line here, commented out, for now. It's an
  // attempt to replicate the old "validChildren" test in Zuri-written
  // validation. But I don't think it's necessary. We'll find out. If it does
  // turn out to be necessary to check for childElementCount === 1, we'll need
  // to add an if statement around processInvalidField() below.

  // const isElementAnOnlyChild = element.parentElement.childElementCount === 1;

  // Remove the built-in EN error message, because we'll be setting our own.
  removeBuiltInError(field);

  if (element.validity.valid) {
    // Add custom validation for cc expire. The value can have a valid format
    // but have a year that is invalid (in the past or too far into the future).
    // Only fire this when the cc expire is an input, not a select. Note that in
    // early 2023 we decided to roll back to using split-select inputs for cc
    // expire. But we left this code in for the future.
    if (
      field.classList.contains("en__field--ccexpire") &&
      element.tagName === "INPUT"
    ) {
      const isCCExpireDateValid = validateCCExpireDate();
      if (isCCExpireDateValid) {
        // Hide/display error formatting.
        processValidField(field);
      } else {
        processInvalidField(field);
      }
    } else {
      // Hide/display error formatting.
      processValidField(field);
    }
  } else {
    processInvalidField(field);
  }
}

// Remove the built-in EN error message.
function removeBuiltInError(field) {
  if (!field) return;
  const enFieldError = field.querySelector(".en__field__error");

  if (enFieldError !== null) {
    enFieldError.remove();
  }
}

// Remove the error message element we added previously.
function removeCustomError(field) {
  if (!field) return;
  // Remove the error message.
  const errorMessage = field.querySelector("div.valid-error");
  if (errorMessage) {
    errorMessage.remove();
  }
}

// Removes the error message and marks field as valid.
function processValidField(field) {
  if (!field) return;
  removeCustomError(field);
  toggleValidClasses(field, true);
}

// Adds the error message and marks field as invalid.
function processInvalidField(field) {
  if (!field) return;
  insertCustomError(field);
  toggleValidClasses(field, false);
}

// Swaps classes based on element's validity.
export function toggleValidClasses(field, isValid = true) {
  if (!field) return;

  const validClass = "is-valid";
  const validationFailedClass = "en__field--validationFailed";

  if (isValid) {
    field.classList.remove(validationFailedClass);
    field.classList.add(validClass);
  } else {
    field.classList.remove(validClass);
    field.classList.add(validationFailedClass);
  }
}

export function toggleEmailVerifierClasses(field, isVerified = true) {
  if (!field) return;

  const verifiedClass = "is-verified";
  const verificationFailedClass = "is-not-verified";

  if (isVerified) {
    field.classList.remove(verificationFailedClass);
    field.classList.add(verifiedClass);
  } else {
    field.classList.remove(verifiedClass);
    field.classList.add(verificationFailedClass);
  }
}

// Keeper of the dictionary of input patterns.
export function getPattern(patternName) {
  if (!patternName) return;

  const patterns = {
    email: "[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-z]{2,}$",
    number: "",
    currencyUS:
      "^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\\.[0-9]{1,2})?$",
    ccnumber: "^[0-9 ]{15,19}$",
    ccexpire: "^[0-9]{2}/[0-9]{2}$",
    ccvv: "^([0-9]{3,4})$",
    // mm/dd/yyyy
    dateUS: "(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\\d\\d",
    // yyyy-mm-dd
    dateISO: "d{4}-d{2}-d{2}",
    phoneUSOptional: "(^$|^[0-9]{3}-?[0-9]{3}-?[0-9]{4}$)",
    phoneUSRequired: "(^[0-9]{3}-?[0-9]{3}-?[0-9]{4}$)",
    addressDonation: "^(.{1,35})$",
    notEmpty: "^.*\\S.*$",
    otherAmount: "^[0-9]*(\\.[0-9]{2})?$",
    postcode: "^[\\S ]{1,20}$",
  };

  return patterns[patternName];
}

export function setPatternForElement(patternName = "", element) {
  if (!element) return;
  const pattern = getPattern(patternName);

  if (typeof pattern !== "undefined") {
    element.setAttribute("pattern", pattern);
  }
}

export function removePatternFromElement(element) {
  if (!element) return;
  element.removeAttribute("pattern");
}

export function createErrorMessageElement() {
  const errorMessageElement = document.createElement("div");
  errorMessageElement.setAttribute("class", "valid-error");
  return errorMessageElement;
}

export function getErrorMessageText(field) {
  if (!field) return;
  let errorMessageText = "";
  let labelText = "";

  // Most EN fields have the field label as a child element.
  const firstLabel = field.querySelector("label:first-of-type");

  // For some special fields, like those with tooltips, or the subject and
  // message fields in advos, we stashed the label text in a data attribute.
  const stashedLabelText = getStashedLabelText(field);

  // Use the stashed label text, if any.
  if (stashedLabelText) {
    labelText = stashedLabelText;
  } else if (firstLabel) {
    // Otherwise use the text from the first label in the field.
    labelText = firstLabel.innerText.toLowerCase();
  }

  switch (labelText) {
    case "email address":
    case "adresse courriel":
      errorMessageText = `Please enter a valid ${labelText}.`;
      if (state.thisPage.isFrench) {
        errorMessageText = `Veuillez saisir une adresse courriel valide.`;
      }
      break;
    case "credit card number":
    case "expiration date":
    case "security code":
    case "zip code":
    case "postcode":
    case "postal code":
      errorMessageText = `Please enter a valid ${labelText}.`;

      if (state.thisPage.isFrench) {
        errorMessageText = `Veuillez remplir le champ ${utils.capitalize(
          labelText
        )}.`;
      }
      break;
    // Message text for when expiration date is a text input
    case "expiration date (mm/yy)":
      errorMessageText = `Please enter a valid expiration date in the format MM/YY.`;
      break;
    case "select monthly gift amount":
    case "select one-time gift amount":
    case "select your gift amount":
    case "sélectionnez le montant de votre don":
    case "sélectionnez le montant de votre don ponctuel":
    case "sélectionnez le montant de votre don mensual":
      errorMessageText = `Please enter a valid amount, with no comma or currency symbol, and no spaces.`;
      if (state.thisPage.isFrench) {
        errorMessageText = `Veuillez saisir un montant valide, sans symbole monétaire et sans espace.`;
      }
      break;
    case "street address":
    case "adresse 1":
      if (pageHelpers.isDonationPage()) {
        errorMessageText =
          "Address is required and must not exceed 35 characters. Please abbreviate or use the second address field if needed.";
        if (state.thisPage.isFrench) {
          errorMessageText = `L’adresse est obligatoire et ne peut dépasser 35 caractères. Veuillez abréger ou utiliser le deuxième champ d’adresse si nécessaire.`;
        }
      } else {
        errorMessageText = `Please enter your ${labelText}.`;
        if (state.thisPage.isFrench) {
          errorMessageText = `Votre adresse est requise et ne doit pas dépasser 35 caractères.`;
        }
      }
      break;
    case "phone number":
      if (field.classList.contains("en__mandatory")) {
        errorMessageText =
          "Please enter your phone number in the format XXX-XXX-XXXX.";
      } else {
        errorMessageText =
          "Please enter your phone number in the format XXX-XXX-XXXX, or leave this field blank.";
      }
      break;
    case "phone number (optional)":
    case "mobile phone number (optional)":
    case "mobile phone number":
    case "mobile phone number (u.s. phone numbers only)":
      if (field.classList.contains("en__mandatory")) {
        errorMessageText =
          "Please enter your mobile phone number in the format XXX-XXX-XXXX.";
      } else {
        errorMessageText =
          "Please enter your mobile phone number in the format XXX-XXX-XXXX, or leave this field blank.";
      }
      break;
    case "state":
      errorMessageText = `Please select your ${labelText}.`;
      break;
    case "consent checkbox":
      errorMessageText = `Please check the ${labelText}.`;
      break;
    default:
      if (field.classList.contains("en__field--select")) {
        errorMessageText = `Please select your ${labelText}.`;
        if (state.thisPage.isFrench) {
          errorMessageText = `Veuillez sélectionner votre ${labelText}.`;
        }
      } else if (field.classList.contains("en__field--survey")) {
        // Survey questions need special treatment.
        errorMessageText = `Please answer: ${firstLabel.innerText.replace(
          "*",
          ""
        )}`;
      } else {
        errorMessageText = `Please enter your ${labelText}.`;
        if (state.thisPage.isFrench) {
          errorMessageText = `Veuillez remplir le champ ${utils.capitalize(
            labelText
          )}.`;
        }
      }
      break;
  }

  return errorMessageText;
}

// Advocacy subject and message fields are nonconforming. They have no built-in
// EN validation, and no LABEL elements. Also, fields with tooltips might have a
// question mark at the end of their label, in the HTML. We stashed the label
// text for these kinds of fields in a data-enya-validation-label attribute in
// the validation.js component for advos. Find that text and use it now, for the
// error message.
export function getStashedLabelText(field) {
  if (!field) return "";
  let labelText = "";

  const elementWithStashedLabel = field.querySelector(
    "[data-enya-validation-label]"
  );
  if (elementWithStashedLabel) {
    labelText = elementWithStashedLabel.getAttribute(
      "data-enya-validation-label"
    );
  }
  return labelText;
}

export function insertCustomError(field) {
  if (!field) return;

  // Create the error message element and its text.
  const errorMessageElement = createErrorMessageElement();
  errorMessageElement.textContent = getErrorMessageText(field);

  // Add the error message only if it's not already there.
  const existingErrorMessage = field.querySelector(
    "div.valid-error, div.en__field__error"
  );
  if (!existingErrorMessage) {
    field.appendChild(errorMessageElement);
  }
}

// Each EN form input element has a parent "field" wrapper.
export function getFieldForElement(element) {
  if (!element) return;
  const field = element.closest(".en__field");
  return field;
}

// Removes error message and other invalidity markers from a field.
export function resetValidationForField(field) {
  if (!field) return;

  const validationFailedClass = "en__field--validationFailed";

  field.classList.remove(validationFailedClass);
  removeBuiltInError(field);
  removeCustomError(field);
}

function validateCCExpireDate() {
  const ccExpireField = document.querySelector(".en__field--ccexpire");
  if (!ccExpireField) return false;

  const ccExpireInput = ccExpireField.querySelector(
    "#en__field_transaction_ccexpire"
  );
  if (!ccExpireInput) return false;

  // We only have to check if a value with format MM/YY is not in the past and
  // not more than 20 years in the future. The input's pattern attribute and the
  // payment module's formatCardExpiration() function take care of enforcing the
  // formatting.
  return isCCExpirationDateValid(ccExpireInput.value);
}

// Expects date string in format "MM/YY".
function isCCExpirationDateValid(inputDate) {
  if (!inputDate) return false;
  let isDateInPast = true;
  let isDateInFarFuture = true;
  let inputDateArray, inputMonth, inputYear;

  try {
    inputDateArray = inputDate.split("/");
    inputMonth = inputDateArray[0];
    inputYear = inputDateArray[1];
  } catch (error) {
    console.log("Error parsing input date.", error);
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentCentury = Math.floor(currentYear / 100);
  const currentCenturyString = currentCentury.toString();

  const inputMonthInt = parseInt(inputMonth);

  // Note: We're assuming that the input year doesn't represent the next
  // century. This code will need to be revised in the late 21st century!
  const fullInputYear = `${currentCenturyString}${inputYear}`;
  const fullInputYearInt = parseInt(fullInputYear);

  if (isNaN(inputMonthInt) || isNaN(fullInputYearInt)) {
    return false;
  }

  // Check for dates in the past;
  if (fullInputYearInt - currentYear === 0) {
    // The input year matches the current year. We need to check the month.
    if (inputMonthInt - currentMonth >= 0) {
      isDateInPast = false;
    } else {
      isDateInPast = true;
    }
  } else if (fullInputYearInt - currentYear > 0) {
    isDateInPast = false;
  } else {
    isDateInPast = true;
  }

  // What about dates too far in the future?
  if (fullInputYearInt - currentYear > 20) {
    isDateInFarFuture = true;
  } else {
    isDateInFarFuture = false;
  }

  return !isDateInPast && !isDateInFarFuture;
}

// For fields with tooltips, save the label text for use in error messages.
export function stashLabelTextFromFieldsWithTooltips() {
  const tooltipLabels = utils.getAll(".en__field__label .tooltip-trigger-icon");
  if (!tooltipLabels) return;

  tooltipLabels.forEach((el) => {
    const label = el.closest(".en__field__label");
    if (label) {
      const labelClone = label.cloneNode(true);
      const field = document.querySelector("#" + label.getAttribute("for"));
      if (field) {
        labelClone.querySelector(".tooltip-trigger-icon").innerHTML = "";
        field.setAttribute(
          "data-enya-validation-label",
          labelClone.textContent.toLowerCase()
        );
      }
    }
  });
}

// Returns true if there is no captcha, or if captcha is checked.
// Returns false if captcha is unchecked.
export function isCaptchaValid() {
  let captchaValid = true;

  if (!window.grecaptcha) return captchaValid;

  const captchaValue = window.grecaptcha.getResponse();

  if (!captchaValue) {
    captchaValid = false;
  } else {
    captchaValid = true;
  }

  return captchaValid;
}

export function showCaptchaError() {
  // Assume that there's only ever one captcha.
  const theCaptcha = document.querySelector(".en__captcha");
  if (!theCaptcha) return;

  const existingErrorMessage = document.querySelector(
    ".en__captcha #captcha-error"
  );
  // Don't add a duplicate error message.
  if (existingErrorMessage) return;

  const errorMessageHTML = `
  <div id="captcha-error" class="en__field__error">
    Please check the I’m not a robot checkbox, and then submit the form again.
  </div>
  `;

  theCaptcha.append(utils.stringToHTML(errorMessageHTML));
}

export function verifySupporterEmail() {
  // Get handle to the supporter email input. There should only be one per page.
  // Note that we're not yet verifying any email field on the page. Just the
  // supporter email.
  const supporterEmailInput = document.querySelector(
    "#en__field_supporter_emailAddress"
  );
  if (!supporterEmailInput) return;

  // Set up a change listener for the email input.
  supporterEmailInput.addEventListener(
    "change",
    handleSupporterEmailChangeForVerification
  );
}

// This function and the ones it references interact with the FreshAddress
// real-time email verification service. See the emailVerifier component for
// details. Note that this handler fires after the generic email validation
// handlers defined in setValidationByType() and setValidationByNameOrOther().
function handleSupporterEmailChangeForVerification(e) {
  // When the email changes, call out to the emailVerifier component.
  const supporterEmailInput = e.target;
  emailVerifier.callFreshAddressValidate(
    supporterEmailInput.value,
    verifierCallback
  );
}

function verifierCallback(verifierResult) {
  const supporterEmailField = document.querySelector(
    ".en__field--emailAddress"
  );
  if (!supporterEmailField) return;

  // If the FreshAddress service is down, or having a problem, do nothing else.
  if (verifierResult.isServiceError) return;

  // If the email is valid, set the field as valid.
  if (verifierResult.isVerified) {
    processValidField(supporterEmailField);
    toggleEmailVerifierClasses(supporterEmailField);
  } else {
    // If the email is invalid, trigger the usual error display.
    processInvalidField(supporterEmailField);
    toggleEmailVerifierClasses(supporterEmailField, false);

    // But we also need to add to the error message.
    updateSupporterEmailErrorMessage(verifierResult.userMessage);
  }
}

function updateSupporterEmailErrorMessage(message) {
  const supporterEmailField = document.querySelector(
    ".en__field--emailAddress"
  );
  if (!supporterEmailField) return;
  const emailErrorContainer =
    supporterEmailField.querySelector("div.valid-error");
  if (!emailErrorContainer) return;

  // Remove any previous verifier message.
  const verifierMessage =
    emailErrorContainer.querySelector(".verifier-message");
  if (verifierMessage) {
    verifierMessage.remove();
  }

  if (message) {
    emailErrorContainer.append(
      utils.stringToHTML(
        `<span class='verifier-message'>&nbsp;${message}</span>`
      )
    );
  }
}

// Fraudster bots submit the same page over and over, which builds up the number
// of "val" params in the URL. This function reads the number of "val" params
// and decides if there are too many. If there are too many, that means the page
// is likely being attacked by fraudsters.
export function areThereTooManyVals() {
  let tooManyVals = false;

  // Set the allowable number pretty high, to make sure we don't reject
  // legitimate users who are just having trouble submitting successfully.
  const allowableNumberOfVals = 10;

  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams) return false;

  const valParamsArray = urlParams.getAll("val");
  if (!valParamsArray) return false;

  if (valParamsArray.length > allowableNumberOfVals) {
    tooManyVals = true;
  }
  return tooManyVals;
}
