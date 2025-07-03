/*
* sharingManager.js
* HSUS Engaging Networks Forms - Enya 2021
* Created: Winter 2021
* Purpose: Controls the sharing behavior on thanks pages.
*/

import state from "commonComponents/stateManager";
import * as utils from "utils/utilities";
import * as pageHelpers from "commonHelpers/pageHelpers";

export function init() {
  moveSharePreview();
  initFacebookShare();
  initTwitterShare();
  initEmailShare();
}

// We had to put the share preview in its own text block, for better editability.
// Move it into place inside the share wrapper.
function moveSharePreview() {
  const shareIntro = document.querySelector(".share-intro-container");
  const sharePreview = document.querySelector(".share-preview-container");
  if (!sharePreview || !shareIntro) return;

  shareIntro.after(sharePreview);
}

// Get the HREF value from the built-in (hidden) EN share button.
// Copy that HREF to our custom share button.
function initFacebookShare() {
  // Grab the built-in button.
  const facebookENShareLink = document.querySelector(
    "a.en__socialShare--facebook"
  );
  // Get a handle to our custom share button.
  const facebookCustomShareButton = document.querySelector(
    ".thanks-shares-container a.facebook-share"
  );
  if (!facebookENShareLink || !facebookCustomShareButton) return;

  // We decided to remove the UTM params from the URLs that EN generates,
  // because they made the links too ugly.
  facebookCustomShareButton.href = replaceParamInURL("u", facebookENShareLink.href);
}

// Do the same as above for Twitter.
function initTwitterShare() {
  // Grab the built-in button.
  const twitterENShareLink = document.querySelector(
    "a.en__socialShare--twitter"
  );
  // Get a handle to our custom share button.
  const twitterCustomShareButton = document.querySelector(
    ".thanks-shares-container a.twitter-share"
  );
  if (!twitterENShareLink || !twitterCustomShareButton) return;

  // We decided to remove the UTM params from the URLs that EN generates,
  // because they made the links too ugly.
  twitterCustomShareButton.href = replaceParamInURL("url", twitterENShareLink.href);
}

// Build a link and attach to the email share button.
function initEmailShare() {
  // Get handle to our custom email button.
  // There's no EN built-in counterpart, because EN doesn't offer email sharing.
  const emailShareButton = document.querySelector(
    ".thanks-shares-container a.email-share"
  );
  if (!emailShareButton) return;

  // Get the constructed mailto href and attach to button.
  const emailShareHref = getEmailShareHref();
  emailShareButton.href = emailShareHref;
}

function getEmailShareHref() {
  let emailShareHref = "";
  const subjectText = getSubjectText();
  const bodyText = getBodyText();
  const pageURLToShare = getPageURLToShare();

  emailShareHref = `mailto:?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}%20${encodeURIComponent(pageURLToShare)}`;

  return emailShareHref;
}

// Get the subject text from the hidden element on the page.
function getSubjectText() {
  let subjectText = "";
  const defaultSubjectText = "Will you help animals?";
  const subjectElement = document.querySelector(
    ".email-sharing-text-container .email-subject-text"
  );
  if (subjectElement) {
    subjectText = utils.removeExcessWhitespace(subjectElement.textContent);
    subjectText = utils.htmlDecode(subjectText);
  }

  if (subjectText === "") {
    subjectText = defaultSubjectText;
  }

  return subjectText;
}

// Get the message body text from the hidden element on the page.
function getBodyText() {
  let bodyText = "";

  const defaultBodyText = `Every animal deserves a life free from cruelty and neglect. That&#39;s why I stand with the Humane Society of the United States. Will you help us in creating a better world for all animals by making a gift today? Click here:
`;
  const bodyElement = document.querySelector(
    ".email-sharing-text-container .email-body-text"
  );
  if (bodyElement) {
    bodyText = utils.removeExcessWhitespace(bodyElement.textContent);
    bodyText = utils.htmlDecode(bodyText);
  }

  if (bodyText === "") {
    bodyText = defaultBodyText;
  }

  return bodyText;
}

// Build a URL that we'll include in the sharing email message.
function getPageURLToShare() {
  let baseURL = getBaseURLForSharing();

  if (state.thisPage.pageURLToShare) {
    baseURL = state.thisPage.pageURLToShare;
  }

  const pageURLParams = {
    "ea.tracking.id": "sh_emty_donate"
  };

  const pageURLToShare = utils.getUriWithParams(baseURL, pageURLParams);

  return pageURLToShare;
}

function getBaseURLForSharing() {
  return `https://${window.location.hostname}/page/${pageHelpers.getPageId()}/donate/1`;
}

// Replaces the provided parameter with a new value that doesn't have UTM 
// parameters. The "paramName" argument is a parameter in the "url" argument.
// The paramName's value is already URL-encoded. So we have to decode
// it, strip out the UTM params, and then re-encode it.
function replaceParamInURL(paramName, url) {
  const urlObject = new URL(url);
  const urlParams = new URLSearchParams(urlObject.search);
  const urlParamValueDecoded = decodeURI(urlParams.get(paramName));
  const urlParamValueCleanedEncoded = encodeURI(removeUnwantedParamsFromURL(urlParamValueDecoded));
  urlParams.set(paramName, urlParamValueCleanedEncoded);
  urlObject.search = urlParams.toString();
  return urlObject.toString();
}

// Strips out params we don't want.
function removeUnwantedParamsFromURL(shareURL = "") {
  const unwantedParams = ["utm_medium", "utm_source", "utm_content", "utm_campaign", "locale", "en_chan"];
  const cleanedURL = utils.getUriWithDeletedParams(shareURL, unwantedParams);
  return cleanedURL;
}
