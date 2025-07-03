/*
 * validation.js
 * HSUS Engaging Networks Forms - Enya 2021
 * Enya Form Validation Controller - Hub Pages
 * Created: Winter 2021
 * Purpose: Module for controlling form validation settings and behavior.
 * Note: Most validation functions live in the common validationHelpers module.
 * This component is where we can add additional custom validation for a page
 * type, when needed.
 */

import * as validationHelpers from "commonHelpers/validationHelpers";
import * as pageError from "commonComponents/pageError";

export function init() {
  initENValidateEventHandler();
  initInstantValidation();
  pageError.init();
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
  // Remove any custom validation messages we've added.
  document.querySelectorAll(".valid-error")
    .forEach(element => element.remove());
  return true;
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
