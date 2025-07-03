/*
* stateManager.js
* Enya State Controller
* Created: Winter 2021
* Purpose: Manage activity related to the state of Enya forms.
    - Modules can store and retrieve variables here.
    - Receives passed-in settings from outside of module.
*/

import config from "./configSettings";

const state = {};

// The state.config object contains values reflecting the base configuration of this Enya form.
state.config = {};

/*
  The state.thisPage object stores values that reflect the current status of the page.
  It also keeps handles to elements that Enya modules might need.
  When Enya is initialized, page settings get passed in and saved in the thisPage object too.
  See the file configSettings.js for some of the values that are configurable.
  Keys listed as undefined here are shown for reference purposes. Actual key values will get set when config object is merged with this one.
*/
state.thisPage = {
  pageTypeEN: undefined, // EN page type, available in pageJson
  pageTypeEnya: undefined, // Enya page type, such as donation, splash, etc.
  donateForm: undefined,
  enyaBody: undefined, // handle to the body element
  formObject: undefined, // handle to EnForm object
  amountObject: undefined, // handle to DonationAmount object
  frequencyObject: undefined, // handle to DonationFrequency object
  liveVariables: undefined, // handle to LiveVariables object
  submitLabel: undefined,
  donorEmail: undefined,
  formId: undefined,
  formType: undefined, // "tribute" is one form type
  isMonthlySelected: undefined,
  isOneTimeSelected: false,
  paymentSourceSelected: undefined,
  isErrorPage: false,
  isHSI: window.pageConfigSettings
    ? window.pageConfigSettings.isHSI || false
    : false,
  isUKForm: window.pageConfigSettings
    ? window.pageConfigSettings.isUKForm || false
    : false,
  isCAForm: window.pageConfigSettings
    ? window.pageConfigSettings.isCAForm || false
    : false,
  isFriendsHSIForm: window.pageConfigSettings
    ? window.pageConfigSettings.isFriendsHSIForm || false
    : false,
  isFrench: window.pageConfigSettings
    ? window.pageConfigSettings.isFrench || false
    : false,
  useLogoIndia: window.pageConfigSettings
    ? window.pageConfigSettings.useLogoIndia || false
    : false,
  useLogoUK: window.pageConfigSettings
    ? window.pageConfigSettings.useLogoUK || false
    : false,
  isTestMode: undefined,
  isThanksPage: undefined,
  isOneTimeGift: undefined,
  isMonthlyGift: undefined,
  isWindowshadeMonthlyDonor: undefined,
  monthlyFirst: undefined,
  monthlyModalCutoffAmount: undefined,
  monthlyModalDefaultAmount: undefined,
  monthlyModalImagePreloaded: false,
  monthlyModalDialog: undefined,
  monthlyModalShown: false,
  isMonthlyModalVisible: false,
  pageLoadBodyClassesAdded: false,
  screenSize: undefined,
  emailConsentModalDialog: undefined,
  enableMonthlyModal: true,
  enablePgUpsellModal: true,
  enableEmailConsentModal: false,
  emailConsentModalProcessed: false,
  showMonthlyPush: false,
  sourceCode: undefined,
  subSourceCode: undefined,
  userDonationAmount: undefined,
  hasApplePayPaymentType: undefined,
  isApplePayEnabled: undefined,
  isApplePaySelected: undefined,
  isSymbolicGivingPage: undefined,
  isSinglePageDonation: undefined,
  enyaLocationDataReady: undefined,
  selectedCurrency: undefined,
  selectedCountry: undefined,
  hidePremium: undefined,
  isEcardDonation: window.pageConfigSettings
    ? window.pageConfigSettings.isEcardDonation || false
    : false,
  isEcardDonationProcessor: window.pageConfigSettings
    ? window.pageConfigSettings.isEcardDonationProcessor || false
    : false,
  pageURLToShare: undefined,
  isCobrandedHSUSHSI: window.pageConfigSettings
    ? window.pageConfigSettings.isCobrandedHSUSHSI || false
    : false,
  isTributeCombo: window.pageConfigSettings
    ? window.pageConfigSettings.isTributeCombo || false
    : false,
  isTributeGiftSelected: undefined,
  isIATSForm: window.pageConfigSettings
    ? window.pageConfigSettings.isIATSForm || false
    : false,
  hideUKDirectDebitLink: window.pageConfigSettings
    ? window.pageConfigSettings.hideUKDirectDebitLink || false
    : false,
  ignoreDetectedCountry: window.pageConfigSettings
    ? window.pageConfigSettings.ignoreDetectedCountry || false
    : false,
  isHSUSWebSiteSignup: window.pageConfigSettings
    ? window.pageConfigSettings.isHSUSWebSiteSignup || false
    : false,
  isHSIWebSiteSignup: window.pageConfigSettings
    ? window.pageConfigSettings.isHSIWebSiteSignup || false
    : false,
  disableEmailVerification: window.pageConfigSettings
    ? window.pageConfigSettings.disableEmailVerification || false
    : false,
  isLegislativeLookup: window.pageConfigSettings
    ? window.pageConfigSettings.isLegislativeLookup || false
    : false,
  // A flag that marks whether this page has email verification turned on. The
  // emailVerifier component sets this flag when it initializes. Enya components
  // can read this value to find out if email verification is active on the
  // page.
  isEmailVerificationActive: undefined,
};

state.activeURLParams = {};

state.countrySettings = {};

state.detectedCountry = {};

export function initState(options) {
  // Copy values from Enya config module into state.
  state.config = Object.assign(state.config, config);

  // Merge passed-in config values.
  state.config = Object.assign(state.config, options.configSettings);

  // Merge config and thisPage
  state.thisPage = Object.assign(state.thisPage, state.config);

  // Copy all passed-in pageSettings options into Enya's thisPage object.
  state.thisPage = Object.assign(state.thisPage, options.pageSettings);
}

export default state;
