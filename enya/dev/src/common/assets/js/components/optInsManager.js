/*
 * optInsManager.js
 * HSUS Engaging Networks Forms - Enya 2021
 * Enya Opt-ins Manager
 * Created: Winter 2021
 * Purpose: Responsible for controlling modifications to opt-ins and questions.
 */

import state from "./stateManager";
import * as tooltips from "./tooltips";
import * as internationalizer from "./internationalizer";
import * as fieldHelpers from "commonHelpers/fieldHelpers";

// List the opt-ins that we're managing.
// This needs to be manual, because we have no way to dynamically find them on
// the page. (I think.)
const universalConsent = {
  name: "Universal Email Consent",
  id: "842103",
  checkBox: undefined,
  fieldWrapper: undefined,
  hidden: false
};

const emailOptInHSI = {
  name: "Opt in",
  id: "374",
  checkBox: undefined,
  fieldWrapper: undefined,
  hidden: false
};

const smsHSI = {
  name: "SMS",
  id: "1270124",
  checkBox: undefined,
  fieldWrapper: undefined,
  hidden: false
};

const giftAidHSI = {
  name: "Opt In Gift Aid",
  id: "64098",
  checkBox: undefined,
  fieldWrapper: undefined,
  hidden: false
};

const universalConsentWLT = {
  name: "Universal Email Consent",
  id: "842504",
  checkBox: undefined,
  fieldWrapper: undefined,
  hidden: false
};

const generalEmail = {
  name: "General Email",
  id: "842107",
  checkBox: undefined,
  fieldWrapper: undefined,
  hidden: true
};

const generalEmailWLT = {
  name: "General Email",
  id: "842508",
  checkBox: undefined,
  fieldWrapper: undefined,
  hidden: true
};

// Note that for this opt-in, we're hiding the field and its labels, but we're
// showing a text block underneath with the opt-in text.
// That's necessary because the opt-in text needs a tooltip link, which is not
// possible with a simple EN OPT label.
const sms = {
  name: "SMS",
  id: "842109",
  checkBox: undefined,
  fieldWrapper: undefined,
  hidden: false
};

const stateAffairs = {
  name: "State Affairs Ally",
  id: "842104",
  checkBox: undefined,
  hidden: true
};

const animalWelfare = {
  name: "Animal Welfare Professional",
  id: "842105",
  checkBox: undefined,
  hidden: true
};

const animalWelfare1x = {
  name: "Animal Welfare Professional 1x per month",
  id: "842106",
  checkBox: undefined,
  hidden: true
};

// The Challenge Fund "opt-in" is not a traditional EN OPT type. It's
// transaction field Other3, which we're using for this purpose. It needs
// special treatment here. Both HSUS and HSI use the EN tagged field Other
// Amount 3 for the challenge fund checkbox.
const challengeFund = {
  name: "Challenge Fund",
  id: "othamt3",
  checkBox: undefined,
  fieldWrapper: undefined,
  hidden: false
};

// Don't add Challenge Fund opt-in to this array. It'll be handled separately.
const optIns = [
  sms,
  universalConsent,
  universalConsentWLT,
  generalEmail,
  generalEmailWLT,
  stateAffairs,
  animalWelfare,
  animalWelfare1x,
  emailOptInHSI,
  smsHSI,
  giftAidHSI
];

export function init() {
  initOptIns();
  initSMSOptIn();
  initChallengeFundOptIn();
  setHSIEmailOptInStatus();
  setHSISMSStatus();
  initGiftAidOptIn();
}

// Apply classes to opt-in wrappers, so that we can style them.
function initOptIns() {
  optIns.forEach(thisOptIn => {
    // Attach the handle to the checkbox element.
    thisOptIn.checkBox = document.querySelector(
      `input[type=checkbox][name='supporter.questions.${thisOptIn.id}']`
    );

    // In page-builder, the checkbox elements have an empty name attribute.
    // Use alternate method to get the handle.
    if (thisOptIn.checkBox === null) {
      thisOptIn.checkBox = document.querySelector(
        `.en__field--${thisOptIn.id} input[type=checkbox]`
      );
    }

    // Find this opt-in's container.
    const thisFieldWrapper = document.querySelector(
      `.en__field--${thisOptIn.id}`
    );

    if (thisFieldWrapper) {
      // Save the handle to the field wrapper. We may need it in other
      // functions.
      thisOptIn.fieldWrapper = thisFieldWrapper;

      // Add classes based on visibility, which also bring in some other styles.
      if (thisOptIn.hidden) {
        thisFieldWrapper.classList.add("hidden-opt-in");
      } else {
        thisFieldWrapper.classList.add("visible-opt-in");
        // Get the first label in the container and add the for attribute.
        // We need this to make the label clickable.
        const firstLabel = thisFieldWrapper.querySelector("label:first-of-type");

        firstLabel.setAttribute(
          "for", `en__field_supporter_questions_${thisOptIn.id}`
        );
      }
    }
  });
}

// Hide the SMS checkbox and customize its label.
function initSMSOptIn() {
  // Hide the checkbox itself. We should already have a handle to it.
  if (sms.checkBox) {
    sms.checkBox.classList.add("hidden");
    sms.checkBox.checked = true;
  }

  if (sms.fieldWrapper) {
    updateSMSLabel(sms);
  }

  // Because we're hiding the checkbox for this one, we need to replace the
  // first phrase of the label with custom text for donation forms.
  const firstPhrase = document.querySelector(".sms-opt-in-first-phrase");
  const newContent = "By providing your mobile number,";

  if (firstPhrase) {
    firstPhrase.innerHTML = newContent;
  }

  // Set up the tooltip.
  tooltips.initSMSTooltip();
}

// Add a class to the Challenge Fund wrapper, for styling.
// Revise the opt-in label's content for the tooltip trigger.
// Activate the tooltip.
function initChallengeFundOptIn() {
  // Add a class to this field's form block, so that styles will apply.
  const formBlock = document.querySelector(".challenge-fund-opt-in-block");
  if (formBlock) {
    formBlock.classList.add("visible-opt-in");
  }

  // Get a handle to the challenge fund label.
  const challengeFundLabel = document.querySelector(
    "label[for=en__field_transaction_othamt3]"
  );
  if (!challengeFundLabel) return;

  // Change the label's content to add a button for the trigger.
  const newLabelContent = `
    Add my gift to the <button class="button-link challenge-tooltip-trigger" type="button">Challenge Fund.</button> 
  `;
  challengeFundLabel.innerHTML = newLabelContent;

  // Set up the tooltip.
  tooltips.initChallengeFundTooltip();
}

// This function runs only on HSI pages. It waits until Enya has detected the
// user's location and then checks or unchecks the email opt-in checkbox
function setHSIEmailOptInStatus() {
  let countrySettings;
  if (!emailOptInHSI.checkBox) return;
  if (!window.pageConfigSettings.isHSI) return;

  if (internationalizer.userCountryReady) {
    countrySettings = internationalizer.getCountrySettings();
    finishHSICheckboxSetup(countrySettings);
  } else {
    document.addEventListener("enyaLocationDataReady", function() {
      countrySettings = internationalizer.getCountrySettings();
      finishHSICheckboxSetup(countrySettings);
    });
  }

  // Add fail-safe, if location data doesn't arrive within a certain timespan.
  setTimeout(() => {
    if (!internationalizer.userCountryReady) {
      countrySettings = internationalizer.getCountrySettings();
      finishHSICheckboxSetup(countrySettings);
    }
  }, 10000);
}

function finishHSICheckboxSetup(countrySettings) {
  if (typeof countrySettings !== "undefined") {
    if (countrySettings.precheckEmailOptIn === false) {
      emailOptInHSI.checkBox.checked = false;
    } else {
      emailOptInHSI.checkBox.checked = true;
    }
    // Enable or disable the email consent modal here. The consent modal module
    // will read this setting from state.
    if (countrySettings.enableEmailModal) {
      state.thisPage.enableEmailConsentModal = true;
    }

    // Email opt-in is hidden on Friends form. Make sure it's unchecked, and
    // don't allow the email consent modal to fire.
    if (state.thisPage.isFriendsHSIForm) {
      emailOptInHSI.checkBox.checked = false;
      state.thisPage.enableEmailConsentModal = false;
    }
  }
}

// This function runs only on HSI pages. It waits until Enya has detected the
// user's location and then checks or unchecks the SMS opt-in checkbox
function setHSISMSStatus() {
  let countrySettings;
  if (!smsHSI.checkBox) return;
  if (!window.pageConfigSettings.isHSI) return;

  if (internationalizer.userCountryReady) {
    countrySettings = internationalizer.getCountrySettings();
    finishHSISMSSetup(countrySettings);
  } else {
    document.addEventListener("enyaLocationDataReady", function() {
      countrySettings = internationalizer.getCountrySettings();
      finishHSISMSSetup(countrySettings);
    });
  }

  // Add fail-safe, if location data doesn't arrive within a certain timespan.
  setTimeout(() => {
    if (!internationalizer.userCountryReady) {
      countrySettings = internationalizer.getCountrySettings();
      finishHSISMSSetup(countrySettings);
    }
  }, 10000);
}

function finishHSISMSSetup(countrySettings) {
  if (typeof countrySettings !== "undefined") {
    if (countrySettings.precheckSMS === false) {
      smsHSI.checkBox.checked = false;
    } else {
      smsHSI.checkBox.checked = true;
    }
  }
  // Always hide the SMS checkbox on HSI forms.
  smsHSI.checkBox.classList.add("hidden");

  if (smsHSI.fieldWrapper) {
    updateSMSLabel(smsHSI);
  }
}

// Change the value of the "for" attribute, to make sure clicking on the label
// doesn't check or uncheck the hidden opt-in checkbox. This new value will
// allow screen readers to read out this label text when the user focuses on the
// mobile phone field. (Thanks, Deron!)
function updateSMSLabel(field) {
  if (!field) return;
  const thisLabel = field.fieldWrapper?.querySelector("label");
  if (thisLabel) {
    thisLabel.setAttribute("for", "en__field_supporter_phoneNumber2");
    thisLabel.classList.add("mobile-msg");
  }
}

// The gift aid opt-in has a label for the field and another for the checkbox
// itself. We need to remove the text from the first label and add a class
// that'll make the gift aid logo appear.
function initGiftAidOptIn() {
  if (!giftAidHSI.fieldWrapper) return;
  const firstLabel = giftAidHSI.fieldWrapper.querySelector(
    "label:first-of-type"
  );

  if (firstLabel) {
    firstLabel.textContent = "";
    firstLabel.classList.add("gift-aid-logo");
  }

  // Get a handle to the second gift aid label, which is next to the check box.
  const secondLabel = giftAidHSI.fieldWrapper.querySelector(
    "label[for=en__field_supporter_questions_64098].en__field__label--item"
  );
  if (!secondLabel) return;

  // Add button to text inside the label, so that we can trigger the tooltip.
  secondLabel.innerHTML = secondLabel.innerHTML
    .split("Gift Aid donations.")
    .join("<button class='button-link gift-aid-tooltip-trigger' type='button'>Gift Aid donations.</button>");

  // Set up the tooltip.
  tooltips.initGiftAidTooltip();
}

export function updateHSIEmailOptInForCountry(country) {
  const shouldCheckEmailOptIn = fieldHelpers.shouldWeCheckEmailOptIn(country);
  if (!emailOptInHSI.checkBox) return;
  if (shouldCheckEmailOptIn) {
    emailOptInHSI.checkBox.checked = true;
  } else {
    emailOptInHSI.checkBox.checked = false;
  }
  // Email opt-in is hidden on Friends form. Make sure it's unchecked.
  if (state.thisPage.isFriendsHSIForm) {
    emailOptInHSI.checkBox.checked = false;
  }
}
