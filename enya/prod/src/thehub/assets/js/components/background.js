/*
 * background.js
 * HSUS Advocacy Forms - Enya 2021
 * Created: Winter 2021
 * Purpose: Responsible for controlling modifications to page background image.
 */

import * as utils from "utils/utilities";

export function init() {
  setBackground();
}

const setBackground = () => {
  const page = document.getElementById('page-container');
  const images = utils.getAll('.background img');
  let index;
  try {
    index = parseInt(sessionStorage.getItem('index') || 0);
  } catch (error) {
    console.log(error);
  }

  // Each page load sets a new background image
  if (page && images.length > 0) {
    page.style.setProperty('--page-background', `url(${images[index].src})`);
    try {
      sessionStorage.setItem('index', (index === images.length - 1) ? 0 : (index + 1));
    } catch (error) {
      console.log(error);
    }
  }
};
