/*
* bodyClasses.js
* HSUS Advocacy Forms - Enya 2021
* Created: Winter 2021
* Purpose: Responsible for controlling modifications to opt-ins and questions.
*/

import * as pageHelpers from "commonHelpers/pageHelpers";

export function init() {
  initBodyClasses();
}

const initBodyClasses = () => {
  if (document.querySelector('.hero--full-bleed')) {
    document.body.classList.add('has-hero--full-bleed');
  }
  if (pageHelpers.hasPageErrors()) {
    document.body.classList.add('is-error-page');
  }
  if (document.querySelector('form[action*="/tweet/"]')) {
  	document.body.classList.add('enya-advocacy--ttt');
  }
  if(document.querySelector('.advo-page')) {
  	document.body.classList.add('enya-advocacy--thank-you');
  }
};
