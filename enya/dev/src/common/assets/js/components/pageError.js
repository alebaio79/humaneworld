/*
* pageError.js
* HSUS Engaging Networks Forms - Enya 2023
* Created: Winter 2023
* Purpose: This component manages page-level error messaging. Page-level errors appear in a block above the form fields (usually). They only appear after the user has submitted the form.
*/

import state from "commonComponents/stateManager";
import * as utils from "utils/utilities";

let pageErrorContainer;

export function init() {
  wrapPageErrorElements();
  movePageErrorContainer();
  updateErrorHeader();

  // This applies to donation and ecard forms only.
  if (["donation", "ecard", "survey"].includes(state.thisPage.pageTypeEnya)) {
    insertErrorContactMessage();
  }
}

// Wrap error heading and list inside a container with a class we can select.
function wrapPageErrorElements() {
  const elements = utils.getAll(".en__errorHeader, .en__errorList");
  pageErrorContainer = utils.wrapAll(elements, "div", "page-error-container");
}

// Move the container to the top of the form panel.
function movePageErrorContainer() {
  if (!pageErrorContainer) return;

  // Don't do anything on pages that process ecard donations.
  if (state.thisPage.isEcardDonationProcessor) return;

  // Different page types use different class names for their form column.
  let destination = document.querySelector(".form, .form-column");

  // Some pages may not have a form column, which is where we usually prepend
  // the error container. The ecard processor page is one of those pages that
  // has no form column. Find an alternative.
  if (destination === null) {
    const rows = utils.getAll(".en__component--row");
    let count = 0;
    while (destination === null && count < rows.length) {
      // We don't want to move the error container above the full-bleed hero, if
      // there is one.
      if (rows[count].querySelector(".hero--full-bleed") === null) {
        destination = rows[count].querySelector(".en__component--copyblock");
      }
      count++;
    }
  }

  if (destination) {
    destination.prepend(pageErrorContainer);

    // If there's a widget in the form column, move it above the error
    // container. This applies to the counter widget on advos.
    const widget = destination.querySelector(".en__component--widgetblock");
    if (widget) {
      destination.prepend(widget);
    }
  } else {
    pageErrorContainer.remove();
  }
}

function updateErrorHeader() {
  let newErrorHeaderHTML = "<h2>An error has occurred.</h2>";
  const errorHeader = document.querySelector(".en__errorHeader");

  if (!errorHeader) return;

  if (state.thisPage.isFrench) {
    newErrorHeaderHTML = "<h2>Une erreur s’est produite.</h2>";
  }

  errorHeader.textContent = "";
  errorHeader.append(utils.stringToHTML(newErrorHeaderHTML));
}

function insertErrorContactMessage() {
  if (!pageErrorContainer) return;
  let donorCareEmail = "donorcare@humanesociety.org";
  let donorCarePhone = "866-720-2676";

  if (state.thisPage.isHSI) {
    donorCareEmail = "info@hsi.org";
    donorCarePhone = "866-614-4371";
  }

  let errorContactMessage = `
    <div class="error-contact">
      <p>If you need help donating to us online, please send us an <a href="mailto:${donorCareEmail}">email</a> or call us at ${donorCarePhone}.</p>
    </div>
  `;

  if (state.thisPage.isFrench) {
    errorContactMessage = `
      <div class="error-contact">
        <p>Si vous avez besoin d’aide pour faire un don en ligne, veuillez nous envoyer un <a href="mailto:info@friendsofhsi.ca">e-mail</a>.</p>
      </div>
    `;
  }

  pageErrorContainer.append(utils.stringToHTML(errorContactMessage));
}
