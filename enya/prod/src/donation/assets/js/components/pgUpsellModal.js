/*
* pgUpsellModal.js
* HSUS Donation Forms - Enya 2022
* Enya PG Upsell Modal Controller
* Created: Summer 2022
* Purpose: Control the behavior of the planned giving upsell modal.
*/

import state from "commonComponents/stateManager";
import A11yDialog from "a11y-dialog";

const iFrameResize = window.iFrameResize || null;
const pgUpsellModalContainer = document.querySelector("#pg-upsell-modal");

// Set this flag to true if we find the PG upsell modal container on the page.
let pgUpsellModalExists = false;

// Handle to the modal "dialog" element. This is an A11yDialog instance.
let pgUpsellModalDialog;

export function init() {
  // Check for required components.
  if (!iFrameResize) return;
  if (!state.thisPage.enablePgUpsellModal) return;

  initPgUpsellModal();

  // Initialize up iframeResizer
  iFrameResize({
    log: false,
    onMessage: e => handleMessage(e)
  }, '#pgUpsellIframe');
}

const handleMessage = (e) => {
  switch (e.message) {
    // The iframe will send a 'ready' message when it is available for interaction.
    case 'ready':
      showPgUpsellModal();
      break;
    // The iframe will send a 'close modal' message when the "No" value is selected by the donor.
    case 'close modal':
      hidePgUpsellModal();
      break;
    // The iframe will send a 'submitted' message when it loads the thank you page.
    case 'submitted':
      handlePgUpsellSubmitted();
      break;
  }
};

function initPgUpsellModal() {
  // A11yDialog will insert the modal as a sibling to this mainContent element.
  const mainContent = document.querySelector("#page-wrapper");

  // If there's no PG upsell modal content on this page, get out.
  if (!pgUpsellModalContainer) return;

  // Set flag so we know that there is a PG upsell modal on this page.
  pgUpsellModalExists = true;

  pgUpsellModalDialog = new A11yDialog(pgUpsellModalContainer, mainContent);
  state.thisPage.pgUpsellModalDialog = pgUpsellModalDialog;

  // showPgUpsellModal();
}

function showPgUpsellModal() {
  // Don't proceed if any of our state vars are falsy.
  if (!pgUpsellModalDialog) return;

  // Don't proceed if modal has already been shown.
  if (state.thisPage.pgUpsellModalShown) return;

  if (shouldShowPgUpsellModal()) {
    pgUpsellModalDialog.show();
    state.thisPage.pgUpsellModalShown = true;
  }
}

// Show the modal to monthly donors
function shouldShowPgUpsellModal() {
  if (!pgUpsellModalExists) return;
  if (state.thisPage.isMonthlyGift) {
    return true;
  } else {
    return false;
  }
}

function hidePgUpsellModal() {
  if (!pgUpsellModalDialog) return;
  pgUpsellModalDialog.hide();
}

function handlePgUpsellSubmitted() {
  if (!pgUpsellModalDialog) return;
  pgUpsellModalContainer.classList.add('is-thanks-page');
}
