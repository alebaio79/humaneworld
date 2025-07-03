/*
* tribute.js
* HSUS Engaging Networks Forms - Enya 2021
* Created: Winter 2021
* Purpose: Manager of special modifications needed for tribute forms: memorial and gift donation.
*/

import state from "commonComponents/stateManager";
import * as pageManager from "commonComponents/pageManager";
import * as utils from "utils/utilities";
import * as characterCounter from "commonComponents/characterCounter";
import * as ecardDonation from "./ecardDonation";

let tributeCheckbox;
let tributeOptionsField;
let printOrEcardField;
let inMemoriamField;
let cardChoicesContainer;
let cardChoices;

export function init() {
  initInMemoriamField();
  if (isTributeForm()) {
    initTributeOptions();
    initCardChoicesContainer();
    initTributeCheckbox();
    initPrintOrEcardField();
    initCharacterCounter();
    state.thisPage.formType = "tribute";
    pageManager.updatePageClasses();
  };
}

function initInMemoriamField() {
  inMemoriamField = document.querySelector(
    "input[name='transaction.inmem']"
  );
}

// Find the In Memoriam hidden field. If it's there, this is a tribute form, no
// matter what its value.
function isTributeForm() {
  if (inMemoriamField) {
    return true;
  } else {
    return false;
  }
}

function initTributeCheckbox() {
  tributeCheckbox = document.querySelector(
    ".en__field--is-tribute-gift input[type=checkbox]"
  );
  if (!tributeCheckbox) return;

  // Grab a handle to the checkbox label field. One selector is for HSUS, the
  // other is for HSI. Only one will appear on any page.
  const tributeCheckboxLabel = document.querySelector(
    "label[for=en__field_supporter_questions_1464718], label[for=en__field_supporter_questions_1441669]"
  );
  if (tributeCheckboxLabel) {
    tributeCheckboxLabel.classList.add("tribute-checkbox-label");
    if (state.thisPage.isHSI) {
      tributeCheckboxLabel.textContent = "Customize your e-card";
    }
  }

  tributeCheckbox.classList.add("tribute-checkbox");
  tributeCheckbox.closest(".en__field--is-tribute-gift")
    .classList.add("visible-opt-in");

  tributeCheckbox.addEventListener("change", function(e) {
    if (e.target.checked) {
      state.thisPage.isTributeGiftSelected = true;
      updateInMemoriamField("Y");
      showCardChoices();
    } else {
      state.thisPage.isTributeGiftSelected = false;
      updateInMemoriamField("N");
      hideCardChoices();
    }
    pageManager.updatePageClasses();
  });

  tributeCheckbox.dispatchEvent(new Event("change"));
}

function initTributeOptions() {
  tributeOptionsField = document.querySelector(".en__field--trbopts");
  const tributeOptionsRadios = document.querySelectorAll(
    "input[name='transaction.trbopts']"
  );
  if (tributeOptionsRadios) {
    tributeOptionsRadios.forEach((elem) => {
      elem.addEventListener("change", handleTributeOptionsChange);
      // Trigger change on page load, so we'll show the correct card choices.
      if (elem.checked) {
        // We need a bit of a delay here to allow the card choices to set
        // themselves up first.
        setTimeout(() => {
          elem.dispatchEvent(new Event("change"));
        }, 250);
      }
    });
  }
}

function handleTributeOptionsChange(event) {
  const thisRadio = event.target;
  let cardTypeChoiceValue = thisRadio.value;
  if (cardTypeChoiceValue === "IN_HONOR_OF") {
    cardTypeChoiceValue = "gift";
  } else if (cardTypeChoiceValue === "IN_MEMORY_OF") {
    cardTypeChoiceValue = "sympathy";
  }
  const cardType = cardTypeChoiceValue.toLowerCase() +
    `-${state.thisPage.isHSI ? "hsi" : "hsus"}`;
  toggleCardChoices(cardType);
}

function toggleCardChoices(cardType = "gift-hsus") {
  if (!cardChoices) return;
  let activeAdded = false;
  cardChoices.forEach(thisChoice => {
    if (thisChoice.getAttribute("data-tribute-card-type") !== cardType) {
      thisChoice.classList.add("hidden");
      thisChoice.classList.remove("thumb-active");
    } else {
      thisChoice.classList.remove("hidden");
      if (!activeAdded) {
        thisChoice.classList.add("thumb-active");
        const thisCardId = thisChoice.getAttribute("data-tribute-card-id");
        if (thisCardId) {
          ecardDonation.updateEcardSelect(thisCardId);
        }
        activeAdded = true;
      }
    }
  });
}

function initPrintOrEcardField() {
  printOrEcardField = document.querySelector(
    ".en__field--tribute-print-or-ecard"
  );

  // Add heading above this field.
  const headerHTML = "<h4 class='print-ecard-header'>Delivery options</h4>";

  if (printOrEcardField) {
    printOrEcardField.before(utils.stringToHTML(headerHTML));
  }
}

function updateInMemoriamField(value = "") {
  if (!inMemoriamField) return;

  inMemoriamField.value = value;
}

function initCardChoicesContainer() {
  cardChoicesContainer = document.querySelector(
    ".tribute-card-choices-container"
  );
  if (!cardChoicesContainer) return;

  cardChoices = cardChoicesContainer.querySelectorAll(".tribute-card-thumb");

  if (cardChoices) {
    cardChoices.forEach(function(thisChoice) {
      thisChoice.addEventListener("click", function(e) {
        cardChoices.forEach(choice => {
          if (choice === this) {
            choice.classList.add("thumb-active");
            const thisCardId = choice.getAttribute("data-tribute-card-id");
            if (thisCardId) {
              ecardDonation.updateEcardSelect(thisCardId);
            }
          } else {
            choice.classList.remove("thumb-active");
          }
        });
      });
    });
  }

  // Move up under honoree name field.
  const honoreeNameField = document.querySelector(".en__field--honname");
  if (honoreeNameField) {
    honoreeNameField.after(cardChoicesContainer);
  }
}

function showCardChoices() {
  if (!cardChoicesContainer) return;
  cardChoicesContainer.classList.remove("hidden-except-pb");
}

function hideCardChoices() {
  if (!cardChoicesContainer) return;
  cardChoicesContainer.classList.add("hidden-except-pb");
}

function initCharacterCounter() {
  const maxCount = 100;
  const messageField = document.querySelector("#en__field_transaction_gftrsn");
  if (!messageField) return;
  characterCounter.init(messageField, maxCount);
}
