/*
* surveyForm.js
* HSUS Survey and Subscribe Forms - Enya 2021
* Enya Survey and Subscribe Forms Controller
* Author: Vishnu Singamsetty (vsingamsetty@humanesociety.org)
* Created: Winter 2021
* Purpose: Main controller for email sign-up, survey, data capture, and email
* subscription pages.
*/

import state from "commonComponents/stateManager";
import * as urlParamsManager from "commonComponents/urlParamsManager";
import * as optInsManager from "commonComponents/optInsManager";
import * as tooltips from "commonComponents/tooltips";
import * as subManageForm from "./subscriptionManagementForm";
import * as pgUpsellForm from "./pgUpsellForm";
import * as thanksManager from "./thanksManager";
import * as customizations from "./customizations";
import * as validation from "./validation";
import * as fieldHelpers from "commonHelpers/fieldHelpers";
import * as supporterInfo from "commonComponents/supporterInfo";
import * as simpleFooter from "commonComponents/simpleFooter";
import { handleGeneralSubmit } from "commonComponents/consentModal";

export function init() {
  const isSubManageForm = document
    .querySelector("body")
    .classList.contains("enya-subscription-management");
  const isPGUpsellForm = document
    .querySelector("body")
    .classList.contains("enya-pg-upsell");

  // Initialize the tooltips.
  tooltips.init();

  // The PG upsell form has its own validation, so don't include the validation
  // module here.
  if (!isPGUpsellForm) {
    validation.init();
  }

  // Initialize the opt-ins.
  optInsManager.init();

  // Save all the params we care about in session storage.
  // That way, we can retrieve them on other pages.
  // A param will get stored only if it exists in the current URL.
  // The urlParamsManager knows which params we care about.
  urlParamsManager.storeManagedParameters();

  if (isSubManageForm) {
    // Initialize subscription management form.
    subManageForm.init();
  } else if (isPGUpsellForm) {
    // Initialize planned giving upsell.
    if (!state.thisPage.isThanksPage) {
      pgUpsellForm.init();
    } else {
      pgUpsellForm.handleThanks();
    }
  } else {
    // Handle other types of survey pages. The subscription management and PG
    // upsell pages have their own thanks-page-related functions.
    if (state.thisPage.isThanksPage) {
      thanksManager.init();
    }
  }

  customizations.init();
  supporterInfo.init();
  simpleFooter.init();

  // use EN's callback to handle submission changes
  if (typeof window.enOnSubmit === "function") {
    const oldOnSubmit = window.enOnSubmit;
    window.enOnSubmit = () => {
      return oldOnSubmit() && handleSubmit();
    };
  } else {
    window.enOnSubmit = handleSubmit;
  }
}

const handleSubmit = () => {
  // Uncheck the SMS opt-in if phone field is blank.
  fieldHelpers.unCheckSMSOptInIfPhoneBlank();
  if (state.thisPage.isHSI) {
    fieldHelpers.checkSMSOptInIfPhoneFull();
  }

  // The submit may involve resolving the consent modal in
  // commonComponents/consentModal.js.
  return handleGeneralSubmit();
};
