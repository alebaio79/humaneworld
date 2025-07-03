/*
* currency.js
* HSUS Engaging Networks Forms - Enya 2022
* Created: Spring 2022
* Purpose: Manage the currency selector, store the selected currency, and advise about redirect.
*/

import state from "commonComponents/stateManager";
import * as pageManager from "commonComponents/pageManager";
import * as storageHelpers from "commonHelpers/storageHelpers";
import * as redirector from "./redirector";
import * as geolocator from "commonComponents/geolocator";
import * as supporterInfo from "commonComponents/supporterInfo";
import * as footer from "./footer";

let userCountry;
let currencySelector;
let currencyHasChangedOnLoad = false;

export function init() {
  if (!state.thisPage.isHSI) return;
  if (state.thisPage.ignoreDetectedCountry || state.thisPage.isFriendsHSIForm) return;

  if (state.thisPage.enyaLocationDataReady) {
    initUserCountry();
    initCurrencySelector();
    updateCurrency();
  } else {
    document.addEventListener("enyaLocationDataReady", function() {
      initUserCountry();
      initCurrencySelector();
      updateCurrency();
    });
  }

  // Add fail-safe, if location data doesn't arrive within a certain timespan.
  setTimeout(() => {
    if (!state.thisPage.enyaLocationDataReady) {
      initUserCountry();
      initCurrencySelector();
      updateCurrency();
    }
  }, 10000);
}

function initUserCountry() {
  // This call will return null values if geolocator hasn't been initialized,
  // or if the geolocator hasn't finished getting the locator data.
  userCountry = geolocator.getLocationCountry();
}

function initCurrencySelector() {
  currencySelector = document.querySelector("#en__field_transaction_paycurrency");
  if (!currencySelector) return;
  // Save selected currency to state, and then add a listener.
  state.thisPage.selectedCurrency = currencySelector.value;
  currencySelector.addEventListener("change", function(event) {
    state.thisPage.selectedCurrency = event.target.value;

    // Fire an event telling the page that the currency changed.
    const enyaCurrencyChanged = new Event("enyaCurrencyChanged");
    document.dispatchEvent(enyaCurrencyChanged);

    // We need to show specific footer text based on currency.
    footer.updateFooterForCurrency(currencySelector.value);

    if (currencyHasChangedOnLoad) {
      supporterInfo.updateCountryForCurrency(currencySelector.value);
    }

    // After a delay, tell the amount object to refresh.
    // Delay needed to allow the EN field update to fire.
    setTimeout(() => {
      state.thisPage.amountObject.load();
    }, 1000);

    saveSelectedCurrencyToStorage();
    pageManager.updatePageClasses();
    // The page will redirect if we need to go from a non-UK form to a UK
    // form, or vice versa. The page will not redirect if we're switching
    // between non-UK currencies.
    redirector.redirect();
  });
}

function updateCurrency() {
  if (!currencySelector) return;
  // If we've arrived from a redirect, we may not want to change the currency
  // again.
  const continueToChangeCurrency = handlePostRedirect();
  if (continueToChangeCurrency && !state.thisPage.isErrorPage) {
    changeCurrencySelectorForCountry();
  } else {
    // Set our flag as if we did change currency on load.
    currencyHasChangedOnLoad = true;
    // Even though the currency hasn't changed, we need to update the country
    // after redirect. But we need a delay to get it to work. Sigh.
    setTimeout(() => {
      supporterInfo.updateCountryForCurrency(currencySelector.value);
    }, 1000);
  }
}

function handlePostRedirect() {
  if (state.thisPage.isUKForm) {
    if (state.thisPage.selectedCurrency === "GBP") {
      // Remove the redirect flag. We don't need it anymore.
      redirector.removeRedirectFlagFromStorage();
      return false;
    }
  } else {
    // We're not on a UK form. If we've been redirected from a UK form, we need
    // to know what currency the user chose on the UK form, and set that. We'll
    // be ignoring the user's detected country in this case.
    if (redirector.getRedirectFlagFromStorage()) {
      // Remove the flag. We got the message.
      redirector.removeRedirectFlagFromStorage();
      if (getSelectedCurrencyFromStorage() !== null) {
        currencySelector.value = getSelectedCurrencyFromStorage();
        currencySelector.dispatchEvent(new Event('change', { bubbles: true }));
        // We need to show specific footer text based on currency.
        footer.updateFooterForCurrency(currencySelector.value);
        return false;
      }
    }
  }
  return true;
}

function changeCurrencySelectorForCountry() {
  if (!userCountry || !currencySelector) return;

  // We want this to fire no more than once per page load.
  if (currencyHasChangedOnLoad) return;

  currencySelector.value = getCurrencyForCountry();
  currencyHasChangedOnLoad = true;
  currencySelector.dispatchEvent(new Event('change', { bubbles: true }));

  // We need to show specific footer text based on currency.
  footer.updateFooterForCurrency(currencySelector.value);
}

function getCurrencyForCountry() {
  if (!userCountry) return;
  let currencyForCountry = "USD";

  if (userCountry.isInEU) {
    currencyForCountry = "EUR";
  } else {
    switch (userCountry.code) {
      case "US":
        currencyForCountry = "USD";
        break;
      case "CA":
        currencyForCountry = "CAD";
        break;
      case "AU":
        currencyForCountry = "AUD";
        break;
      case "GB":
        currencyForCountry = "GBP";
        break;
      default:
        // Do nothing. Leave at default value.
    }
  }
  return currencyForCountry;
}

export function setCurrencyFromParam() {
  if (!state.activeURLParams) return;
  if (!currencySelector) return;

  let newCurrency;

  if (typeof state.activeURLParams["transaction.paycurrency"] !== "undefined") {
    newCurrency = state.activeURLParams["transaction.paycurrency"];
  }

  // Update the currency.
  switch (newCurrency) {
    case "USD":
    case "AUD":
    case "CAD":
    case "EUR":
    case "GBP":
      currencySelector.value = newCurrency;
      currencySelector.dispatchEvent(new Event('change', { bubbles: true }));
      break;
    default:
      // For any other values, do nothing.
      break;
  }
}

function saveSelectedCurrencyToStorage() {
  // Don't write empty or undefined value to storage.
  if (!state.thisPage.selectedCurrency) return;
  if (!storageHelpers.isSessionStorageEnabled()) return;

  try {
    sessionStorage.setItem("enyaSelectedCurrency", state.thisPage.selectedCurrency);
  } catch (error) {
    console.log(
      "🚀 ~ file: currency.js:205 ~ saveSelectedCurrencyToStorage: sessionStorage not available."
    );
    console.log(error);
  }
}

export function getSelectedCurrencyFromStorage() {
  let currency;
  if (!storageHelpers.isSessionStorageEnabled()) return;

  try {
    currency = sessionStorage.getItem("enyaSelectedCurrency");
  } catch (error) {
    console.log(
      "🚀 ~ file: currency.js:219 ~ getSelectedCurrencyFromStorage: sessionStorage not available."
    );
    console.log(error);
  }
  return currency;
}

export function removeSelectedCurrencyFromStorage() {
  if (!storageHelpers.isSessionStorageEnabled()) return;

  try {
    sessionStorage.removeItem("enyaSelectedCurrency");
  } catch (error) {
    console.log(
      "🚀 ~ file: currency.js:233 ~ removeSelectedCurrencyFromStorage: sessionStorage not available."
    );
    console.log(error);
  }
}
