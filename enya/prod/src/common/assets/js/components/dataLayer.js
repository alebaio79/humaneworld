/*
 * dataLayer.js
 * HSUS Engaging Networks Forms - Enya 2022
 * Created: Fall 2022
 * Purpose: Manage interactions with the GTM data layer.
 */

import * as pageHelpers from "commonHelpers/pageHelpers";

const firstNameField = {
  id: "en__field_supporter_firstName",
  dataLayerName: "formfield_firstname",
  inputElement: undefined,
};

const lastNameField = {
  id: "en__field_supporter_lastName",
  dataLayerName: "formfield_lastname",
  inputElement: undefined,
};

const cityField = {
  id: "en__field_supporter_city",
  dataLayerName: "formfield_city",
  inputElement: undefined,
};

const postalCodeField = {
  id: "en__field_supporter_postcode",
  dataLayerName: "formfield_postcode",
  inputElement: undefined,
};

// Collect all the objects declared above into an array that we can loop over.
const fieldList = [firstNameField, lastNameField, cityField, postalCodeField];

export function init() {
  initFields();
  initFieldListeners();
  pushUserIdToDataLayer();
}

function initFields() {
  if (!fieldList) return;
  fieldList.forEach((thisField) => {
    // Save a handle to the input element for this field.
    thisField.inputElement = document.querySelector(`#${thisField.id}`);
  });
}

function initFieldListeners() {
  if (!fieldList) return;

  fieldList.forEach((thisField) => {
    if (thisField.inputElement) {
      thisField.inputElement.addEventListener(
        "change",
        pushSupporterValuesToDataLayer
      );
    }
  });
}

function pushSupporterValuesToDataLayer(event) {
  if (!window.dataLayer) return;
  if (!fieldList) return;

  fieldList.forEach((thisField) => {
    if (thisField.inputElement && thisField.inputElement.value) {
      if (event.target.id === thisField.id) {
        const dataLayerName = `${thisField.dataLayerName}`;
        // We no longer want to save the first and last name to the data layer,
        // for PII safety.
        if (
          dataLayerName !== "formfield_firstname" &&
          dataLayerName !== "formfield_lastname"
        ) {
          window.dataLayer.push({
            [dataLayerName]: thisField.inputElement.value,
          });
        }
      }
    }
  });
  updateFullNameFlag();
}

// Sets flag marking whether the first and last name fields are both full.
function updateFullNameFlag() {
  if (!firstNameField || !lastNameField) return;
  let isFullNameFull = false;
  let isFirstNameFull = false;
  let isLastNameFull = false;
  if (firstNameField.inputElement) {
    isFirstNameFull = firstNameField.inputElement.value;
  }

  if (lastNameField.inputElement) {
    isLastNameFull = lastNameField.inputElement.value;
  }

  if (isFirstNameFull && isLastNameFull) {
    isFullNameFull = true;
  }

  window.dataLayer.push({
    full_name: isFullNameFull,
  });
}

// We're using EN's supporterId as our custom userId in GA.
function pushUserIdToDataLayer() {
  if (!window.dataLayer) return;
  const supporterId = pageHelpers.getPageJsonFor("supporterId").toString();
  window.dataLayer.push({
    userId: supporterId,
    event: "userIdSet"
  });
}
