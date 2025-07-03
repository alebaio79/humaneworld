/*
* countdownClock.js
* HSUS Engaging Networks Forms - Enya 2023
* Created: Fall 2023
* Purpose: Manage the countdown clock layout.
* Note: The main code for the Enya countdown clock lives in a separate repo.
* https://github.com/ckweb/countdown-clock
* The clock is a React component.
*/

import state from "commonComponents/stateManager";

let clockRoot, mobileHeroContainer, desktopHeroContainer;

export function init() {
  initClockRoot();

  // If there's no clock on this page, do nothing else.
  if (!clockRoot) return;

  // We must have found a clock. Continue with layout management.
  initHeroContainers();
  initLayoutListener();
}

function initClockRoot() {
  clockRoot = document.querySelector("#countdown-clock-app-root");
}

function initHeroContainers() {
  mobileHeroContainer = document.querySelector(".mobile-hero-container");
  desktopHeroContainer = document.querySelector(".hero-container");
}

function initLayoutListener() {
  // If there's no clock on this page, don't bother listening.
  if (!clockRoot) return;

  // Call the layout handler on page load, because there won't have been a
  // layout change event yet.
  handleLayoutUpdate();

  // Add listener for our custom layout event. This event is created in the
  // pageManager component.
  document.addEventListener("enyaLayoutUpdated", handleLayoutUpdate);
}

function handleLayoutUpdate(e) {
  updateClockLayout();
}

function updateClockLayout() {
  if (!clockRoot) return;
  if (state.thisPage.screenSize === "small") {
    // On small screens, move the clock inside the mobile hero container.
    if (mobileHeroContainer) {
      mobileHeroContainer.append(clockRoot);
    }
  } else {
    // Otherwise, move the clock back inside the desktop hero container.
    if (desktopHeroContainer) {
      desktopHeroContainer.append(clockRoot);
    }
  }
}
