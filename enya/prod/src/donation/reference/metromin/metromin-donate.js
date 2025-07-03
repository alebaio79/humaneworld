if (window.EngagingNetworks) {
  console.log("dev");

  /* Spam trap field attributes */
  $('.spamtrap input[type="text"]')
    .attr("tabindex", "-1")
    .attr("autocomplete", "off");

  /* Pre-select "Monthly" */
  var monthlyParam = getUrlParameter("monthly");
  if (monthlyParam) {
    $('.en__field--recurrpay input[value="Y"]~label').click();
  }

  /* Pre-select "One-time" */
  var onetimeParam = getUrlParameter("onetime");
  if (onetimeParam) {
    $('.en__field--recurrpay input[value="N"]~label').click();
  }

  /* Pre-select amount */
  var amountParam = getUrlParameter("amount");
  setTimeout(function () {
    if (amountParam) {
      if ($('input[value="' + amountParam + '"]').length) {
        $('input[value="' + amountParam + '"]').click();
      } else {
        $('.en__field__input--radio[value=""]~label').click();
        $('input[name="transaction.donationAmt.other"').val(amountParam);
        $('input[name="transaction.feeCover"]~label').click().click();
      }
    }
  }, 100);

  /* Modify other amount label on user input */
  $(".en__field--donationAmt").on(
    "change",
    'input[name="transaction.donationAmt"]',
    function () {
      if ($('.en__field__input--radio[value=""]').is(":checked")) {
        $('.en__field__input--radio[value=""]~label')
          .addClass("selected")
          .html("$");
        setTimeout(function () {
          $(".en__field__input--other").focus();
        }, 100);
      } else {
        $('.en__field__input--radio[value=""]~label')
          .removeClass("selected")
          .html("Other");
      }
    }
  );

  /* Move field labels on user input */
  $('input[type="text"]').on("change keyup paste", function () {
    if ($(this).val()) {
      $(this).closest(".en__field").addClass("has-value");
    } else {
      $(this).closest(".en__field").removeClass("has-value");
    }
  });

  /* Add "labels" to Inform State, State, and Country <selects> */
  $("#en__field_transaction_infreg").prepend(
    "<option selected disabled>Inform State</option>"
  );
  $("#en__field_supporter_region").prepend(
    "<option selected disabled>State</option>"
  );
  $("#en__field_supporter_country").prepend(
    "<option selected disabled>Country</option>"
  );

  /* Swap one-time/monthly content */
  var freq = $('input[name="transaction.recurrpay"]:checked').val();
  if (freq == "N") {
    oneTime();
  }
  if (freq == "Y") {
    monthly();
  }
  $('input[name="transaction.recurrpay"]').change(function () {
    if (this.value == "N") {
      oneTime();
    } else if (this.value == "Y") {
      monthly();
    }
  });

  /* Credit card option */
  $(
    '.en__field--othamt1 .en__field__element--radio .en__field__item input[value="Credit Card"]~label'
  ).click(function () {
    $("#en__digitalWallet__paypalTouch").removeClass("show-pt");
    $("#en__digitalWallet__stripeButtons").removeClass("show-pt");
    $(".en__submit").show();
  });

  /* PayPal option */
  $(
    '.en__field--othamt1 .en__field__element--radio .en__field__item input[value="PayPal"]~label'
  ).click(function () {
    $(".en__submit").hide();
    $("#en__digitalWallet__stripeButtons").removeClass("show-pt");
    $("#en__digitalWallet__paypalTouch").addClass("show-pt");
  });

  /* Apple/Google Pay option */
  $(
    '.en__field--othamt1 .en__field__element--radio .en__field__item input[value="Apple Pay or Google Pay"]~label'
  ).click(function () {
    $(".en__submit").hide();
    $("#en__digitalWallet__paypalTouch").removeClass("show-pt");
    $("#en__digitalWallet__stripeButtons").addClass("show-pt");
  });

  /* Cryptocurrency option */
  $(
    '.en__field--othamt1 .en__field__element--radio .en__field__item input[value="Cryptocurrency"]~label'
  ).click(function () {
    window.location.href = "https://www.metromin.org/donatecrypto/";
  });

  /* Hide PayPal/Cryptocurrency if Monthly is selected (default to credit card) */
  if ($('.en__field--recurrpay input[value="Y"]').is(":checked")) {
    $('input[value="PayPal"]').closest(".en__field__item").hide();
    $('input[value="Cryptocurrency"]').closest(".en__field__item").hide();
  }

  $('.en__field--recurrpay input[value="Y"]~label').click(function () {
    $('input[value="PayPal"]').closest(".en__field__item").hide();
    $('input[value="Cryptocurrency"]').closest(".en__field__item").hide();
    if ($('input[value="PayPal"]').is(":checked")) {
      $('input[value="Credit Card"]~label').click();
    }
    if ($('input[value="Cryptocurrency"]').is(":checked")) {
      $('input[value="Credit Card"]~label').click();
    }
  });

  $('.en__field--recurrpay input[value="N"]~label').click(function () {
    $('input[value="PayPal"').closest(".en__field__item").show();
    $('input[value="Cryptocurrency"]').closest(".en__field__item").show();
  });

  /* Show user message if no Google/Apple Pay button loads */
  $('input[value="Apple Pay or Google Pay"]~label').click(function () {
    var checkDigitalWallet = setInterval(function () {
      if ($("#en__digitalWallet__stripeButtons__container").length) {
        clearInterval(checkDigitalWallet);
        if (!$("#en__digitalWallet__stripeButtons__container").html().length) {
          $("#en__digitalWallet__stripeButtons__container").html(
            "No Google Pay or Apple Pay payment option detected."
          );
        }
      }
    }, 1000);
  });

  /* Show one-time content */
  function oneTime() {
    $(".one-time-box").show();
    $(".monthly-box").hide();
    $("#note-text span").html("$100 would have a huge impact!");
    $("#freq").html("One-Time");
  }

  /* Show monthly content */
  function monthly() {
    $(".one-time-box").hide();
    $(".monthly-box").show();
    $("#note-text span").html("$50 would have a huge impact!");
    $("#freq").html("Monthly");
  }

  /* Get value of URL parameter */
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}
