/*
* readMore.js
* HSUS EN Forms - Enya 2021
* Enya Read More Functionality
* Created: Winter 2021
* Purpose: Responsible for implementing read more functionality.
*/

import * as utils from "utils/utilities";
import state from "commonComponents/stateManager";

export function init() {
  retrofitClassNames();
  readMore();
};

const readMore = () => {
  // If someone has added "disable-read-more" to the element, then don't enable
  // the read more.
  const readMoreText = document.querySelector(
    ".enable-read-more:not(.disable-read-more)"
  );
  let readMoreButton;

  // Add Read More button to end of specified text, but only if needed.
  if (readMoreText && doWeNeedToReadMore()) {
    readMoreButton = document.createElement('div');
    readMoreButton.textContent = 'Read more +';
    if (state.thisPage.isFrench) {
      readMoreButton.textContent = 'En savoir plus +';
    }
    utils.addClass(readMoreButton, 'read-more-button');
    readMoreText.parentNode.insertBefore(
      readMoreButton, readMoreText.nextSibling
    );

    // Expand the body text when users click on the read more button.
    document.querySelector('.read-more-button').addEventListener('click', e => {
      readMoreText.classList.remove('collapsed');
      readMoreText.classList.add('expanded');
      e.target.classList.add('hidden');
    });
  } else if (readMoreText) {
    // The intro text is short, so we don't need to collapse it.
    readMoreText.classList.remove('collapsed');
  }

  // Finally, for disabled-read-more, remove the collapsed class.
  const disabledReadMoreText = document.querySelector(
    ".enable-read-more.disable-read-more"
  );
  if (disabledReadMoreText) {
    disabledReadMoreText.classList.remove('collapsed');
    disabledReadMoreText.classList.add('expanded');
  }
};

// Function that determines whether or not we need to show the Read More button
// for the specified text.
const doWeNeedToReadMore = () => {
  let introTextTotalHeight;
  let introTextCSSMaxHeight;
  // Set the buffer to about the height of one line of text. That should prevent
  // the case where Read More appears and there's no text revealed, or just one
  // line revealed, when users click the Read More button.
  const bufferHeight = 30;
  let weNeedReadMore = false;
  // If we're on a donation form, disable readMore on non-small screens.
  const isSmallDonationForm = document.querySelector("body.enya-donation.small");
  // On advos, we want readMore for all screen types.
  const isAdvocacyForm = document.querySelector("body.enya-advocacy");

  if (!isSmallDonationForm && !isAdvocacyForm) return weNeedReadMore;

  const introTextElement = document.querySelector(
    ".enable-read-more.collapsed"
  );

  if (introTextElement) {
    introTextTotalHeight = introTextElement.scrollHeight;
    introTextCSSMaxHeight = parseInt(getComputedStyle(introTextElement).maxHeight, 10);
    if ((introTextTotalHeight - bufferHeight) > introTextCSSMaxHeight) {
      weNeedReadMore = true;
    }
  }
  return weNeedReadMore;
};

// Add "collapsed" and "enable-read-more" classes to all "intro-text-block"
// elements on donation forms and advo forms.
// This is necessary to enable the read-more functionality.
function retrofitClassNames() {
  const introText = document.querySelector(
    ".enya-donation .intro-text-block, .advo-intro-body-text"
  );
  if (!introText) return;
  utils.addClass(introText, "collapsed");
  utils.addClass(introText, "enable-read-more");
}
