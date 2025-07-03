/*
* premiumManager.js
* HSUS Donation Forms - Enya 2021
* Enya Premium Controller
* Created: Winter 2019
* Purpose: Manage activity related to the premiums on Enya forms.
*/

import * as utils from "utils/utilities";
import state from "commonComponents/stateManager";
import * as pageManager from "commonComponents/pageManager";

// Handle to this section in DOM.
let premiumSection;

// Array of EN products offered on this page.
let premiumProducts;

export function init() {
  initPremiumSection();
  initObservers();
  initPremiumProducts();
}

// Get handle to premium section on form.
function initPremiumSection() {
  premiumSection = document.querySelector(".en__component--premiumgiftblock");

  // If there's no premium section, call saveSelectedPremium here.
  // It will fill the hidden QMR named Premium Selection with a value of "None".
  // When there's no premium section, no other functions in this component will
  // fire.
  if (!premiumSection) {
    saveSelectedPremium();
  } else if (state.activeURLParams.hp === "1") {
    // We're testing hiding the premium.
    // Remember this setting, because we'll need to adjust the premium block's
    // behavior each time the user switches between one-time and monthly.
    state.thisPage.hidePremium = true;
    pageManager.updatePageClasses();
    hidePremiumSection();
  }
}

// Kick off the Mutation Observers we need for responding to changes that
// EN's premium JS makes. That EN JS removes and adds elements to the DOM
// every time the premium section appears and disappears.
function initObservers() {
  startPremiumBlockObserver();
  startProductVariantObserver();
}

// Start a mutation observer for the premium block section.
function startPremiumBlockObserver() {
  if (!premiumSection) return;

  const premiumBlockObserver = new MutationObserver(handlePremiumMutations);
  const premiumBlockObserverOptions = { attributes: true, childList: false, subtree: false };
  premiumBlockObserver.observe(premiumSection, premiumBlockObserverOptions);
}

// Start a mutation observer for the premium pgList section.
// We don't start this on load. The premium block mutation handler starts it.
function startPgListObserver() {
  const pgListElement = premiumSection.querySelector(".en__pgList");
  if (!pgListElement) return;

  const pgListObserver = new MutationObserver(handlePremiumMutations);
  const pgListObserverOptions = { attributes: true, childList: true, subtree: true };
  pgListObserver.observe(pgListElement, pgListObserverOptions);
}

// Start a mutation observer for the size dropdown.
// We don't start this on page load. The product variant mutation handler
// starts it.
function startVariantSelectObserver() {
  const variantSelect = premiumSection.querySelector(".en__pg__optionType");
  if (!variantSelect) return;

  const variantSelectObserver = new MutationObserver(handlePremiumMutations);
  const variantSelectObserverOptions = { attributes: true, childList: true, subtree: true };
  variantSelectObserver.observe(variantSelect, variantSelectObserverOptions);
}

// Kick off the observer for the hidden product variant input.
// That input changes value whenever the premium selection changes.
// We can't use a simple change event handler because hidden inputs do not
// fire events.
function startProductVariantObserver() {
  if (!premiumSection) return;

  const productVariantElement = premiumSection.querySelector(".en__pgVariantSubmit");
  if (!productVariantElement) return;

  const productVariantObserver = new MutationObserver(handlePremiumMutations);
  const productVariantObserverOptions = { attributes: true, childList: false, subtree: false };
  productVariantObserver.observe(productVariantElement, productVariantObserverOptions);
}

// When the user clicks on the variant dropdown, trigger a click on the nearby
// radio.
function addVariantChangeListener() {
  if (!premiumSection) return;

  const variantSelect = premiumSection.querySelector(".en__pg__optionType select");

  if (!variantSelect) return;

  // The handler function. Called by the listeners added below.
  const variantChangeHandler = (event) => {
    // Trigger a click on the item radio.
    const productContainer = event.target.closest("div.en__pg");

    if (productContainer) {
      const closestRadio = productContainer.querySelector(
        "input[type=radio][name=en__pg]"
      );
      // Get a handle to the radio button for choosing None for premium.
      const noneRadio = premiumSection.querySelector(
        ".en__pg__select input[date-premium-name=None]"
      );
      if (closestRadio) {
        // Don't click on another radio if None is already selected.
        if (noneRadio && !noneRadio.checked) {
          closestRadio.click();
        }
      }
    }
  };

  ["click", "focus", "change"].forEach(function(e) {
    variantSelect.addEventListener(e, variantChangeHandler);
  });
}

// This is the callback for all Mutation Observers in the premium section.
function handlePremiumMutations(mutationsList, observer) {
  let premiumBlockHasChanged = false;
  let productVariantHasChanged = false;

  mutationsList.forEach(record => {
    const thisTargetNode = record.target;
    premiumBlockHasChanged = thisTargetNode.classList.contains("en__component--premiumgiftblock");
    productVariantHasChanged = thisTargetNode.classList.contains("en__pgVariantSubmit");
  });

  // On page load, the premium block will change, and then we can start
  // observing the premium gift list. That ".en__pgList" element
  // contains the variant select that we also need to watch.
  if (premiumBlockHasChanged) {
    if (state.thisPage.hidePremium) {
      // We need a delay to allow the frequency switcher logic to fire first.
      setTimeout(() => {
        setPremiumToNone();
        // Clear the product variant field.
        clearPremium();
      }, 1000);
    }
    startPgListObserver();
    smartenPremiumRadios();
    saveSelectedPremium();
  }

  // If the hidden product variant has changed, we may need to update the UI.
  if (productVariantHasChanged) {
    smartenPremiumRadios();
    startVariantSelectObserver();
    addVariantChangeListener();
    saveSelectedPremium();
  }
}

// Get the premium data for this page.
function initPremiumProducts() {
  premiumProducts = getPremiumProducts();
}

// Use the window.EngagingNetworks.premiumGifts data to figure out which
// premiums are offered on this page.
function getPremiumProducts() {
  if (typeof window.EngagingNetworks !== "undefined") {
    if (typeof window.EngagingNetworks.premiumGifts !== "undefined") {
      return window.EngagingNetworks.premiumGifts.products;
    }
  }
}

// Add IDs to premium radios.
// Create and insert labels after each premium radio, so we can use fancy
// buttons. This function needs to be called every time the EN JS for premiums
// hides or shows the premium section.
function smartenPremiumRadios() {
  const premiumRadios = premiumSection.querySelectorAll(
    ".en__pg__select input[type=radio]"
  );

  if (!premiumRadios) return;

  if (premiumRadios.length) {
    let counter = 1;

    premiumRadios.forEach(radioElement => {
      radioElement.setAttribute("id", `premium-radio-${counter}`);
      radioElement.classList.add("premium-radio");
      const radioValue = radioElement.value;
      radioElement.setAttribute("data-premium-name", getNameForProductID(radioValue));

      // Look for an existing label for this radio.
      const existingLabel = document.querySelector(`label[for=premium-radio-${counter}]`);

      // Add a label only if one doesn't already exist.
      if (!existingLabel) {
        const premiumLabel = document.createElement("label");
        premiumLabel.setAttribute("for", `premium-radio-${counter}`);
        premiumLabel.classList.add("premium-label");

        radioElement.after(premiumLabel);
      }

      counter++;
    });
  }
}

// This functions expects only one product variant, such as size. Or none.
// Returns undefined if there are no variants.
// TODO: If needed, revise to handle more than one variant, such as size and 
// color.
function getSelectedPremiumVariant() {
  // If there are no variants, this will be returned with an undefined value.
  let selectedPremiumVariant;

  const selectedVariantIDField = document.querySelector("input[name='transaction.selprodvariantid']");
  if (!selectedVariantIDField) return;

  const selectedVariantID = selectedVariantIDField.value;

  if (!premiumSection) return;
  const variantSelectDiv = premiumSection.querySelector(".en__pg__optionType");

  // Some products have no variants.
  if (variantSelectDiv) {
    const variantSelectInput = variantSelectDiv.querySelector("select");
    selectedPremiumVariant = variantSelectInput
      .options[variantSelectInput.selectedIndex].text
      .replace("shirt", "").trim();

    if (selectedVariantID === "") {
      selectedPremiumVariant = "None";
    }
  }

  return selectedPremiumVariant;
}

// Stores the name of the selected premium in a hidden QMR, so we can output it
// on the autoresponder.
function saveSelectedPremium() {
  setPremiumSelectionQMR(getSelectedPremiumText());
}

// Returns empty string if variant is undefined.
function getSelectedPremiumText() {
  const selectedPremiumName = getSelectedPremiumNameFromRadio();
  const selectedVariant = getSelectedPremiumVariant();

  let selectedPremiumText = "None";

  if (typeof selectedVariant === "undefined") {
    // There are no variants.
    if (selectedPremiumName && selectedPremiumName !== "") {
      selectedPremiumText = `${selectedPremiumName}`;
    }
  } else {
    if (selectedVariant === "None") {
      // Leave off the name of the premium if user has selected "None".
      selectedPremiumText = selectedVariant;
    } else {
      if (selectedPremiumName && selectedPremiumName !== "") {
        selectedPremiumText = `${selectedPremiumName}, ${selectedVariant}`;
      }
    }
  }
  return selectedPremiumText;
}

function getNameForProductID(productID) {
  let productName = "None";
  if (!premiumProducts) return;
  const foundPremium = premiumProducts.find(
    element => element.id === Number(productID)
  );
  if (foundPremium) {
    productName = foundPremium.name;
  }
  return productName;
}

function getSelectedPremiumNameFromRadio() {
  let selectedPremiumName;
  const selectedPremiumRadio = document.querySelector("input[type=radio][name=en__pg]:checked");
  if (selectedPremiumRadio) {
    selectedPremiumName = selectedPremiumRadio.getAttribute("data-premium-name");
  }
  return selectedPremiumName;
}

// Save the text of the selected premium to a hidden question field.
function setPremiumSelectionQMR(text) {
  // For HSUS forms, the question ID is 940239.
  // For WLT forms, the question ID is 1177788.
  // This selector will find one or the other, or none.
  const premiumQMR = document.querySelector("input#en__field_supporter_questions_940239, input#en__field_supporter_questions_1177788");
  if (!premiumQMR) return;
  premiumQMR.value = text;
}

function setPremiumToNone() {
  if (!premiumSection) return;

  // Set the selection to none.
  const noneChoice = premiumSection.querySelector(
    "[data-premium-name='None']"
  );
  if (noneChoice) {
    noneChoice.click();
  }
}

// Empties the value of "transaction.selprodvariantid", but only when the
// premium section is hidden.
export function clearPremium() {
  console.log("clearPremium executed.");
  const selectedVariantIDField = document.querySelector(
    "[name='transaction.selprodvariantid']");
  if (!selectedVariantIDField) return;

  // Clear the premium ID field only if the premium block is hidden.
  if (premiumSection && !utils.isVisible(premiumSection)) {
    selectedVariantIDField.value = "";
  }
}

// When we hide the premium, we need to set it to None too.
export function hidePremiumSection() {
  if (!premiumSection) return;
  // Hide it.
  premiumSection.classList.add("hidden");

  // We need a delay to allow the frequency switcher logic to fire first.
  setTimeout(() => {
    setPremiumToNone();
    // Clear the product variant field.
    clearPremium();
  }, 1000);
}
