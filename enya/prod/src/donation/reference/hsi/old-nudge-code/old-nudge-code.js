/*
* monthlyPush.js
* HSUS Engaging Networks Forms - Enya 2022
* Created: Spring 2022
* Purpose: Controller of the monthly push aka nudge.
*/

import state from "commonComponents/stateManager";

let nudgeContainer, recurPayField, nudgeControl, nudgeVariant1, nudgeVariant2;

export function init() {
  // Set handles to all elements.
  setHandles();

  // Move the nudge to the bottom of the recurring payment container.
  moveNudgeContainer();

  // During A/B testing, show the appropriate variant.
  showVariant();
}

function setHandles() {
  nudgeContainer = document.querySelector(".monthly-nudge, .one-time-nudge");
  recurPayField = document.querySelector(".en__field--recurrpay");
  nudgeControl = document.querySelector(".monthly-nudge-control");
  nudgeVariant1 = document.querySelector(".monthly-nudge-variant-1");
  nudgeVariant2 = document.querySelector(".monthly-nudge-variant-2");
}

function moveNudgeContainer() {
  // Move the nudge to the bottom of the recurring payment container.
  // HSUS forms have a monthly nudge currently. WLT forms have a one-time.
  // There should only ever be one nudge parent container on a page.
  if (!nudgeContainer || !recurPayField) return;
  recurPayField.appendChild(nudgeContainer);
}

function showVariant() {
  // Don't run this function if we don't have all variants.
  if (!nudgeControl || !nudgeVariant1 || !nudgeVariant2) return;
  if (typeof state.activeURLParams !== "undefined") {
    if (state.activeURLParams?.mp === "1") {
      // Hide the control, and show variant 1.
      nudgeControl.classList.add("hidden");
      nudgeVariant2.classList.add("hidden");
      // Note that we have to use the "not-visible" helper class, rather than
      // "hidden", to make sure the custom font downloads before we show the
      // variant.
      nudgeVariant1.classList.remove("not-visible");
    } else if (state.activeURLParams?.mp === "2") {
      // Hide the control, and show variant 2.
      nudgeControl.classList.add("hidden");
      nudgeVariant1.classList.add("hidden");
      nudgeVariant2.classList.remove("not-visible");
    } else {
      nudgeVariant1.classList.add("hidden");
      nudgeVariant2.classList.add("hidden");
    }
  } else {
    // Make sure we hide the variants for sure.
    nudgeVariant1.classList.add("hidden");
    nudgeVariant2.classList.add("hidden");
  }
}
