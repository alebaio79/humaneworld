/*
* thanksManager.js
* HSUS Donation Forms - Enya 2021
* Enya Thanks Page Manager
* Created: Spring 2021
* Purpose: Handle anything that needs doing on the thanks page.
*/

import state from "commonComponents/stateManager";
import * as utils from "utils/utilities";
import * as pageManager from "commonComponents/pageManager";
import * as storageHelpers from "commonHelpers/storageHelpers";
import * as ecardDonation from "./ecardDonation";
import * as sharingManager from "./sharingManager";
import * as header from "./header";
import * as footer from "./footer";
import * as applePay from "./applePay";

export function init() {
  ecardDonation.init();
  sharingManager.init();
  header.init();
  footer.init();
  // To be safe, delete the Apple Pay token from session storage, if it's there.
  applePay.removeTokenFromStorage();
  initTransactionSummary();
  clearSessionStorage();
}

function initTransactionSummary() {
  detectOneTimeOrMonthly();
  hideEmptyEntries();
}

// Decode the hidden transaction type token to determine if this is a one-time
// or a monthly gift. This function saves its result to state and triggers
// an update to the body classes.
function detectOneTimeOrMonthly() {
  const transactionTypeToken = getTransactionTypeToken();
  const giftFrequency = isTokenOneTimeOrMonthly(transactionTypeToken);
  if (giftFrequency === "one-time") {
    state.thisPage.isOneTimeGift = true;
    state.thisPage.isMonthlyGift = false;
  } else if (giftFrequency === "monthly") {
    state.thisPage.isOneTimeGift = false;
    state.thisPage.isMonthlyGift = true;
  }

  // Add classes to the body element to reflect the gift frequency.
  pageManager.updatePageClasses();
}

// EN spits out an arcane keyword in the transaction type field (aka
// {receipt_data~type}). Get the word so we can decode it elsewhere.
function getTransactionTypeToken() {
  const transactionTypeEntry = document.querySelector(
    ".transaction-summary-entry.entry-transaction-type"
  );
  if (!transactionTypeEntry) return;
  const transactionTypeValueSpan = transactionTypeEntry.querySelector(
    ".entry-value"
  );
  if (!transactionTypeValueSpan) return;
  const transactionTypeToken = transactionTypeValueSpan.textContent.trim();
  return transactionTypeToken;
}

// Decode whether a transaction type token represents one-time or monthly.
function isTokenOneTimeOrMonthly(transactionTypeToken) {
  if (!transactionTypeToken) return "";
  let giftFrequency = "";
  switch (transactionTypeToken) {
    case "CREDIT_SINGLE":
    case "BANK_SINGLE":
      giftFrequency = "one-time";
      break;
    // Monthly credit card and bank donations are RECUR_UNMANAGED.
    // Monthly PayPal donations are CREDIT_RECURRING.
    case "RECUR_UNMANAGED":
    case "CREDIT_RECURRING":
      giftFrequency = "monthly";
      break;
    default:
      break;
  }

  return giftFrequency;
}

// In the gift summary, we don't want to show blank items.
function hideEmptyEntries() {
  // If the Address 2 entry is empty, hide it.
  hideEntryIfEmpty(".entry-address-2");

  // If the Honoree Name entry is empty, hide it.
  // This applies to tribute forms only.
  // Memorial forms have an honoree name; gift donation forms do not.
  hideEntryIfEmpty(".entry-honoree-name");
}

function hideEntryIfEmpty(entrySelector) {
  const entryElement = document.querySelector(
    `.transaction-summary-entry${entrySelector}`
  );
  if (!entryElement) return;
  const entryValueSpan = entryElement.querySelector(".entry-value");
  if (!entryValueSpan) return;

  if (utils.isEmpty(entryValueSpan)) {
    entryElement.classList.add("hidden");
  }
}

// Remove all items that begin with "enya".
function clearSessionStorage() {
  if (!storageHelpers.isSessionStorageEnabled()) return;
  try {
    for (const key in sessionStorage) {
      if (key.indexOf("enya") === 0) {
        sessionStorage.removeItem(key);
      }
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: thanksManager.js:124 ~ clearSessionStorage: sessionStorage not available."
    );
    console.log(error);
  }
}
