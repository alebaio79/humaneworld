/* eslint-disable */
// global variable to know if its other field or askstring
var fromWhere = "";
// set cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; // think of setting a domain also when its live TODO
}

function setCookieNoPath(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires; // think of setting a domain also when its live TODO
}
// get cookie
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
// get url parameter value
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null ?
    "" :
    decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Auto detect CC type based on CC number entered - You can change the return value to match your field data value
function detectCardType(number) {
  var re = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/
  };
  if (re.visa.test(number)) {
    return "Visa";
  } else if (re.mastercard.test(number)) {
    return "MasterCard";
  } else if (re.amex.test(number)) {
    return "American Express";
  } else if (re.discover.test(number)) {
    return "Discover";
  } else {
    return undefined;
  }
}

// get selected payment frequency
function selectedFrequency() {
  var frequencyLevels = $(
    '.gift-information--block > div:nth-child(1) input[type="radio"]'
  );
  var donationFrequency = "";
  frequencyLevels.each(function (e) {
    if ($(this).is(":checked")) {
      donationFrequency = $(this)
        .val()
        .toLowerCase();
    }
  });
  return donationFrequency;
}

// get selected amount
function selectedAmount() {
  var askLevels = $(
    '.gift-information--block > div:nth-child(2) input[type="radio"]'
  );
  var donationAmount = "0";
  askLevels.each(function (e) {
    if ($(this).is(":checked")) {
      if (
        $(this)
        .val()
        .toLowerCase() == "other"
      ) {
        donationAmount = $(".en__field__input--other").val();
      } else {
        donationAmount = $(this).val();
      }
    }
  });
  return donationAmount;
}

// get payment type - bank vs credit
function selectedPaymentType() {
  if ($(".payment--info").length > 0) {
    return $('.payment--info > div:first-child input[type="radio"]:checked')
      .val()
      .toLowerCase();
  }
}

// is support for regional news and information fund is checked
function toSupportRegional() {
  return $('.support--regional input[type="checkbox"]').is(":checked");
}

// total amount user intend to donate also check for additional $1 support checkbox
function totalDonationAmount() {
  var totalDonationAmountValue = "0";
  totalDonationAmountValue = selectedAmount();
  if (toSupportRegional()) {
    if (typeof supportRegionalOneTimeAmount != "undefined") {
      var onetimeRegionalSupportAmount = supportRegionalOneTimeAmount;
    } else {
      var onetimeRegionalSupportAmount = 12;
    }
    if (typeof supportRegionalMonthlyAmount != "undefined") {
      var monthlyRegionalSupportAmount = supportRegionalMonthlyAmount;
    } else {
      var monthlyRegionalSupportAmount = 1;
    }
    if (selectedFrequency() == "onetime") {
      totalDonationAmountValue = +totalDonationAmountValue + onetimeRegionalSupportAmount;
    } else if (selectedFrequency() == "monthly") {
      totalDonationAmountValue = +totalDonationAmountValue + monthlyRegionalSupportAmount;
    }
  }
  return totalDonationAmountValue;
}

// update support language
function updateRegionalSupportLanguage() {
  if (typeof supportRegionalOneTimeAmount != "undefined") {
    var onetimeRegionalSupportAmount = supportRegionalOneTimeAmount;
  } else {
    var onetimeRegionalSupportAmount = 12;
  }
  if (typeof supportRegionalMonthlyAmount != "undefined") {
    var monthlyRegionalSupportAmount = supportRegionalMonthlyAmount;
  } else {
    var monthlyRegionalSupportAmount = 1;
  }
  if (selectedFrequency() == "onetime") {
    $("#regional-support-ask").html("$" + onetimeRegionalSupportAmount);
    $(".regional-support-check label").html(
      "Yes! I'll give an additional $" + onetimeRegionalSupportAmount + "."
    );
  } else if (selectedFrequency() == "monthly") {
    $("#regional-support-ask").html("$" + monthlyRegionalSupportAmount);
    $(".regional-support-check label").html(
      "Yes! I'll give an additional $" +
      monthlyRegionalSupportAmount +
      " each month."
    );
  }
}

/// Map total donation amount to actual tagged donation amount hidden field - call also on page load
function mapDonationAmount() {
  var mappedAmountField = $('input[name="transaction.donationAmt"]');
  mappedAmountField.val(totalDonationAmount());
}

/// Donation amount label above submit button - call also on page load
function donationAmountLabel() {
  var donationLabel = totalDonationAmount();
  if (selectedFrequency() == "monthly") {
    donationLabel = donationLabel + " monthly";
  } else {
    donationLabel = donationLabel;
  }
  document.getElementById("donationLabel").innerHTML = donationLabel;
}

/// why bank tool tip toggle - call also on page load
function whyBankToolTipToggle() {
  if (selectedPaymentType() == "bank") {
    $("#why-bank").show();
  } else {
    $("#why-bank").hide();
  }
}

/// bank info toggle link - call also on page load
function bankInfoLinkToggle() {
  if (selectedPaymentType() == "bank") {
    $("#find-bank-info").show();
  } else {
    $("#find-bank-info").hide();
  }
}

/// bank info with check imgage toggle - hardcoded in anchor text - no need to call in this file again
function showHideBankInfo() {
  if ($("#bank-info-help").is(":visible")) {
    $("#bank-info-help").hide();
    $("#toggle-bank-info-help").show();
  } else {
    $("#bank-info-help").show();
    $("#toggle-bank-info-help").hide();
  }
}

/// default ask level
function assignAskLevel(amount) {
  var askLevels = $(
    '.gift-information--block > div:nth-child(2) input[type="radio"]'
  );
  var askLevelMatch = false;
  askLevels.each(function (e) {
    if (!askLevelMatch) {
      if ($(this).val() == amount) {
        askLevelMatch = true;
        $(this).click();
        $(
          '.gift-information--block > div:nth-child(2) .en__field__element--radio .en__field__item.en__field__item--other input[type="text"]'
        ).removeClass("hasvalue");
        fromWhere = "ask";
      } else if (
        $(this)
        .val()
        .toLowerCase() == "other"
      ) {
        askLevelMatch = true;
        $(
          '.gift-information--block > div:nth-child(2) .en__field__element--radio .en__field__item:nth-last-child(2) input[type="radio"]'
        ).click();

        $(
            '.gift-information--block > div:nth-child(2) .en__field__element--radio .en__field__item.en__field__item--other input[type="text"]'
          )
          .val(amount)
          .addClass("hasvalue");
        fromWhere = "other";
      }
    }
  });
  premiumBlockRender();
}

function clearHasValueClass() {
  var askLevels = $(
    '.gift-information--block > div:nth-child(2) input[type="radio"]'
  );
  askLevels.each(function (e) {
    if (
      $(this).is(":checked") &&
      $(this)
      .val()
      .toLowerCase() != "other"
    ) {
      $(
        '.gift-information--block > div:nth-child(2) .en__field__element--radio .en__field__item.en__field__item--other input[type="text"]'
      ).removeClass("hasvalue");
    } else if (
      $(this).is(":checked") &&
      $(this)
      .val()
      .toLowerCase() == "other"
    ) {
      $(
        '.gift-information--block > div:nth-child(2) .en__field__element--radio .en__field__item.en__field__item--other input[type="text"]'
      ).addClass("hasvalue");
    }
  });
}

function premiumBlockInitiate(where) {
  if ($(".en__component--premiumgiftblock").length > 0) {
    if (where == "frequency") {
      setCookieNoPath("premium", false);
    }
    setTimeout(function () {
      $(".en__pgList").before(
        $(".en__pgList .en__pg:last-child")
        .addClass("nogift")
        .detach()
      );
      $('.en__pg.nogift .en__pg__select input[type="radio"]').attr(
        "id",
        "nogift"
      );
      if ($(".en__pg.nogift .en__pg__select label").length == 0) {
        $(".en__pg.nogift .en__pg__select").append(
          '<label for="nogift">Click here to select no gifts</label>'
        );
      }
      if (
        getCookie("premium").length == 0 ||
        getCookie("premium") == "false" ||
        where == "frequency"
      ) {
        console.log("initialload");
        // $('.en__pg.nogift .en__pg__select label[for="nogift"]').click();
        $('.en__pg.nogift .en__pg__select input[type="radio"]').prop(
          "checked",
          true
        );
        $(".en__pg.nogift").addClass("en__pg--selected");
        $(".en__component--premiumgiftblock .en__pgList .en__pg").each(function (
          e
        ) {
          $(this).removeClass("en__pg--selected");
        });
        $("[name='transaction.selprodvariantid']").val("");
      }
    }, 50);
  }
}

function premiumBlockRender() {
  if ($(".en__component--premiumgiftblock").length > 0) {
    setTimeout(function () {
      // prepare premium section DOM for fake buttons
      $(".en__component--premiumgiftblock .en__pgList .en__pg").each(function (
        e
      ) {
        if ($(this).find(".en__pg__select").length > 0) {
          var radioClass = $(this)
            .find(".en__pg__select input")
            .attr("name");
          var radioValue = $(this)
            .find(".en__pg__select input")
            .attr("value");
          var radioId = radioClass + radioValue;
          $(this)
            .find(".en__pg__select input")
            .attr("id", radioId);

          if ($(this).find(".en__pg__select label").length == 0) {
            $(this)
              .find(".en__pg__select")
              .append(
                '<label for="' +
                radioId +
                '">Click here to select thsi gift</label>'
              );
          }
        }

        if ($(this).find("#premium-gift-meta").length > 0) {
          var giftRange = $(this)
            .find("#premium-gift-meta")
            .data("minimum");
          if (giftRange <= +totalDonationAmount()) {
            if ($(this).find(".en__pg__optionType").length > 0) {
              $(this)
                .find(".en__pg__optionType")
                .find("select")
                .prop("disabled", false);
            }
            if (!$(this).hasClass("en__pg--selected")) {
              $(this)
                .find("#premium-gift-button")
                .removeClass("selected more")
                .addClass("available")
                .text("Select");
            } else {
              $(this)
                .find("#premium-gift-button")
                .removeClass("available more")
                .addClass("selected")
                .text("Selected");
            }
          } else if (giftRange > +totalDonationAmount()) {
            $(this)
              .find("#premium-gift-button")
              .removeClass("selected available")
              .addClass("more")
              .text("Give more");
            if ($(this).find(".en__pg__optionType").length > 0) {
              $(this)
                .find(".en__pg__optionType")
                .find("select")
                .prop("disabled", true);
            }
            if ($(this).hasClass("en__pg--selected")) {
              $(this).removeClass("en__pg--selected");
              $('.en__pg.nogift input[type="radio"]').prop("checked", true);
              $(".en__pg.nogift").addClass("en__pg--selected");
              $("[name='transaction.selprodvariantid']").val("");
            } else {
              $(this)
                .find("#premium-gift-button")
                .removeClass("selected available")
                .addClass("more")
                .text("Give more");
            }
          }
        }
      });
    }, 100);
  }
}

function updateCorrespondingAmount() {
  let amount = selectedAmount();
  let frequency = selectedFrequency();
  if (frequency == "monthly") {
    amount = +amount / 12;
  } else {
    amount = +amount * 12;
  }
  amount = amount.toFixed(2);

  amount = amount.replace(".00", "");

  let askLevels = $(
    '.gift-information--block > div:nth-child(2) input[type="radio"]'
  );
  let askLevelMatch = false;
  askLevels.each(function (e) {
    if (!askLevelMatch) {
      if ($(this).val() == amount) {
        askLevelMatch = true;
        $(this).click();
        $(
          '.gift-information--block > div:nth-child(2) .en__field__element--radio .en__field__item.en__field__item--other input[type="text"]'
        ).removeClass("hasvalue");
      }
    }
  });
  if (!askLevelMatch) {
    if (frequency == "monthly") {
      assignAskLevel(monthlyDefault);
    } else {
      assignAskLevel(onetimeDefault);
    }
  }
  premiumBlockRender();

  // assignAskLevel(amount);
}

function updateCorrespondingDefaultAmount() {
  let amount = +selectedAmount();
  let frequency = selectedFrequency();
  amount = amount.toFixed(2);
  amount = amount.replace(".00", "");
  if (fromWhere == "other") {
    $(
      '.gift-information--block > div:nth-child(2) .en__field__element--radio .en__field__item:nth-last-child(2) input[type="radio"]'
    ).click();

    $(
        '.gift-information--block > div:nth-child(2) .en__field__element--radio .en__field__item.en__field__item--other input[type="text"]'
      )
      .val(amount)
      .addClass("hasvalue");
    fromWhere = "other";
  } else {
    if (frequency == "monthly") {
      assignAskLevel(monthlyDefault);
    } else {
      assignAskLevel(onetimeDefault);
    }
  }
  premiumBlockRender();
}

// Gift Info Section Actions
if ($(".gift-information--block").length > 0) {
  // Frequency Change
  $(document).on(
    "change",
    '.gift-information--block > div:nth-child(1) input[type="radio"]',
    function () {
      console.log(fromWhere);
      if (typeof isLeadershipCircle != "undefined" && isLeadershipCircle) {
        updateCorrespondingAmount();
      } else {
        updateCorrespondingDefaultAmount();
      }
      donationAmountLabel();
      mapDonationAmount();
      clearHasValueClass();
      updateRegionalSupportLanguage();
      premiumBlockInitiate("frequency");
      premiumBlockRender();
    }
  );

  // Hightlight other field
  $(document).on(
    "focus",
    'input[class*="en__field__input--other"]',
    function () {
      fromWhere = "other";
      $(
        '.gift-information--block > div:nth-child(2) input[value="Other"]'
      ).prop("checked", true);
      if (
        $('.gift-information--block > div:nth-child(2) input[value="-1"]')
        .length > 0
      ) {
        // this is for suggested amount use
        $('.gift-information--block > div:nth-child(2) input[value="-1"]').prop(
          "checked",
          true
        );
      }
      clearHasValueClass();
    }
  );
  $(document).on("input", ".en__field__input--other", function (e) {
    donationAmountLabel();
    mapDonationAmount();
    premiumBlockRender();
  });
  $(document).on("blur", ".en__field__input--other", function (e) {
    donationAmountLabel();
    mapDonationAmount();
    premiumBlockRender();
  });

  $(document).on(
    "change",
    '.gift-information--block > div:nth-child(2) input[type="radio"]',
    function () {
      fromWhere = "ask";
      $('input[class*="en__field__input--other"]').removeClass("hasvalue");
      $('input[class*="en__field__input--other"]').removeClass("error");
      $('input[class*="en__field__input--other"] + label.error').remove();
      $('input[class*="en__field__input--other"]').val("");
      donationAmountLabel();
      mapDonationAmount();
      premiumBlockRender();
    }
  );
}

// Support Regional Checkbox action
if ($(".support--regional").length > 0) {
  $(document).on(
    "change",
    '.support--regional input[type="checkbox"]',
    function () {
      donationAmountLabel();
      mapDonationAmount();
      premiumBlockRender();
    }
  );
}

// Pyament method change action
if ($(".payment--info").length > 0) {
  // show tooltips when needed
  $(document).on(
    "change",
    '.payment--info > div:nth-child(1) input[type="radio"]',
    function () {
      whyBankToolTipToggle();
      bankInfoLinkToggle();
    }
  );

  // auto detect payment type - visa - mc-amex-dis
  $(".en__field--ccnumber input[type='text']").on(
    "change paste keyup",
    function () {
      var thisNum = $(this).val();
      $("#en__field_transaction_paymenttype").val(detectCardType(thisNum));
    }
  );
}

// Premium block
if ($(".en__component--premiumgiftblock").length > 0) {
  $(document).on("change", ".en__pg__optionType select", function () {
    premiumBlockRender();
  });
  $(document).on(
    "change",
    '.en__pg.nogift .en__pg__select input[type="radio"]',
    function () {
      premiumBlockRender();
    }
  );

  $(document).on("click", ".premium-button.available", function () {
    var radioSelectButton = $(this)
      .parent()
      .parent()
      .parent()
      .parent()
      .find(".en__pg__select")
      .find('input[type="radio"] + label');
    var itemEnPage = $(this)
      .parent()
      .parent()
      .parent()
      .parent()
      .parent();

    $(radioSelectButton).click();
    premiumBlockRender();
  });

  $(document).on("click", ".premium-button.more", function () {
    console.log("give mroe");
    $("html, body").animate({
        scrollTop: $("#main").offset().top
      },
      1000
    );
  });
}

$(document).ready(function () {
  setCookieNoPath("visitedbypage", +getCookie("visitedbypage") + 1);
  if ($(".en__errorHeader").length > 0) {
    $(".en__component.en__component--row.en__component--row--2").before(
      $(".en__errorHeader").detach()
    );
  }
  if ($(".en__errorList").length > 0) {
    $(".en__component.en__component--row.en__component--row--2").before(
      $(".en__errorList").detach()
    );
  }
  if ($(".gift-information--block").length > 0) {
    $('input[class*="en__field__input--other"]').attr("placeholder", "Other");
    $('input[class*="en__field__input--other"]').attr("autocomplete", "off");
  }
  if ($("#why-bank").length > 0) {
    $(".payment--info > div:first-child").after(
      $("#why-bank")
      .parent()
      .detach()
    );
  }

  if (getCookie("processed").length == 0) {
    if (getUrlParameter("frequency").length > 0) {
      if (getUrlParameter("frequency").toLowerCase() == "onetime") {
        $(
          '.gift-information--block >div:nth-child(1) input[value="onetime"]'
        ).click();
      } else if (getUrlParameter("frequency").toLowerCase() == "monthly") {
        $(
          '.gift-information--block >div:nth-child(1) input[value="monthly"]'
        ).click();
      }
    }
    var defaultAmount = 0;
    if (getUrlParameter("amt").length > 0 && !isNaN(getUrlParameter("amt"))) {
      defaultAmount = getUrlParameter("amt");
    } else {
      if (selectedFrequency() == "monthly") {
        defaultAmount = monthlyDefault;
      }
      if (selectedFrequency() == "onetime") {
        defaultAmount = onetimeDefault;
      }
    }
    setTimeout(function () {
      assignAskLevel(defaultAmount);
    }, 0);
  }

  premiumBlockInitiate("pageload");
  premiumBlockRender();
  if ($(".gift-information--block").length > 0) {
    mapDonationAmount();
    donationAmountLabel();
  }
  whyBankToolTipToggle();
  bankInfoLinkToggle();
  updateRegionalSupportLanguage();
  clearHasValueClass();
});
window.enOnError = function () {
  $("html, body").animate({
      scrollTop: $(".en__field__error:visible")
        .first()
        .offset().top - 80
    },
    500
  );
};
window.enOnSubmit = function () {
  // this will make sure the right donation amount is mapped
  mapDonationAmount();
  setCookieNoPath("processed", true);
  setCookieNoPath("premium", true);
  // return true to submit the form
  return true;
};