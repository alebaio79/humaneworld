/*
* actionCounter.js
* HSUS Advocacy Forms - Enya 2021
* Enya Action Counter Support Controller
* Author: Jeremy Hatter
* Created: Winter 2021
* Purpose: Controller to handle action counter functionality
*/

import { CountUp } from 'countup.js';

let pollForWidgets;

export function init() {
  // only start polling if a widget is on the page
  if (document.querySelector('.en__component--widgetblock')) {
    pollForWidgets = setInterval(initActionCounter, 100);
  }
}

const initActionCounter = () => {
  // EN loads widgets async, so look for expected content loaded by EN to confirm
  // widget is ready for actions
  const actionCountWidget = document.querySelector('.enWidget__copy--before');

  if (actionCountWidget) {
    clearInterval(pollForWidgets);
    const beforeTarget = document.querySelector(
      '.copy .your-message-heading, .copy .your-pledge-heading'
    );

    if (beforeTarget) {
      // find only the main HTML content to avoid adding the JS multiple times to the page
      const actionCountWidgetContainer = actionCountWidget
        .closest('.en__component--widgetblock')
        .querySelector('.enWidget.enWidget--thermometer');

      if (actionCountWidgetContainer) {
        // create mobile widget element
        const mobileWidgetContainer = document.createElement('div');
        mobileWidgetContainer.classList.add('en__component');
        mobileWidgetContainer.classList.add('en__component--widgetblock');

        // set content to EN generated widget content
        mobileWidgetContainer.innerHTML = actionCountWidgetContainer.outerHTML;

        // append before the 'Your Message' header
        document.querySelector('.copy').insertBefore(mobileWidgetContainer, beforeTarget);

        // start the count up
        initCountUp(document.querySelector('.copy .enWidget__copy--before h2'));
      }
    }

    // start the count up of the desktop widget
    initCountUp(actionCountWidget.querySelector('h2'));
  }
};

const initCountUp = (element) => {
  const count = parseInt(element.textContent.replace(/[^0-9\.]/g, ""), 10);

  if (!isNaN(count)) {
    const lastPortionOfCountToAnimate = 50;

    // Animate only the last N digits of the total. But never start below 0.
    const countAnimationStart = count - lastPortionOfCountToAnimate >= 0 ? count - lastPortionOfCountToAnimate : 0;

    const options = {
      startVal: countAnimationStart,
      useEasing: false,
      useGrouping: true,
      separator: ',',
      decimal: '.',
      prefix: "",
      suffix: ""
    };

    const counterObject = new CountUp(element, count, options);
    window.counterObject = counterObject;
    element.classList.add('counting-up');
    counterObject.start();
  }
};
