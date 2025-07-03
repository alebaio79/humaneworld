/*
 * autologin.js
 * HSUS Engaging Networks Forms - Enya 2021
 * Created: Spring 2021
 * Purpose: Decode user data hash from URL, and fill form fields.
 * Note: The hash string is created using a tool that M+R developed, for use with Mobile Commons.
 */

/* Test hash—original. Has no phone number.
hash=UTJoeWFYTjBiM0JvWlhJPSVTMlZoYm1VPSVZMmh5YVhOQVkydDNaV0l1WTI5dCVNVFkxTURFZ1MybHNiR1JsWlhJZ1JISnBkbVU9JSVSR1Z5ZDI5dlpBPT0lVFVRPSVNakE0TlRVdE1Ua3lOQT09JQ
*/

/* New test hash—04212022. This one includes phone number.
hash=Uld4c1pXND0lVUdGelkyRnNaUT09JVpXeHNaVzV3WVhOallXeGxRR2R0WVdsc0xtTnZiUT09JU1UVTJJRmNnVTNSeVpXVjBJRTVYJSVWMkZ6YUdsdVozUnZiZz09JVJFTT0lTWpBd01ERT0lVlc1cGRHVmtJRk4wWVhSbGN3PT0lTXpBeE9EQXhOekl3TlE9PQ
*/

import * as storageHelpers from "commonHelpers/storageHelpers";

let autologinHash;
let autologinHashArray;

// The hash array positions are already set by the hash string that the M+R
// hashing program created. We'll add element handles to each field value
// object in addElementHandlesToFieldMap() below.
const fieldMap = {
  firstName: {
    hashArrayPosition: 0
  },
  lastName: {
    hashArrayPosition: 1
  },
  emailAddress: {
    hashArrayPosition: 2
  },
  address1: {
    hashArrayPosition: 3
  },
  address2: {
    hashArrayPosition: 4
  },
  city: {
    hashArrayPosition: 5
  },
  region: {
    hashArrayPosition: 6
  },
  NOT_TAGGED_37: {
    hashArrayPosition: 6
  },
  NOT_TAGGED_38: {
    hashArrayPosition: 6
  },
  postcode: {
    hashArrayPosition: 7
  },
  country: {
    hashArrayPosition: 8
  },
  phoneNumber2: {
    hashArrayPosition: 9
  }
};

export function init() {
  getHashFromURLOrStorage();
  saveHashToStorage();
  makeHashArray();
  addElementHandlesToFieldMap();
  populateFieldsFromHash();
  clearHashFromURL();
}

function getHashFromURLOrStorage() {
  const urlParams = new URLSearchParams(window.location.search);
  autologinHash = urlParams.get("hash");
  if (!autologinHash) {
    autologinHash = getHashFromStorage();
  }
}

function makeHashArray() {
  // Ugly condish needed because sessionStorage coerces values into strings.
  // TODO: Find a better way.
  if (typeof autologinHash === "undefined" ||
    !autologinHash || autologinHash === "null" ||
    autologinHash === "undefined") {
    return;
  }

  try {
    autologinHashArray = window.atob(autologinHash).split("%");
    for (let i = 0; i < autologinHashArray.length; i++) {
      autologinHashArray[i] = window.atob(autologinHashArray[i]);
    }
  } catch (error) {
    console.log("Error decoding the hash: %o", error);
  }
}

function addElementHandlesToFieldMap() {
  for (const [fieldName, fieldValueObject] of Object.entries(fieldMap)) {
    fieldValueObject.elementHandle = document.querySelector(`#en__field_supporter_${fieldName}`);
  }
}

function populateFieldsFromHash() {
  for (const [, fieldValueObject] of Object.entries(fieldMap)) {
    if ("elementHandle" in fieldValueObject) {
      populateField(
        fieldValueObject.elementHandle,
        fieldValueObject.hashArrayPosition
      );
    }
  }
}

// Populate a field only if it's empty.
function populateField(field, arrayPosition) {
  if (!autologinHashArray) return;
  if (arrayPosition >= autologinHashArray.length) return;

  if (field && field.value.length === 0) {
    field.value = autologinHashArray[arrayPosition];
    setTimeout(() => {
      field.dispatchEvent(new Event("input"));
      field.dispatchEvent(new Event("change"));
    }, 2000);
  }
}

// Don't overwrite existing hash in sessionStorage unless flag is set.
function saveHashToStorage(overwrite = false) {
  // Don't write null value to storage.
  if (autologinHash === null) return;

  const storedHash = getHashFromStorage();

  if (!storedHash || storedHash === "null" || overwrite) {
    if (!storageHelpers.isSessionStorageEnabled()) return;
    try {
      sessionStorage.setItem("autologinHash", autologinHash);
    } catch (error) {
      console.log(
        "sessionStorage not available in autologin.js saveHashToStorage."
      );
      console.log(error);
    }
  }
}

export function getHashFromStorage() {
  let hash;
  if (!storageHelpers.isSessionStorageEnabled()) return;

  try {
    hash = sessionStorage.getItem("autologinHash");
  } catch (error) {
    console.log(
      "sessionStorage not available in autologin.js getHashFromStorage."
    );
    console.log(error);
  }
  return hash;
}

export function removeHashFromStorage() {
  if (!storageHelpers.isSessionStorageEnabled()) return;
  try {
    sessionStorage.removeItem("autologinHash");
  } catch (error) {
    console.log(
      "sessionStorage not available in autologin.js removeHashFromStorage."
    );
    console.log(error);
  }
}

function clearHashFromURL() {
  window.history.replaceState(
    {}, "", window.location.href.replace(/&?hash[^&]+/g, "")
  );
}
