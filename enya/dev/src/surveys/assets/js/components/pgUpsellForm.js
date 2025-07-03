/*
* pgUpsellForm.js
* HSUS/HSI Planned Giving Upsell Form  - Enya 2022
* Enya Planned Giving Upsell Form Controller
* Author: Deron Hurst (deron@zurigroup.com)
* Created: Summer 2022
* Purpose: Main controller for Planned Giving Upsell as a whole.
*/

import * as storageHelpers from "commonHelpers/storageHelpers";

const formBlock = document.querySelector(".en__component--formblock");
// Keep in mind that this selector is dependent on the name of the question in EN
const pgUpsellQuestion = document.querySelector(
  ".en__field--planned-giving-question");
// We cannot customize the error message for a question in EN, so defining it here.
const pgUpsellErrorMessage = "Please select an option above, or click the X in the top corner to close.";
let pgUpsellError;
let pgUpsellModalImagePreloaded = false;

export function init() {
  // Bail if the question is not present.
  if (!pgUpsellQuestion) return;

  // Prevent opening thank you page in  parent window
  // document.querySelector('.en__component--page').target = '_self';

  // Preload the upsell image so there's no delay when it appears.
  preloadPgUpsellModalImage();
  // Initialize iframeResizer
  initResizer();
  // Handler for when user makes a choice
  handleChoice();
  // Handler for validation errors
  handleError();

  // Use EN's callback to handle submission changes.
  if (typeof window.enOnSubmit === 'function') {
    let oldOnSubmit = window.enOnSubmit;
    window.enOnSubmit = () => {
      return oldOnSubmit() && handleSubmit();
    };
  } else {
    window.enOnSubmit = handleSubmit;
  }
}

const initResizer = () => {
  window.iFrameResizer = {
    log: false,
    onReady: () => {
      if ('parentIFrame' in window) {
        // Let parent know it's ok to open the modal.
        parentIFrame.sendMessage('ready');
        // Focus on the first radio input.
        setTimeout(() => {
          document.querySelector('.en__field__input--radio').focus();
        }, 500);
      }
    }
  };
};

const handleChoice = () => {
  pgUpsellQuestion.querySelectorAll('.en__field__input--radio').forEach(element => {
    element.addEventListener('click', () => {
      // Remove any error messages once a choice is selected.
      clearError();
    });
  });
};

const clearError = () => {
  // Completely remove the error message if it exists.
  pgUpsellError?.remove();
};

const handleError = () => {
  // This will trigger display of our custom error message if validation fails.
  window.enOnError = function() {
    if (pgUpsellQuestion.classList.contains('en__field--validationFailed')) {
      pgUpsellError = pgUpsellQuestion.querySelector('.en__field__error');
      // Replace default message.
      pgUpsellError.textContent = pgUpsellErrorMessage;
      // Displays the error message at the bottom of the form.
      formBlock.append(pgUpsellError);
    }
  };
};

const handleSubmit = () => {
  // Get the donor's choice.
  const selectedChoice = pgUpsellQuestion.querySelector('.en__field__input--radio:checked');

  if (selectedChoice) {
    if (storageHelpers.isSessionStorageEnabled()) {
      try {
        // Save the choice so we can read it on the thanks page.
        sessionStorage.setItem("enyaPGUpsellChoice", selectedChoice.value);
      } catch (error) {
        console.log(
          "🚀 ~ file: pgUpsellForm.js:101 ~ handleSubmit: sessionStorage not available."
        );
        console.log(error);
      }
    }

    // Submitting a 'No' should close the modal.
    if ('parentIFrame' in window && selectedChoice.value === 'No') {
      // Use iframeResizer to message the host to close the modal (https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/iframed_page/methods.md).
      parentIFrame.sendMessage('close modal');
    }
  }

  // Continue the form submission.
  return true;
};

// Loads modal image in the background, before the modal is shown.
function preloadPgUpsellModalImage() {
  if (!pgUpsellModalImagePreloaded) {
    const modalImage = document.querySelector(".modal-image img");

    if (!modalImage) return;

    const modalImageUrl = modalImage.src;

    if (modalImageUrl !== "") {
      const preloadedImage = new Image();
      preloadedImage.src = modalImageUrl;
      pgUpsellModalImagePreloaded = true;
    }
  }
}

export const handleThanks = () => {
  // Wait for resizer and then tell the parent window that the form has been submitted.
  window.iFrameResizer = {
    onReady: () => {
      if ('parentIFrame' in window) {
        parentIFrame.sendMessage('submitted');
      }
    }
  };
};
