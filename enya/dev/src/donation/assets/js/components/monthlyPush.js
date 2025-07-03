/*
* monthlyPush.js
* HSUS Engaging Networks Forms - Enya 2022
* Created: Spring 2022
* Purpose: Controller of the monthly push aka nudge.
*/

let nudgeContainer,
  recurPayField,
  nudgeV2;

export function init() {
  // Set handles to all elements.
  setHandles();

  // Move the nudge to the bottom of the recurring payment container.
  moveNudgeContainer();
  showNudgeV2();
}

function setHandles() {
  nudgeContainer = document.querySelector(".monthly-nudge, .one-time-nudge");
  recurPayField = document.querySelector(".en__field--recurrpay");
  nudgeV2 = document.querySelector(".monthly-nudge-v2");
}

function moveNudgeContainer() {
  // Move the nudge to the bottom of the recurring payment container.
  // HSUS and HSI forms have a monthly nudge. WLT forms have a one-time.
  // There should only ever be one nudge parent container on a page.
  if (!nudgeContainer || !recurPayField) return;
  recurPayField.appendChild(nudgeContainer);
}

function showNudgeV2() {
  // Don't run this function if we don't have version 2 of the nudge.
  if (!nudgeV2) return;
  nudgeV2.classList.remove("not-visible");
}
