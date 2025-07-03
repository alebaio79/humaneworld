/*
* utilities.js
* HSUS Engaging Networks Forms - Enya 2021
* Created: Winter 2021
* Purpose: Utility functions.
*/

/**
* Adds a specified class or array of classes.
*
* @param {node} el Node to add class to
* @param {Array || string} cls Classes to add
*/
export const addClass = (el, _classes) => {
  if (Array.isArray(_classes)) {
    el.classList.add(..._classes);
  } else {
    el.classList.add(_classes);
  }
};

/**
* Removes a specified class or array of classes.
*
* @param {node} el Node to remove class from
* @param {Array || string} cls Classes to remove
*/
export const removeClass = (el, _classes) => {
  if (Array.isArray(_classes)) {
    el.classList.remove(..._classes);
  } else {
    el.classList.remove(_classes);
  }
};

export function removeClassByPrefix(el, prefix) {
  const pattern = '(' + prefix + '(\\s|(-)?(\\w*)(\\s)?)).*?';
  const regEx = new RegExp(pattern, 'g');
  el.className = el.className.replace(regEx, '');
}

/**
* Returns NodeList.
*
* @param {string} selectors One or more selectors to match against.
* @param {node} root The node to select over
*/
export const getAll = (selector, root = document) => {
  return Array.prototype.slice.call(root.querySelectorAll(selector), 0);
};

/**
* Returns True if element is empty or has only whitespace.
*
* @param {node} el Element to check if empty.
* @returns {boolean} If element is empty or has only whitespace
*/
export const isEmpty = el => {
  return el.innerHTML.replace(/^\s*/, "").replace(/\s*$/, "") === "";
};

/**
* Returns wrapped nodes.
*
* @param {NodeList} nodes The nodes to wrap.
* @param {string} wrapperType The node element for the wrapper.
* @param {string} wrapperClass The class to assign the wrapper
* @returns Wrapped elements
*/
export const wrapAll = (nodes, wrapperType, wrapperClass) => {
  if (typeof nodes[0] === "undefined") return;

  const parent = nodes[0].parentNode;
  const previousSibling = nodes[0].previousSibling;
  const wrapper = document.createElement(wrapperType);

  if (wrapperClass) {
    addClass(wrapper, wrapperClass);
  }

  for (let i = 0; nodes.length - i; wrapper.firstChild === nodes[0] && i++) {
    wrapper.appendChild(nodes[i]);
  }

  const nextSibling = previousSibling ? previousSibling.nextSibling : parent.firstChild;
  parent.insertBefore(wrapper, nextSibling);
  return wrapper;
};

/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @returns {Node}       The template HTML
 * Source: https://gomakethings.com/converting-a-string-into-markup-with-vanilla-js/
 */
export const stringToHTML = function(str) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, "text/html");
  return doc.body.firstElementChild;
};

export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function isString(value) {
  return typeof value === "string" || value instanceof String;
}

export function isElement(element) {
  return element instanceof Element || element instanceof HTMLDocument;
}

// Source: https://stackoverflow.com/a/22480938/135196
export function isScrolledIntoView(el) {
  const rect = el.getBoundingClientRect();
  const elemTop = rect.top;
  const elemBottom = rect.bottom;

  // Only completely visible elements return true:
  const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);

  return isVisible;
}

/**
 * Get a URI string that contains params you provide.
 * @param {String} baseUrl The base URL.
 * @param {Object} params Parameters you want included in the URI.
 * @returns {String} The constructed URI.
 */
// https://stackoverflow.com/a/65285991/135196
export const getUriWithParams = (baseUrl, params) => {
  const url = new URL(baseUrl);
  const urlParams = new URLSearchParams(url.search);
  for (const key in params) {
    if (params[key] !== undefined) {
      urlParams.set(key, params[key]);
    }
  }
  url.search = urlParams.toString();
  return url.toString();
};

/**
 * Get a URI string after removing params you provide.
 * @param {String} fullUrl The full URL containing the params that need deleting.
 * @param {Object} params Parameters you want removed from the URI.
 * @returns {String} The constructed URI.
 */
// https://stackoverflow.com/a/65285991/135196
export const getUriWithDeletedParams = (fullUrl, params) => {
  const url = new URL(fullUrl);
  const urlParams = new URLSearchParams(url.search);
  params.forEach(param => {
    urlParams.delete(param);
  });
  url.search = urlParams.toString();
  return url.toString();
};

/**
 * Convert a string containing HTML to plain text.
 * @param {String} string The text that may contain HTML.
 * @returns {String} The plain text.
 */
// https://stackoverflow.com/a/54894931/135196
export function htmlDecode(string) {
  return new DOMParser().parseFromString(string, "text/html").querySelector("html").textContent;
}

/**
 * Remove double spaces and all line breaks from a string.
 * @param {String} text The text that may have excess whitespace.
 * @returns {String} The cleaned-up text.
 */
export function removeExcessWhitespace(text) {
  if (typeof text !== "string") return text;
  const cleanText = text
    .replace(/(\r\n|\n|\r)/gm, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleanText;
}

/**
 * Equivalent to jQuery's :contains(). Find an element that contains the
 * specified text.
 * @param {String} elementType The element type.
 * @param {String} text The text we're looking for.
 * @returns {DOMElement} The element containing that text.
 */
export function getElementWithText(elementType, text) {
  const xpath = `//${elementType}[contains(text(),'${text}')]`;
  const matchingElement = document.evaluate(
    xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  return matchingElement;
}

/**
 * Converts string into currency format with dollar sign.
 * Hard-wired to use USD as currency and en-US locale.
 * @param {String | Number} amount The amount.
 * @param {Boolean} removeDollar Remove the dollar sign.
 * @returns {String} The formatted amount.
 */
export function formatAmountUS(amount, removeDollar = false) {
  let formattedAmount;

  const fraction = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
    signDisplay: "never",
    minimumFractionDigits: 2
  });

  const whole = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
    signDisplay: "never",
    minimumFractionDigits: 0
  });

  if (amount % 1 === 0) {
    formattedAmount = whole.format(amount);
  } else {
    formattedAmount = fraction.format(amount);
  }

  if (removeDollar) {
    formattedAmount = removeDollarSigns(formattedAmount);
  }

  return formattedAmount;
}

/**
 * Converts string or number into currency format with currency symbol.
 * @param {String | Number} amount The amount.
 * @param {String} locale The target locale. Default is en-US.
 * @param {String} currency The target currency. Default is USD.
 * @param {String | Number} amount The amount.
 * @returns {String} The formatted amount.
 */
export function formatAmountForLocaleAndCurrency(
  amount,
  locale = "en-US",
  currency = "USD"
) {
  let formattedAmount;

  const fraction = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
    signDisplay: "never",
    minimumFractionDigits: 2
  });

  const whole = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
    signDisplay: "never",
    minimumFractionDigits: 0
  });

  if (amount % 1 === 0) {
    formattedAmount = whole.format(amount);
  } else {
    formattedAmount = fraction.format(amount);
  }

  // We don't want Canadian or Australian dollars to have CA or A in the symbol.
  // We can't use narrowSymbol because it's not supported in all browsers yet.
  return formattedAmount.replace(/C|A/g, '');
}

/**
 * Strips commas from text.
 * @param {String} text The text.
 * @returns {String} The comma-less text.
 */
export function removeCommas(text = "") {
  return text.replace(/,/g, '');
}

/**
 * Strips dollar signs from text.
 * @param {String} text The text.
 * @returns {String} The $-less text.
 */
export function removeDollarSigns(text = "") {
  return text.replace(/\$/g, '');
}

/**
 * Strips spaces from text.
 * @param {String} text The text.
 * @returns {String} The space-less text.
 */
export function removeSpaces(text = "") {
  return text.replace(/\s+/g, '');
}

// https://www.joshwcomeau.com/react/prefers-reduced-motion/
// Query looks for no preference, to support older browsers.
// Then we flip the logic.
export function userPrefersReducedMotion() {
  const QUERY = '(prefers-reduced-motion: no-preference)';
  const mediaQueryList = window.matchMedia(QUERY);
  const prefersReducedMotion = !mediaQueryList.matches;
  return prefersReducedMotion;
}

// https://stackoverflow.com/a/31320387/135196
// Test for visibility using multiple factors.
export function isVisible(element) {
  const style = window.getComputedStyle(element);
  return style.width !== "0" &&
  style.height !== "0" &&
  style.opacity !== "0" &&
  style.display !== "none" &&
  style.visibility !== "hidden";
}

// This function returns true for countries in EEA too. And Switzerland.
// https://www.gov.uk/eu-eea
// https://european-union.europa.eu/principles-countries-history/country-profiles_en
export function isCountryInEU(countryCode = "") {
  let isInEU = false;
  const euCountries = [
    "AT", // Austria,
    "BE", // Belgium",
    "BG", // Bulgaria",
    "HR", // Croatia",
    "CY", // Cyprus",
    "CZ", // Czech Republic",
    "DK", // Denmark",
    "EE", // Estonia",
    "FI", // Finland",
    "FR", // France",
    "DE", // Germany",
    "GR", // Greece",
    "HU", // Hungary",
    "IE", // Ireland",
    "IT", // Italy",
    "LV", // Latvia",
    "LT", // Lithuania",
    "LU", // Luxembourg",
    "MT", // Malta",
    "NL", // Netherlands",
    "PL", // Poland",
    "PT", // Portugal",
    "RO", // Romania",
    "SK", // Slovakia",
    "SI", // Slovenia",
    "ES", // Spain",
    "SE", // Sweden",
    "IS", // Iceland—in EEA
    "LI", // Liechtenstein—in EEA
    "NO", // Norway—in EEA
    "CH" // Switzerland—part of single market
  ];

  if (euCountries.includes(countryCode)) {
    isInEU = true;
  }
  return isInEU;
}

// https://stackoverflow.com/a/2970667/135196
export function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function setAttributes(element, attributes) {
  Object.keys(attributes).forEach((attr) => {
    element.setAttribute(attr, attributes[attr]);
  });
}

// Change straight quotes to curly.
// Source: https://leancrew.com/all-this/2010/11/smart-quotes-in-javascript/
export function curlies(a) {
  a = a.replace(/(^|[-\u2014\s(\["])'/g, "$1\u2018"); // opening singles
  a = a.replace(/'/g, "\u2019"); // closing singles & apostrophes
  a = a.replace(/(^|[-\u2014/\[(\u2018\s])"/g, "$1\u201c"); // opening doubles
  a = a.replace(/"/g, "\u201d"); // closing doubles
  return a;
};

// Create SHA-256 hash of provided text.
// Source:
// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
export async function digestText(text = "") {
  if (!window.crypto || !window.crypto.subtle) return text;

  // encode as (utf-8) Uint8Array
  const msgUint8 = new TextEncoder().encode(text);

  // hash the text
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);

  // convert buffer to byte array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export async function getSHA256Hash(text = "") {
  const trimmedText = removeExcessWhitespace(text);
  if (trimmedText === "") return "";
  try {
    return await digestText(trimmedText);
  } catch (error) {
    console.log(error);
  }
}
