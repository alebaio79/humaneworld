/*
* consentModal.js
* HSI Email Consent Modal - Enya 2022
* Enya Consent Modal Controller
* Created: Spring 2022
* Purpose: Manage activity related to consent modal.
* Note: This component, when enabled, also controls the monthly modal on donation forms.
*/

import state from "./stateManager";
import A11yDialog from "a11y-dialog";
import * as monthlyModal from "donationComponents/monthlyModal";
import * as fieldHelpers from "commonHelpers/fieldHelpers";

// Modal DOM elements
let modal;
let modalYes;
let modalNo;
let noText;
let optIn;
export let modalInited = false;

// Has the modal been interacted with?
let modalProcessed = false;

// Handle to the modal "dialog" element. This is an A11yDialog instance.
let modalDialog;

export const init = () => {
  // Note: The optInsManager sets the enableEmailConsentModal flag.
  if (!state.thisPage.enableEmailConsentModal || !state.thisPage.isHSI) return;

  modal = document.getElementById('consent-modal');
  modalYes = document.getElementById('consent-modal-yes');
  modalNo = document.getElementById('consent-modal-no');
  noText = document.getElementById('js-consent-modal-no-text');
  optIn = document.querySelector(
    '.en__field--opt-in .en__field__input--checkbox'
  );

  // Check that everything is present
  if (modal && modalYes && noText && optIn) {
    initModal();
    addNoText();
    bindEvents();
  };
  modalInited = true;
};

const initModal = () => {
  // A11yDialog will insert the modal as a sibling to this mainContent element.
  const mainContent = document.querySelector("#page-wrapper");

  modalDialog = new A11yDialog(modal, mainContent);
  state.thisPage.emailConsentModalDialog = modalDialog;

  // Donation forms use the ENForm subscribe method to respond to submit events.
  // Advocacy forms use handleGeneralSubmit, called from app.js.
  if (state.thisPage.formObject && state.thisPage.pageTypeEN === 'donation') {
    state.thisPage.formObject.onSubmit.subscribe(() => handleDonationSubmit());
  }
};

// Function that handles submit on all non-donation pages.
// Exported to call from existing handleSubmit() in app.js.
export const handleGeneralSubmit = () => {
  if (modalProcessed || optIn?.checked || !state.thisPage.enableEmailConsentModal || !state.thisPage.isHSI) {
    return true;
  } else {
    if (modalDialog) {
      // Show the consent modal.
      showModal();
      return false;
    } else {
      // If consent modal doesn't exist (because it was never inited, or for
      // some other reason), do the submit now.
      doFinalSubmit();
      return true;
    }
  }
};

// Function that handles submit for donation pages only. Special behavior needed
// because the monthly upsell modal appears after the email consent modal.
const handleDonationSubmit = () => {
  if (!state.thisPage.formObject) return;

  // Turn off form submission so users can see the consent modal (or maybe the
  // monthly upsell, or both).
  state.thisPage.formObject.submit = false;

  if (modalProcessed || optIn?.checked) {
    // We won't show the consent modal, but we still need to call the monthly
    // modal.
    doFinalSubmit();
  } else {
    // Show the consent modal.
    showModal();
  }
};

const showModal = () => {
  if (!modalDialog) return;
  modalDialog.show();
};

const addNoText = () => {
  if (state.thisPage.pageTypeEN === 'donation') {
    noText.textContent = 'complete my donation';
  } else {
    noText.textContent = 'continue';
    if (state.thisPage.isFrench) {
      noText.textContent = 'continuer';
    }
  }
};

const bindEvents = () => {
  modalYes.addEventListener('click', handleYes);

  // The 'No' option and close button do the same thing
  [modalNo, modal.querySelector('.button-close')].forEach(el => {
    el.addEventListener('click', handleNo);
  });
};

const handleYes = () => {
  closeModal();
  checkOptIn();
  doFinalSubmit();
};

const handleNo = () => {
  closeModal();
  uncheckOptIn();
  doFinalSubmit();
};

const checkOptIn = () => {
  optIn.checked = true;
};

const uncheckOptIn = () => {
  optIn.checked = false;
};

const closeModal = () => {
  // Fade modal out before hiding
  modal.classList.add('hiding');

  // aria-hidden modals are not displayed
  setTimeout(() => {
    modal.setAttribute('aria-hidden', 'true');
  }, 150);
};

const doFinalSubmit = () => {
  modalProcessed = true;
  state.thisPage.emailConsentModalProcessed = true;

  // For non-donation forms, trigger a submit by clicking the submit button.
  if (state.thisPage.pageTypeEN !== 'donation') {
    const submitButton = document.querySelector(
      "form .en__submit button"
    );
    if (submitButton) {
      submitButton.click();
    }
  } else {
    // Donation forms need to trigger the monthly modal, if appropriate.
    if (!monthlyModal.shouldShowMonthlyModal()) {
      // Enable form submission and then submit.
      state.thisPage.formObject.submit = true;
      state.thisPage.formObject.submitForm();
    } else {
      // Trigger the monthly upsell for donation forms.
      monthlyModal.showMonthlyModal();
    }
  }
};

export function updateEmailConsentForCountry(country) {
  const shouldEnableEmailConsent = fieldHelpers.shouldWeEnableEmailConsent(country);

  if (shouldEnableEmailConsent) {
    state.thisPage.enableEmailConsentModal = true;
    if (!modalInited) {
      init();
    }
  } else {
    state.thisPage.enableEmailConsentModal = false;
  }
}
