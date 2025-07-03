/*
* advocacyForm.js
* HSUS Advocacy Forms - Enya 2021
* Enya Advocacy Form Controller
* Author: Deron Hurst (deron@zurigroup.com)
* Created: Winter 2021
* Purpose: Main controller for advocacy form as a whole.
*/

import state from "commonComponents/stateManager";
import * as autologin from "commonComponents/autologin";
import * as optInsManager from "commonComponents/optInsManager";
import * as readMore from "commonComponents/readMore";
import * as supporterInfo from "commonComponents/supporterInfo";
import * as tooltips from "commonComponents/tooltips";
import * as tracking from "commonComponents/tracking";
import * as fieldHelpers from "commonHelpers/fieldHelpers";
import * as pageHelpers from "commonHelpers/pageHelpers";
import { handleGeneralSubmit } from "commonComponents/consentModal";

import * as actionCounter from "./actionCounter";
import * as bodyClasses from "./bodyClasses";
import * as imgToBg from "./imgToBg";
import * as smsOptin from "./smsOptin";
import * as emailToTarget from "./emailToTarget";
import * as tweetToTarget from "./tweetToTarget";
import * as languageLink from "./languageLink";

export function init() {
  // Preload form as needed
  supporterInfo.init();

  // Add body classes
  bodyClasses.init();

  // Add current page as a class to the body
  pageHelpers.addPageClass();

  // Convert some image elements to background images
  imgToBg.init();

  // Initialize the tooltips.
  tooltips.init();
  tooltips.initSMSTooltip();
  tooltips.initTitleTooltip();
  tooltips.initPhoneRequiredTooltip();

  // Initialize read more
  readMore.init();

  // Initialize the opt-ins.
  optInsManager.init();

  // Initialize Email to Target form
  emailToTarget.init();

  // Initialize Tweet redirect
  tweetToTarget.init();

  // Initialize tracking id and redirect
  tracking.init();

  // add input mask to phone field
  fieldHelpers.smartenPhoneField("en__field_supporter_phoneNumber2");

  // init special functionality for SMS opt-in based on phone required status
  smsOptin.init("en__field_supporter_phoneNumber2");

  // handle sms hash auto-fill
  autologin.init();

  // handle action counter features
  actionCounter.init();

  languageLink.init();

  // Use EN's callback to handle submission changes.
  // But make sure we don't overwrite an existing submit handler.
  if (typeof window.enOnSubmit === 'function') {
    const oldOnSubmit = window.enOnSubmit;
    window.enOnSubmit = () => {
      return oldOnSubmit() && handleSubmit();
    };
  } else {
    window.enOnSubmit = handleSubmit;
  }
}

const handleSubmit = () => {
  // Carry out final cleanup tasks here.
  fieldHelpers.unCheckSMSOptInIfPhoneBlank();
  if (state.thisPage.isHSI) {
    fieldHelpers.checkSMSOptInIfPhoneFull();
  }
  fieldHelpers.copyStateToAllyState();
  // The submit may involve resolving the consent modal in commonComponents/consentModal.js.
  return handleGeneralSubmit();
};
