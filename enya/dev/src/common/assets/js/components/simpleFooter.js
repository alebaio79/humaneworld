/*
* simpleFooter.js
* HSUS Engaging Networks Forms - Enya 2023
* Created: Winter 2023
* Purpose: Manage behaviors of the simple footer used on advos and surveys.
*/

import state from "./stateManager";

export function init() {
  initPrivacyLink();
}

function initPrivacyLink() {
  const privacyLink = document.querySelector(".footer-link-privacy");
  if (!privacyLink) return;
  if (state.thisPage.isHSI && state.thisPage.useLogoUK) {
    // If we're using the UK logo, we need to change the privacy policy link to
    // point to the UK version.
    privacyLink.href = "https://www.hsi.org/privacy-cookie-notice-uk/";
  }
}
