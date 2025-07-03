/*
* ticketCart.js
* HSUS Event Forms - Enya 2021
* Enya Event Form Ticket Cart Controller
* Author: Jeremy Hatter
* Created: Winter 2021
* Purpose: Adjust Ticket Cart on Event Landing Page
*/
import * as utils from "utils/utilities";


export function init() {
  hidePromoCode();
  adjustCurrency();
  adjustAdditionalDonationLayout();
  clearZeroQuantity();
}

const hidePromoCode = () => {
  let costFields = utils.getAll('.en__ticket__field--cost');
  if(costFields.length === 1) {
    let priceElement = costFields[0].querySelector('.en__ticket__price');
    if(priceElement && parseFloat(priceElement.innerHTML) === 0) {
      document.querySelector('.en__ticketSummary').classList.add('free-only-event');
    }
  }
}

const adjustCurrency = () => {
  utils.getAll('.en__ticket__field--cost').forEach(element => {
    let currency = element.querySelector('.en__ticket__currency');
    let priceElement = element.querySelector('.en__ticket__price');
    if(parseFloat(priceElement.innerHTML) === 0) {
      priceElement.classList.add('hidden');
      if(currency) {
        currency.classList.add('hidden');
      }
    }
    if(currency) {
      currency.innerHTML = "$";
      element.prepend(currency);
    }
  });

  utils.getAll('.en__orderSummary__data--cost').forEach(el => {
    el.textContent = "$" + el.textContent.replace(/ USD/g, '');
  })
}

const adjustAdditionalDonationLayout = () => {
  let promoContainer = document.querySelector('.en__component--eventtickets .en__additional .en__additional__promo');
  let summaryContainer = document.querySelector('.en__ticketSummary');
  let additionalAmountContainer = document.querySelector('.en__additional__amount');
  let additionalAmountInput = document.querySelector('.en__additional__amount input[type="text"]');
  if(promoContainer && summaryContainer) {
    summaryContainer.prepend(promoContainer)
  }
  if(additionalAmountContainer && additionalAmountInput) {
    additionalAmountInput.setAttribute('placeholder', '$');
    additionalAmountInput.setAttribute('inputmode', 'decimal');
    additionalAmountInput.setAttribute('pattern', "^\\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\\.[0-9]{1,2})?$");
    let emptyElement = additionalAmountContainer.cloneNode();
    emptyElement.innerHTML = '';
    emptyElement.classList.remove('en__additional__amount');
    emptyElement.classList.add('en__additional__empty');
    additionalAmountContainer.parentNode.insertBefore(emptyElement, additionalAmountContainer);
  }
}

const clearZeroQuantity = () => {
  let quantityFields = utils.getAll('input[type="text"].en__ticket__quantity');

  quantityFields.forEach(el => {
    el.addEventListener("focus", ev => {
      if(parseInt(ev.target.value, 10) === 0) {
        ev.target.value = "";
      }
    });
    el.addEventListener("blur", ev => {
      if(ev.target.value.trim() === "") {
        ev.target.value = "0";
      }
    });
  })
}