/*
* smsOptin.js
* HSUS Advocacy Forms - Enya 2021
* Enya SMS Phone Opt-in Logic
* Author: Jeremy Hatter (jeremy@zurigroup.com)
* Created: Winter 2021
* Purpose: Responsible for handling special functionality around SMS Opt-in on advocacy forms.
*/

const smsOptinContainerSelector = '.en__field--question.en__field--sms';

export function init(fieldId) {
  if (!isRequired(fieldId)) {
    hideOptinCheckbox();
    updateOptinLabel();
    // We unchecked the opt-in on the back end. So we need to check it here.
    checkSMSOptIn();
  }
}

const hideOptinCheckbox = () => {
  const smsOptinContainer = document.querySelector(smsOptinContainerSelector);
  if (smsOptinContainer) {
    smsOptinContainer.classList.add('hide-checkbox');
  }
};

const updateOptinLabel = () => {
  const smsOptinLabelPhraseContainer = document.querySelector(smsOptinContainerSelector + ' .sms-opt-in-first-phrase');
  if (smsOptinLabelPhraseContainer) {
    smsOptinLabelPhraseContainer.innerHTML = "By providing your mobile number,";
  }
};

const checkSMSOptIn = () => {
  const smsOptIn = document.querySelector("#en__field_supporter_questions_842109");
  if (smsOptIn) {
    smsOptIn.checked = true;
  }
};

const isRequired = (fieldId) => {
  const phone = document.querySelector('#'+fieldId);
  if (phone && phone.closest('.en__mandatory')) {
    return true;
  }
  return false;
};
