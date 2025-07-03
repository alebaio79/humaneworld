/*
* Subscription Management Form.js
* HSUS Survey and Subscribe Forms - Enya 2021
* Enya Subscription Management Forms Controller
* Author: Jeremy Hatter
* Created: Winter 2021
* Purpose: Main controller for Subscription Management pages.
*/

import * as utils from "utils/utilities";
import * as pageHelpers from "commonHelpers/pageHelpers";
import * as storageHelpers from "commonHelpers/storageHelpers";

const unsubscribeQuestions = [
  {
    slug: 'humane-pro-opt-out-question',
    selector: '[name="supporter.questions.947751"]',
  },
  {
    slug: 'opt-out-question',
    selector: '[name="supporter.questions.936178"]',
  },
  {
    slug: 'wlt-opt-out-question',
    selector: '[name="supporter.questions.977427"]',
  },
  {
    slug: 'state-ally-opt-out',
    selector: '[name="supporter.questions.1000868"]',
  }
  
];

export function init() {
  pageHelpers.addPageClass();
  thankyouPage();
  unhideOptins();
  hideOptins();
  relabelOptIns();
}

const storeUnsubStatus = () => {
  unsubscribeQuestions.forEach(item => {
    const optout = document.querySelector(item.selector);
    if (optout && optout.checked) {
      if (storageHelpers.isSessionStorageEnabled()) {
        try {
          sessionStorage.setItem(item.slug, "Y");
        } catch (error) {
          console.log(
            "🚀 ~ file: subscriptionManagementForm.js:50 ~ storeUnsubStatus: sessionStorage not available."
          );
          console.log(error);
        }
      }
    }
  });

  return true;
};

const thankyouPage = () => {
  window.enOnSubmit = storeUnsubStatus;
  let defaultContentSelector = ".hidden-except-pb";
  let contentShown = false;

  if (pageHelpers.isFinalPage()) {
    unsubscribeQuestions.forEach(item => {
      let optout;
      try {
        optout = sessionStorage.getItem(item.slug);
      } catch (error) {
        console.log(error);
      }
      if (optout && optout === "Y" && !contentShown) {
        utils.getAll('.checked--' + item.slug).forEach(el => {
          el.classList.remove('hidden-except-pb');
        });
        if (utils.getAll('.checked--' + item.slug).length) {
          contentShown = true;
        }
      } else {
        defaultContentSelector += ':not(.checked--' + item.slug + ')';
      }
      sessionStorage.removeItem(item.slug);
    });
    if (!contentShown) {
      utils.getAll(defaultContentSelector).forEach(el => {
        el.classList.remove('hidden-except-pb');
      });
    }
  }
};

const unhideOptins = () => {
  const toUnhide = [
    '.en__field--animal-welfare-professional-1x-per-month'
  ].join(', ');

  utils.getAll(toUnhide).forEach(el => {
    if (el.classList.contains('hidden-opt-in')) {
      el.classList.remove('hidden-opt-in');
    }
  });
};

const hideOptins = () => {
  const toHide = [
    '.enya:not(.enya-wlt) .en__field--universal-email-consent'
  ].join(', ');

  utils.getAll(toHide).forEach(el => {
    if (el.classList.contains('visible-opt-in')) {
      el.classList.remove('visible-opt-in');
    }
    el.classList.add('hidden-opt-in');
  });
};

const relabelOptIns = () => {
  const labelUpdates = [
    {
      selector: '.enya:not(.enya-wlt) .en__field--universal-email-consent .en__field__item .en__field__label--item',
      label: 'Keep receiving HSUS email'
    },
    {
      selector: '.enya-wlt .en__field--universal-email-consent .en__field__item .en__field__label--item',
      label: 'Keep receiving Humane Society Wildlife Land Trust email'
    },
    {
      selector: '.en__field--general-email-1x-per-month .en__field__item .en__field__label--item',
      label: 'Send me one email per month'
    },
    {
      selector: '.en__field--animal-welfare-professional-1x-per-month .en__field__item .en__field__label--item',
      label: 'Send me one HumanePro email per month'
    }
  ];

  labelUpdates.forEach(item => {
    const optInLabel = document.querySelector(item.selector);
    if (optInLabel) {
      optInLabel.innerHTML = item.label;
    }
  });
};
