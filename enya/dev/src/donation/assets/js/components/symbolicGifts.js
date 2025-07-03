/*
 * symbolicGifts.js
 * HSUS Engaging Networks Forms - Enya 2021
 * Created: Fall 2021
 * Purpose: Manage all the behaviors on symbolic gifts pages.
 */

import * as utils from "utils/utilities";
import state from "commonComponents/stateManager";
import * as storageHelpers from "commonHelpers/storageHelpers";
import * as validationHelpers from "commonHelpers/validationHelpers";

let totalDonationAmount = 0;
let selectedGiftItems = [];
let additionalAmountField;

export function init() {
  initQuantityListeners();
  initAdditionalAmountField();
  initSymbolicGiftsValidation();
  // Allow some time for Apple Pay to become enabled, then update the layout.
  setTimeout(() => {
    if (state.thisPage.isApplePayEnabled) {
      updateLayoutForApplePay();
    }
  }, 3000);
}

function initQuantityListeners() {
  const quantityInputs = document.querySelectorAll(".gift-quantity-input");
  const decreaseButtons = document.querySelectorAll(".btn-decrease");
  const increaseButtons = document.querySelectorAll(".btn-increase");

  if (quantityInputs) {
    quantityInputs.forEach(function (thisInput) {
      thisInput.addEventListener("input", function (event) {
        handleQuantityChange(event.target, "input");
      });
      thisInput.addEventListener("blur", function (event) {
        if (thisInput.value === "") {
          thisInput.value = 0;
        }
      });
      thisInput.addEventListener("focus", function (event) {
        if (thisInput.value === "0") {
          thisInput.value = "";
        }
      });
    });
  }

  if (decreaseButtons) {
    decreaseButtons.forEach(function (thisButton) {
      thisButton.addEventListener("click", function (event) {
        handleQuantityChange(event.target, "decrease");
      });
    });
  }

  if (increaseButtons) {
    increaseButtons.forEach(function (thisButton) {
      thisButton.addEventListener("click", function (event) {
        handleQuantityChange(event.target, "increase");
      });
    });
  }
}

function handleQuantityChange(thisInput, changeType = "") {
  if (!thisInput) return;
  const thisCard = thisInput.closest(".gift-card");
  if (!thisCard) return;
  const thisQuantityElement = thisCard.querySelector(".gift-quantity-input");
  if (!thisQuantityElement) return;
  const thisItemID = thisCard.getAttribute("data-item-id");
  const thisItemAmount = parseInt(thisCard.getAttribute("data-item-amount"), 10);
  let thisQuantityAmount = parseInt(thisQuantityElement.value, 10);
  if (isNaN(thisQuantityAmount)) {
    thisQuantityAmount = 0;
  }

  if (changeType === "decrease") {
    if (thisQuantityAmount !== 0) {
      thisQuantityAmount--;
      if (thisItemID) {
        updateItemQuantity(thisItemID, thisQuantityAmount);
      }
    }
    thisQuantityElement.value = thisQuantityAmount;
  }

  if (changeType === "increase") {
    thisQuantityAmount++;

    // Limit quantities to 2 digits.
    if (thisQuantityAmount > 99) {
      thisQuantityAmount = 99;
    }
    thisQuantityElement.value = thisQuantityAmount;
    if (thisItemID) {
      updateItemQuantity(thisItemID, thisQuantityAmount);
    }
    launchHeart(thisCard);
  }

  if (changeType === "input") {
    if (thisInput.value !== "") {
      thisInput.value = isNaN(Math.abs(thisInput.value)) ?
        0 :
        Math.abs(thisInput.value);
      if (thisInput.value !== "0") {
        launchHeart(thisCard);
      }
    }

    if (thisItemID) {
      updateItemQuantity(thisItemID, thisQuantityAmount);
    }
  }

  const thisItemTotalElement = thisCard.querySelector(".gift-item-total-amount");
  if (thisItemTotalElement) {
    thisItemTotalElement.textContent = utils.formatAmountUS(parseInt(thisQuantityAmount * thisItemAmount));
  }

  updateTotal();
}

function initAdditionalAmountField() {
  additionalAmountField = document.querySelector("input.gift-additional-amount");
  if (!additionalAmountField) return;

  // Add change listeners.
  additionalAmountField.addEventListener("blur", function (event) {
    handleAdditionalAmountChange(event.target);
    validationHelpers.validate(event.target);
  });
  additionalAmountField.addEventListener("focus", function (event) {
    if (additionalAmountField.value === "0") {
      additionalAmountField.value = "";
    }
  });
}

function handleAdditionalAmountChange(amountField) {
  if (!amountField) return;
  let thisAmount = 0;
  const thisCard = amountField.closest(".gift-card");
  const thisItemID = thisCard.dataset.itemId;

  thisAmount = parseFloat(utils.removeDollarSigns(amountField.value));
  if (isNaN(thisAmount) || thisAmount < 0) {
    amountField.value = "";
    thisAmount = 0;
  } else {
    amountField.value = parseDonationAmount(amountField.value);
    if (thisAmount > 0) {
      launchHeart(thisCard);
    }
  }
  setItemQuestionValue(thisItemID);
  saveAdditionalAmountToStorage(thisAmount);
  updateTotal();
}

// This function polls each item to get its current total, then sums them all.
function updateTotal() {
  totalDonationAmount = 0;
  const totalAmountSpan = document.querySelector(".total-amount");
  const donationAmountField = document.querySelector(
    "[name='transaction.donationAmt.other']"
  );
  const itemTotalElements = document.querySelectorAll(".gift-item-total-amount");
  if (itemTotalElements) {
    itemTotalElements.forEach(function (thisItemTotal) {
      let sanitizedItemTotal = parseInt(
        thisItemTotal.textContent.replace(/\$|,/g, ""), 10
      );
      if (isNaN(sanitizedItemTotal)) {
        sanitizedItemTotal = 0;
      }
      totalDonationAmount += sanitizedItemTotal;
    });
  }

  // Now add the additional amount.
  if (additionalAmountField) {
    const additionalAmount = parseFloat(additionalAmountField.value);
    if (!isNaN(additionalAmount) && additionalAmount > 0) {
      totalDonationAmount += additionalAmount;
    }
  }

  if (totalDonationAmount < 0) {
    totalDonationAmount = 0;
  }
  if (totalAmountSpan) {
    totalAmountSpan.textContent = utils.formatAmountUS(totalDonationAmount);
  }

  if (donationAmountField) {
    donationAmountField.value = totalDonationAmount;
    if (state.thisPage.amountObject) {
      state.thisPage.amountObject.setAmount(totalDonationAmount);
    }
  }
}

function updateItemQuantity(itemID, itemQuantity = 0) {
  if (!itemID) return;
  const thisItem = selectedGiftItems.find(item => item.id === itemID);

  if (thisItem) {
    if (itemQuantity === 0) {
      // Remove the item from the array.
      selectedGiftItems = selectedGiftItems.filter(item => item.id !== itemID);
    } else {
      thisItem.quantity = itemQuantity;
      // Need a delay here to allow DOM to update first.
      setTimeout(() => {
        thisItem.total = getTotalForItemID(itemID);
      }, 500);
    }
  } else {
    if (itemQuantity !== 0) {
      // Need a delay here to allow total to update in DOM first.
      setTimeout(() => {
        // If the item isn't found, add it.
        selectedGiftItems.push({
          id: itemID,
          name: getItemName(itemID),
          quantity: itemQuantity,
          total: getTotalForItemID(itemID)
        });
      }, 500);
    }
  }

  // Save the item total to the corresponding hidden question.
  setItemQuestionValue(itemID);

  // Same DOM-related delay needed here.
  setTimeout(() => {
    // Save to session storage.
    saveSelectedItemsToStorage();
  }, 1000);
}

function saveSelectedItemsToStorage() {
  if (!selectedGiftItems) return;
  if (!storageHelpers.isSessionStorageEnabled()) return;
  try {
    sessionStorage.setItem("selectedItems", JSON.stringify(selectedGiftItems));
  } catch (error) {
    console.log(
      "🚀 ~ file: symbolicGifts.js:255 ~ saveSelectedItemsToStorage: sessionStorage not available."
    );
    console.log(error);
  }
}

function getSelectedItemsFromStorage() {
  let storedItems;
  if (!storageHelpers.isSessionStorageEnabled()) return;
  try {
    storedItems = JSON.parse(sessionStorage.getItem("selectedItems"));
  } catch (error) {
    console.log(
      "🚀 ~ file: symbolicGifts.js:268 ~ getSelectedItemsFromStorage: sessionStorage not available."
    );
    console.log(error);
  }
  return storedItems;
}

function saveAdditionalAmountToStorage(amount = 0) {
  if (!storageHelpers.isSessionStorageEnabled()) return;
  try {
    sessionStorage.setItem("additionalAmount", amount);
  } catch (error) {
    console.log(
      "🚀 ~ file: symbolicGifts.js:281 ~ saveAdditionalAmountToStorage: sessionStorage not available."
    );
    console.log(error);
  }
}

function getAdditionalAmountFromStorage() {
  let additionalAmount;
  if (!storageHelpers.isSessionStorageEnabled()) return;
  try {
    additionalAmount = sessionStorage.getItem("additionalAmount");
  } catch (error) {
    console.log(
      "🚀 ~ file: symbolicGifts.js:294 ~ getAdditionalAmountFromStorage: sessionStorage not available."
    );
    console.log(error);
  }
  return additionalAmount;
}

function launchHeart(card) {
  if (!card) return;
  // Disable the animation if user prefers reduced motion.
  if (utils.userPrefersReducedMotion()) return;
  let targetParent, heartTarget;
  // Choose target and parent based on whether this is a regular card
  // or the additional amount card.
  if (card.classList.contains("card-additional-amount")) {
    targetParent = card.querySelector(".additional-amount-field");
    heartTarget = card.querySelector(".gift-additional-amount");
  } else {
    targetParent = card.querySelector(".gift-item-total-header");
    heartTarget = card.querySelector(".gift-item-total-amount");
  }
  const heartElement = utils.stringToHTML(getHeartMarkup());
  if (heartTarget) {
    // Append heart before the target.
    targetParent.insertBefore(heartElement, heartTarget.nextSibling);

    // Remove the element after a delay.
    setTimeout(() => {
      heartElement.remove();
    }, 3000);
  }
}

function getHeartMarkup() {
  const heartMarkup = `
    <div class="heart-holder heart-y-move-enter heart-y-move-enter-active heart-y-move-enter-to">
        <div class="heart-x-move">
          <svg width="13" height="11" viewBox="0 0 13 11" fill="none"
            xmlns="http://www.w3.org/2000/svg" class="d-block">
            <path d="M6.5 11c12.032-6.627 4.522-14.214 0-9.57C1.978-3.213-5.532 4.374 6.5 11z" fill="#EF5350"></path>
            <path d="M4.158.08C.055-.777-3.579 5.447 6.5 11c.26-.144.512-.288.755-.433C-.692 5.837.962.77 4.158.08z"
              fill="#D44A47"></path>
          </svg>
        </div>
      </div>
  `;
  return heartMarkup;
}

function initSymbolicGiftsValidation() {
  if (additionalAmountField) {
    // Add custom validation for additional amount field.
    validationHelpers.setValidationForOtherAmount(additionalAmountField);
  }

  // Use EN's callback to do custom validation.
  // But don't overwrite existing function.
  if (typeof window.enOnValidate === "function") {
    const oldOnValidate = window.enOnValidate;
    window.enOnValidate = () => {
      return oldOnValidate() && handleENValidateEvent();
    };
  } else {
    window.enOnValidate = handleENValidateEvent;
  }
}

// This function fires after the enOnValidate event happens. More here:
// https://www.engagingnetworks.support/knowledge-base/javascript-page-hooks-for-page-submit-validations-and-errors/
function handleENValidateEvent() {
  // The user can leave all items unselected and just enter an additional amount.
  // TODO: Try to refactor and simplify this function.
  // We use the flags below to keep track of what's what.
  let isQuantityZero = false;
  let isAdditionalAmountZero = false;
  let isPageAllZeroes = false;
  let isAdditionalAmountLessThanFive = false;
  let isAdditionalAmountValid = false;
  let isPageValid = false;

  // If no items have been selected, that's OK. So quantity is always valid.
  const totalQuantitySelected = selectedGiftItems.length;
  if (!totalQuantitySelected) {
    isQuantityZero = true;
  }

  // Make sure additional amount field is valid. It can be empty,
  // or set to zero. But it can't have invalid text.
  if (additionalAmountField.value === "0" ||
    additionalAmountField.value === "") {
    isAdditionalAmountZero = true;
    isAdditionalAmountValid = true;
  } else {
    isAdditionalAmountZero = false;

    // validateAdditionalAmount will return true or false.
    isAdditionalAmountValid = validateAdditionalAmount();
  }

  isPageAllZeroes = isQuantityZero && isAdditionalAmountZero;

  if (isPageAllZeroes) {
    // User can't leave both quantity and additional amount empty.
    // Mark the page as invalid, and we're done.
    isPageValid = false;
  } else {
    // If we have at least one quantity selected, or a value in the additional
    // amount, the page is OK if the additional amount field is valid.
    // But if quantity of items selected is zero, the additional amount needs to be at least $5.
    if (isQuantityZero && isAdditionalAmountValid) {
      const additionalAmount = parseFloat(additionalAmountField.value);
      if (!isNaN(additionalAmount) && additionalAmount >= 5) {
        isAdditionalAmountLessThanFive = false;
      } else {
        isAdditionalAmountLessThanFive = true;
      }
      // Reset the validity flag for additional amount now that we've checked the minimum.
      isAdditionalAmountValid = !isAdditionalAmountLessThanFive && isAdditionalAmountValid;
    }
    isPageValid = isAdditionalAmountValid;
  }

  if (isPageValid) {
    hidePageErrorContainer();
  } else {
    insertPageError();
    showPageErrorContainer();
  }

  return isPageValid;
}

function validateAdditionalAmount() {
  validationHelpers.validate(additionalAmountField);
  return true;
}

function insertPageError() {
  const errorMessage = "<li class='at-least-one'>Please select at least one gift item or enter your own gift amount ($5 minimum).</li>";
  const errorMessageElement = utils.stringToHTML(errorMessage);
  const enErrorList = document.querySelector(".en__errorList");
  if (enErrorList && !enErrorList.querySelector(".at-least-one")) {
    enErrorList.append(errorMessageElement);
  }
}

function showPageErrorContainer() {
  document.querySelector("body").classList.add("is-error-page");
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
}

function hidePageErrorContainer() {
  document.querySelector("body").classList.remove("is-error-page");
}

// Convert donation amount input value to number.
// Returns "" if amount is zero.
// Note that we have to call removeCommas twice: once before we convert to
// Number—because Number returns NaN if string has a comma—and then again after
// getting the formatted amount.
function parseDonationAmount(amount = "") {
  amount = utils.removeDollarSigns(amount);
  amount = utils.removeCommas(amount);
  amount = utils.removeSpaces(amount);
  let parsedAmount = Number(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return "";
  } else {
    // Get the formatted amount with no dollar sign.
    parsedAmount = utils.formatAmountUS(parsedAmount, true);
    parsedAmount = utils.removeCommas(parsedAmount);
  }
  return parsedAmount;
}

function setItemQuestionValue(itemID) {
  // We need to add a delay to this entire function, to allow the DOM to update 
  // first.
  setTimeout(() => {
    // Find the corresponding question field selector for this itemID.
    const thisItemCard = document.querySelector(
      `.gift-card[data-item-id='${itemID}']`
    );
    if (thisItemCard) {
      const thisItemTotalElement = thisItemCard.querySelector(".gift-item-total-amount");
      // Get a handle to the question field itself.
      const thisItemQuestionFieldSelector = thisItemCard.dataset.itemQuestionField;
      const thisItemQuestionField = document.querySelector(thisItemQuestionFieldSelector);
      if (thisItemQuestionField) {
        const thisItemQuestionInput = thisItemQuestionField.querySelector("input");
        if (thisItemQuestionInput) {
          // Set the value of the question field to the value shown in the UI.
          if (thisItemTotalElement) {
            thisItemQuestionInput.value = thisItemTotalElement.textContent;
          } else {
            // If there's no total element, we must be in the other amount
            // card. Read the value of that field for the question content.
            const thisOtherAmountField = thisItemCard.querySelector(".gift-additional-amount");
            if (thisOtherAmountField) {
              if (thisOtherAmountField.value === "") {
                thisItemQuestionInput.value = "$0";
              } else {
                thisItemQuestionInput.value = "$" + thisOtherAmountField.value;
              }
            }
          }
        }
      }
    }
  }, 500);
}

function getTotalForItemID(itemID) {
  let itemTotal = "$0";
  const thisItemCard = document.querySelector(
    `.gift-card[data-item-id='${itemID}']`
  );
  if (thisItemCard) {
    const thisItemTotalElement = thisItemCard.querySelector(
      ".gift-item-total-amount"
    );
    if (thisItemTotalElement) {
      itemTotal = thisItemTotalElement.textContent;
    }
  }
  return itemTotal;
}

function getItemName(itemID) {
  let itemName = "";
  const thisItemCard = document.querySelector(
    `.gift-card[data-item-id='${itemID}']`
  );
  if (thisItemCard) {
    itemName = thisItemCard.dataset.itemName;
  }
  return itemName;
}

// When Apple Pay is enabled, create one central column for all checkout fields.
function updateLayoutForApplePay() {
  const submitBlock = document.querySelector(
    ".submit-section-block"
  );
  // This is the left-hand column on desktop. It's the original parent of the
  // your-information-related blocks.
  const yourInfoColumn = document.querySelector(
    ".symbolic-gifts-your-information-section"
  );
  // The right-hand column on desktop. It's the original parent of the
  // payment-related blocks.
  const paymentColumn = document.querySelector(
    ".symbolic-gifts-payment-section"
  );
  if (!submitBlock || !yourInfoColumn || !paymentColumn) return;

  yourInfoColumn.append(submitBlock);
  paymentColumn.remove();
}
