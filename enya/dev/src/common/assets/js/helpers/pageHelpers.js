/*
* pageHelpers.js
* HSUS Engaging Networks Forms - Enya 2021
* Created: Winter 2021
* Purpose: Common page support functions.
*/

import * as utils from "utils/utilities";

export function hasPageErrors() {
  // All EN donation pages have ul.en__errorList.
  // Before the form is submitted, that element is empty—but it has whitespace!
  // When there's a processing error, that element is not empty.
  const errorListElement = document.querySelector("ul.en__errorList");
  if (!errorListElement) return;

  // Note: We can't use hasChildNodes because hasChildNodes does not ignore 
  // whitespace and this element has whitespace when there are no errors.
  return !utils.isEmpty(errorListElement);
}

export function isFinalPage() {
  return window.pageJson &&
    typeof window.pageJson.pageNumber !== 'undefined' &&
    typeof window.pageJson.pageCount !== 'undefined' &&
    window.pageJson.pageNumber === window.pageJson.pageCount;
}

export function isSinglePageForm() {
  return window.pageJson &&
    typeof window.pageJson.pageNumber !== 'undefined' &&
    typeof window.pageJson.pageCount !== 'undefined' &&
    window.pageJson.pageNumber === 1 &&
    window.pageJson.pageCount === 1;
}

export function isDonationPage() {
  if (document.querySelector("body.enya-donation")) {
    return true;
  } else {
    return false;
  }
}

export function isSplashPage() {
  if (document.querySelector("body.enya-splash")) {
    return true;
  } else {
    return false;
  }
}

export function addPageClass() {
  if (!window.pageJson) return;
  const body = document.querySelector('body');
  body.classList.add('page-' + window.pageJson.pageNumber);
  if (window.pageJson.pageNumber === window.pageJson.pageCount) {
    body.classList.add('last-page');
  }
}

/**
 * Get the page ID for the current page. Note that the returned value is numeric.
 * @returns {String} Empty string if not found.
 * @returns {Number} The EN campaignPageId.
 */
export function getPageId() {
  if (window.pageJson && window.pageJson.campaignPageId) {
    return window.pageJson.campaignPageId;
  } else {
    return "";
  }
}

/**
 * Get the page name of the current page.
 * @returns {String} The page name.
 */
export function getPageName() {
  if (window.pageJson && window.pageJson.pageName) {
    return window.pageJson.pageName;
  } else {
    return "";
  }
}

// Wrap pageJson lookups with error checking.
export function getPageJsonFor(key) {
  if (!window.pageJson) return "";
  if (!key) return "";
  if (typeof window.pageJson[key] !== "undefined") {
    return window.pageJson[key];
  } else {
    return "";
  }
}

/**
 * Get the current EN session ID.
 * @returns {String} The session ID.
 */
export function getSessionID() {
  let sessionID = "";
  if (document.getElementsByName("sessionId").length) {
    sessionID = document.getElementsByName("sessionId")[0].value;
  }
  return sessionID;
}

/**
 * Get the form element on the page.
 * @returns {Object} The form DOM element.
 */
export function getFormElement() {
  const formElement = document.querySelector("form.en__component--page");
  return formElement;
}

// Source: https://phrase.com/blog/posts/detecting-a-users-locale/
export function getBrowserLocales(options = {}) {
  const defaultOptions = {
    languageCodeOnly: false
  };

  const opt = {
    ...defaultOptions,
    ...options
  };

  const browserLocales =
    navigator.languages === undefined
      ? [navigator.language]
      : navigator.languages;

  if (!browserLocales) {
    return undefined;
  }

  return browserLocales.map(locale => {
    const trimmedLocale = locale.trim();

    return opt.languageCodeOnly
      ? trimmedLocale.split(/-|_/)[0]
      : trimmedLocale;
  });
}

export function getENClientId() {
  if (window.pageJson && window.pageJson.clientId) {
    return window.pageJson.clientId;
  } else {
    return "";
  }
}

export function getENInstanceName() {
  const clientId = getENClientId();
  let instanceName = "";
  switch (clientId) {
    case 2253:
      instanceName = "HSUS";
      break;
    case 104:
      instanceName = "HSI";
      break;
    case 2254:
      instanceName = "WLT";
      break;
    default:
      break;
  }
  return instanceName;
}
