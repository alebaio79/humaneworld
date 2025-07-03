/*
* otherAmounts.js
* HSUS Donation Forms - Enya 2021
* Enya Other Amounts Controller
* Created: Winter 2021
* Purpose: Specialized controller dedicated to the other amount donation fields.
*/

import state from "commonComponents/stateManager";
import * as premiumManager from "./premiumManager";

// Handle to the other amount input field(s).
let otherInputs;

export function init() {
  otherInputs = document.querySelectorAll(".en__field__input--other");

  Array.from(otherInputs).forEach(thisInput => {
    // Add placeholder and turn off autocomplete.
    thisInput.setAttribute("placeholder", "Other");
    if (state.thisPage.isFrench) {
      thisInput.setAttribute("placeholder", "Autre");
    }
    thisInput.setAttribute("autocomplete", "off");

    // Add class.
    thisInput.classList.add("other-amount");

    // Check the hidden radio when user enters an amount in the other text input.
    // Taken from 4Site's ENGrid project, and modified.
    ["focus", "input"].forEach(evt => {
      thisInput.addEventListener(
        evt,
        ev => {
          const target = ev.target;
          if (target && target.parentNode && target.parentNode.parentNode) {
            const targetWrapper = target.parentNode;
            targetWrapper.classList.remove("en__field__item--hidden");
            if (targetWrapper.parentNode) {
              const lastRadioInput = targetWrapper.parentNode.querySelector(
                ".en__field__item:nth-last-child(2) input"
              );
              lastRadioInput.checked = !0;
            }
          }
        },
        false
      );
    });

    // After users enter a custom amount, the premium needs to get set to none
    // again.
    thisInput.addEventListener("blur", function(e) {
      if (state.thisPage.hidePremium) {
        premiumManager.hidePremiumSection();
      }
    });
  });
}
