/*
* popovers.js
* HSUS Engaging Networks Forms - Enya 2021
* Created: Winter 2021
* Purpose: Manage Bootstrap popovers on splash pages.
*/

import * as bootstrap from "bootstrap";

let popoverList;

export function init() {
  // TODO: We're not currently using the return value here. Delete?
  popoverList = initPopovers();
}

function initPopovers() {
  const popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  const popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
  return popoverList;
}
