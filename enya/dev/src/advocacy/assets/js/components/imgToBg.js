/*
* imgToBg.js
* HSUS Advocacy Forms - Enya 2021
* Created: Winter 2021
* Purpose: Responsible for controlling modifications to opt-ins and questions.
*/

import * as utils from "utils/utilities";

export function init() {
  initImgToBg();
}

const initImgToBg = () => {
  utils.getAll('.hero--full-bleed').forEach(el => {
    utils.getAll('.en__component--imageblock', el).forEach(el => {
      el.style.backgroundImage = `url(${el.querySelector('img').getAttribute('src')})`;
    });
  });
};
