/*
* Event Form.js
* HSUS Event Forms - Enya 2021
* Enya Event Form Controller
* Author: Jeremy Hatter
* Created: Winter 2021
* Purpose: Adjust Ticket Cart on Event Landing Page
*/
import * as utils from "utils/utilities";
import * as optInsManager from "commonComponents/optInsManager";
import * as ticketCart from "./ticketCart";
import * as tooltips from "commonComponents/tooltips";
import * as payment from "commonComponents/payment";
import * as supporterInfo from "commonComponents/supporterInfo";
import * as fieldHelpers from "commonHelpers/fieldHelpers";
import * as tracking from "commonComponents/tracking";

export function init() {
  addPageClass();
  handleAttendeeTitles();
  hidePaymentFields(); // if event is free
  addSameAsAttendeeCheckbox();
  updateOrderSummary();
  watchStateField();
  getRemainingTourTickets();
  handleTourTicketSubmit();
  transformSMSOptIn();

  tracking.init();
  supporterInfo.init();
  payment.init();
  tooltips.init();
  optInsManager.init();
  ticketCart.init();

  // Use EN's callback to handle submission changes.
  // But make sure we don't overwrite an existing submit handler.
  if (typeof window.enOnSubmit === 'function') {
    const oldOnSubmit = window.enOnSubmit;
    window.enOnSubmit = () => {
      return oldOnSubmit() && handleSubmit();
    };
  } else {
    window.enOnSubmit = handleSubmit;
  }
}

const addPageClass = () => {
  const body = document.querySelector('body');
  body.classList.add('page-' + pageJson.pageNumber);
  if (pageJson.pageNumber == pageJson.pageCount) {
    body.classList.add('last-page');
  }
};

const handleAttendeeTitles = () => {
  // Remove attendee and ticket index number
  utils.getAll('.en__registrants__ticketHead').forEach((el) => {
    el.textContent = el.textContent.replace(/\d/g, '');
  });
  utils.getAll('.en__registrants__registrantHead').forEach((el) => {
    el.textContent = el.textContent.replace(/\d/g, '');
  });

  // Re-number attendees if in a group ticket
  utils.getAll('.en__registrants__ticket').forEach((el) => {
    const attendees = utils.getAll('.en__registrants__registrantHead', el);

    if (attendees.length > 1) {
      attendees.forEach((el, index) => {
        el.textContent = el.textContent + " " + (index + 1);
      });
    }
  });
};

const updateOrderSummary = () => {
  const orderSummaryHeaders = utils.getAll('.en__orderSummary__header');
  orderSummaryHeaders.forEach(el => {
    el.innerHTML = el.innerHTML.replace(': ', '');
  });
};

const addSameAsAttendeeCheckbox = () => {
  if (utils.getAll('.en__component--eventregistrants').length) {
    // has attendees
    const target = document.querySelector('h4.your-info-heading') || document.querySelector('.en__field--firstName');
    if (target) {
      // create checkbox field
      const checkboxField = document.createElement('input');
      checkboxField.type = "checkbox";
      checkboxField.id = "same-as-attendee";
      // create checkbox label
      const checkboxLabel = document.createElement('label');
      checkboxLabel.setAttribute('for', 'same-as-attendee');
      checkboxLabel.innerHTML = "Same as attendee";
      // create checkbox container
      const checkboxFieldContainer = document.createElement('span');
      checkboxFieldContainer.classList.add('same-as-attendee-checkbox');
      checkboxFieldContainer.appendChild(checkboxField);
      checkboxFieldContainer.appendChild(checkboxLabel);

      if (!target.classList.contains('your-info-heading')) {
        const checkboxHeader = document.createElement('h4');
        checkboxHeader.appendChild(checkboxFieldContainer);
        target.parentNode.insertBefore(checkboxHeader, target);
      } else {
        target.appendChild(checkboxFieldContainer);
      }

      const placedCheckboxField = document.querySelector("#same-as-attendee");
      placedCheckboxField.addEventListener('change', (ev) => {
        if (ev.target.checked) {
          const targetFields = [
            document.querySelector('[name="supporter.firstName"]'),
            document.querySelector('[name="supporter.lastName"]'),
            document.querySelector('[name="supporter.emailAddress"]')
          ];

          const sourceFields = [
            document.querySelector('.en__field--registrant--1--firstName input'),
            document.querySelector('.en__field--registrant--2--lastName input'),
            document.querySelector('.en__field--registrant--3--emailAddress input')
          ];

          sourceFields.forEach((el, index) => {
            if (el && targetFields[index]) {
              targetFields[index].value = el.value;
            }
          });
        } else {
          utils.getAll('[name="supporter.firstName"], [name="supporter.lastName"], [name="supporter.emailAddress"]').forEach(el => {
            el.value = " ";
          });
        }
      });
    }
  }
};

const hidePaymentFields = () => {
  const paymentType = document.querySelector('#en__field_transaction_paymenttype');
  // EN doesn't provide an explicit flag that no payment is necessary on events.
  // Instead it removes the payment type field and the credit card fields, 
  // but it doesn't remove the bank account fields.
  // Looking at the existence of the payment type field looks like the best 
  // option to ensure event can exist where Bank account is the only payment type
  if (paymentType === null) {
    utils.getAll('.payment-section-block, .payment-heading-block').forEach((el) => {
      el.classList.add('hidden');
    });
  }
};

const handleSubmit = () => {
  payment.setCardFieldValueToRaw();
  // Uncheck the SMS opt-in if phone field is blank.
  fieldHelpers.unCheckSMSOptInIfPhoneBlank();
  // Copy the state value over again on submit, in case the change handler failed.
  fieldHelpers.copyStateToAllyState();
  return true;
};

// When state field changes, fire the function that updates State Ally field.
function watchStateField() {
  const stateField = document.querySelector("#en__field_supporter_region");
  if (!stateField) return;
  stateField.addEventListener("change", fieldHelpers.copyStateToAllyState);
}

// Tour Bus ticket restrictions
const displayErrorMessage = (parentEl, text) => {
  const errorMessage = document.createElement('div');

  errorMessage.classList.add('en__error');
  errorMessage.setAttribute('role', 'alert');
  errorMessage.textContent = text;
  parentEl.prepend(errorMessage);
};

const displayRemainingTickets = (ticketsRemaining) => {
  document.querySelectorAll('.js-tickets-remaining').forEach(el => {
    el.textContent = ticketsRemaining;
  });
};

const getTicketsSold = (totalTickets) => {
  const diff = (a, b) => {
    return a - b;
  };

  let ticketsSold = 0;

  document.querySelectorAll('.en__ticket__remaining').forEach(el => {
    ticketsSold += diff(totalTickets, el.dataset.remaining);
  });
  return ticketsSold;
};

const getTicketsSelected = () => {
  let ticketsSelected = 0;

  document.querySelectorAll('.en__ticket__quantity').forEach(el => {
    ticketsSelected += !isNaN(parseInt(el.value)) ? parseInt(el.value) : 0;
  });
  return ticketsSelected;
};

const clearOtherTickets = (el, value) => {
  document.querySelectorAll('.en__ticket__quantity').forEach(el => {
    el.value = 0;
  });
  el.value = value;
};

const checkAvailability = (el, ticketsRemaining) => {
  setTimeout(() => {
    const ticketsSelected = getTicketsSelected();

    if (ticketsRemaining - ticketsSelected < 0) {
      el.value = el.value - 1;
      // clearOtherTickets(el, el.value);
    }
  }, 100);
};

const checkChildTicketAvailability = (ticketsRemaining) => {
  const childTicket = [...document.querySelectorAll('.en__ticket__name')].filter(el => el.textContent.toLowerCase().indexOf('child') > -1);

  if (childTicket.length > 0 && ticketsRemaining < 2) {
    childTicket[0].closest('.en__ticket').classList.add('disabled');
    // displayErrorMessage(childTicket[0]c, "This ticket type is sold out.");
  }
};

const restrictTicket = (ticketsRemaining) => {
  checkChildTicketAvailability(ticketsRemaining);

  document.querySelectorAll('.en__ticket__quantity').forEach(el => {
    el.addEventListener('change', e => {
      checkAvailability(e.target, ticketsRemaining);
    });
  });

  document.querySelectorAll('.en__ticket__plus').forEach(el => {
    el.addEventListener('click', e => {
      checkAvailability(e.target.previousElementSibling, ticketsRemaining);
    });
  });

  document.querySelectorAll('.en__ticket__minus').forEach(el => {
    el.addEventListener('click', e => {
      checkAvailability(e.target.nextElementSibling, ticketsRemaining);
    });
  });
};

const disableTickets = () => {
  document.querySelectorAll('.en__ticket__quantity').forEach(el => {
    el.disabled = true;
  });
};

const disableEvent = (eventTickets) => {
  eventTickets.querySelector('.en__ticketBlock').classList.add('disabled');
  displayErrorMessage(eventTickets, "This event is sold out.");
  disableTickets();
};

const getRemainingTourTickets = () => {
  const eventTickets = document.querySelector('.en__component--eventtickets');
  const totalTickets = typeof NumberOfTicketsAvailable !== 'undefined' ? NumberOfTicketsAvailable : null;
  let ticketsRemaining;

  if (eventTickets && totalTickets !== null) {
    ticketsRemaining = totalTickets - getTicketsSold(totalTickets);
    displayRemainingTickets(ticketsRemaining);
    if (ticketsRemaining === 0) {
      disableEvent(eventTickets);
    } else {
      restrictTicket(ticketsRemaining);
    }
  }
};

const getNumberOfSelectedTickets = (tickets) => {
  let numberOfTickets = 0;

  tickets.forEach(el => {
    numberOfTickets += parseInt(el.closest('.en__ticket').querySelector('.en__ticket__quantity').value);
  });
  return numberOfTickets;
};

const handleTourTicketSubmit = () => {
  const adultTickets = [...document.querySelectorAll('.en__ticket__name')].filter(el => el.textContent.toLowerCase().indexOf('adult') > -1);
  const childTickets = [...document.querySelectorAll('.en__ticket__name')].filter(el => el.textContent.toLowerCase().indexOf('child') > -1);
  const ticketSummaryCheckout = document.querySelector('.en__ticketSummary__checkout');

  if (adultTickets.length > 0 && childTickets.length > 0 && ticketSummaryCheckout) {
    // https://www.engagingnetworks.support/knowledge-base/javascript-page-hooks-for-page-submit-validations-and-errors/
    window.enOnSubmit = function() {
      if (getNumberOfSelectedTickets(childTickets) > 0 && getNumberOfSelectedTickets(adultTickets) === 0) {
        alert('Please add at least one Adult ticket to continue.');
        return false;
      } else {
        return true;
      }
    };
  }
};

const transformSMSOptIn = () => {
  const smsOptInFirstPhrase = document.querySelector('.visible-opt-in-checkbox .sms-opt-in-first-phrase');

  if (smsOptInFirstPhrase) {
    // Seems to be a conflict, so wait a bit
    setTimeout(() => {
      smsOptInFirstPhrase.textContent = 'By checking this box,';
    }, 100);
  }
};
