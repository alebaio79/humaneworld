/*
* layout.js
* HSUS Engaging Networks Forms - Enya 2021
* Created: Summer 2021
* Purpose: Manage page layout changes for splash pages.
*/

import state from "commonComponents/stateManager";

// Handles to hero credit elements that we'll update when layout changes.
let heroCredit;
let heroCreditWrapperSmall;
let heroCreditWrapperLarge;

export function init() {
  initLayoutListener();
  initHeroCredit();
}

function initLayoutListener() {
  document.addEventListener("enyaLayoutUpdated", handleLayoutUpdate);
}

function initHeroCredit() {
  heroCredit = document.querySelector(".hero-credit");
  heroCreditWrapperSmall = document.querySelector(".hero-credit-wrapper-small");
  heroCreditWrapperLarge = document.querySelector(".hero-credit-wrapper-large");
}

function handleLayoutUpdate(e) {
  updateHeroCreditLayout();
}

// Move the hero photo credit depending on screen size.
function updateHeroCreditLayout() {
  if (!heroCredit || !heroCreditWrapperSmall || !heroCreditWrapperLarge) return;
  if (typeof state.thisPage.screenSize === "undefined") return;

  if (state.thisPage.screenSize !== "small") {
    // Move the credit into the hero-credit-wrapper-large div.
    heroCreditWrapperLarge.append(heroCredit);
  } else {
    // Move the credit into the hero-credit-wrapper-small div.
    heroCreditWrapperSmall.append(heroCredit);
  }
}
