/*
 * background.js
 * HSUS Advocacy Forms - Enya 2021
 * Created: Winter 2021
 * Purpose: Responsible for controlling modifications to page background image.
 */

import * as utils from "utils/utilities";

export function init() {
  addInputAttributes();
  addAdditionalContent();
}

const addInputAttributes = () => {
  const emailAddress = document.querySelector('.en__supporterHubLogin__emailAddress .en__field__input');

  if (emailAddress) {
    emailAddress.id = 'email';
    emailAddress.setAttribute('autocomplete', 'email');
    emailAddress.setAttribute('placeholder', 'jsmith@gmail.com');
  }
};

const addAdditionalContent = () => {
  const additionalContent = document.querySelector('.additional-content');
  const hubLoginBody = document.querySelector('.en__supporterHubLogin__body');

  // Pull additional content into hub login body
  if (additionalContent && hubLoginBody) {
    hubLoginBody.append(additionalContent);
  }
};