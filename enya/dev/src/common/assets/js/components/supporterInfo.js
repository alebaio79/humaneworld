/*
* supporterInfo.js
* HSUS Donation Forms - Enya 2021
* Enya Supporter Info Controller
* Created: Winter 2021
* Purpose: Manage activity related to the supporter information section of Enya forms.
*/

import state from "commonComponents/stateManager";
import * as pageManager from "commonComponents/pageManager";
import * as optInsManager from "commonComponents/optInsManager";
import * as consentModal from "commonComponents/consentModal";
import * as utils from "utils/utilities";
import * as autologin from "commonComponents/autologin";
import * as storageHelpers from "commonHelpers/storageHelpers";
import * as fieldHelpers from "commonHelpers/fieldHelpers";

// Save an object for each supporter info field we care about. Each field object
// will hold handles to the input and label DOM elements, after initialization.
// These field objects also know which label text variants are available for
// each country bucket.
const countryField = {
  name: "Country",
  id: "en__field_supporter_country",
  inputElement: undefined,
  labelElement: undefined,
  labelTextVariants: {
    global: "Country"
  }
};

const firstNameField = {
  name: "First Name",
  id: "en__field_supporter_firstName",
  inputElement: undefined,
  labelElement: undefined,
  labelTextVariants: {
    global: "First name"
  }
};

const lastNameField = {
  name: "Last Name",
  id: "en__field_supporter_lastName",
  inputElement: undefined,
  labelElement: undefined,
  labelTextVariants: {
    global: "Last name",
    GB: "Surname",
    EU: "Surname"
  }
};

const emailField = {
  name: "Email",
  id: "en__field_supporter_emailAddress",
  inputElement: undefined,
  labelElement: undefined,
  labelTextVariants: {
    global: "Email address"
  }
};

const address1Field = {
  name: "Address 1",
  id: "en__field_supporter_address1",
  inputElement: undefined,
  labelElement: undefined,
  labelTextVariants: {
    global: "Street address",
    GB: "House number/name"
  }
};

const address2Field = {
  name: "Address 2",
  id: "en__field_supporter_address2",
  inputElement: undefined,
  labelElement: undefined,
  labelTextVariants: {
    global: "Apartment, suite or other",
    GB: "Street/road"
  }
};

const cityField = {
  name: "City",
  id: "en__field_supporter_city",
  inputElement: undefined,
  labelElement: undefined,
  labelTextVariants: {
    global: "City",
    GB: "Town/city",
    EU: "Town/city"
  }
};

// This is the hidden field.
const provinceField = {
  name: "Province",
  id: "en__field_supporter_region",
  inputElement: undefined,
  labelElement: undefined,
  labelTextVariants: {
    global: "State/region",
    US: "State",
    CA: "Province",
    AU: "State/territory"
  }
};

// This is the untagged region text field. It will follow the same rules as
// the standard region field.
const provinceTextField = {
  name: "Province",
  id: "en__field_supporter_NOT_TAGGED_37",
  inputElement: undefined,
  labelElement: undefined,
  labelTextVariants: {
    global: "State/region",
    US: "State",
    CA: "Province",
    GB: "County",
    AU: "State/territory"
  }
};

// This is the untagged region select field. It will follow the same rules as
// the standard region field.
const provinceSelectField = {
  name: "Province",
  id: "en__field_supporter_NOT_TAGGED_38",
  inputElement: undefined,
  labelElement: undefined,
  labelTextVariants: {
    global: "State/region",
    US: "State",
    CA: "Province",
    AU: "State/territory"
  }
};

const postalCodeField = {
  name: "Postal Code",
  id: "en__field_supporter_postcode",
  inputElement: undefined,
  labelElement: undefined,
  labelTextVariants: {
    global: "Postal code",
    US: "Zip code",
    GB: "Postcode"
  },
  validationPatterns: {
    global: "^[\\S ]{1,20}$",
    US: "^\\S{5,20}$"
  }
};

const phoneNumberField = {
  name: "Phone Number",
  id: "en__field_supporter_phoneNumber",
  inputElement: undefined,
  labelElement: undefined,
  labelTextVariants: {
    global: "Phone number (optional)"
  }
};

const mobilePhoneNumberField = {
  name: "Mobile Phone Number",
  id: "en__field_supporter_phoneNumber2",
  inputElement: undefined,
  labelElement: undefined,
  labelTextVariants: {
    global: "Mobile phone number (optional)"
  }
};

// Collect all the objects declared above into an array that we can loop over.
const fieldList = [
  countryField,
  firstNameField,
  lastNameField,
  emailField,
  address1Field,
  address2Field,
  cityField,
  provinceField,
  provinceTextField,
  provinceSelectField,
  postalCodeField,
  phoneNumberField,
  mobilePhoneNumberField
];

export function init() {
  wrapRegionAndPostCode();
  // Add input mask to phone field.
  fieldHelpers.smartenPhoneField("en__field_supporter_phoneNumber2");
  autologin.init();
  if (state.thisPage.isHSI) {
    initFields();
    initFieldListeners();
    if (state.thisPage.isUKForm) {
      setTimeout(() => {
        // Set country to UK by default.
        if (countryField?.inputElement) {
          countryField.inputElement.value = "GB";
          countryField.inputElement.dispatchEvent(
            new Event("change", { bubbles: true })
          );
        }
      }, 1000);
    }
    setTimeout(() => {
      if (!state.thisPage.isEcardDonationProcessor) {
        updateValidationPatterns();
      }
    }, 2000);
  } else {
    // Trim first name and last name fields on HSUS forms.
    const nameFields = document.querySelectorAll(
      "#en__field_supporter_firstName, #en__field_supporter_lastName"
    );
    setTimeout(() => {
      if (nameFields) {
        nameFields.forEach((thisField) => {
          thisField.addEventListener("blur", trimInput);
        });
      }
    }, 1000);
  }
  // Preselect the country based on the user's IP, on HSI forms only.
  if (
    state.thisPage.isHSI &&
    !state.thisPage.isErrorPage &&
    !state.thisPage?.ignoreDetectedCountry
  ) {
    if (state.thisPage.enyaLocationDataReady) {
      preselectCountry();
    } else {
      document.addEventListener("enyaLocationDataReady", function() {
        preselectCountry();
      });
    }
  }
  if (state.thisPage.isHSI) {
    // There are three region fields to handle
    syncRegionFields();
  }
  if (state.thisPage.isHSI && state.thisPage.isErrorPage) {
    restoreSelectedCountryAndProvince();
  }
  triggerDelayedChangeEventsOnLoad();
}

function initFields() {
  if (!fieldList) return;
  fieldList.forEach(thisField => {
    // Save a handle to the input element for this field.
    thisField.inputElement = document.querySelector(`#${thisField.id}`);
    if (!thisField.inputElement) return;

    // Save a handle to the label element for this field.
    thisField.labelElement = document.querySelector(
      `label[for=${thisField.id}]`
    );
  });
}

function initFieldListeners() {
  // Listen to changes in certain supporter info fields so we can update
  // their labels, or hide/show state and region fields.
  // Listen for changes to country field
  if (countryField.inputElement) {
    countryField.inputElement.addEventListener("change", handleCountryChange);
  }

  if (!fieldList) return;
  fieldList.forEach(thisField => {
    if (thisField.inputElement) {
      thisField.inputElement.addEventListener("blur", trimInput);
    }
  });
}

function trimInput(event) {
  const thisField = event.target;
  const trimmedValue = utils.removeExcessWhitespace(thisField.value);
  thisField.value = trimmedValue;
}

function handleCountryChange(event) {
  state.thisPage.selectedCountry = event.target.value;
  // French-only advos offer one choice for country: CA. We don't want to change
  // the labels to default if country somehow gets blanked out.
  if (!(state.thisPage.isFrench && state.thisPage.pageTypeEnya === "advocacy")) {
    updateFieldLabels();
  }
  optInsManager.updateHSIEmailOptInForCountry(state.thisPage.selectedCountry);
  consentModal.updateEmailConsentForCountry(state.thisPage.selectedCountry);
  updateValidationPatterns();
  pageManager.updatePageClasses();
}

function updateFieldLabels() {
  if (!fieldList) return;
  fieldList.forEach(thisField => {
    if (!thisField.labelElement) return;
    thisField.labelElement.textContent = getLabelTextVariant(thisField);
    if (state.thisPage.isFrench) {
      thisField.labelElement.textContent = getFrenchLabel(
        thisField.labelElement.textContent
      );
    }
  });
}

function updateValidationPatterns() {
  if (!fieldList) return;
  if (!countryField) return;
  let selectedCountry, countryBucket;
  if (countryField.inputElement) {
    selectedCountry = countryField.inputElement.value;
    countryBucket = fieldHelpers.getBucketForCountryCode(selectedCountry);
  }
  fieldList.forEach(thisField => {
    if (
      typeof thisField.validationPatterns !== "undefined" &&
      thisField.inputElement
    ) {
      if (countryBucket &&
          typeof thisField.validationPatterns[countryBucket] !== "undefined") {
        thisField.inputElement.pattern = thisField.validationPatterns[countryBucket];
      } else {
        thisField.inputElement.pattern = thisField.validationPatterns["global"];
      }
    }
  });
}

function getLabelTextVariant(field) {
  if (!countryField.inputElement || !field.labelElement) return;
  // Default is the current label text, just for safety, so we don't
  // accidentally show a blank label.
  let labelText = field.labelElement.textContent;

  const selectedCountry = countryField.inputElement.value;
  const countryBucket = fieldHelpers.getBucketForCountryCode(selectedCountry);
  if (typeof field.labelTextVariants[countryBucket] !== "undefined") {
    labelText = field.labelTextVariants[countryBucket];
  } else {
    labelText = field.labelTextVariants.global;
  }
  return labelText;
}

// Move region and postcode rows inside a container so we can put them side by
// side.
function wrapRegionAndPostCode() {
  // The following selectors include the untagged region dropdown and region
  // text input that we use on HSI forms.
  const fields = utils.getAll(`
    .en__field--region,
    .enya-hsi .en__field--NOT_TAGGED_37, 
    .enya-hsi .en__field--NOT_TAGGED_38, 
    .en__field--postcode
  `);
  utils.wrapAll(fields, "div", "region-postcode-wrapper");
}

function preselectCountry() {
  if (!countryField.inputElement) return;
  if (typeof state.detectedCountry?.code !== "undefined") {
    countryField.inputElement.value = state.detectedCountry.code;
    countryField.inputElement.dispatchEvent(
      new Event('change', { bubbles: true })
    );
  }
}

// Sync standard region field (hidden) with visible region text input and region
// select
function syncRegionFields() {
  const regionHidden = document.querySelector('[name="supporter.region"]'); // Standard region field is a hidden type
  const regionSelect = document.getElementById('en__field_supporter_NOT_TAGGED_38'); // The region select is shown for certain countries, i.e., US, CA, AU
  const regionText = document.getElementById('en__field_supporter_NOT_TAGGED_37'); // The region text input is shown for all other countries

  const updateRegion = (e) => {
    if (e.target.value === "") {
      regionHidden.value = "None";
    } else {
      regionHidden.value = e.target.value;
    }
  };

  if (regionHidden && regionSelect && regionText) {
    // User input populates the hidden region field
    regionSelect.addEventListener('change', updateRegion);
    regionText.addEventListener('input', updateRegion);
  }
}

// For each field we care about, store its value in sessionStorage.
export function save() {
  if (!fieldList) return;
  if (!storageHelpers.isSessionStorageEnabled()) return;

  fieldList.forEach(thisField => {
    if (thisField.inputElement) {
      try {
        sessionStorage.setItem(
          utils.camelize(`enya${thisField.name}`),
          thisField.inputElement.value
        );
      } catch (error) {
        console.log(
          "🚀 ~ file: supporterInfo.js:417 ~ save: sessionStorage not available. "
        );
        console.log(error);
      }
    }
  });
}

export function getSelectedCountryFromStorage() {
  let country;
  if (!storageHelpers.isSessionStorageEnabled()) return;
  try {
    country = sessionStorage.getItem("enyaCountry");
  } catch (error) {
    console.log(
      "🚀 ~ file: supporterInfo.js:432 ~ getSelectedCountryFromStorage: sessionStorage not available."
    );
    console.log(error);
  }
  return country;
}

export function removeSelectedCountryFromStorage() {
  if (!storageHelpers.isSessionStorageEnabled()) return;
  try {
    sessionStorage.removeItem("enyaCountry");
  } catch (error) {
    console.log(
      "🚀 ~ file: supporterInfo.js:445 ~ removeSelectedCountryFromStorage: sessionStorage not available."
    );
    console.log(error);
  }
}

export function restoreSelectedCountry() {
  if (!countryField.inputElement) return;
  const savedSelectedCountry = getSelectedCountryFromStorage();
  if (savedSelectedCountry) {
    countryField.inputElement.value = savedSelectedCountry;
    countryField.inputElement.dispatchEvent(
      new Event('change', { bubbles: true })
    );
  }
}

export function saveSelectedProvince() {
  if (!provinceTextField.inputElement && !provinceSelectField.inputElement) return;
  let provinceValue;
  if (!storageHelpers.isSessionStorageEnabled()) return;

  // Test to see which province field has a value.
  if (provinceTextField.inputElement.value !== "") {
    provinceValue = provinceTextField.inputElement.value;
  } else {
    provinceValue = provinceSelectField.inputElement.value;
  }
  try {
    sessionStorage.setItem(
      "enyaProvince", provinceValue
    );
  } catch (error) {
    console.log(
      "🚀 ~ file: supporterInfo.js:479 ~ saveSelectedProvince: sessionStorage not available."
    );
    console.log(error);
  }
}

export function getSelectedProvinceFromStorage() {
  let province;
  if (!storageHelpers.isSessionStorageEnabled()) return;

  try {
    province = sessionStorage.getItem("enyaProvince");
  } catch (error) {
    console.log(
      "🚀 ~ file: supporterInfo.js:493 ~ getSelectedProvinceFromStorage: sessionStorage not available."
    );
    console.log(error);
  }
  return province;
}

export function removeSelectedProvinceFromStorage() {
  if (!storageHelpers.isSessionStorageEnabled()) return;

  try {
    sessionStorage.removeItem("enyaProvince");
  } catch (error) {
    console.log(
      "🚀 ~ file: supporterInfo.js:507 ~ removeSelectedProvinceFromStorage: sessionStorage not available."
    );
    console.log(error);
  }
}

export function restoreSelectedProvince() {
  if (!provinceTextField.inputElement && !provinceSelectField.inputElement) return;
  const savedSelectedProvince = getSelectedProvinceFromStorage();
  if (savedSelectedProvince) {
    // We don't know whether the text field or the select field will be visible.
    // So set the value of both.
    provinceTextField.inputElement.value = savedSelectedProvince;
    provinceSelectField.inputElement.value = savedSelectedProvince;
    provinceSelectField.inputElement.dispatchEvent(
      new Event('change', { bubbles: true })
    );
  }
}

export function restoreSelectedCountryAndProvince() {
  restoreSelectedCountry();
  // We need to wait to restore the province until the country change event has
  // bubbled.
  setTimeout(() => {
    restoreSelectedProvince();
  }, 1000);
}

export function updateCountryForCurrency(currency) {
  if (!countryField.inputElement) return;
  // CMK 11172022: Adding exclusion for euros, to see if it fixes bug.
  // https://humanesociety.atlassian.net/browse/HSIMARCOMM-2003
  if (currency !== "EUR") {
    countryField.inputElement.value = fieldHelpers.getCountryForCurrency(currency);
    countryField.inputElement.dispatchEvent(
      new Event('change', { bubbles: true })
    );
  }
}

function triggerDelayedChangeEventsOnLoad() {
  // On page load, we may have prefilled the state and country selects (using
  // SMS hash or EN autologin link). When that happens, we need to trigger the
  // change event after a delay.
  setTimeout(() => {
    if (countryField.inputElement && countryField.inputElement.value) {
      countryField.inputElement.dispatchEvent(
        new Event('change', { bubbles: true })
      );
    }
  }, 1000);
  setTimeout(() => {
    if (provinceSelectField.inputElement && provinceSelectField.inputElement.value) {
      provinceSelectField.inputElement.dispatchEvent(
        new Event('change', { bubbles: true })
      );
    }
  }, 2000);
}

function getFrenchLabel(labelText = "") {
  /* eslint-disable quote-props */
  const frenchLabelDictionary = {
    Country: "Pays",
    "First name": "Prénom",
    "Last name": "Nom",
    Surname: "Nom",
    "Email address": "Adresse courriel",
    "Street address": "Adresse 1",
    "House number/name": "Adresse 1",
    "Apartment, suite or other": "Appartement, bureau ou autre",
    "Street/road": "Adresse 2",
    "Town/city": "Ville",
    City: "Ville",
    State: "État",
    Province: "Province",
    "State/region": "État/région",
    "State/territory": "État/territoire",
    County: "County",
    "Zip code": "Code postal",
    Postcode: "Code postal",
    "Postal code": "Code postal"
  };

  let frenchLabelText = labelText;

  if (Object.prototype.hasOwnProperty.call(frenchLabelDictionary, labelText)) {
    frenchLabelText = frenchLabelDictionary[labelText];
  }

  return frenchLabelText;
}
