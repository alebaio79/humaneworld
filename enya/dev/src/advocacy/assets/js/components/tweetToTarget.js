/*
* tweetToTarget.js
* HSUS Advocacy Forms - Enya 2021
* Enya Tweet-to-Target Functionality
* Author: Jeremy Hatter (jeremy@zurigroup.com)
* Created: Winter 2021
* Purpose: Responsible for handling special functionality around Tweet-to-Target actions.
*/

import * as utils from "utils/utilities";

export function init() {
  tweetToTarget();
  fixHandleLinks();
};

const fixHandleLinks = () => {
  utils.getAll('.en__twitterTarget__handle a').forEach(el => {
    el.href = el.href.replace('screen_name=@','screen_name=');
  });
};

const tweetToTarget = () => {
  const tweetButtons = utils.getAll('.en__tweetButton__send a');

  if (tweetButtons.length === 1) {
    // Hide redirect button.
    utils.getAll('.no-redirect-btn').forEach(el => {
      el.classList.add('hidden');
    });

    // add click handler to tweet button if only one exists
    tweetButtons.forEach(el => {
      el.addEventListener("click", handleTweetClick);
    });
  }
};

const handleTweetClick = (ev) => {
  // EN Tweet code needs to generate and launch new window/tab
  // wait 1 second before redirecting
  // only click the button if its been hidden
  setTimeout(() => { document.querySelector('.no-redirect-btn.hidden button').click(); }, 1000);
};
