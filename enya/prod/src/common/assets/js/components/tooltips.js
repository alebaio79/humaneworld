/*
* tooltips.js
* HSUS EN Forms - Enya 2021
* Enya Tooltips Controller
* Created: Winter 2021
* Purpose: Manage activity related to tooltips.
*/

import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import state from "./stateManager";

export function init() {
  // Set default properties for the tippys we use.
  // We can override these in any tippy call.
  tippy.setDefaultProps(
    {
      allowHTML: true,
      interactive: true,
      trigger: "click",
      theme: state.thisPage.isHSI ? "enya-hsi" : "enya",
      // Set placement to auto to avoid cutoff tooltips on mobile.
      placement: "auto",
      maxWidth: 280
    }
  );
}

export function initSMSTooltip() {
  // Create popover link from div marked with "tooltip-content-sms" class in
  // mobile legal note.
  const smsDisclaimerElement = document.querySelector(".tooltip-content-sms");
  const tippyMobilePhoneTrigger = document.querySelector(
    ".mobile-phone-tooltip-trigger"
  );
  if (tippyMobilePhoneTrigger) {
    const tippyMobilePhone = tippy(
      tippyMobilePhoneTrigger,
      {
        content: smsDisclaimerElement
      }
    );

    if (smsDisclaimerElement) {
      // Hide this tippy instance when the close button is clicked.
      smsDisclaimerElement.querySelector(".close-button")
        .addEventListener("click", () => {
          tippyMobilePhone.hide(500); // 500ms transition duration
        }, false);
    }
  }
}

export function initChallengeFundTooltip() {
  // Create popover link from div marked with "tooltip-content-challenge" class
  // in the challenge fund note block. For HSI, the content is inside the
  // checkbox label, with class "challenge-fund-tooltip-content".
  const challengeNoteElement = document.querySelector(
    ".tooltip-content-challenge"
  );
  const tippyChallengeNoteTrigger = document.querySelector(
    ".challenge-tooltip-trigger"
  );

  const tippyChallengeFund = tippy(
    tippyChallengeNoteTrigger,
    {
      content: challengeNoteElement
    }
  );

  if (challengeNoteElement) {
    // Hide this tippy instance when the close button is clicked.
    challengeNoteElement.querySelector(".close-button")
      .addEventListener("click", () => {
        tippyChallengeFund.hide(500); // 500ms transition duration
      }, false);
  }
}

export function initTitleTooltip() {
  // Create popover link from div marked with "tooltip-title" class
  const titleNoteElement = document.querySelector(
    ".tooltip-title"
  );
  const tippyTitleNoteTrigger = document.querySelector(
    ".title-tooltip-trigger"
  );
  const tippyTitle = tippy(
    tippyTitleNoteTrigger,
    {
      content: titleNoteElement
    }
  );

  if (titleNoteElement) {
    // Hide this tippy instance when the close button is clicked.
    titleNoteElement.querySelector(".close-button")
      .addEventListener("click", () => {
        tippyTitle.hide(500); // 500ms transition duration
      }, false);
  }
}

export function initPhoneRequiredTooltip() {
  // Create popover link from div marked with "tooltip-content-phone-required" class
  const phoneRequiredNoteElement = document.querySelector(
    ".tooltip-content-phone-required"
  );
  const tippyPhoneRequiredNoteTrigger = document.querySelector(
    ".phone-required-tooltip-trigger"
  );
  const tippyPhoneRequired = tippy(
    tippyPhoneRequiredNoteTrigger,
    {
      content: phoneRequiredNoteElement
    }
  );

  if (phoneRequiredNoteElement) {
    // Hide this tippy instance when the close button is clicked.
    phoneRequiredNoteElement.querySelector(".close-button")
      .addEventListener("click", () => {
        tippyPhoneRequired.hide(500); // 500ms transition duration
      }, false);
  }
}

export function initGiftAidTooltip() {
  // Create popover link from div marked with "tooltip-content-gift-aid" class
  // in the gift aid note block.
  const giftAidNoteElement = document.querySelector(
    ".tooltip-content-gift-aid"
  );
  const tippyGiftAidNoteTrigger = document.querySelector(
    ".gift-aid-tooltip-trigger"
  );

  const tippyGiftAid = tippy(
    tippyGiftAidNoteTrigger,
    {
      content: giftAidNoteElement
    }
  );

  if (giftAidNoteElement) {
    // Hide this tippy instance when the close button is clicked.
    giftAidNoteElement.querySelector(".close-button")
      .addEventListener("click", () => {
        tippyGiftAid.hide(500); // 500ms transition duration
      }, false);
  }
}
