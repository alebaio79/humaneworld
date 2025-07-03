/*
* tracking.js
* HSUS Advocacy Forms - Enya 2021
* Enya Tracking Code Controller
* Author: Jeremy Hatter (jeremy@zurigroup.com)
* Created: Winter 2021
* Purpose: Main controller for handling tracking logic on Advocacy Forms
*/

import * as pageHelpers from "commonHelpers/pageHelpers";
import * as utils from "utils/utilities";
import * as urlParamsManager from "./urlParamsManager";

// We use these parameter variables to avoid magic strings in the body of the code.
const eaTrackingIdURLParameter = 'ea.tracking.id';
const redirectToDonationFormIDParameter = 'rd_dfid';
const appendedTrackingValue = '_pa';

let donationFormIDRequested = "";

export function init() {
  // Save all the params we care about in session storage.
  // That way, we can retrieve them on other pages.
  // A param will get stored only if it exists in the current URL.
  // The urlParamsManager knows which params we care about.
  urlParamsManager.storeManagedParameters();

  if (pageHelpers.isFinalPage()) {
    initRedirect();
    initStaticLinks();
  }
}

const initRedirect = () => {
  let url;
  try {
    url = new URL(window.postActionRedirectUrl);
  } catch (_) {
    url = false;
  }

  if (url) {
    const redirectButton = document.querySelector('.no-redirect-btn button');
    // check if button exists
    if (redirectButton) {
      // Add click event handler in this case.
      redirectButton.addEventListener('click', (ev) => { ev.preventDefault(); window.location.href = buildUrl(url); });
    } else {
      window.location.href = buildUrl(url);
    }
  }
};

const initStaticLinks = () => {
  // eslint-disable-next-line prefer-regex-literals, no-useless-escape
  const donateRegex = new RegExp("https:\/\/[A-Za-z0-9](?:[A-Za-z0-9\-]{0,61}[A-Za-z0-9])?\.humanesociety\.org\/page\/[0-9]+\/donate.*");
  utils.getAll('.en__component--page a').forEach(el => {
    if (donateRegex.test(el.getAttribute('href'))) {
      try {
        el.setAttribute('href', buildUrl(new URL(el.getAttribute('href'))));
      } catch (_) {}
    }
  });
};

const buildUrl = (url) => {
  const managedParams = urlParamsManager.loadManagedParameters();
  const searchParams = new URLSearchParams(url.search);

  if (managedParams) {
    managedParams.forEach(thisParam => {
      if (thisParam.name === redirectToDonationFormIDParameter) {
        // We don't want to pass along the donation form ID parameter.
        // Instead, we need to set a flag that buildUrl can read.
        donationFormIDRequested = thisParam.value;
      } else {
        searchParams.set(thisParam.name, thisParam.value + (thisParam.name === eaTrackingIdURLParameter ? appendedTrackingValue : ''));
      }
    });
    // Set up a different redirect URL if we have special form ID requested in
    // this page's URL.
    if (donationFormIDRequested) {
      url = getDonationURLForID(donationFormIDRequested);
    }
    url.search = searchParams.toString();
  }
  return url;
};

function getDonationURLForID(formID = "") {
  // Set default to our main post-action donation form.
  let finalID = "82415";

  if (formID) {
    finalID = formID;
  }

  return new URL(`https://secured.humanesociety.org/page/${finalID}/donate/1`);
}
