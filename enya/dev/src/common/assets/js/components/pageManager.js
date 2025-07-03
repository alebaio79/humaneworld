/*
* pageManager.js
* HSUS Engaging Networks Forms - Enya 2021
* Enya Page Layout Controller
* Created: Winter 2021
* Purpose: Module that watches the page layout and manages things like the classes added to the body.
*/

import state from "./stateManager";
import * as pageHelpers from "commonHelpers/pageHelpers";
import * as utils from "utils/utilities";

export function init() {
  // Set handle to the body element. All other modules will use this handle,
  // via the state.
  state.thisPage.enyaBody = document.querySelector("body.enya");

  detectErrorPage();
  detectThanksPage();

  // Monitor changes to screen size. Set screen size variable on load.
  watchScreenSize();

  // Need to call this on page load, to adjust layout.
  updateLayout();

  initScrollToAmountSection();
}

// Sets an error flag in state if EN processing error message is found.
function detectErrorPage() {
  state.thisPage.isErrorPage = pageHelpers.hasPageErrors();
}

function detectThanksPage() {
  detectSinglePageDonation();
  state.thisPage.isThanksPage =
    pageHelpers.isFinalPage() && !pageHelpers.isSinglePageForm() &&
    !state.thisPage.isSinglePageDonation;
}

// Some donation pages don't have a thanks page, because users get 
// redirected somewhere else after donation.
// We need to make sure we don't accidentally treat a single-page donation
// page as a thank you page.
function detectSinglePageDonation() {
  if (window.pageConfigSettings) {
    if (window.pageConfigSettings.isSinglePageDonation) {
      state.thisPage.isSinglePageDonation = true;
    } else {
      state.thisPage.isSinglePageDonation = false;
    }
  }
}

// Adds classes to the page's body tag, to represent features of this page.
export function updatePageClasses() {
  const body = document.querySelector("body");
  if (!body) return;

  // Note screen size with class.
  body.classList.remove("small", "medium", "large");
  body.classList.add(state.thisPage.screenSize);

  // This needs to run on donation pages and thanks pages.
  if (typeof state.detectedCountry !== "undefined") {
    if (typeof state.detectedCountry.code !== "undefined" && state.detectedCountry.code) {
      utils.removeClassByPrefix(body, "is-detected-country");
      body.classList.add(
        `is-detected-country-${state.detectedCountry.code.toLowerCase()}`
      );
    }
  }

  if (state.thisPage.isThanksPage) {
    // On thanks pages, we need to mark whether the gift was one-time or monthly.
    if (state.thisPage.isOneTimeGift) {
      body.classList.add("is-one-time-gift");
    }
    if (state.thisPage.isMonthlyGift) {
      body.classList.add("is-monthly-gift");
    }
  } else {
    // Set the following flags only on donation pages, not thanks pages.
    // Update the one-time/monthly selected flag.
    if (typeof state.thisPage.isMonthlySelected !== "undefined") {
      if (state.thisPage.isMonthlySelected) {
        body.classList.remove("is-one-time-selected");
        body.classList.add("is-monthly-selected");
      } else {
        body.classList.remove("is-monthly-selected");
        body.classList.add("is-one-time-selected");
      }
    }

    // Update the payment source selected flag.
    if (typeof state.thisPage.paymentSourceSelected !== "undefined") {
      body.classList.remove("is-payment-credit");
      body.classList.remove("is-payment-bank");
      body.classList.remove("is-payment-paypal");
      body.classList.remove("is-payment-apple-pay");
      state.thisPage.isApplePaySelected = undefined;
      if (state.thisPage.paymentSourceSelected === "credit") {
        body.classList.add("is-payment-credit");
      } else if (state.thisPage.paymentSourceSelected === "bank") {
        body.classList.add("is-payment-bank");
      } else if (state.thisPage.paymentSourceSelected === "paypal") {
        body.classList.add("is-payment-paypal");
      } else if (state.thisPage.paymentSourceSelected === "apple pay") {
        state.thisPage.isApplePaySelected = true;
        body.classList.add("is-payment-apple-pay");
      }
    }

    // Mark the page if it's a tribute form.
    if (typeof state.thisPage.formType !== "undefined") {
      body.classList.add(`form-type-${state.thisPage.formType}`);
    }

    // Mark the page if Apple Pay payment type is present.
    if (typeof state.thisPage.hasApplePayPaymentType !== "undefined" &&
      state.thisPage.hasApplePayPaymentType) {
      body.classList.add("has-apple-pay-payment-type");
    }

    // Mark the page if Apple Pay is actually enabled.
    if (typeof state.thisPage.isApplePayEnabled !== "undefined" &&
      state.thisPage.isApplePayEnabled) {
      body.classList.add("is-apple-pay-enabled");
    }

    // Update the selected-currency flag.
    if (typeof state.thisPage.selectedCurrency !== "undefined") {
      body.classList.remove(
        "is-currency-aud",
        "is-currency-cad",
        "is-currency-eur",
        "is-currency-gbp",
        "is-currency-usd"
      );
      body.classList.add(
        `is-currency-${state.thisPage.selectedCurrency.toLowerCase()}`
      );
    }

    if (typeof state.thisPage.selectedCountry !== "undefined") {
      utils.removeClassByPrefix(body, "is-selected-country");
      const countryToken = utils.removeSpaces(state.thisPage.selectedCountry.toLowerCase());
      body.classList.add(`is-selected-country-${countryToken}`);
    }

    if (state.thisPage.hidePremium) {
      body.classList.add("is-hidden-premium");
    }

    if (typeof state.thisPage.isTributeGiftSelected !== "undefined") {
      body.classList.remove("is-tribute-gift-selected");

      if (state.thisPage.isTributeGiftSelected) {
        body.classList.add("is-tribute-gift-selected");
      }
    }
  }

  // These classes get added on page load only.
  if (!state.thisPage.pageLoadBodyClassesAdded) {
    if (state.thisPage.isErrorPage) {
      body.classList.add("is-error-page");
    }

    if (state.thisPage.isThanksPage) {
      body.classList.add("is-thanks-page");
    }

    if (state.thisPage.isUKForm) {
      body.classList.add("is-uk-form");
    }

    if (state.thisPage.isCAForm) {
      body.classList.add("is-ca-form");
    }

    if (state.thisPage.isFriendsHSIForm) {
      body.classList.add("is-friends-hsi-form");
    }

    if (state.thisPage.isFrench) {
      body.classList.add("is-lang-french");
    }

    if (state.thisPage.useLogoIndia) {
      body.classList.add("use-logo-india");
    }

    if (state.thisPage.useLogoUK) {
      body.classList.add("use-logo-uk");
    }

    if (typeof state.thisPage.splashPageName !== "undefined") {
      body.classList.add(`splash-${state.thisPage.splashPageName}`);
    }

    if (typeof state.thisPage.isSymbolicGivingPage !== "undefined" &&
      state.thisPage.isSymbolicGivingPage) {
      body.classList.add("is-symbolic-giving-page");
    }

    if (state.thisPage.isEcardDonation) {
      body.classList.add("is-ecard-donation");
    }

    if (state.thisPage.isEcardDonationProcessor) {
      body.classList.add("is-ecard-donation-processor");
    }

    if (state.thisPage.isTributeCombo) {
      body.classList.add("is-tribute-combo");
    }

    if (state.thisPage.isCobrandedHSUSHSI) {
      body.classList.add("is-cobranded-hsus-hsi");
    }

    if (state.thisPage.hideUKDirectDebitLink) {
      body.classList.add("hide-uk-direct-debit-link");
    }

    if (state.thisPage.isHSUSWebSiteSignup) {
      body.classList.add("is-hsus-web-site-signup");
    }

    if (state.thisPage.isHSIWebSiteSignup) {
      body.classList.add("is-hsi-web-site-signup");
    }

    // Remember that we've added classes on page load.
    state.thisPage.pageLoadBodyClassesAdded = true;
  }
}

// Uses JS matchMedia to get screen size.
function getScreenSize() {
  // Use large as default.
  let screenSize = "large";
  if (typeof window.matchMedia !== "undefined") {
    const checkLarge = window.matchMedia("(min-width: 1025px)");
    const checkMedium = window.matchMedia("(min-width: 768px) and (max-width: 1024px)");
    const checkSmall = window.matchMedia("(max-width: 767px)");
    if (checkLarge.matches) {
      screenSize = "large";
    }
    if (checkMedium.matches) {
      screenSize = "medium";
    }
    if (checkSmall.matches) {
      screenSize = "small";
    }
  }
  return screenSize;
}

// Listens for resize changes and updates screenSize flag.
function watchScreenSize() {
  // Set screenSize on first load.
  state.thisPage.screenSize = getScreenSize();
  window.addEventListener("resize", function() {
    // Update screen size.
    state.thisPage.screenSize = getScreenSize();
    updateLayout();
  }, false);
}

// Catch-all function to rework layout on size change.
function updateLayout() {
  // Mark the body tag with flags related to page size and layout.
  updatePageClasses();

  // Fire an event telling the page that Enya has updated the layout.
  // This allows other components to hook into this.
  const enyaLayoutUpdated = new Event("enyaLayoutUpdated");
  document.dispatchEvent(enyaLayoutUpdated);
}

function initScrollToAmountSection() {
  document.addEventListener("enyaReady", function() {
    if (state.activeURLParams?.stas === "1" &&
        state.thisPage?.screenSize !== "large"
    ) {
      const amountSection = document.querySelector(
        ".en__component.form-column"
      );
      if (amountSection) {
        setTimeout(() => {
          amountSection.scrollIntoView(
            {
              block: "start",
              behavior: "smooth"
            }
          );
        }, 1000);
      }
    }
  });
}

// Utility functions that other components can use.
// Note that these functions can take arrays of class names too.
export function addClassToBody(classToAdd) {
  const body = document.querySelector("body");
  if (!body) return;
  utils.addClass(body, classToAdd);
}

export function removeClassFromBody(classToRemove) {
  const body = document.querySelector("body");
  if (!body) return;
  utils.removeClass(body, classToRemove);
}
