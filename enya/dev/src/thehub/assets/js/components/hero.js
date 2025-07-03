/*
 * background.js
 * HSUS Advocacy Forms - Enya 2021
 * Created: Winter 2021
 * Purpose: Responsible for controlling modifications to page background image.
 */

import * as utils from "utils/utilities";

export function init() {
  setHero();
}

const setHero = () => {
  const hero = document.querySelector('.hero');
  const images = utils.getAll('.hero img');
  let index;
  try {
    index = parseInt(sessionStorage.getItem('index') || 0);
  } catch (error) {
    console.log(error);
  }

  // Each page load sets a new hero image
  if (hero && images.length > 0) {
    hero.style.setProperty('--hero', `url(${images[index].src})`);
    try {
      sessionStorage.setItem('index', (index === images.length - 1) ? 0 : (index + 1));
    } catch (error) {
      console.log(error);
    }
  }
};
