/*
* header.js
* HSUS Engaging Networks Forms - Enya 2022
* Created: Fall 2022
* Purpose: Manage behaviors in the page header.
*/

import state from "commonComponents/stateManager";

let logoLink;

export function init() {
  initLogoLink();
}

function initLogoLink() {
  logoLink = document.querySelector(
    ".logo-header .hsi-logo, .logo-header .hsus-logo"
  );
  if (!logoLink) return;

  // Change the link for Friends form.
  if (state.thisPage.isFriendsHSIForm) {
    logoLink.href = "https://friendsofhsi.ca";
  }
}
