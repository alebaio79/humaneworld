/*
* spinner.js
* HSUS Engaging Networks Forms - Enya 2021
* Enya Spinner Controller
* Created: Winter 2021
* Purpose: Manage activity related to animated waiting spinners.
*/

import state from "./stateManager";

// Insert the donate button spinner in place of the button text.
export function showDonateButtonSpinner() {
  const submitButton = document.querySelector(".en__submit button");
  if (!submitButton) return;

  let processingText = "Processing . . .";
  if (state.thisPage.isFrench) {
    processingText = "Traitement du paiement . . .";
  }

  // If the donate button spinner doesn't exist yet, make one.
  let donateButtonSpinner = document.querySelector(
    ".spinner-container.donate-button-spinner"
  );

  if (!donateButtonSpinner) {
    const spinnerTemplate = document.querySelector("#spinner-template");
    if (spinnerTemplate) {
      donateButtonSpinner = spinnerTemplate.content.firstElementChild.cloneNode(true);
      donateButtonSpinner.classList.add("donate-button-spinner");
    }
  }

  donateButtonSpinner.classList.add("active");
  submitButton.textContent = processingText;
  submitButton.appendChild(donateButtonSpinner);
}

/* Function that shows the full-page spinner. */
export function showFullPageSpinner() {
  // If the full-page spinner doesn't exist yet, make one.
  let fullPageSpinner = document.querySelector(
    ".spinner-container.full-page"
  );

  if (!fullPageSpinner) {
    const spinnerTemplate = document.querySelector("#spinner-template");
    if (spinnerTemplate) {
      fullPageSpinner = spinnerTemplate.content.firstElementChild.cloneNode(true);
      fullPageSpinner.classList.add("full-page");
    }

    const bodyElement = document.querySelector("body");

    bodyElement.append(fullPageSpinner);
  }

  const pageWrapper = document.querySelector("#page-wrapper");

  if (pageWrapper) {
    // Hide the page content.
    pageWrapper.classList.add("hidden");
  }

  fullPageSpinner.classList.add("active");
}

/* Function that hides the full-page spinner. */
export function hideFullPageSpinner() {
  // Show the page content.
  const pageWrapper = document.querySelector("#page-wrapper");
  if (pageWrapper) {
    pageWrapper.classList.remove("hidden");
  }

  const fullPageSpinner = document.querySelector(
    ".spinner-container.full-page"
  );

  if (fullPageSpinner) {
    fullPageSpinner.classList.remove("active");
  }
}
