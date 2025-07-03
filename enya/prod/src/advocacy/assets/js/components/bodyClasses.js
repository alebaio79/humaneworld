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
  const noHero = document.querySelector('.hero--full-bleed') ? document.querySelector('.hero--full-bleed').classList.contains('hidden-except-pb') : true;
  const noVideo = document.querySelector('.videoblock-container') ? document.querySelector('.videoblock-container').classList.contains('hidden-except-pb') : true;

  if (noHero && noVideo) {
    document.body.classList.add('no-media');
  }
  if (document.querySelector('.hero--full-bleed')) {
    document.body.classList.add('has-hero--full-bleed');
  }
  if (pageHelpers.hasPageErrors()) {
    document.body.classList.add('is-error-page');
  }
  if (document.querySelector('form[action*="/tweet/"]')) {
    document.body.classList.add('enya-advocacy--ttt');
  }
  if (document.querySelector('.advo-page')) {
    document.body.classList.add('enya-advocacy--thank-you');
  }
  // Closed landing page uses styles from advo last pages
  if (document.querySelector('.closed-page')) {
    document.body.classList.add('last-page');
  }
};
