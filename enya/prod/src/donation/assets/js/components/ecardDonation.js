/*
 * ecardDonation.js
 * HSUS Engaging Networks Forms - Enya 2022
 * Created: Fall 2022
 * Purpose: Deals with the collection of ecard data on the donation form.
 * This component fires on the donation page, on page 1 of the processing page,
 * and then again on page 2 of the processing page.
 * This component gets called both by donationForm and thanksManager.
 */

import state from "commonComponents/stateManager";
import * as storageHelpers from "commonHelpers/storageHelpers";
import * as spinner from "commonComponents/spinner";

const ecardElements = {
  select: undefined,
  name: undefined,
  email: undefined,
  message: undefined,
  date: undefined,
  excludeAmount: undefined
};

const ecardIndexesHSI = {
  "birthday-hsi-dog": 1,
  "birthday-hsi-cat": 2,
  "birthday-hsi-elephant": 3,
  "sympathy-hsi-dog": 4,
  "sympathy-hsi-cat": 5,
  "sympathy-hsi-cat-dog": 6,
  "gift-hsi-cat-dog": 7,
  "gift-hsi-elephant": 8,
  "gift-hsi-lion": 9
};

// This variable is used on both the donation page and the processor page.
let ecardValues = null;

let ecardObserver;
let previewIframe;

// This function does nothing if we're not on an ecard donation page.
export function init() {
  if (state.thisPage.isEcardDonation) {
    // The processor page has a special setting, which triggers the processing
    // here.
    if (state.thisPage.isEcardDonationProcessor) {
      initEcardProcessing();
    } else {
      initEcardDonation();
    }
  }
}

function initEcardDonation() {
  initEcardElements();
  initSendDate();
  fixHideAmountField();
}

function initEcardElements() {
  ecardElements.select = document.querySelector(
    ".en__field--ecard-delivery-ecard-selection .en__field__input"
  );
  ecardElements.name = document.querySelector(
    ".en__field--ecard-delivery-ecard-recipient-name .en__field__input"
  );
  ecardElements.email = document.querySelector(
    ".en__field--ecard-delivery-ecard-recipient-email-address .en__field__input"
  );
  ecardElements.message = document.querySelector(
    ".en__field--ecard-delivery-ecard-message .en__field__input"
  );
  ecardElements.date = document.querySelector(
    ".en__field--ecard-delivery-send-ecard-date .en__field__input"
  );
  ecardElements.excludeAmount = document.querySelector(
    ".en__field--ecard-delivery-exclude-amount-on-ecard .en__field__input"
  );
}

function initSendDate() {
  // Disallow past dates and set value to current date
  let today = new Date();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  const yyyy = today.getFullYear();

  // add leading zeros if needed
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  // build date string
  today = yyyy + "-" + mm + "-" + dd;

  // Add minimum date to calendar.
  document.querySelectorAll(".en__field__input--calendar").forEach(el => {
    el.setAttribute("min", today);
    el.value = new Date().toISOString().substring(0, 10);
  });

  fixSendDateError();
}

// Customize send date error message. EN has no way of customizing Question
// error messages.
function fixSendDateError() {
  const ecardSendDate = document.querySelector(
    ".en__field--ecard-delivery-send-ecard-date"
  );

  if (ecardSendDate) {
    ecardObserver = new MutationObserver((mutations) => {
      const validError = ecardSendDate.querySelector(".valid-error");

      // Replace default error message.
      if (ecardSendDate.classList.contains("en__field--validationFailed") && validError) {
        validError.textContent = "Please choose a date that is not in the past.";
      }
    });

    ecardObserver.observe(ecardSendDate, {
      // en__field--validationFailed class will be added if past date is entered
      attributeFilter: ["class"]
    });
  }
}

function fixHideAmountField() {
  // Add class to Hide donation amount checkbox field, to fix styling.
  const hideAmountField = document.querySelector(
    ".en__field--ecard-delivery-exclude-amount-on-ecard"
  );
  if (hideAmountField) {
    hideAmountField.classList.add("visible-opt-in");
  }
}

export function updateEcardSelect(choice = "") {
  if (!ecardElements.select) return;
  ecardElements.select.value = choice;
}

// Save ecard related field values to localStorage for use on
// the ecard processing form. The submitSection component calls this function.
export function saveEcardDonationValues() {
  console.log("saveEcardDonationValues fired.");
  // Do all required field exist?
  if (ecardElements.select && ecardElements.name && ecardElements.email && ecardElements.message && ecardElements.date && ecardElements.excludeAmount) {
    ecardValues = {
      select: ecardElements.select.value,
      name: ecardElements.name.value,
      email: ecardElements.email.value,
      message: ecardElements.message.value,
      date: ecardElements.date.value,
      excludeAmount: ecardElements.excludeAmount.checked
    };
    if (!storageHelpers.isLocalStorageEnabled()) return;

    try {
      localStorage.setItem("ecardValues", JSON.stringify(ecardValues));
    } catch (error) {
      console.log(
        "🚀 ~ file: ecardDonation.js:163 ~ saveEcardDonationValues: localStorage not available."
      );
      console.log(error);
    }
  }
}

// This code block reads in ecard parameters saved from the donation form, loads
// the values into the ecard form and submits it.
function initEcardProcessing() {
  if (state.thisPage.isEcardDonationThanks) {
    initEcardThanks();
  } else {
    if (!storageHelpers.isLocalStorageEnabled()) return;
    try {
      if (!localStorage.getItem("ecardValues")) return;
      ecardValues = JSON.parse(localStorage.getItem("ecardValues"));
    } catch (error) {
      console.log(
        "🚀 ~ file: ecardDonation.js:182 ~ initEcardProcessing: localStorage not available."
      );
      console.log(error);
    }
    initPreviewIframe();
    // Sometimes processEcard is never called by the mutation observer in
    // initPreviewIframe. So we call it manually here.
    setTimeout(() => {
      processEcard();
    }, 2000);

    // After 5 seconds, if the card hasn't processed, let's see if there are
    // errors.
    setTimeout(() => {
      detectErrors();
    }, 5000);
  }
}

function initPreviewIframe() {
  previewIframe = document.querySelector(".en__ecarditems__prevwrap iframe");
  if (!previewIframe) return;

  // Need to wait for the preview iframe to be functional.
  ecardObserver = new MutationObserver(processEcard);

  ecardObserver.observe(previewIframe, {
    attributes: true,
    attributeFilter: ["src"]
  });
}

function processEcard(mutations) {
  // We don't want this to run on an error page. They have their own submission
  // process.
  if (state.thisPage.isErrorPage) return;

  const selectedEcard = getSelectedEcard();
  if (!selectedEcard || !ecardValues) return;

  // Stop observing.
  ecardObserver.disconnect();

  // Select ecard.
  selectedEcard.click();

  // Copy values to form.
  setEcardFields();

  getPreviewAndSubmit();
}

function setEcardFields() {
  try {
    // Set message.
    const messageField = document.querySelector(".en__ecardmessage__default");
    if (messageField) {
      messageField.value = ecardValues.message;
    }

    // Set send date.
    const dateField = document.querySelector(
      ".en__ecardrecipients__futureDelivery input"
    );
    if (dateField) {
      dateField.value = ecardValues.date;
    }

    // Set recipient.
    const nameField = document.querySelector(
      ".en__ecardrecipients__name input"
    );
    if (nameField) {
      nameField.value = ecardValues.name;
    }

    const emailField = document.querySelector(
      ".en__ecardrecipients__email input"
    );
    if (emailField) {
      emailField.value = ecardValues.email;
    }

    const addRecipientButton = document.querySelector(
      ".en__ecarditems__addrecipient"
    );
    if (addRecipientButton) {
      addRecipientButton.click();
    }
  } catch (error) {
    console.log("Error setting ecard values: %o", error);
  }
}

function getSelectedEcard() {
  const index = getSelectedEcardIndex();
  return document.querySelector(`.en__ecarditems__thumb:nth-child(${index})`);
}

function getPreviewAndSubmit() {
  // Get ecard preview URL (after filling fields).
  // This won't work if we haven't filled in the fields yet.
  const submitButton = document.querySelector(".en__submit button");
  if (!previewIframe) return;
  if (!storageHelpers.isLocalStorageEnabled()) return;

  try {
    previewIframe.addEventListener("load", e => {
      localStorage.setItem("previewUrl", e.target.src);
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: ecardDonation.js:294 ~ getPreviewAndSubmit: localStorage not available."
    );
    console.log(error);
  }

  // We have to click the preview button to get the previewUrl in localstorage
  // to update.
  document.querySelector(".en__ecarditems__showprev").click();

  // Submit, after waiting for preview iframe to load.
  setTimeout(() => {
    if (submitButton) {
      submitButton.click();
    }
  }, 1000);
}

// Loads the ecard preview URL saved on page 1 into an iframe and allows
// printing of the preview contents.
function initEcardThanks() {
  let previewUrl;
  if (!storageHelpers.isLocalStorageEnabled()) return;
  try {
    previewUrl = localStorage.getItem("previewUrl");
  } catch (error) {
    console.log(
      "🚀 ~ file: ecardDonation.js:320 ~ initEcardThanks: localStorage not available."
    );
    console.log(error);
  }
  if (!previewUrl) return;

  const previewButton = document.querySelector(".en__ecarditems__showprev");
  const previewContainer = document.querySelector(".en__ecarditems__preview");
  const previewIframe = document.getElementById("previewIframe");
  const previewClose = document.querySelector(".en__ecarditems__prevclose");
  const printButton = document.getElementById("printEcardButton");

  if (
    previewButton &&
    previewContainer &&
    previewIframe &&
    previewClose &&
    printButton
  ) {
    previewButton.classList.remove("en__hidden");
    previewButton.addEventListener("click", (e) => {
      previewContainer.classList.add("preview--show");
      // Preview src gets reset incorrectly after popping up.
      setTimeout(() => {
        previewIframe.src = previewUrl;
      }, 100);
    });
    previewClose.addEventListener("click", (e) => {
      previewContainer.classList.remove("preview--show");
      // Avoid a triple iframe load.
      previewIframe.src = "";
    });
    printButton.addEventListener("click", (e) => {
      previewIframe.contentWindow.print();
    });
  }
  if (window.iFrameResize) {
    window.iFrameResize(
      {
        log: false
      },
      "#previewIframe"
    );
  }

  // Clean up.
  try {
    localStorage.removeItem("ecardValues");
  } catch (error) {
    console.log(
      "🚀 ~ file: ecardDonation.js:370 ~ initEcardThanks: localStorage not available."
    );
    console.log(error);
  }
}

function getSelectedEcardIndex() {
  if (!ecardValues.select) return 1;
  let indexToReturn = 1;

  // If the user wants to omit the donation amount, we need to choose an
  // alternate e-card from the second half of the thumbnails.
  if (state.thisPage.isHSI) {
    const selectedEcardIndex = ecardIndexesHSI[ecardValues.select];
    if (selectedEcardIndex) {
      indexToReturn = ecardValues.excludeAmount
        ? (selectedEcardIndex + Object.keys(ecardIndexesHSI).length)
        : selectedEcardIndex;
    }
  } else {
    indexToReturn = ecardValues.excludeAmount
      ? (Number(ecardValues.select) +
        (Number(document.querySelectorAll(".en__ecarditems__thumb").length) /
         2))
      : ecardValues.select;
  }

  return indexToReturn;
}

// If Enya detects that the ecard processing page has errors on it, hide the
// page-loading animation, hide certain sections of the page, and allow the user
// to fix any errors. Then the user will need to click the Submit button
// manually.
function detectErrors() {
  const invalidFields = document.querySelectorAll(
    "input.invalid, .ecard__mandatory__error"
  );
  const atLeastOneRecipient = document.querySelector(
    ".en__ecardrecipients__recipient"
  );
  if (!invalidFields || atLeastOneRecipient) {
    // No errors found, and there's at least one recipient in the recipients
    // list. Try to process one last time. If this doesn't work, the page will
    // just be stuck here.
    processEcard();
  } else {
    // We don't care what errors there are. We just need to show the page to the
    // user now, and ask them to fix the errors.
    handleErrorPage();
  }
}

function handleErrorPage() {
  state.thisPage.isErrorPage = true;

  // Once we add this class to the body element, the page error container will
  // appear.
  document.querySelector("body").classList.add("is-error-page");
  moveErrorMessage();

  // Close the preview popup if open.
  document.querySelector(".en__ecarditems__prevclose").click();

  // Hide the ecard selections and preview button.
  document.querySelector(".en__ecarditems").classList.add("hidden");

  // Change the text in the submit button. (Override Enya's submitSection
  // component.)
  const submitButton = document.querySelector(".en__submit button");
  if (submitButton) {
    submitButton.classList.remove("dynamic-giving-button");
    submitButton.textContent = "Send E-card";
  }

  // Watch the preview iframe again. (We may have stopped observing when we
  // tried to submit automatically.)
  initPreviewIframe();

  initSubmitListenerOnErrorPage();

  spinner.hideFullPageSpinner();
}

function initSubmitListenerOnErrorPage() {
  // Use EN's callback to handle submission changes.
  // But make sure we don't overwrite an existing submit handler.
  if (typeof window.enOnSubmit === "function") {
    const oldOnSubmit = window.enOnSubmit;
    window.enOnSubmit = () => {
      return oldOnSubmit() && handleSubmitOnErrorPage();
    };
  } else {
    window.enOnSubmit = handleSubmitOnErrorPage;
  }
}

function handleSubmitOnErrorPage() {
  // We have to click the preview button to get the previewUrl in localstorage
  // to update.
  document.querySelector(".en__ecarditems__showprev").click();
  updateEcardValuesOnErrorPage();
  return true;
}

function updateEcardValuesOnErrorPage() {
  // The user may have changed the recipient name, email, or message. Update our values in localStorage.
  const nameField = document.querySelector(".en__ecardrecipients__name input");
  const emailField = document.querySelector(
    ".en__ecardrecipients__email input"
  );
  const messageField = document.querySelector(
    ".en__ecardmessage__default"
  );
  const dateField = document.querySelector(
    ".en__ecardrecipients__futureDelivery input"
  );

  if (nameField) {
    ecardValues.name = nameField.value;
  }

  if (emailField) {
    ecardValues.email = emailField.value;
  }

  if (messageField) {
    ecardValues.message = messageField.value;
  }

  if (dateField) {
    ecardValues.date = dateField.value;
  }

  if (!storageHelpers.isLocalStorageEnabled()) return;

  try {
    localStorage.setItem("ecardValues", JSON.stringify(ecardValues));
  } catch (error) {
    console.log(
      "🚀 ~ file: ecardDonation.js:510 ~ updateEcardValuesOnErrorPage: localStorage not available."
    );
    console.log(error);
  }
}

function moveErrorMessage() {
  // Move the content of our custom error message into the standard
  // page-error-container.
  const errorMessageContainer = document.querySelector(
    ".error-message-container"
  );
  const pageErrorContainer = document.querySelector(".page-error-container");
  if (!errorMessageContainer || !pageErrorContainer) return;
  errorMessageContainer.classList.remove("hidden-except-pb");

  // Check to make sure the pageErrorContainer isn't already inside the
  // errorMessageContainer. That could happen if the pageError component's
  // movePageErrorContainer() function has fired.
  if (!errorMessageContainer.contains(pageErrorContainer)) {
    pageErrorContainer.prepend(errorMessageContainer);
  } else {
    console.log("errorMessageContainer is the parent of pageErrorContainer.");
  }
}
