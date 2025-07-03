/*
* employerMatch.js
* HSUS Donation Forms - Enya 2021
* Created: Winter 2021
* Purpose: Control the behavior of all employer match elements.
*/

// When the company ID gets set by the DTD JS, we need to do the following:
// - Save the company ID to session storage.
// - Save the company name to session storage.
// - Save the DTD status to session storage.

// When the company ID field gets blanked out, we need to do the following:
// - Blank out the company ID in session storage.
// - Blank out the company name in session storage.
// - Blank out the DTD status in session storage.

// On the thank you page, we need to do the following:
// - Get the saved company ID from sessionStorage.
// - If the value exists, call out to the DTD API.

let employerMatchSection;

export function init() {
  initEmployerMatchSection();
  addCompanyIDChangeListener();
}

function initEmployerMatchSection() {
  // We may need this handle later. So leave it set for now.
  employerMatchSection = document.querySelector(".dd-lookup-wrapper");
}

function addCompanyIDChangeListener() {
  document.addEventListener("doublethedonation_company_id", function() {
    // Add a little delay to allow the DTD JS to save the value in its hidden
    // field. Then we save it to session storage.
    setTimeout(() => {
      setCompanyID();
      setCompanyName();
      setDDStatus();
    }, 2000);
  });
}

function setCompanyID() {
  const hiddenCompanyIDField = getField("dd-company-id");
  if (!hiddenCompanyIDField) return;

  sessionStorage.setItem("ddCompanyID", hiddenCompanyIDField.value);
}

function setCompanyName() {
  const hiddenCompanyNameField = getField("dd-company-name");
  if (!hiddenCompanyNameField) return;

  sessionStorage.setItem("ddCompanyName", hiddenCompanyNameField.value);
}

function setDDStatus() {
  const hiddenStatusField = getField("dd-status");
  if (!hiddenStatusField) return;

  sessionStorage.setItem("ddStatus", hiddenStatusField.value);
}

// Convenience function for mapping readable field names to actual selectors.
function getField(fieldName) {
  if (!fieldName) return;

  let fieldSelector;

  switch (fieldName) {
    case "dd-company-id":
      fieldSelector = "input[name=doublethedonation_company_id]";
      break;
    case "dd-company-name":
      fieldSelector = "input[name=doublethedonation_company_name]";
      break;
    case "dd-status":
      fieldSelector = "input[name=doublethedonation_status]";
      break;
    default:
      break;
  }

  if (!fieldSelector) return;

  const fieldElement = document.querySelector(fieldSelector);
  return fieldElement;
}
