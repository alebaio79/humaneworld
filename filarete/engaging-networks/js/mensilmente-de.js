// Questo è nel tuo script già presente
isMonthly = ' Monatliche';

// Poi, sotto:
document.addEventListener("DOMContentLoaded", function () {
  if (typeof isMonthly !== 'undefined') {
    var radioMensile = document.getElementById('en__field_transaction_recurrpay');

    if (radioMensile && radioMensile.checked) {
      var buttons = document.querySelectorAll('.en__submit button');
      buttons.forEach(function(button) {
        if (!button.innerHTML.includes(isMonthly.trim())) {
          button.innerHTML += isMonthly;
        }
      });
    }
  }
});


