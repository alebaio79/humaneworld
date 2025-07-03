/*
 * validation.js
 * HSUS Engaging Networks Forms - Enya 2021
 * Enya Form Validation Controller - Advocacy Pages
 * Created: Winter 2021
 * Purpose: Module for controlling form validation settings and behavior.
 * Note: Most validation functions live in the common validationHelpers module.
 * This component is where we can add additional custom validation for a page 
 * type, when needed.
 */

import state from "commonComponents/stateManager";
import * as utils from "utils/utilities";
import * as emailVerifier from "commonComponents/emailVerifier";
import * as fieldHelpers from "commonHelpers/fieldHelpers";
import * as validationHelpers from "commonHelpers/validationHelpers";
import * as pageError from "commonComponents/pageError";

// We can set this flag to false here, if we want to turn off email validation
// for all pages of this type.
const enableEmailVerificationForThisPageType = true;

export function init() {
  initEmailToTargetFieldValidation();
  validationHelpers.stashLabelTextFromFieldsWithTooltips();
  initENValidateEventHandler();
  initEmailVerifier();
  initInstantValidation();
  initSupporterEmailVerification();
  pageError.init();
}

function initEmailToTargetFieldValidation() {
  initSubjectFields();
  initMessageFields();
  // Mirror the selected value of State and State Ally.
  watchStateField();
}

// Add data attributes we can use later for error messages.
function initSubjectFields() {
  const subjectFieldContainers = document.querySelectorAll(
    ".en__contactSubject"
  );
  const attributes = {
    "data-enya-validation-label": "subject",
    "data-enya-lacks-en-validation": "true"
  };

  if (state.thisPage.isFrench) {
    attributes["data-enya-validation-label"] = "sujet";
  }

  if (!subjectFieldContainers) return;

  subjectFieldContainers.forEach(subjectFieldContainer => {
    subjectFieldContainer.classList.add("en__mandatory", "en__field");
    const subjectField = subjectFieldContainer.querySelector(
      ".en__contactSubject__field"
    );
    if (subjectField) {
      utils.setAttributes(subjectField, attributes);
    }
  });
}

function initMessageFields() {
  const messageFieldContainers = document.querySelectorAll(
    ".en__contactSection"
  );
  const attributes = {
    "data-enya-validation-label": "message",
    "data-enya-lacks-en-validation": "true"
  };

  if (!messageFieldContainers) return;

  messageFieldContainers.forEach(messageFieldContainer => {
    const isMandatoryAndVisible = messageFieldContainer.classList
      .contains("en__contactSection--mandatory") &&
      !messageFieldContainer.classList.contains("en__contactSection--hidden");
    if (isMandatoryAndVisible) {
      messageFieldContainer.classList.add("en__mandatory", "en__field");
      const messageFields = messageFieldContainer.querySelectorAll(
        ".en__field"
      );
      if (messageFields) {
        messageFields.forEach((messageField) => {
          utils.setAttributes(messageField, attributes);
          messageField.classList.add("en__field__input");
          messageField.classList.remove("en__field");

          // EN's message fields have siblings, which interferes with error
          // message display. Move each field into a div to solve this problem.
          const messageFieldWrapper = document.createElement("div");
          messageFieldWrapper.classList.add("textarea-container");
          messageField.parentNode.prepend(messageFieldWrapper);
          messageFieldWrapper.prepend(messageField);
        });
      }
    }
  });
}

function initENValidateEventHandler() {
  // Use EN's callback to do custom validation. But don't overwrite existing
  // function, because another component might have hooked in to this too.
  if (typeof window.enOnValidate === "function") {
    const oldOnValidate = window.enOnValidate;
    window.enOnValidate = () => {
      return oldOnValidate() && handleENValidateEvent();
    };
  } else {
    window.enOnValidate = handleENValidateEvent;
  }
}

// This function fires after the enOnValidate event happens. More here:
// https://www.engagingnetworks.support/knowledge-base/javascript-page-hooks-for-page-submit-validations-and-errors/
function handleENValidateEvent() {
  let isValid = true;
  // Remove any custom validation messages we've added.
  document
    .querySelectorAll(".valid-error")
    .forEach((element) => element.remove());

  // Deal with fields the EN doesn't validate.
  document
    .querySelectorAll('[data-enya-lacks-en-validation="true"]')
    .forEach((el) => {
      validationHelpers.validate(el);
      if (el.closest(".en__field--validationFailed")) {
        isValid = false;
      }
    });

  if (state.thisPage.isEmailVerificationActive) {
    // Stop form submission and mark field as invalid if FreshAddress could not
    // verify it.
    const emailInput = document.querySelector(
      "#en__field_supporter_emailAddress"
    );
    if (emailInput) {
      const emailFieldNotVerified = emailInput.closest(".is-not-verified");

      // We need to mark the field as invalid and show an error message only if
      // it's an otherwise correctly formatted email address.
      if (emailFieldNotVerified && emailInput.validity.valid) {
        setTimeout(() => {
          emailFieldNotVerified.classList.add("en__field--validationFailed");
        }, 1000);
        validationHelpers.insertCustomError(emailFieldNotVerified);
        isValid = false;
      }
    }
  }

  return isValid;
}

// We need the emailVerifier to set a state flag at the start of our session, if
// it's enabled on this page.
function initEmailVerifier() {
  if (
    enableEmailVerificationForThisPageType &&
    !state.thisPage.disableEmailVerification &&
    !state.thisPage.isFrench
  ) {
    emailVerifier.init();
  }
}

function initInstantValidation() {
  const theForm = document.querySelector(".en__component--page");

  if (theForm) {
    // Turn off built-in browser form validation.
    theForm.setAttribute("novalidate", true);
  }

  // Set validation patterns for mandatory inputs.
  document
    .querySelectorAll(".en__mandatory .en__field__input")
    .forEach((element) => {
      validationHelpers.setValidationByType(element, true);

      // After we set general validation for each type, deal with special cases.
      validationHelpers.setValidationByNameOrOther(element, true);
    });

  // Some non-mandatory fields need validation too. Phone is not mandatory on
  // some pages, but it still needs validation for the correct format.
  const phoneInputOptional = document.querySelector(
    ".en__field:not(.en__mandatory) input[name='supporter.phoneNumber2']"
  );

  if (phoneInputOptional) {
    validationHelpers.setValidationByNameOrOther(phoneInputOptional, false);
  }
}

// When state field changes, fire the function that updates State Ally field.
function watchStateField() {
  const stateField = document.querySelector("#en__field_supporter_region");
  if (!stateField) return;

  // Fire the handler function on page load, in case there are prefilled fields.
  fieldHelpers.copyStateToAllyState();

  // Add the listener, to handle future changes.
  stateField.addEventListener("change", fieldHelpers.copyStateToAllyState);
}

function initSupporterEmailVerification() {
  // Add real-time email verification, but only if it's enabled for this page
  // type and for this page in particular.
  if (
    enableEmailVerificationForThisPageType &&
    !state.thisPage.disableEmailVerification &&
    !state.thisPage.isFrench
  ) {
    validationHelpers.verifySupporterEmail();
  }
}
