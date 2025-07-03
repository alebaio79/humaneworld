/*
* emailToTarget.js
* HSUS Advocacy Forms - Enya 2021
* Enya Email-to-Target Functionality
* Author: Deron Hurst (deron@zurigroup.com)
* Created: Summer 2022
* Purpose: Responsible for handling special functionality around Email-to-Target actions.
*/

import { autoResizeTextarea } from "../../../../common/assets/js/helpers/fieldHelpers";

export function init() {
  autoResizeMessages();
};

const autoResizeMessages = () => {
  // Make sure the function gets called even if the load event has already fired.
  // https://stackoverflow.com/a/54179702/135196
  if (document.readyState !== "loading") {
    resizeContactMessageTextAreas();
  } else {
    window.addEventListener("DOMContentLoaded", resizeContactMessageTextAreas);
  }
};

function resizeContactMessageTextAreas() {
  document
    .querySelectorAll(
      ".en__contactSection:not(.en__contactSection--hidden) .en__contactMessage textarea"
    )
    .forEach((el) => {
      autoResizeTextarea(el);
    });
}
