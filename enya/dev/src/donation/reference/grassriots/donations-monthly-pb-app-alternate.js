webpackJsonp([1], [, function (e, t) {
  e.exports = {
    debug: {
      locale: "en-us"
    },
    buttons: {
      next: 'Next<span class="glyphicon glyphicon-chevron-right">',
      back: '<span class="glyphicon glyphicon-chevron-left"></span>Back',
      donate: "Donate",
      complete: "Complete Order",
      monthly: " monthly",
      select_button: "Select",
      learn_more: "learn more"
    },
    steps: {
      amount: "Donation amount",
      memorial: "Memorial / Honor",
      billing: "Billing",
      payment: "Payment",
      need_help: "Need help?"
    },
    thermometer: {
      percent_label: " of goal reached"
    },
    tickets: {
      attendee_label: "Attendee",
      attendees_label: "Attendees"
    },
    billing: {
      contact_info_title: "Contact Information"
    },
    labels: {
      single: "One-time gift",
      monthly: "Monthly gift",
      one_time: "My one-time donation amount:",
      recurring: "Choose your monthly donation amount:",
      review_order_reminder: "You will be able to review your order summary before your payment is processed",
      state: "State*",
      province: "Province*",
      state_region: "State/Region",
      expiry_month: "MM",
      expiry_year: "YY",
      currency_symbol: "$ Other",
      check_directions: "Use these numbers from the bottom of your check:"
    },
    errors: {
      missing_prayer: "Please enter your prayer.",
      missing_rating: "Please make a selection between 1 and 10.",
      invalid_cvv: "Invalid verification number",
      invalid_routing_number: "Invalid US Routing Transit Number - it should be exactly 9 digits",
      invalid_amount: "We only accept online donations between $5 and $10,000",
      invalid_expiration_date: "Expiration date must be in the future",
      invalid_email: "Please enter a valid email address.",
      invalid_postcode: "Please enter a valid postcode",
      invalid_phone: "Please specify a valid phone number",
      invalid_recaptcha: 'Please click the "<i>I’m not a robot </i>" checkbox to validate your donation',
      is_required: "{0} is required.",
      simple_is_required: " is required",
      is_digits: "{0} can only be numbers (0-9)",
      name_mapper: {
        "transaction.donationAmt.other": "Donation Amount",
        "supporter.postcode": "Zip/postal code",
        "supporter.city": "City / Town",
        "supporter.address1": "Address 1",
        "transaction.paymenttype": "A valid credit card type",
        "supporter.region": "State / Province / Region",
        "transaction.ccexpire": "Credit Card Expiration ",
        "transaction.ccvv": "CVV2"
      }
    },
    order_summary: {
      page_title: "Order details",
      price_label: "Price ",
      amount_label: "Amount ",
      promo_label: " promo",
      subtotal_label: "Subtotal ",
      total_label: "Total ",
      additional_donation_desc: "Your gift helps, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis."
    },
    post_action: {
      sent_button_ty: "Sent, thank you!",
      available_seats: "Seats:",
      promo_label: "Promo",
      donation_label: "Optional Donation"
    },
    rollcall: {
      just_donated: "just donated"
    },
    modals: {
      need_help_title: "Help!",
      need_help_body: "Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
      close: "Close"
    }
  }
}, function (e, t, n) {
  (function (t) {
    function n(e) {
      if (missing = h(e, ["name", "options"])) throw new Error("[GRHelpers] Missing required options: " + missing.join(", "));
      var n, o = '%label%<select name="%name%" %id% %class% %atts%>%placeholder%</select>'.replace(/%label%/g, e.label ? '<label for="%id%">' + e.label + "</label>" : "").replace(/%name%/g, e.name ? e.name : "").replace(/%id%/g, e.id ? 'id="' + e.id + '"' : 'id="' + e.name.replace(/[^a-zA-Z0-9\-\_]/g, "-") + '"').replace(/%placeholder%/g, e.placeholder ? '<option value="">' + e.placeholder + "</option>" : e.label ? '<option value="">' + e.label + "</option>" : "").replace(/%class%/g, e.classes ? 'class="' + e.classes + '"' : "").replace(/%atts%/g, e.atts ? e.atts.join(" ") : "");
      n = void 0 !== e.wrap ? t(e.wrap).html(o) : t(o);
      for (var a = 0; a < e.options.length; a++) n.filter("select").append('<option value="' + e.options[a].code + '">' + e.options[a].name + "</option>");
      return n
    }

    function o(e) {
      if (missing = h(e, ["name", "value", "label"])) throw new Error("[GRHelpers] Missing required options: " + missing.join(", "));
      var n = '<input type="radio" name="%name%" value="%value%" id="%id%" %class% %atts%/><label for="%id%">%label%</label>'.replace(/%label%/g, e.label ? e.label : "").replace(/%name%/g, e.name ? e.name : "").replace(/%value%/g, e.value ? e.value : "").replace(/%id%/g, e.id ? e.id : (e.name + e.value).replace(/[^a-zA-Z0-9\-\_]/g, "-")).replace(/%class%/g, e.classNames ? 'class="' + e.classNames.join(" ") + '"' : "").replace(/%atts%/g, e.atts ? e.atts.join(" ") : "");
      return void 0 !== e.wrap ? t(e.wrap).html(n) : t(n)
    }

    function a(e) {
      if (missing = h(e, ["name"])) throw new Error("[GRHelpers] Missing required options: " + missing.join(", "));
      var n = '%label%<input type="text" name="%name%" value="%value%" id="%id%" %placeholder% %class% %atts%/>'.replace(/%label%/g, e.label ? '<label for="%id%">' + e.label + "</label>" : "").replace(/%name%/g, e.name ? e.name : "").replace(/%value%/g, e.value ? e.value : "").replace(/%id%/g, e.id ? e.id : e.name.replace(/[^a-zA-Z0-9\-\_]/g, "-")).replace(/%placeholder%/g, e.placeholder ? 'placeholder="' + e.placeholder + '"' : "").replace(/%class%/g, e.classNames ? 'class="' + e.classNames.join(" ") + '"' : "").replace(/%atts%/g, e.atts ? e.atts.join(" ") : "");
      return void 0 !== e.wrap ? t(e.wrap).html(n) : t(n)
    }

    function i(e, t, n) {
      var o;
      if ("string" != typeof e) return !1; {
        if (!(o = p(e, t))) return e.indexOf("?") >= 0 ? e + "&" + t + "=" + n : e + "?" + t + "=" + n;
        if (o !== n) {
          var a = new RegExp(t + "=([^&;]+?)(&|#|;|$)"),
            i = a.exec(e);
          return e.replace(a, encodeURIComponent(t) + "=" + encodeURIComponent(n) + (i.length ? i[2] : ""))
        }
      }
    }

    function r(e, t) {
      void 0 === t && (t = "en");
      var n = {};
      for (var o in e) switch (t) {
        case "luminate":
          n[o] = {
            name: e[o],
            nameNoSpace: e[o].replace(/\s/g, "_"),
            selector: '[name="' + e[o] + '"]',
            container: "#" + e[o].replace(/name$/, "") + "_row,#" + e[o].replace(/name$/, "") + "_Row"
          };
          break;
        case "pagebuilder":
          var a = e[o].split(".");
          n[o] = {
            name: e[o],
            nameNoSpace: e[o].replace(/\s/g, "_"),
            selector: '[name="' + e[o] + '"]:not(a)',
            container: ".en__field--" + a[a.length - 1]
          };
          break;
        default:
          n[o] = {
            name: e[o],
            nameNoSpace: e[o].replace(/\s/g, "_"),
            selector: '[name="' + e[o] + '"]:not(a)',
            container: "#" + e[o].replace(/\s/g, "_") + "Div"
          }
      }
      return n
    }

    function s(e, n, o) {
      if (void 0 === e) throw new Error("[GRHelpers] Missing $form for disableButtons");
      void 0 === n && (n = 'input[type="submit"], button.btn-next'), void 0 === o && (o = "Sending..."), e.find(n).each(function () {
        switch (t(this).attr("disabled", "disabled"), t(this).prop("tagName").toLowerCase()) {
          case "input":
            t(this).data("orignalLabel", t(this).val()), t(this).val(o);
            break;
          case "button":
            t(this).data("orignalLabel", t(this).html()), t(this).html(o)
        }
      })
    }

    function l(e, n) {
      if (void 0 === e) throw new Error("[GRHelpers] Missing $form for enableButtons");
      void 0 === n && (n = 'input[type="submit"], button.btn-next'), e.find(n).each(function () {
        switch (t(this).removeAttr("disabled"), t(this).prop("tagName").toLowerCase()) {
          case "input":
            t(this).val(t(this).data("orignalLabel"));
            break;
          case "button":
            t(this).html(t(this).data("orignalLabel"))
        }
      })
    }

    function c(e) {
      return p(location.search, e)
    }

    function p(e, t) {
      return _(decodeURIComponent((new RegExp("[?|&]" + t + "=([^&;]+?)(&|#|;|$)").exec(e) || [, ""])[1].replace(/\+/g, "%20")) || null)
    }

    function d(e) {
      switch (e.prop("tagName").toLowerCase()) {
        case "select":
          return e.val();
        default:
          switch (e.attr("type").toLowerCase()) {
            case "checkbox":
              var n = [];
              return e.filter(":checked").each(function (e) {
                n[e] = t(this).val()
              }), n;
            case "radio":
              return e.filter(":checked").length ? e.filter(":checked").val() : "";
            default:
              return e.val()
          }
      }
    }

    function u(e, n) {
      void 0 === n && (n = !1), t.each(e, function (e, o) {
        if ("string" == typeof o) t(e).append(n ? t(o) : t(o).contents());
        else if (Array.isArray(o))
          for (var a = t(e), i = 0; i < o.length; i++) a.append(n ? t(o[i]) : t(o[i]).contents())
      })
    }

    function m(e, t, n) {
      switch (null == n && (n = !1), e.prop("tagName").toLowerCase()) {
        case "select":
          if (0 == e.find('option[value="' + t + '"]').length) {
            if (n) return !1;
            e.append('<option value="' + t + '">' + t + "</option>")
          }
          e.val(t);
          break;
        default:
          switch (e.attr("type").toLowerCase()) {
            case "checkbox":
            case "radio":
              if (!e.filter('[value="' + t + '"]').length) return !1;
              e.filter('[value="' + t + '"]').prop("checked", !0);
              break;
            default:
              e.val(t)
          }
      }
      return !0
    }

    function h(e, t) {
      for (var n = [], o = 0; o < t.length; o++) void 0 === e[t[o]] && n.push(t[o]);
      return !!n.length && n
    }

    function f(e, t, n, o) {
      var a = t.html();
      o = void 0 !== o ? o : {
        start: "{",
        end: "}"
      };
      for (var i in n) {
        var r = new RegExp(o.start + "user_data~" + n[i].name + o.end, "g");
        a = a.replace(r, _(e.find(n[i].selector).val()))
      }
      t.html(a)
    }

    function g(e, n) {
      t(e).on("change", function (o) {
        void 0 !== n[d(t(e))] && (n[d(t(e))].hide && t(n[d(t(e))].hide.join(", ")).hide().find("input, select, textarea").prop("disabled", !0), n[d(t(e))].show && t(n[d(t(e))].show.join(", ")).show().find("input, select, textarea").prop("disabled", !1))
      })
    }

    function _(e) {
      return void 0 === e || null === e ? null : e.replace(/<script[^>]*?>.*?<\/script>/gi, "").replace(/<[\/\!]*?[^<>]*?>/gi, "").replace(/<style[^>]*?>.*?<\/style>/gi, "").replace(/<![\s\S]*?--[ \t\n\r]*>/gi, "").replace(/\n/, "<br />")
    }

    function v(e) {
      return e += "", e.charAt(0).toUpperCase() + e.substr(1)
    }

    function b(e) {
      var n, o, a, i = function (e, n) {
          var o = t.trim(e).replace(/\s*\\\:\s*/g, "[[COLON]]").split(/\s*\:\s*/);
          return t.trim(o[1]).replace(/[^0-9\.]/g, "") != t.trim(o[1]) || isNaN(parseFloat(t.trim(o[1]))) ? n[t.trim(o[0])] = t.trim(o[1].replace(/\[\[COLON\]\]/g, ":")) : n[t.trim(o[0])] = parseFloat(t.trim(o[1])), n
        },
        r = [],
        s = t.trim(t(e).html()).replace(/^\-/, ""),
        l = s.split(/\n\s+?-/);
      for (o = 0; o < l.length; o++)
        if ((n = t.trim(l[o]).split(/\s*;\s*/)) instanceof Array && n.length > 1) {
          var c = {};
          for (a = 0; a < n.length; a++) c = i(n[a], c);
          r.push(c)
        } else n instanceof Array && n[0].indexOf(":") >= 0 ? r instanceof Array && 0 == r.length ? (r = {}, r = i(n, r)) : r instanceof Array ? r.push(n[0]) : r = i(n, r) : n instanceof Array ? r.push(n[0]) : r.push(n);
      return r
    }
    e.exports = {
      addURLParameter: i,
      createRadioComponent: o,
      createSelectComponent: n,
      createTextComponent: a,
      buildFieldNameObject: r,
      disableButtons: s,
      enableButtons: l,
      getURLParameter: c,
      getAnyURLParameter: p,
      getValue: d,
      hasMissingOptions: h,
      moveToTargets: u,
      replaceENTemplateTags: f,
      sanitize: _,
      setValue: m,
      simpleParser: b,
      toggleFields: g,
      ucFirst: v
    }
  }).call(t, n(0))
}, , , function (e, t) {
  e.exports = {
    debug: {
      locale: "en-au"
    },
    buttons: {
      next: 'Next<span class="glyphicon glyphicon-chevron-right">',
      back: '<span class="glyphicon glyphicon-chevron-left"></span>Back',
      donate: "Donate",
      complete: "Complete Order",
      monthly: " monthly",
      select_button: "Select",
      learn_more: "learn more"
    },
    steps: {
      amount: "Donation amount",
      memorial: "Memorial / Honor",
      billing: "Billing",
      payment: "Payment",
      need_help: "Need help?"
    },
    thermometer: {
      percent_label: " of goal reached"
    },
    tickets: {
      attendee_label: "Attendee",
      attendees_label: "Attendees"
    },
    billing: {
      contact_info_title: "Contact Information"
    },
    labels: {
      single: "One-time gift",
      monthly: "Monthly gift",
      one_time: "My one-time donation amount:",
      recurring: "Choose your monthly donation amount:",
      review_order_reminder: "You will be able to review your order summary before your payment is processed",
      state: "State*",
      province: "Province*",
      state_region: "State/Region",
      expiry_month: "MM",
      expiry_year: "YY",
      currency_symbol: "$ Other",
      check_directions: "Use these numbers from the bottom of your check:"
    },
    errors: {
      missing_prayer: "Please enter your prayer.",
      missing_rating: "Please make a selection between 1 and 10.",
      invalid_cvv: "Invalid verification number",
      invalid_routing_number: "Invalid US Routing Transit Number - it should be exactly 9 digits",
      invalid_amount: "We only accept online donations between $5 and $10,000",
      invalid_expiration_date: "Expiration date must be in the future",
      invalid_email: "Please enter a valid email address.",
      invalid_postcode: "Please enter a valid postcode",
      invalid_phone: "Please specify a valid phone number",
      invalid_recaptcha: 'Please click the "<i>I’m not a robot </i>" checkbox to validate your donation',
      is_required: "{0} is required.",
      simple_is_required: " is required",
      is_digits: "{0} can only be numbers (0-9)",
      name_mapper: {
        "transaction.donationAmt.other": "Donation Amount",
        "supporter.postcode": "Zip/postal code",
        "supporter.city": "City / Town",
        "supporter.address1": "Address 1",
        "supporter.address2": "Suite",
        "transaction.paymenttype": "A valid credit card type",
        "supporter.region": "State / Province / Region",
        "transaction.ccexpire": "Credit Card Expiration ",
        "transaction.ccvv": "CVV2"
      }
    },
    order_summary: {
      page_title: "Order details",
      price_label: "Price ",
      amount_label: "Amount ",
      promo_label: " promo",
      subtotal_label: "Subtotal ",
      total_label: "Total ",
      additional_donation_desc: "Your gift helps, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis."
    },
    post_action: {
      sent_button_ty: "Sent, thank you!",
      available_seats: "Seats:",
      promo_label: "Promo",
      donation_label: "Optional Donation"
    },
    rollcall: {
      just_donated: "just donated"
    },
    modals: {
      need_help_title: "Help!",
      need_help_body: "Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
      close: "Close"
    }
  }
}, function (e, t) {
  e.exports = {
    debug: {
      locale: "en-ca"
    },
    buttons: {
      next: 'Next<span class="glyphicon glyphicon-chevron-right">',
      back: '<span class="glyphicon glyphicon-chevron-left"></span>Back',
      donate: "Donate",
      complete: "Complete Order",
      monthly: " monthly",
      select_button: "Select",
      learn_more: "learn more"
    },
    steps: {
      amount: "Donation amount",
      memorial: "Memorial / Honor",
      billing: "Billing",
      payment: "Payment",
      need_help: "Need help?"
    },
    thermometer: {
      percent_label: " of goal reached"
    },
    tickets: {
      attendee_label: "Attendee",
      attendees_label: "Attendees"
    },
    billing: {
      contact_info_title: "Contact Information"
    },
    labels: {
      single: "One-time gift",
      monthly: "Monthly gift",
      one_time: "My one-time donation amount:",
      recurring: "Choose your monthly donation amount:",
      review_order_reminder: "You will be able to review your order summary before your payment is processed",
      state: "State*",
      province: "Province*",
      state_region: "State/Region",
      expiry_month: "MM",
      expiry_year: "YY",
      currency_symbol: "$ Other",
      check_directions: "Use these numbers from the bottom of your check:"
    },
    errors: {
      missing_prayer: "Please enter your prayer.",
      missing_rating: "Please make a selection between 1 and 10.",
      invalid_cvv: "Invalid verification number",
      invalid_routing_number: "Invalid US Routing Transit Number - it should be exactly 9 digits",
      invalid_amount: "We only accept online donations between $5 and $10,000",
      invalid_expiration_date: "Expiration date must be in the future",
      invalid_email: "Please enter a valid email address.",
      invalid_postcode: "Please enter a valid postcode",
      invalid_phone: "Please specify a valid phone number",
      invalid_recaptcha: 'Please click the "<i>I’m not a robot </i>" checkbox to validate your donation',
      is_required: "{0} is required.",
      simple_is_required: " is required",
      is_digits: "{0} can only be numbers (0-9)",
      name_mapper: {
        "transaction.donationAmt.other": "Donation Amount",
        "supporter.postcode": "Zip/postal code",
        "supporter.city": "City / Town",
        "supporter.address1": "Address 1",
        "transaction.paymenttype": "A valid credit card type",
        "supporter.region": "State / Province / Region",
        "transaction.ccexpire": "Credit Card Expiration ",
        "transaction.ccvv": "CVV2"
      }
    },
    order_summary: {
      page_title: "Order details",
      price_label: "Price ",
      amount_label: "Amount ",
      promo_label: " promo",
      subtotal_label: "Subtotal ",
      total_label: "Total ",
      additional_donation_desc: "Your gift helps, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis."
    },
    post_action: {
      sent_button_ty: "Sent, thank you!",
      available_seats: "Seats:",
      promo_label: "Promo",
      donation_label: "Optional Donation"
    },
    rollcall: {
      just_donated: "just donated"
    },
    modals: {
      need_help_title: "Help!",
      need_help_body: "Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
      close: "Close"
    }
  }
}, function (e, t) {
  e.exports = {
    debug: {
      locale: "en-cb"
    },
    buttons: {
      next: 'Next<span class="glyphicon glyphicon-chevron-right">',
      back: '<span class="glyphicon glyphicon-chevron-left"></span>Back',
      donate: "Donate",
      complete: "Complete Order",
      monthly: " monthly",
      select_button: "Select",
      learn_more: "learn more"
    },
    steps: {
      amount: "Donation amount",
      memorial: "Memorial / Honor",
      billing: "Billing",
      payment: "Payment",
      need_help: "Need help?"
    },
    thermometer: {
      percent_label: " of goal reached"
    },
    tickets: {
      attendee_label: "Attendee",
      attendees_label: "Attendees"
    },
    billing: {
      contact_info_title: "Contact Information"
    },
    labels: {
      single: "One-time gift",
      monthly: "Monthly gift",
      one_time: "My one-time donation amount:",
      recurring: "Choose your monthly donation amount:",
      review_order_reminder: "You will be able to review your order summary before your payment is processed",
      state: "State*",
      province: "Province*",
      state_region: "State/Region",
      expiry_month: "MM",
      expiry_year: "YY",
      currency_symbol: "$ Other",
      check_directions: "Use these numbers from the bottom of your check:"
    },
    errors: {
      missing_prayer: "Please enter your prayer.",
      missing_rating: "Please make a selection between 1 and 10.",
      invalid_cvv: "Invalid verification number",
      invalid_routing_number: "Invalid US Routing Transit Number - it should be exactly 9 digits",
      invalid_amount: "We only accept online donations between $5 and $10,000",
      invalid_expiration_date: "Expiration date must be in the future",
      invalid_email: "Please enter a valid email address.",
      invalid_postcode: "Please enter a valid postcode",
      invalid_phone: "Please specify a valid phone number",
      invalid_recaptcha: 'Please click the "<i>I’m not a robot </i>" checkbox to validate your donation',
      is_required: "{0} is required.",
      simple_is_required: " is required",
      is_digits: "{0} can only be numbers (0-9)",
      name_mapper: {
        "transaction.donationAmt.other": "Donation Amount",
        "supporter.postcode": "Zip/postal code",
        "supporter.city": "City / Town",
        "supporter.address1": "Address 1",
        "transaction.paymenttype": "A valid credit card type",
        "supporter.region": "State / Province / Region",
        "transaction.ccexpire": "Credit Card Expiration ",
        "transaction.ccvv": "CVV2"
      }
    },
    order_summary: {
      page_title: "Order details",
      price_label: "Price ",
      amount_label: "Amount ",
      promo_label: " promo",
      subtotal_label: "Subtotal ",
      total_label: "Total ",
      additional_donation_desc: "Your gift helps, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis."
    },
    post_action: {
      sent_button_ty: "Sent, thank you!",
      available_seats: "Seats:",
      promo_label: "Promo",
      donation_label: "Optional Donation"
    },
    rollcall: {
      just_donated: "just donated"
    },
    modals: {
      need_help_title: "Help!",
      need_help_body: "Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
      close: "Close"
    }
  }
}, function (e, t) {
  e.exports = {
    debug: {
      locale: "en-gb"
    },
    buttons: {
      next: 'Next<span class="glyphicon glyphicon-chevron-right">',
      back: '<span class="glyphicon glyphicon-chevron-left"></span>Back',
      donate: "Donate",
      complete: "Complete Order",
      monthly: " monthly",
      select_button: "Select",
      learn_more: "learn more"
    },
    steps: {
      amount: "Donation amount",
      memorial: "Memorial / Honor",
      billing: "Your Details",
      payment: "Payment",
      need_help: "Need help?"
    },
    thermometer: {
      percent_label: " of goal reached"
    },
    tickets: {
      attendee_label: "Attendee",
      attendees_label: "Attendees"
    },
    billing: {
      contact_info_title: "Contact Information"
    },
    labels: {
      single: "One-time gift",
      monthly: "Monthly gift",
      one_time: "My one-time donation amount:",
      recurring: "Choose your monthly donation amount:",
      review_order_reminder: "You will be able to review your order summary before your payment is processed",
      state: "State*",
      province: "Province*",
      state_region: "State/Region",
      expiry_month: "MM",
      expiry_year: "YY",
      currency_symbol: "£ Other",
      check_directions: "Use these numbers from the bottom of your check:"
    },
    errors: {
      missing_prayer: "Please enter your prayer.",
      missing_rating: "Please make a selection between 1 and 10.",
      invalid_cvv: "Invalid verification number",
      invalid_routing_number: "Invalid US Routing Transit Number - it should be exactly 9 digits",
      invalid_amount: "We only accept online donations between £5 and £10,000",
      invalid_expiration_date: "Expiration date must be in the future",
      invalid_email: "Please enter a valid email address.",
      invalid_postcode: "Please enter a valid postcode",
      invalid_phone: "Please specify a valid phone number",
      invalid_recaptcha: 'Please click the "<i>I’m not a robot </i>" checkbox to validate your donation',
      is_required: "{0} is required.",
      simple_is_required: " is required",
      is_digits: "{0} can only be numbers (0-9)",
      name_mapper: {
        "transaction.donationAmt.other": "Donation Amount",
        "supporter.postcode": "Zip/postal code",
        "supporter.city": "City / Town",
        "supporter.address1": "House/building #",
        "supporter.address2": "Flat #",
        "transaction.paymenttype": "A valid credit card type",
        "supporter.region": "State / Province / Region",
        "transaction.ccexpire": "Credit Card Expiration ",
        "transaction.ccvv": "Security Code"
      }
    },
    order_summary: {
      page_title: "Order details",
      price_label: "Price ",
      amount_label: "Amount ",
      promo_label: " promo",
      subtotal_label: "Subtotal ",
      total_label: "Total ",
      additional_donation_desc: "Your gift helps, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis."
    },
    post_action: {
      sent_button_ty: "Sent, thank you!",
      available_seats: "Seats:",
      promo_label: "Promo",
      donation_label: "Optional Donation"
    },
    rollcall: {
      just_donated: "just donated"
    },
    modals: {
      need_help_title: "Help!",
      need_help_body: "Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
      close: "Close"
    }
  }
}, function (e, t) {
  e.exports = {
    debug: {
      locale: "en-ie"
    },
    buttons: {
      next: 'Next<span class="glyphicon glyphicon-chevron-right">',
      back: '<span class="glyphicon glyphicon-chevron-left"></span>Back',
      donate: "Donate",
      complete: "Complete Order",
      monthly: " monthly",
      select_button: "Select",
      learn_more: "learn more"
    },
    steps: {
      amount: "Donation amount",
      memorial: "Memorial / Honor",
      billing: "Billing",
      payment: "Payment",
      need_help: "Need help?"
    },
    thermometer: {
      percent_label: " of goal reached"
    },
    tickets: {
      attendee_label: "Attendee",
      attendees_label: "Attendees"
    },
    billing: {
      contact_info_title: "Contact Information"
    },
    labels: {
      single: "One-time gift",
      monthly: "Monthly gift",
      one_time: "My one-time donation amount:",
      recurring: "Choose your monthly donation amount:",
      review_order_reminder: "You will be able to review your order summary before your payment is processed",
      state: "State*",
      province: "Province*",
      state_region: "State/Region",
      expiry_month: "MM",
      expiry_year: "YY",
      currency_symbol: "€ Other",
      check_directions: "Use these numbers from the bottom of your check:"
    },
    errors: {
      missing_prayer: "Please enter your prayer.",
      missing_rating: "Please make a selection between 1 and 10.",
      invalid_cvv: "Invalid verification number",
      invalid_routing_number: "Invalid US Routing Transit Number - it should be exactly 9 digits",
      invalid_amount: "We only accept online donations between €5 and €10,000",
      invalid_expiration_date: "Expiration date must be in the future",
      invalid_email: "Please enter a valid email address.",
      invalid_postcode: "Please enter a valid postcode",
      invalid_phone: "Please specify a valid phone number",
      invalid_recaptcha: 'Please click the "<i>I’m not a robot </i>" checkbox to validate your donation',
      is_required: "{0} is required.",
      simple_is_required: " is required",
      is_digits: "{0} can only be numbers (0-9)",
      name_mapper: {
        "transaction.donationAmt.other": "Donation Amount",
        "supporter.postcode": "Zip/postal code",
        "supporter.city": "City / Town",
        "supporter.address1": "Address 1",
        "transaction.paymenttype": "A valid credit card type",
        "supporter.region": "State / Province / Region",
        "transaction.ccexpire": "Credit Card Expiration ",
        "transaction.ccvv": "CVV2"
      }
    },
    order_summary: {
      page_title: "Order details",
      price_label: "Price ",
      amount_label: "Amount ",
      promo_label: " promo",
      subtotal_label: "Subtotal ",
      total_label: "Total ",
      additional_donation_desc: "Your gift helps, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis."
    },
    post_action: {
      sent_button_ty: "Sent, thank you!",
      available_seats: "Seats:",
      promo_label: "Promo",
      donation_label: "Optional Donation"
    },
    rollcall: {
      just_donated: "just donated"
    },
    modals: {
      need_help_title: "Help!",
      need_help_body: "Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
      close: "Close"
    }
  }
}, function (e, t) {
  e.exports = {
    debug: {
      locale: "en-fr"
    },
    buttons: {
      next: 'Next<span class="glyphicon glyphicon-chevron-right">',
      back: '<span class="glyphicon glyphicon-chevron-left"></span>Back',
      donate: "Donate",
      complete: "Complete Order",
      monthly: " monthly",
      select_button: "Select",
      learn_more: "learn more"
    },
    steps: {
      amount: "Donation amount",
      memorial: "Memorial / Honor",
      billing: "Billing",
      payment: "Payment",
      need_help: "Need help?"
    },
    thermometer: {
      percent_label: " of goal reached"
    },
    tickets: {
      attendee_label: "Attendee",
      attendees_label: "Attendees"
    },
    billing: {
      contact_info_title: "Contact Information"
    },
    labels: {
      single: "One-time gift",
      monthly: "Monthly gift",
      one_time: "My one-time donation amount:",
      recurring: "Choose your monthly donation amount:",
      review_order_reminder: "You will be able to review your order summary before your payment is processed",
      state: "State*",
      province: "Province*",
      state_region: "State/Region",
      expiry_month: "MM",
      expiry_year: "YY",
      currency_symbol: "$ Other",
      check_directions: "Use these numbers from the bottom of your check:"
    },
    errors: {
      missing_prayer: "Please enter your prayer.",
      missing_rating: "Please make a selection between 1 and 10.",
      invalid_cvv: "Invalid verification number",
      invalid_routing_number: "Invalid US Routing Transit Number - it should be exactly 9 digits",
      invalid_amount: "We only accept online donations between $5 and $10,000",
      invalid_expiration_date: "Expiration date must be in the future",
      invalid_email: "Please enter a valid email address.",
      invalid_postcode: "Please enter a valid postcode",
      invalid_phone: "Please specify a valid phone number",
      invalid_recaptcha: 'Please click the "<i>I’m not a robot </i>" checkbox to validate your donation',
      is_required: "{0} is required.",
      simple_is_required: " is required",
      is_digits: "{0} can only be numbers (0-9)",
      name_mapper: {
        "transaction.donationAmt.other": "Donation Amount",
        "supporter.postcode": "Zip/postal code",
        "supporter.city": "City / Town",
        "supporter.address1": "Address 1",
        "transaction.paymenttype": "A valid credit card type",
        "supporter.region": "State / Province / Region",
        "transaction.ccexpire": "Credit Card Expiration ",
        "transaction.ccvv": "CVV2"
      }
    },
    order_summary: {
      page_title: "Order details",
      price_label: "Price ",
      amount_label: "Amount ",
      promo_label: " promo",
      subtotal_label: "Subtotal ",
      total_label: "Total ",
      additional_donation_desc: "Your gift helps, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis."
    },
    post_action: {
      sent_button_ty: "Sent, thank you!",
      available_seats: "Seats:",
      promo_label: "Promo",
      donation_label: "Optional Donation"
    },
    rollcall: {
      just_donated: "just donated"
    },
    modals: {
      need_help_title: "Help!",
      need_help_body: "Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.",
      close: "Close"
    }
  }
}, , function (e, t) {
  e.exports = {
    USD: "$",
    CAD: "$",
    AUD: "$",
    NZD: "$",
    EUR: "€",
    CRC: "₡",
    GBP: "£",
    ILS: "₪",
    INR: "₹",
    JPY: "¥",
    KRW: "₩",
    NGN: "₦",
    PHP: "₱",
    PLN: "zł",
    PYG: "₲",
    THB: "฿",
    UAH: "₴",
    VND: "₫"
  }
}, function (e, t) {
  e.exports = {
    name: "Province*",
    regions: [{
      name: "Alberta",
      code: "AB"
    }, {
      name: "British Columbia",
      code: "BC"
    }, {
      name: "Manitoba",
      code: "MB"
    }, {
      name: "New Brunswick",
      code: "NB"
    }, {
      name: "Newfoundland",
      code: "NL"
    }, {
      name: "Northwest Territories",
      code: "NT"
    }, {
      name: "Nova Scotia",
      code: "NS"
    }, {
      name: "Nunavut",
      code: "NU"
    }, {
      name: "Ontario",
      code: "ON"
    }, {
      name: "Prince Edward Island",
      code: "PE"
    }, {
      name: "Quebec",
      code: "QC"
    }, {
      name: "Saskatchewan",
      code: "SK"
    }, {
      name: "Yukon Territory",
      code: "YT"
    }]
  }
}, function (e, t) {
  e.exports = {
    name: "State*",
    regions: [{
      name: "Alabama",
      code: "AL"
    }, {
      name: "Alaska",
      code: "AK"
    }, {
      name: "Arizona",
      code: "AZ"
    }, {
      name: "Arkansas",
      code: "AR"
    }, {
      name: "California",
      code: "CA"
    }, {
      name: "Colorado",
      code: "NC"
    }, {
      name: "Connecticut",
      code: "CT"
    }, {
      name: "Delaware",
      code: "DE"
    }, {
      name: "District of Columbia",
      code: "DC"
    }, {
      name: "Florida",
      code: "FL"
    }, {
      name: "Georgia",
      code: "GA"
    }, {
      name: "Guam",
      code: "GU"
    }, {
      name: "Hawaii",
      code: "HI"
    }, {
      name: "Idaho",
      code: "ID"
    }, {
      name: "Illinois",
      code: "IL"
    }, {
      name: "Indiana",
      code: "IN"
    }, {
      name: "Iowa",
      code: "IA"
    }, {
      name: "Kansas",
      code: "KS"
    }, {
      name: "Kentucky",
      code: "KY"
    }, {
      name: "Louisiana",
      code: "LA"
    }, {
      name: "Maine",
      code: "ME"
    }, {
      name: "Maryland",
      code: "MD"
    }, {
      name: "Massachusetts",
      code: "MA"
    }, {
      name: "Michigan",
      code: "MI"
    }, {
      name: "Minnesota",
      code: "Mn"
    }, {
      name: "Mississippi",
      code: "MS"
    }, {
      name: "Missouri",
      code: "MO"
    }, {
      name: "Montana",
      code: "MT"
    }, {
      name: "Nebraska",
      code: "NE"
    }, {
      name: "Nevada",
      code: "NV"
    }, {
      name: "New Hampshire",
      code: "NH"
    }, {
      name: "New Jersey",
      code: "NJ"
    }, {
      name: "New Mexico",
      code: "NM"
    }, {
      name: "New York",
      code: "NY"
    }, {
      name: "North Carolina",
      code: "NC"
    }, {
      name: "North Dakota",
      code: "ND"
    }, {
      name: "Northern Mariana Islands",
      code: "MP"
    }, {
      name: "Ohio",
      code: "OH"
    }, {
      name: "Oklahoma",
      code: "OK"
    }, {
      name: "Oregon",
      code: "OR"
    }, {
      name: "Pennsylvania",
      code: "PA"
    }, {
      name: "Puerto Rico",
      code: "PR"
    }, {
      name: "Rhode Island",
      code: "RI"
    }, {
      name: "South Carolina",
      code: "SC"
    }, {
      name: "South Dakota",
      code: "SD"
    }, {
      name: "Tennessee",
      code: "TN"
    }, {
      name: "Texas",
      code: "TX"
    }, {
      name: "United States Minor Outlying Islands",
      code: "UM"
    }, {
      name: "Utah",
      code: "UT"
    }, {
      name: "Vermont",
      code: "VT"
    }, {
      name: "Virginia",
      code: "VA"
    }, {
      name: "Washington",
      code: "WA"
    }, {
      name: "West Virginia",
      code: "WV"
    }, {
      name: "Wisconsin",
      code: "WI"
    }, {
      name: "Wyoming",
      code: "WY"
    }, {
      name: "Virgin Islands, US",
      code: "VI"
    }, {
      name: "Armed Forces Americas",
      code: "AA"
    }, {
      name: "Armed Forces Europe",
      code: "AE"
    }, {
      name: "Armed Forces Pacific",
      code: "AP"
    }]
  }
}, function (e, t, n) {
  (function (e) {
    function t() {
      localStorage.setItem("companyID", ae('input[name="doublethedonation_company_id"]').val()), localStorage.setItem("companyName", ae('input[name="doublethedonation_company_name"]').val()), localStorage.setItem("donorFirstName", me.find(qe.fname.selector).val()), localStorage.setItem("donorLastName", me.find(qe.lname.selector).val()), localStorage.setItem("donorEmail", me.find(qe.email.selector).val()), localStorage.setItem("donorPhone", me.find(qe.phone.selector).val()), ve = ae('input[name="doublethedonation_company_id"]').val(), Ce = me.find(qe.fname.selector).val(), ke = me.find(qe.lname.selector).val(), Se = me.find(qe.email.selector).val(), xe = me.find(qe.phone.selector).val()
    }

    function o() {
      if (null === localStorage.getItem("doublethedonation")) var e = "no_interaction";
      else var t = JSON.parse(localStorage.getItem("doublethedonation")),
        e = t.doublethedonation_status;
      if ("no_interaction" == e || "not_found" == e || "entered_text" == e) ae(".company_found").remove(), ae(".next_steps").hide();
      else if ("found" == e) {
        ae(".company_search").remove(), ae(".search_now").hide();
        var n = localStorage.getItem("companyID");
        ae(".360matchProScript").append("doublethedonation.plugin.set_company(" + n + ");"), ae(".company_name").text(localStorage.getItem("companyName"))
      }
      be = window.pageJson.pageName, ye = window.pageJson.donationLogId.toString(), we = window.pageJson.amount, ve = localStorage.getItem("companyID"), Ce = localStorage.getItem("donorFirstName"), ke = localStorage.getItem("donorLastName"), Se = localStorage.getItem("donorEmail"), xe = localStorage.getItem("donorPhone"), doublethedonation.integrations.core.register_donation({
        "360matchpro_public_key": "ZjUwNjAyOTEtOTM1",
        campaign: be,
        donation_identifier: ye,
        donation_amount: we,
        donor_first_name: Ce,
        donor_last_name: ke,
        donor_email: Se,
        donor_phone: xe,
        doublethedonation_company_id: ve
      })
    }

    function a() {
      var e = setInterval(function () {
        ae(".dtd-search-input").length && (clearInterval(e), i())
      }, 100);
      ae(".dtd-search-input").on("change keyup", function () {
        "" != ae(this)[0].value && 0 == ae(".Select-menu-outer").length ? ae(".no_match").show() : ae(".Select-menu-outer").length > 0 && ae(".no_match").hide()
      }), ae(".more_info").on("click", function () {
        ae(".more-info-modal").removeClass("hide")
      }), ae(".more-info-modal .close").on("click", function () {
        ae(".more-info-modal").addClass("hide")
      })
    }

    function i() {
      localStorage.removeItem("doublethedonation"), localStorage.removeItem("companyID"), sessionStorage.removeItem("companyID"), ae(".dtd-search-input").attr("placeholder", "Enter company name..."), ae(".dtd-search-input").attr("autocomplete", "disabled"), ae(".dtd-search-input").on("change keyup", function () {
        ae(this)[0].value.length > 3 && 0 == ae(".Select-menu-outer").length ? ae(".no_match").show() : ("" != ae(this)[0].value || ae(this)[0].value.length > 3 && ae(".Select-menu-outer").length > 0) && ae(".no_match").hide()
      }), ae(".more_info").on("click", function () {
        ae(".more-info-modal").removeClass("hide")
      }), ae(".more-info-modal .close").on("click", function () {
        ae(".more-info-modal").addClass("hide")
      }), MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
      ! function (e) {
        new MutationObserver(function (t, n) {
          "value" == t[0].attributeName && (ae(e)[0].value.length ? (je = !0, He = !0) : je = !1, He && !je && (He = !1, i()))
        }).observe(e, {
          attributes: !0
        })
      }(ae('input[name="doublethedonation_company_id"]')[0])
    }

    function r() {
      ae("body").addClass("post-action-donation");
      window.pageJson.donationLogId, window.pageJson.amount, window.pageJson.currency, window.pageJson.donationLogId, window.pageJson.pageName, window.pageJson.campaignId, window.pageJson.recurring, window.pageJson.amount;
      $(), ae(".dd_button").on("click", function () {
        ae("#dd-container").show(), ae(this).hide()
      }), "en-US" == window.pageJson.locale && o()
    }

    function s() {
      X = new ie, X.addToPrefix(window.pageJson.campaignId)
    }

    function l() {
      ae(".lock, .security-modal .close").click(function () {
        ae(".security-modal").is(":visible") ? ae(".security-modal").fadeOut("fast") : ae(".security-modal").fadeIn("fast")
      }), "en-GB" == window.pageJson.locale && ae(".en__field--ccvv label").text("Security Code*"), ae(".en__field--opt-in-gift-aid .en__field__item").append('<a href="" class="gift-aid-terms-conditions-link">Terms and Conditions</a>'), window.setTimeout(function () {
        ae(".need-help-link, .need-help-modal .glyphicon-remove, .need-help-modal p.close").click(function (e) {
          e.preventDefault(), ae(".need-help-modal").is(":visible") ? ae(".need-help-modal").fadeOut("fast") : ae(".need-help-modal").fadeIn("fast")
        }), ae(".gift-aid-terms-conditions-link, .gift-aid-terms-conditions-modal .glyphicon-remove, .gift-aid-terms-conditions-modal p.close").click(function (e) {
          e.preventDefault(), ae(".gift-aid-terms-conditions-modal").is(":visible") ? ae(".gift-aid-terms-conditions-modal").fadeOut("fast") : ae(".gift-aid-terms-conditions-modal").fadeIn("fast")
        }), ae(".need-direct-debit-help-link, .direct-debit-help-modal .glyphicon-remove, .direct-debit-help-modal p.close").click(function (e) {
          e.preventDefault(), ae(".direct-debit-help-modal").is(":visible") ? ae(".direct-debit-help-modal").fadeOut("fast") : ae(".direct-debit-help-modal").fadeIn("fast")
        }), ae(".cvv2-help-link, .cvv2-modal .close").click(function (e) {
          e.preventDefault(), ae(".cvv2-modal").is(":visible") ? ae(".cvv2-modal").fadeOut("fast") : ae(".cvv2-modal").fadeIn("fast")
        })
      }, 1e3), ae(".en__field--ccvv").append('<a href="#" class="cvv2-help-link"><img src="https://aaf1a18515da0e792f78-c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com/104/input-field-help.svg" alt="" /></a>'), ae('input[name="transaction.ccexpire"]').eq(1).on("focus", function () {
        ae(".js-ccexp-year").addClass("hide-slash")
      }), ae('input[name="transaction.ccexpire"]').eq(1).on("blur", function () {
        ae(".js-ccexp-year").removeClass("hide-slash")
      });
      var e = ["js-ccexp-month", "js-ccexp-year"];
      ae(qe.cc_exp.selector).each(function (t) {
        ae(this).closest(".en__field__item").addClass(e[t]).attr("maxlength", "2")
      }), me.on("keydown", ".js-ccexp-month input", function (e) {
        var t = e.which;
        t >= 96 && t <= 105 && (t -= 48), t > 31 && t < 48 || t > 57 ? e.preventDefault() : 0 == ae(this).val().length && t >= 50 && t <= 57 ? (ae(this).val("0" + String.fromCharCode(t)).trigger("change"), me.find(".js-ccexp-year input").focus(), N(), e.preventDefault()) : 1 == ae(this).val().length && t >= 48 && t <= 57 && (ae(this).val(ae(this).val() + String.fromCharCode(t)), me.find(".js-ccexp-year input").focus(), N(), e.preventDefault())
      }), me.on("keydown", ".js-ccexp-year input", function (e) {
        var t = e.which;
        t >= 96 && t <= 105 && (t -= 48), 8 == t && 0 == ae(this).val().length ? me.find(".js-ccexp-month input").focus() : (t > 31 && t < 48 || t > 57) && e.preventDefault()
      });
      var t = [function () {
        return Ge = [], ae(this).find("input,select,textarea").valid(), !Ge.length || (console.log("formErrors", Ge), O(Ge), !1)
      }, function () {
        Ge = [];
        var e = ae(this).find("input,select,textarea");
        return e.length > 0 && e.valid(), !Ge.length || (O(Ge), !1)
      }, function () {
        if (Ge = [], !ae(this).parent().find("input,select,textarea").valid()) return O(Ge), !1;
        X.ecommerceCheckoutReport(Q.options.currentStep + 1, me.find(qe.pay_type.selector).val(), !0), localStorage.setItem("HSIsessions", 1), W(), me.submit()
      }];
      ae(".en__component--column--2:gt(0)").length;
      var n = [fe.steps.amount, fe.steps.billing, fe.steps.payment],
        o = {
          activeClass: "active",
          useCSSAnimation: !1,
          indicatorTarget: ".js-formSteps",
          steps: ae(".en__component--column--2:gt(0)"),
          stepLabels: n,
          addButtons: !0,
          stepButton: fe.buttons.next,
          actionButton: fe.buttons.donate,
          backButton: fe.buttons.back,
          target: ".js-formContainer",
          actionStep: n.length - 1,
          stepHandler: t
        };
      Q = new re(o), X.productFieldObject = {
        id: window.pageJson.campaignId,
        name: window.pageJson.pageName,
        quantity: 1
      }, Q.$container.on("stepChanged.grsteps", function (e, t) {
        X.ecommerceCheckoutReport(t.currentStep + 1)
      }), ae(".js-formContainer").closest(".en__component.en__component.en__component--column.en__component--column--2").addClass("fixed-panel form-container"), ae(".wrapper").closest(".en__component--column--1").addClass("campaign--container"), ae(".video-block").closest(".en__component--column--1").addClass("campaign--container"), ae(".carousel-block").closest(".en__component--column--1").addClass("campaign--container"), ae(".wrapper").not(".hero").closest(".en__component--column--1").attr("id", "campaign"), ae("#en__field_transaction_recurrpay0").closest(".en__field__element--radio").addClass("duration-toggle--wrapper"), z = new le("en-CA" == window.pageJson.locale || "fr-CA" == window.pageJson.locale || "en-US" == window.pageJson.locale ? {
        form: me,
        components: {
          country: {
            selector: qe.country.selector,
            urlParam: "country",
            defaultVal: "en-CA" == window.pageJson.locale ? "CA" : "US"
          },
          region: {
            selector: qe.region.selector
          },
          currency: {
            selector: qe.currency.selector,
            urlParam: "curr",
            defaultVal: "en-CA" == window.pageJson.locale ? "CAD" : "USD"
          },
          recurrence: {
            selector: qe.recur_pay.selector,
            urlParam: "recurring",
            defaultVal: "Y"
          },
          amount: {
            selector: qe.amt.selector,
            urlParam: "amt",
            name: qe.amt.name
          },
          other: {
            selector: qe.amt_other.selector,
            label: "Other amount"
          },
          processor: {
            selector: qe.pay_type.selector
          },
          creditcard: {
            selector: qe.cc_num.selector,
            containerSelector: qe.cc_num.container
          }
        },
        activeRegionLists: ["US", "CA", "GB"],
        locale: oe,
        askStringContainerClass: "donation-levels",
        creditCardLogoClasses: "en__field en__field--ccLogos",
        collectAskButtons: !0,
        autoDetectCreditCard: !0
      } : {
        form: me,
        components: {
          country: {
            selector: qe.country.selector,
            urlParam: "country",
            defaultVal: "en-GB" == window.pageJson.locale ? "GB" : "US"
          },
          region: {
            selector: qe.region.selector
          },
          currency: {
            selector: qe.currency.selector,
            urlParam: "curr",
            defaultVal: "en-GB" == window.pageJson.locale ? "GBP" : "en-IE" == window.pageJson.locale ? "EUR" : "en-AU" == window.pageJson.locale ? "AUD" : "USD"
          },
          recurrence: {
            selector: qe.recur_pay.selector,
            urlParam: "recurring",
            defaultVal: "Y"
          },
          amount: {
            selector: qe.amt.selector,
            urlParam: "amt",
            name: qe.amt.name
          },
          other: {
            selector: qe.amt_other.selector,
            label: "Other amount"
          },
          processor: {
            selector: qe.pay_type.selector
          },
          creditcard: {
            selector: qe.cc_num.selector,
            containerSelector: qe.cc_num.container
          }
        },
        activeRegionLists: ["US", "CA", "GB"],
        locale: oe,
        askStringContainerClass: "donation-levels",
        creditCardLogoClasses: "en__field en__field--ccLogos",
        collectAskButtons: !0,
        autoDetectCreditCard: !0
      }), ne = me.find(".btn-submit"), ne.data("original-text", ne.text()), me.off("submit").on("change", 'input[name="' + qe.amt.name + '"], input[name="' + qe.amt_other.name + '"], input[name="' + qe.recur_pay.name + '"]', function (e) {
        F(ne)
      }).on("click", ".paypal-link", function (e) {
        me.valid() && G(e)
      }).on("submit", G), me.find(qe.amt.selector).trigger("change"), me.find(qe.recur_pay.selector).trigger("change"), F(ne), me.on("change", qe.bank_day.selector, function (e) {
        me.find(qe.recur_day.selector).val(ae(this).val())
      }), me.on("change", qe.pay_source.selector, function (e) {
        switch (he.getValue(ae(qe.pay_source.selector))) {
          case "ec":
            ae(qe.pay_type.selector).val("ACHEFT"), ne.show();
            break;
          case "cc":
            ae(qe.bank_type.selector).filter(":checked").prop("checked", !1), ae(qe.pay_type.selector).val(""), ae(qe.cc_num.selector).keyup(), ne.show();
            break;
          case "paypal":
            ae(qe.bank_type.selector).filter(":checked").prop("checked", !1), ae(qe.pay_type.selector).val("Paypal"), ne.hide();
            break;
          default:
            ne.show()
        }
      }), me.on("change", qe.pay_source.selector + "," + qe.recur_pay.selector, function (e) {
        "ec" === he.getValue(ae(qe.pay_source.selector)) && z.isRecurring() ? (me.find(qe.bank_day.container).show(), me.find(qe.bank_day.selector).trigger("change")) : (me.find(qe.bank_day.container).hide(), me.find(qe.recur_day.selector).val("999"))
      }), c(), y(), C(), k(), w(), S(), L(), U(), P(), window.setTimeout(function () {
        x(), A()
      }, 1e3), ae(".en__field--bankAccountType").find(".en__field__item label").prepend('<span class="glyphicon glyphicon-ok"></span>'), ae('input[name="transaction.recurrpay"]').change(function () {
        C(), y(), Ne = "", Le = "", De = !1, Ie = 0, Te = 0, Me = 0, k()
      }), ae(".donation-levels").change(function () {
        k()
      }), de.formatCardNumber(document.querySelector("#en__field_transaction_ccnumber")), ee = new ce({
        form: me,
        donationAmountFieldSelector: qe.amt.selector,
        donationAmountFieldSelectorOther: qe.amt_other.selector,
        recurringFieldSelector: qe.recur_pay.selector,
        upsellContentSelector: "#upsell-modal",
        formLanguage: oe,
        upsellMethod: "function",
        maxGift: 500,
        getAmount: z.getAmount,
        calcFunction: function (e) {
          var e = Math.floor(e),
            t = e;
          return t = Math.max(Math.round(1.2 * Math.sqrt(e / 4.33)), 1), t = Math.min(Math.round(4.33 * t), e)
        },
        preventLaunch: function () {
          return z.isRecurring() || "paypal" == ae(qe.pay_type.selector).val().toLowerCase()
        },
        preLaunchCallback: function () {
          X.ecommerceCheckoutReport(Q.options.currentStep + 2)
        },
        onDeclineFormUpdates: function () {
          this.options.recurringField.filter(":checked").val(""), this.options.donationAmountField.val(this.initialAmount), this.options.donationAmountFieldOther.val(this.initialAmount)
        },
        onUpsellFormUpdates: function () {
          this.options.recurringField.filter(":checked").val("Y"), this.options.donationAmountField.val(this.upsellAmount), this.options.donationAmountFieldOther.val(this.upsellAmount)
        },
        declineCallback: function () {
          X.ecommerceCheckoutReport(Q.options.currentStep + 2, "declined", !0), ae(qe.mon_upsell.selector).val("No")
        },
        upsellCallback: function () {
          X.ecommerceCheckoutReport(Q.options.currentStep + 2, "accepted", !0), ae(qe.mon_upsell.selector).val("Yes: " + this.initialAmount), ae(qe.process_fee.selector).val("")
        }
      })
    }

    function c() {
      ae(pe).length && (te = new ue({
        clientId: window.pageJson.clientId
      }), te.getRollCall({
        campaignId: window.pageJson.campaignId,
        callback: function (e) {
          if (void 0 !== e.status && "success" == e.status && e.data.length > 1) {
            ae(pe).addClass("container").append('<div id="carousel-rollcall-vertical" class="carousel vertical slide"><div class="carousel-inner" role="listbox"></div></div>');
            for (var t = ae(pe).find(".carousel-inner"), n = " active", o = 0; o < e.data.length; o++) {
              var a = "<strong>" + e.data[o].firstName + "</strong>, " + e.data[o].city + " " + e.data[o].country + " " + fe.rollcall.just_donated;
              t.append('<div class="item ' + n + '"><p class="ticker-headline">' + a + "</p></div>"), n = ""
            }
            ae(".carousel").carousel({
              wrap: !0,
              interval: 5e3
            })
          }
        },
        fundraising: !0
      }))
    }

    function p() {
      ae(".background").each(function () {
        var e = ae(this);
        e.parent().css("background-image", "url(" + e.attr("src") + ")"), e.css("display", "none")
      })
    }

    function d() {
      ae(".video-block").each(function () {
        var e = ae(".js-video");
        if (e.length) {
          var t = n(3),
            t = n(3),
            o = e.parent();
          o.addClass("is-videoPlaceholder"), o.find(".video-title").before('<span class="glyphicon glyphicon-play"></span><br />');
          var a = e.text().trim();
          a += "?rel=0&autoplay=1&wmode=opaque&enablejsapi=1&autohide=0", o.on("click", function (n) {
            ae(this).removeClass("black-fade--bottom"), ae(this).hasClass("is-videoPlaceholder") && (ae(this).find(".video-title").hide(), ae(this).find(".hero-text--mobile").hide(), ae(".video-block .glyphicon-play").hide(), t.ios && t.version <= 7 ? window.location = a : (e.html("<iframe src='" + a + "' frameborder='0' allowfullscreen autohd='0' width='100%' height='400'></iframe>").removeClass("hidden"), o.removeClass("is-videoPlaceholder"), o.addClass("is-videoContainer"), ae(".page-header").hide()))
          })
        }
      })
    }

    function u() {
      ae("#myCarousel").carousel(), ae(".carousel-controller").click(function () {
        var e = ae(this);
        e.hasClass("pause") ? (ae("#myCarousel").carousel("pause"), e.removeClass("pause"), e.addClass("play"), e.text("Play")) : (ae("#myCarousel").carousel("cycle"), e.removeClass("play"), e.addClass("pause"), e.text("Pause"))
      })
    }

    function m() {
      ae(".js-formContainer").prepend('<div class="campaign-anchor" style="display: none"><p>' + fe.buttons.learn_more + '<span class="glyphicon glyphicon-chevron-down"></span></p></div>'), window.setTimeout(function () {
        ae(".campaign-anchor").fadeIn(500).delay(5e3).fadeOut(500)
      }, 4e3), ae(".campaign-anchor").click(function () {
        ae(this).hide();
        var e = ae("#campaign");
        ae("html,body").animate({
          scrollTop: e.offset().top - 90
        }, 1e3)
      })
    }

    function h() {
      ae("body").prepend('<div class="mobile-button--wrapper"><div class="btn-next--wrapper"><button type="button" class="btn btn-danger btn-lg">Donate</button></div></div>'), ae(".mobile-button--wrapper").hide()
    }

    function f() {
      ae(".mobile-button--wrapper button").animate({
        top: "0"
      }, 50, function () {
        ae(".mobile-button--wrapper button").animate({
          top: "-4"
        }, 50, function () {
          var e = ae(".page--1");
          ae("html,body").animate({
            scrollTop: e.offset().top - 40
          }, 1e3)
        })
      })
    }

    function g() {
      ae(".en__errorList").length && ae.trim(ae(".en__errorList").text()).length && (Be.find(".modalErrorMessage").append(ae(".en__errorList")), Be.modal("show")), window.setTimeout(function () {
        var e = "<img class='svg' src='https://aaf1a18515da0e792f78-c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com/104/questionmark.svg'>",
          t = ae(".btn-next--wrapper");
        ae(".btn-submit--wrapper");
        ae(".processing_fee_block").prependTo(".btn-submit--wrapper"), ae(".processing_fee_block .checkbox--wrapper").click(function () {
          1 == ae(".processing_fee_checkbox").prop("checked") ? (ae(this).find("input").prop("checked", !1), k(), ae(qe.process_fee.selector).val("")) : 0 == ae(".processing_fee_checkbox").prop("checked") && (ae(this).find("input").prop("checked", !0), k(), ae(qe.process_fee.selector).val(Oe))
        }), ae(qe.process_fee.selector).length > 0 ? ae(".processing_fee_block").show() : ae(".processing_fee_block").hide();
        var n = '<a href="#" class="need-help-link">' + e + fe.steps.need_help + "</a>";
        ae(".grsteps--permanent-content .content-item .need-help").html(n), t.length, ae(".page").append(ae(".grsteps--permanent-content")), ae(".need-help-modal").length && ae(".need-help-modal h2").before(e)
      }, 100);
      var e = V();
      if ("xs" === e || "sm" === e) {
        var t = ae(".heroTitle", ".hero").remove();
        ae(".hero").before(t)
      }
      ae(".en__field--paycurrency").prependTo(".en__field--donationAmt"), ae(".current-year").html((new Date).getFullYear()), ae("#en__field_supporter_emailAddress").prop("type", "email"), ae(".en__field__item", ".duration-toggle--wrapper").show(), ae(".en__field--firstName").closest(".en__component--formblock").addClass("billing-form--wrapper"), ae(".en__field--firstName").closest(".en__component--formblock").append('<div style="clear:both;height:0;line-height:0"></div>'), ae(".en__field--ccnumber").closest(".en__component--formblock").addClass("credit-card--wrapper");
      var n = ae(".credit-card--wrapper").remove();
      ae("#credit-card", ".tab-content").html(n), ae(".en__field--bankAccountNumber").closest(".en__component--formblock").addClass("debit-card--wrapper");
      var o = ae(".debit-card--wrapper").remove();
      ae("#direct-debit", ".tab-content").html(o), ae(".en__field--bankRoutingNumber").after('<p class="check-directions">' + fe.labels.check_directions + '</p><div class="direct-debit--explainer"></div>'), ae(".paypal-link").closest(".en__component--copyblock").addClass("paypal--wrapper");
      var i = ae(".paypal--wrapper").remove();
      ae("#paypal", ".tab-content").html(i), ae('a[href="#credit-card"]', "#payment-tabs").click(function () {
        ae(qe.pay_source.selector).filter('[value="cc"]').trigger("click").trigger("change")
      }).trigger("click"), ae('a[href="#direct-debit"]', "#payment-tabs").click(function () {
        ae(qe.pay_source.selector).filter('[value="ec"]').trigger("click").trigger("change"), "en-GB" == window.pageJson.locale && ae("#en__field_supporter_bankAccountType0").trigger("click")
      }), ae('a[href="#direct-debit"]').parent().hide(), ae('a[href="#paypal"]', "#payment-tabs").click(function () {
        ae(qe.pay_source.selector).filter('[value="paypal"]').trigger("click").trigger("change")
      }), localStorage.hasOwnProperty("HSIsessions") || localStorage.setItem("HSIsessions", 0), 0 == localStorage.getItem("HSIsessions") && (localStorage.hasOwnProperty("HSIredirectControl") ? (localStorage.removeItem("HSIredirectControl"), localStorage.setItem("HSIredirectControl", "auto")) : localStorage.setItem("HSIredirectControl", "auto")), M(), D(), v(), p(), d(), u(), h(), q(), b(), Y(), ae(".learn-more").length && m(), window.setTimeout(function () {
        R()
      }, 100), ae(".company_matching").appendTo(".en__field--opt-in"), H() || a(), window.setTimeout(function () {}, 100)
    }

    function _(e) {
      return e.indexOf("artm") > 0 || e.indexOf("animalrescueteam") > 0 || e.indexOf("animal-rescue-team") > 0 ? 1 : e.indexOf("dgmt") > 0 || e.indexOf("dogmeat") > 0 || e.indexOf("dog-meat") > 0 ? 2 : e.indexOf("farm") > 0 || e.indexOf("farmanimals") > 0 || e.indexOf("farm-animals") > 0 ? 3 : e.indexOf("labs") > 0 || e.indexOf("labanimals") > 0 || e.indexOf("lab-animals") > 0 ? 4 : e.indexOf("stdg") > 0 || e.indexOf("streetdogs") > 0 || e.indexOf("street-dogs") > 0 ? 5 : e.indexOf("wdlf") > 0 || e.indexOf("wildlife") > 0 ? 6 : 7
    }

    function v() {
      trackingID = he.getURLParameter("ea.tracking.id");
      switch (trackingID ? _(trackingID) : 7) {
        case 1:
          ae(".introText--wrapper p.rescue").show(), ae(".twoColumnBanner--wrapper p.rescue").show(), ae(".hero.wrapper.rescue").show();
          break;
        case 2:
          ae(".introText--wrapper p.dog_meat_trade").show(), ae(".twoColumnBanner--wrapper p.dog_meat_trade").show(), ae(".hero.wrapper.dog_meat_trade").show();
          break;
        case 3:
          ae(".introText--wrapper p.farm_animals").show(), ae(".twoColumnBanner--wrapper p.farm_animals").show(), ae(".hero.wrapper.farm_animals").show();
          break;
        case 4:
          ae(".introText--wrapper p.lab_animals").show(), ae(".twoColumnBanner--wrapper p.lab_animals").show(), ae(".hero.wrapper.lab_animals").show();
          break;
        case 5:
          ae(".introText--wrapper p.street_dogs").show(), ae(".twoColumnBanner--wrapper p.street_dogs").show(), ae(".hero.wrapper.street_dogs").show();
          break;
        case 6:
          ae(".introText--wrapper p.wildlife").show(), ae(".twoColumnBanner--wrapper p.wildlife").show(), ae(".hero.wrapper.wildlife").show();
          break;
        default:
          ae(".introText--wrapper p.default").show(), ae(".twoColumnBanner--wrapper p.default").show(), ae(".hero.wrapper.default").show()
      }
    }

    function b() {
      ae("select#en__field_transaction_paycurrency").on("change", function () {
        var e = window.location.search.substr(1);
        if (0 != Ye) {
          var t = ae("select#en__field_transaction_paycurrency").val();
          Ye++, "en-GB" == window.pageJson.locale ? (_e = window.pageJson.campaignPageId, ge = window.pageJson.externalReference7) : (ge = window.pageJson.campaignPageId, _e = window.pageJson.externalReference7);
          var n;
          "GBP" == t ? (redirectToLocale = "en-GB", n = _e) : "USD" == t ? (redirectToLocale = "en-US", n = ge) : "CAD" == t ? (redirectToLocale = "en-CA", n = ge) : "AUD" == t ? (redirectToLocale = "en-AU", n = ge) : "EUR" == t && (redirectToLocale = "en-IE", n = ge), localStorage.removeItem("HSIredirectControl"), localStorage.setItem("HSIredirectControl", "manual"), T(n, redirectToLocale, e)
        }
        localStorage.setItem("HSIsessions", Ye), Ye++
      })
    }

    function y() {
      window.setTimeout(function () {
        var e = (ae(".donation-levels .en__field__item:last-of-type label").html(), ae(".donation-levels .en__field__item:last-of-type label")),
          t = ae(".donation-levels .en__field__item:last-of-type input");
        t.attr("placeholder", fe.labels.currency_symbol), e.hide(), t.on("focus change keydown", function (e) {
          k()
        })
      }, 1e3)
    }

    function w() {
      if (ae("body").hasClass("ask_button_text")) {
        ae(".en__field__label", ".donation-levels").each(function (e, t) {
          var n = ae(this).text(),
            o = n.substr(0, n.indexOf(" ")),
            a = n.substr(n.indexOf(" "), n.length);
          ae(this).html(i), $e = o.substring(0, 1), o = o.substring(1);
          var i = '<div class="ask_button_content">';
          i += '<div class="ask_value"><span class="currency_symbol">' + $e + "</span>" + o + "</div>", i += '<div class="ask_description">' + a + "</div></div>", ae(this).html(i), ae(".other_label").length || ae('input[name="transaction.donationAmt.other"]').parent().prepend('<div class="other_label">' + $e + " Enter Amount:</div>")
        })
      }
    }

    function C() {
      var e = ae(".duration-toggle--wrapper input:checked"),
        t = ae(".duration-toggle--wrapper input:not(:checked)"),
        n = "<img class='svg' width='24' height='24' src='https://aaf1a18515da0e792f78-c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com/104/checkmark.svg'>";
      if (e.closest(".en__field__item").css("background", "#8bb100"), t.closest(".en__field__item").css("background", "#033214"), "en__field_transaction_recurrpay1" == t.attr("id") && (t.closest(".en__field__item").css({
          "box-shadow": "1px 0px 1px 0px #606060"
        }), e.closest(".en__field__item").css({
          "box-shadow": "none"
        }), e.next(".en__field__label--item").html(fe.labels.monthly), e.next(".en__field__label--item").prepend(n), t.next(".en__field__label--item").html(fe.labels.single), t.next(".en__field__label--item").prepend("<img class='svg' src='https://aaf1a18515da0e792f78-c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com/104/gift-icon-one-time.svg'>"), R(), a(), ae("#payment-tabs li:nth-child(3)").hide(), "en-US" != window.pageJson.locale && "en-CA" != window.pageJson.locale && "en-GB" != window.pageJson.locale || ae("#payment-tabs li:nth-child(3)").show(), ae(".processing_fee_block label .recurring").show()), "en__field_transaction_recurrpay0" == t.attr("id") && (t.closest(".en__field__item").css({
          "box-shadow": "-1px 0px 1px 0px #606060"
        }), e.closest(".en__field__item").css({
          "box-shadow": "none"
        }), e.next(".en__field__label--item").html(fe.labels.single), e.next(".en__field__label--item").prepend(n), ae(".recurring--wrapper label").html(fe.labels.monthly), ae(".recurring--wrapper label").prepend("<img class='svg' src='https://aaf1a18515da0e792f78-c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com/104/gift-icon-recurring.svg'>"), R(), ae("#payment-tabs li:nth-child(3)").show(), ae(".processing_fee_block label .recurring").hide()), e.closest(".en__field__item").animate({
          top: "2",
          background: "#044a1e"
        }, 100), t.closest(".en__field__item").animate({
          top: "0",
          background: "#8bb100"
        }, 100), ae(".en__field--donationAmt > label").text().indexOf("[[frequency title]]") >= 0 && (dynamicAmountBtnLabel = !0), Fe = !0) {
        if (ae(".duration-toggle--wrapper input:checked").is("#en__field_transaction_recurrpay1")) var o = fe.labels.one_time;
        else var o = fe.labels.recurring;
        ae(".en__field--donationAmt > label").html(o)
      }
    }

    function k() {
      var e = ae(".donation-levels input:checked + label"),
        t = (ae(".donation-levels input:checked"), ae(".donation-levels input:not(:checked) + label")),
        n = ae(qe.currency.selector).val(),
        o = se[n];
      ae(".processing_fee_block p .currency").text(o), ae(".donation-levels input + label").each(function (e, t) {
        var n = ae(t).html();
        console.log("labelVal: ", n), n = n.split(o), console.log("labelVal: ", n), n = void 0 !== n[1] && "fr-CA" != window.pageJson.locale ? n[1] : n[0], "fr-CA" == window.pageJson.locale ? ae(t).html(n + o) : ae(t).html(o + n)
      }), ae(".svg", ".donation-levels").remove(), e.closest(".en__field__item").css("background", "#8bb100"), 0 == De ? (Ne = Le, Ie = Te) : (Ne = Le, Ie = "other"), Ne.length > 0 && (null != Ne && "other" != Le.val() ? (Ne.val(Ie), De = !1) : null != Ne && "other" == Le.val() && 0 == De && (De = !0)), Le = ae(".donation-levels input:checked");
      var a = 0;
      "other" == Le.val() ? a = parseFloat(ae(".en__field__input--other").val()).toFixed(0) : (Te = Le.val(), a = Le.val()), Oe = Math.round(.03 * a * 100) / 100, Oe = Oe.toFixed(2);
      var n = ae(qe.currency.selector).val(),
        o = se[n];
      ae(".processing_fee_block label .total_val").text(o + Oe), 1 == ae(".processing_fee_checkbox").prop("checked") ? ("other" == Le.val() ? (Te = 0, a = parseFloat(ae(".en__field__input--other").val()).toFixed(2)) : (Te = Le.val(), a = Le.val()), ae(".processing_fee_block p .total_val").text(Ue), Ue = Math.round(1.03 * a * 100) / 100, Ue = Ue.toFixed(2), "other" != Le.val() ? Le.val(Ue) : (Le.val(Ue.toString()), Me = ae('input[name="' + qe.amt_other.name + '"]').val(), ae('input[name="' + qe.amt_other.name + '"]').val(Ue.toString())), F(ne)) : 0 == ae(".processing_fee_checkbox").prop("checked") && ("other" == Le.val() && 0 == De && ae('input[name="' + qe.amt_other.name + '"]').val(Me), F(ne)), ae("body").hasClass("ask_button_text") ? ae(".en__field__label", ".donation-levels").each(function (e, t) {
        var n = ae(this).text(),
          o = n.substr(0, n.indexOf(" ")),
          a = n.substr(n.indexOf(" "), n.length);
        ae(this).html(r);
        var i = o.substring(0, 1),
          o = o.substring(1),
          r = '<div class="ask_button_content">';
        r += '<div class="ask_value"><span class="currency_symbol">' + i + "</span>" + o + "</div>", r += '<div class="ask_description">' + a + "</div></div>", ae(this).html(r)
      }) : ae(".donation-levels input + label").each(function (t, n) {
        var a = ae(n).html();
        a = a.split(o), a = void 0 !== a[1] ? a[1] : a[0], ae(n).html(o + a), ae(".svg", ".donation-levels").remove(), e.prepend("<img class='svg' width='24' height='24' src='https://aaf1a18515da0e792f78-c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com/104/checkmark.svg'>"), R()
      }), e.closest(".en__field__item").css("background", "#8bb100"), t.closest(".en__field__item").css("background", "#033214"), e.animate({
        background: "#044a1e"
      }, 100), t.animate({
        background: "#8bb100"
      }, 100)
    }

    function S() {
      ae(qe.recur_pay.selector).filter('[value=""]').closest(".en__field__item").addClass("one-time--wrapper"), ae(qe.recur_pay.selector).filter('[value="Y"]').closest(".en__field__item").addClass("recurring--wrapper")
    }

    function x() {
      var e = '<div class="en__field en__field--text en__field--47332 en__field--region en__mandatory"><label for="en__field_supporter_region" class="en__field__label" style="mike-test"><input id="en__field_supporter_region" type="text" class="en__field__input en__field__input--text" name="supporter.region" maxlength="20" value="" data-empty="" /><span class="label">' + fe.labels.state_region + "</span></label></div>",
        t = ae(".en__field--city", me);
      ae(".en__field--region").remove(), t.after(e), ae("#en__field_supporter_country").on("change", function () {
        if ("CA" == ae(this).val()) {
          console.log("canadian provinces");
          var e = '<div class="en__field en__field--select en__field--47332 en__field--region en__mandatory"><label for="en__field_supporter_region" class="en__field__label" style="">' + fe.labels.province + '</label><div class="en__field__element en__field__element--select"><select id="en__field_supporter_region" class="en__field__input en__field__input--select" name="supporter.region" ><option value="">' + fe.labels.province + '</option><option value="AB">Alberta</option><option value="BC">British Columbia</option><option value="MB">Manitoba</option><option value="NB">New Brunswick</option><option value="NL">Newfoundland and Labrador</option><option value="NS">Nova Scotia</option><option value="ON">Ontario</option><option value="PE">Prince Edward Island</option><option value="QC">Quebec</option><option value="SK">Saskatchewan</option><option value="NT">Northwest Territories</option><option value="NU">Nunavut</option><option value="YT">Yukon</option></select></div></div>'
        } else if ("US" == ae(this).val()) {
          console.log("US states");
          var e = '<div class="en__field en__field--select en__field--47332 en__field--region en__mandatory"><label for="en__field_supporter_region" class="en__field__label" style="">' + fe.labels.state + '</label><div class="en__field__element en__field__element--select"><select id="en__field_supporter_region" class="en__field__input en__field__input--select" name="supporter.region" ><option value="">' + fe.labels.state + '</option><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District of Columbia</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option><option value="FM">Federated States of Micronesia</option><option value="GU">Guam</option><option value="MP">Northern Mariana Islands</option><option value="PW">Palau</option><option value="PR">Puerto Rico</option><option value="MH">Marshall Islands</option><option value="AA">Armed Forces Americas</option><option value="AE">Armed Forces Europe</option><option value="AP">Armed Forces Pacific</option></select></div></div>'
        } else var e = '<div class="en__field en__field--text en__field--47332 en__field--region en__mandatory"><label for="en__field_supporter_region" class="en__field__label"><input id="en__field_supporter_region" type="text" class="en__field__input en__field__input--text" name="supporter.region" maxlength="20" value="" data-empty="" /><span class="label">' + fe.labels.state_region + "</span></label></div>";
        var n = '<div class="en__field en__field--text en__field--47332 en__field--region en__mandatory"><label for="en__field_supporter_region" class="en__field__label" style=""><input id="en__field_supporter_region" type="text" class="en__field__input en__field__input--text" name="supporter.region" maxlength="20" value="" data-empty="" /><span class="label">' + fe.labels.state_region + "</span></label></div>";
        "US" == ae("#en__field_supporter_country").val() || "CA" == ae("#en__field_supporter_country").val() || "US" == ae(this).val() || "CA" == ae(this).val() ? (window.setTimeout(function () {
          ae(".en__field--region").remove(), t.after(e), ae(".en__field--region").show()
        }, 1), window.setTimeout(function () {
          ae("#supporter-region").removeClass("en__field__input--text").addClass("en__field__input--select")
        }, 1)) : "en-GB" == window.pageJson.locale || "GB" == ae(this).val() ? (console.log("supporter country GB"), ae(".en__field--region").remove(), t.after(n), ae(".en__field--region").hide(), ae("#en__field_supporter_region").val("N/A")) : (ae(".en__field--region").remove(), t.after(n), ae("label.en__field__label", ".en__field--region").css("display", "block"), "GB" == ae("#en__field_supporter_country").val() && "en-GB" == window.pageJson.locale ? ae("#en__field_supporter_region").val("N/A") : "CA" == ae("#en__field_supporter_country").val() && "US" == ae("#en__field_supporter_country").val() || ae(".en__field--region").show(), window.setTimeout(function () {}, 2e3)), window.setTimeout(function () {
          ae("#en__field_supporter_region").on("change", function () {
            0 == ae(this).val().length ? ae(this).attr("data-empty", "true") : ae(this).attr("data-empty", "false")
          })
        }, 1e3)
      }).trigger("change")
    }

    function A() {
      void 0 !== window.pageJson.locale && "en-GB" == window.pageJson.locale && ae("#en__field_supporter_bankAccountType0").trigger("click")
    }

    function P() {
      window.setTimeout(function () {
        "en-gb" !== window.pageJson.locale.toLowerCase() && ae(".en__field--opt-in-gift-aid").closest(".en__component--formblock").remove()
      }, 1e3)
    }

    function R() {
      ae("img.svg").each(function () {
        var t = e(this),
          n = t.attr("id"),
          o = t.attr("class"),
          a = t.attr("src");
        ae.get(a, function (a) {
          var i = e(a).find("svg");
          void 0 !== n && (i = i.attr("id", n)), void 0 !== o && (i = i.attr("class", o + " replaced-svg")), i = i.removeAttr("xmlns:a"), !i.attr("viewBox") && i.attr("height") && i.attr("width") && i.attr("viewBox", "0 0 " + i.attr("height") + " " + i.attr("width")), t.replaceWith(i)
        }, "xml")
      })
    }

    function N() {
      var e = ae(".js-ccexp-month input"),
        t = ae(".js-ccexp-year input");
      ae(".en__field--ccexpire");
      e.addClass("focus"), t.addClass("focus")
    }

    function L() {
      ae('input[name="transaction.ccexpire"]').eq(0).wrap('<label for="en__field_transaction_ccexpire" class="en__field__label" style=""></label>').after('<span class="label">' + fe.labels.expiry_month + "</span>"), ae('input[name="transaction.ccexpire"]').eq(1).wrap('<label for="en__field_transaction_ccexpirex" class="en__field__label" style=""></label>').after('<span class="label">' + fe.labels.expiry_year + "</span>"), ae(".en__field--text, .en__field__input--splittext", ".billing-form--wrapper, .page--2, .page--3, .page--4").each(function (e, t) {
        var n = ae("label", t).text();
        ae("label", t).text("");
        var o = ae("label", t).remove(),
          a = ae("input", t).remove();
        ae(".en__field__element--text", t).remove(), ae(t).append(o), o.append(a), ae(t).hasClass("en__field--ccvv") && window.setTimeout(function () {
          ae(".label", ae(t)).html(n)
        }, 1), o.append('<span class="label">' + n + "</span>")
      }), $forms = ae(".js-formContainer"), $forms.find('input[type="text"], input[type="email"], input[type="tel"]').filter(":not(" + qe.amt_other.selector + ")").each(function () {
        ae(this).on("change click keydown", function () {
          0 == ae(this).val().length ? (ae(this).attr("data-empty", "true"), ae(this).attr("data-valid", "false")) : (ae(this).attr("data-empty", "false"), ae(this).attr("data-valid", "true"))
        }), ae(this).trigger("change"), 0 == ae(this).val().length ? (ae(this).attr("data-empty", "true"), ae(this).attr("data-valid", "false")) : (ae(this).attr("data-empty", "false"), ae(this).attr("data-valid", "true"))
      }), ae("form label span").click(function () {
        ae(this).siblings().focus()
      }), ae("#en__field_transaction_infcity, #en__field_transaction_infpostcd, #en__field_supporter_region").on("change", function () {
        ae("select", ".js-formContainer").each(function (e, t) {
          "" == ae(this).val() ? ae(this).attr("data-empty", "true") : ae(this).attr("data-empty", "false")
        })
      })
    }

    function D() {
      var e;
      new Array("en-US", "en-CA", "en-AU");
      ae.ajax({
        type: "GET",
        url: "https://services.grassriots.com/",
        dataType: "jsonp",
        cache: !1,
        crossDomain: !0,
        error: function (e, t, n) {},
        success: function (t, n, o) {
          var a = t.data.isocode,
            i = window.pageJson.locale,
            r = /[^-]*$/;
          Ve = i.match(r)[0], classifyPhysicalLocale = I(a), classifyPageLocale = I(Ve);
          var s = window.location.search.substr(1);
          "auto" === localStorage.getItem("HSIredirectControl") && (1 == classifyPhysicalLocale || 1 == classifyPageLocale ? classifyPhysicalLocale > classifyPageLocale ? (_e = window.pageJson.campaignPageId, ge = window.pageJson.externalReference7, 2 == classifyPhysicalLocale ? e = "en-US" : 3 == classifyPhysicalLocale ? e = "en-CA" : 4 == classifyPhysicalLocale ? e = "en-AU" : 5 == classifyPhysicalLocale ? e = "en-IE" : 6 == classifyPhysicalLocale && (e = "en-CB"), classifyPhysicalLocale != classifyPageLocale && T(ge, e, s)) : classifyPhysicalLocale < classifyPageLocale && (_e = window.pageJson.externalReference7, ge = window.pageJson.campaignPageId, T(_e, "en-GB", s)) : classifyPhysicalLocale > 1 && classifyPageLocale > 1 ? (ge = window.pageJson.campaignPageId, 2 == classifyPhysicalLocale ? e = "en-US" : 3 == classifyPhysicalLocale ? e = "en-CA" : 4 == classifyPhysicalLocale ? e = "en-AU" : 5 == classifyPhysicalLocale ? e = "en-IE" : 6 == classifyPhysicalLocale && (e = "en-CB"), classifyPhysicalLocale != classifyPageLocale && T(ge, e, s)) : 1 == classifyPhysicalLocale && classifyPageLocale, j(window.pageJson.locale.toLowerCase())), M()
        }
      })
    }

    function I(t) {
      switch (locale = t, "-1" != e.inArray(locale, Ee) && (locale = "EU"), locale) {
        case "GB":
          return 1;
        case "US":
          return 2;
        case "CA":
          return 3;
        case "AU":
          return 4;
        case "EU":
          return 5;
        default:
          return 6
      }
    }

    function T(e, t, n) {
      var o, a = window.location.search.substr(1);
      o = null == he.getAnyURLParameter("?" + a, "locale") ? "locale=" + t + "&" + n : n.replace("locale=en-" + Ve, "locale=" + t);
      var i = "https://donate.hsi.org/page/" + e + "/donate/1?" + o;
      "" != i && window.location.href.indexOf("donate.hsi.org") >= 0 && (window.location.href = i)
    }

    function M() {
      if (void 0 !== window.pageJson.locale || "" != window.pageJson.locale) {
        var e = window.pageJson.locale.toLowerCase().replace(/_/g, "-") + ".js";
        e = e.replace(/\\/g, ""), fe = n(18)("./" + e)
      } else fe = n(1);
      oe = window.pageJson.locale
    }

    function U() {
      n(4), n(28), ae("#en__field_supporter_address1, #en__field_supporter_address2").attr("maxLength", "35"), ae(".en__field__input--splittext").attr("maxLength", "2"), ae("#en__field_supporter_region").attr("maxLength", "20");
      var t = new Date;
      ae.validator.addMethod("isValidDonation", function (e, t) {
        e = z.getAmount(!1);
        return console.log(fe.errors.invalid_amount), e >= 5 && e <= 1e4
      }, fe.errors.invalid_amount), ae.validator.addMethod("emailTLD", function (e, t) {
        return e = e.replace(/\s/g, ""), ae(t).val(e), this.optional(t) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)
      }, fe.errors.invalid_email), ae.validator.addMethod("ccExpiration", function (e, n) {
        var o = ae(ae(qe.cc_exp.selector)[0]),
          a = ae(ae(qe.cc_exp.selector)[1]),
          i = !0;
        (2 != o.val().length || parseInt(o.val(), 10) <= 0 || parseInt(o.val(), 10) > 12) && (i = !1);
        var r = "";
        return a.val().length >= 4 ? r = parseInt(a.val(), 10) : 2 == a.val().length && (r = parseInt("20" + a.val(), 10)), ("" == r || r < t.getFullYear()) && (i = !1), r == t.getFullYear() && parseInt(o.val(), 10) < t.getMonth() + 1 && (i = !1), this.optional(n) || i
      }, fe.errors.invalid_expiration_date), ae.validator.addMethod("isCVV", function (e, t) {
        var n = /^\d{3,4}$/;
        return this.optional(t) || n.test(e)
      }, fe.errors.invalid_cvv), ae.validator.addMethod("isRoutingNumber", function (e, t) {
        var n = /^\d{9}$/;
        return this.optional(t) || n.test(e)
      }, fe.errors.invalid_routing_number), ae.validator.addMethod("isPhone", function (e, t) {
        var n = e.replace(/\s+/g, "");
        return this.optional(t) || n.length > 9 && n.match(/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/)
      }, fe.errors.invalid_phone), ae.validator.addMethod("notEqual", function (e, t, n) {
        return ae(t).is(":hidden") || e !== n
      }, e.validator.format(fe.errors.is_required)), ae.validator.addMethod("isPostcodeCA", function (e, t, n) {
        e = ae.trim(e), ae(t).val(e);
        var o = /^([a-zA-Z]\d[a-zA-z]( )?\d[a-zA-Z]\d)$/;
        return this.optional(t) || !n || o.test(e)
      }, fe.errors.invalid_postcode), ae.validator.addMethod("stripspaces", function (e, t) {
        return e = e.replace(/\s/g, ""), ae(t).val(e), !0
      }), ae.validator.addMethod("stripNonnumeric", function (e, t) {
        return e = e.replace(/[^0-9]/g, ""), ae(t).val(e), !0
      }), ae.validator.addMethod("recaptchaValid", function (e, t) {
        return "undefined" == typeof grecaptcha || (e = grecaptcha.getResponse(), e.length > 0 ? (ae(".g-recaptcha").removeClass("error"), !0) : (ae(".g-recaptcha").addClass("error"), !1))
      }, fe.errors.invalid_recaptcha), ae.validator.messages.digits = function (e, t) {
        return ae.validator.format(fe.errors.is_digits, t.name)
      };
      var o = {};
      o[qe.fname.name] = "required", o[qe.lname.name] = "required", o[qe.street1.name] = "required", o[qe.city.name] = "required", o[qe.region.name] = {
        required: function (e) {
          var t = E("locale"),
            n = ae(qe.country.selector).val();
          return console.log("country selected: ", n), "en-GB" == t ? "US" == ae(qe.country.selector).val() || "CA" == ae(qe.country.selector).val() : "US" == n || "CA" == n
        }
      }, o[qe.pay_source.name] = {
        required: !0,
        recaptchaValid: !0
      }, o[qe.country.name] = "required", o[qe.email.name] = {
        required: !0,
        emailTLD: !0
      }, "en-CA" == window.pageJson.locale || "en-FR" == window.pageJson.locale || window.pageJson.locale, o[qe.postal.name] = {
        required: !0
      }, o[qe.pay_type.name] = "required", o[qe.cc_num.name] = {
        required: function (e) {
          return 0 == ae(qe.pay_source.selector).length || "cc" == ae(qe.pay_source.selector).filter(":checked").val()
        },
        stripspaces: !1,
        creditcard: !0
      }, o[qe.cc_cvv.name] = {
        required: function (e) {
          return 0 == ae(qe.pay_source.selector).length || "cc" == ae(qe.pay_source.selector).filter(":checked").val()
        },
        isCVV: !0
      }, o[qe.cc_exp.name] = {
        required: function (e) {
          return 0 == ae(qe.pay_source.selector).length || "cc" == ae(qe.pay_source.selector).filter(":checked").val()
        },
        ccExpiration: !0
      }, "en-GB" == window.pageJson.locale && (o[qe.bank_holder.name] = {
        required: function (e) {
          return 0 == ae(qe.pay_source.selector).length || "ec" == ae(qe.pay_source.selector).filter(":checked").val()
        }
      }), o[qe.bank_inst.name] = {
        required: function (e) {
          return 0 == ae(qe.pay_source.selector).length || "ec" == ae(qe.pay_source.selector).filter(":checked").val()
        },
        isRoutingNumber: !0
      }, o[qe.bank_acct.name] = {
        required: function (e) {
          return 0 == ae(qe.pay_source.selector).length || "ec" == ae(qe.pay_source.selector).filter(":checked").val()
        },
        digits: !0
      }, o[qe.bank_type.name] = {
        required: function (e) {
          return 0 == ae(qe.pay_source.selector).length || "ec" == ae(qe.pay_source.selector).filter(":checked").val()
        }
      }, o[qe.amt.name] = {
        required: !0,
        isValidDonation: !0
      }, me.validate({
        rules: o,
        unhighlight: function (e, t, n) {
          var o = ae(e);
          "checkbox" != o.attr("type") && (o.removeClass(n).removeClass(t), "" != o.val() && "setcurrency" !== o.attr("id") && o.addClass(n))
        },
        highlight: function (e, t, n) {
          var o = ae(e);
          "checkbox" != o.attr("type") && o.removeClass(n).addClass(t)
        },
        ignore: ":disabled",
        invalidHandler: function (e, t) {
          console.log("invalidHandler called");
          var n = t.errorList;
          console.log("validator: ", t), console.log("errors: ", n), O(n, t)
        },
        showErrors: function (e, t) {
          t.length && (Ge = Ge.concat(t)), this.defaultShowErrors()
        },
        errorPlacement: function () {
          return !1
        },
        onkeyup: function (e, t) {
          var n = ae(e).rules();
          void 0 === n.isPostcodeCA && void 0 === n.emailTLD && 9 != t.which && ae(e).valid()
        }
      })
    }

    function O(t, n) {
      console.log("handleErrors()", t);
      var o = [];
      $errorList = ae("<ul>"), $validErrModal = ae("#validErrModal");
      for (var a in t) {
        var i = ae(t[a].element).closest(".en__field").find('label[for="' + ae(t[a].element).attr("id") + '"]').text(),
          r = t[a].method,
          s = "";
        if (console.log("inputName: ", i), console.log("errorType: ", r), console.log("errorMessage: ", s), i = fe.errors.name_mapper[ae(t[a].element).attr("name")] || i, -1 == o.indexOf(i)) {
          o.push(i), "required" === r && "This field is required." === t[a].message ? s = "Checking" == i ? e.validator.format(fe.errors.is_required, "Account Type") : e.validator.format(fe.errors.is_required, i) : (s = t[a].message, console.log("errors[i]: ", t[a]), console.log("errorMessage: ", s), "isValidDonation" == r && (s = fe.errors.invalid_amount), console.log("errorMessage: ", s));
          var l = ae("<li>").html(s);
          $errorList.append(l)
        }
      }
      $validErrModal.find(".error-list").html($errorList), $validErrModal.modal("show")
    }

    function E(e, t) {
      t || (t = window.location.href), e = e.replace(/[\[\]]/g, "\\$&");
      var n = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)"),
        o = n.exec(t);
      return o ? o[2] ? decodeURIComponent(o[2].replace(/\+/g, " ")) : "" : null
    }

    function F(e) {
      if (X.productFieldObject.price = parseFloat(z.getAmount()), X.productFieldObject.price = Math.floor(X.productFieldObject.price), 1 == ae(".processing_fee_checkbox").prop("checked")) {
        var t = parseFloat(Ue).toFixed(2),
          n = ae(qe.currency.selector).val(),
          o = se[n];
        e.html(e.data("original-text") + " " + o + t + (z.isRecurring() ? fe.buttons.monthly : ""))
      } else e.html(e.data("original-text") + " " + z.getAmount(!0, oe) + (z.isRecurring() ? fe.buttons.monthly : ""));
      z.isRecurring() ? X.productFieldObject.category = "Monthly Donation" : X.productFieldObject.category = "Single Donation", X.ecommerceCheckoutReport(Q.options.currentStep + 1)
    }

    function B() {
      var e = ae("#en__field_transaction_ccnumber").val();
      e = e.replace(/\s/g, ""), ae("#en__field_transaction_ccnumber").val(e)
    }

    function G(e) {
      return t(), B(), e.preventDefault(), he.disableButtons(me, ".btn-submit"), me.off("submit"), (!ee.exists || !ee.launch()) && (localStorage.setItem("HSIsessions", 1), W(), me.submit(), !1)
    }

    function q() {
      ae(".logo", ".header .logo--wrapper").attr("src", "https://aaf1a18515da0e792f78-c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com/104/HSI-logo.png?v=1503710412000")
    }

    function j(e) {
      void 0 !== e ? ae("body", "html").addClass(e) : H() ? ae("body").addClass("donation donation-post-action") : ae("body").addClass("donation donation-form")
    }

    function H() {
      return pageJson.pageNumber == pageJson.pageCount ? isPostAction = !0 : isPostAction = !1, isPostAction
    }

    function $() {
      var e = new Object;
      ae('meta[property="og:url"]').length && (e.url = ae('meta[property="og:url"]:eq(0)').attr("content").trim());
      var t = "https://www.facebook.com/sharer/sharer.php?u=" + e.url;
      ae(".btn-facebook", ".postAction-share--wrapper").attr("href", t);
      var n = ae(".en__share__button--twitter").attr("href");
      ae(".btn-twitter", ".postAction-share--wrapper").attr("href", n), ae(".btn-email", ".postAction-share--wrapper").click(function (e) {
        e.preventDefault();
        var t = ae('meta[property="og:title"]').attr("content"),
          n = ae('meta[property="og:description"]').attr("content"),
          o = "";
        o = "mailto:?subject=" + t + "&body=" + encodeURIComponent(n), window.location.href = o
      })
    }

    function V() {
      return window.getComputedStyle && (windowSize = window.getComputedStyle(document.body, ":after").getPropertyValue("content"), windowSize = windowSize.replace(/["']/g, "")), windowSize
    }

    function Y() {
      (ae(".en__field--opt-in-enframe").length || ae(".en__field--opt-in").length) && (ae.ajax({
        type: "GET",
        url: "https://services.grassriots.com/",
        dataType: "jsonp",
        cache: !1,
        crossDomain: !0,
        error: function (e, t, n) {},
        success: function (e, t, n) {
          "not found" == e.status ? detectedLocale = "FR" : detectedLocale = e.data.isocode;
          var o = I(detectedLocale),
            a = window.pageJson.locale,
            i = /[^-]*$/;
          r = a.match(i)[0], classifyPageLocale = I(r);
          var r;
          J(), ae("#en__field_supporter_country").change(function () {
            J()
          }), 5 == o || 1 == o || 5 == classifyPageLocale || 1 == classifyPageLocale ? (Ae = !0, ae(".en__field--opt-in-enframe input").prop("checked", !1), ae(".en__field--opt-in input").prop("checked", !1), K()) : 3 != o && 3 != classifyPageLocale || (ae(".en__field--opt-in-enframe input").prop("checked", !1), ae(".en__field--opt-in input").prop("checked", !1), ae(".en__field--opt-in-french input").prop("checked", !1), K()), K()
        }
      }), Z())
    }

    function J() {
      var e = ae("#en__field_supporter_country").find(":selected").val(),
        t = I(e);
      5 == t || 1 == t ? (Ae = !0, K()) : (Ae = !1, K())
    }

    function K() {
      ae(".page--2 .btn-next").click(function (e) {
        !Pe && Ae && (e.preventDefault(), e.stopPropagation(), ae("#consent-modal").fadeIn("slow"))
      }), ae(".page--3 .btn-next.btn-submit").on("click", function (e) {
        Re = !0, !Pe && Ae && (e.preventDefault(), e.stopPropagation(), ae("#consent-modal").fadeIn("slow"))
      })
    }

    function W() {
      0 == ae(qe.region.selector).val().length && ae(qe.region.selector).val("N/A")
    }

    function Z() {
      ae(".consent-modal--button-section .checkbox label").click(function () {
        ae(".en__field--opt-in-enframe input").prop("checked", !0), ae(".en__field--opt-in input").prop("checked", !0), window.setTimeout(function () {
          Pe = !0, ae("#consent-modal").fadeOut("slow"), Re ? me.valid() && (W(), me.submit()) : Q.nextStep()
        }, 500)
      }), ae(".consent-modal--button-section .consent-decline").click(function () {
        ae(".en__field--opt-in-enframe input").prop("checked", !1), ae(".en__field--opt-in input").prop("checked", !1), window.setTimeout(function () {
          Pe = !0, ae("#consent-modal").fadeOut("slow"), Re ? me.valid() && (W(), me.submit()) : Q.nextStep()
        }, 500)
      })
    }

    function I(t) {
      var n = t;
      switch ("-1" != e.inArray(n, Ee) && (n = "EU"), n) {
        case "GB":
        case "GBR":
          return 1;
        case "US":
        case "USA":
          return 2;
        case "CA":
        case "CAN":
          return 3;
        case "AU":
        case "AUS":
          return 4;
        case "EU":
          return 5;
        default:
          return 6
      }
    }
    var X, Q, z, ee, te, ne, oe, ae = n(0),
      ie = (n(27), n(21)),
      re = n(24),
      se = n(12),
      le = n(23),
      ce = n(25),
      pe = (n(20), ".roll-call--wrapper"),
      de = n(11),
      ue = n(26),
      me = ae("form.en__component"),
      he = n(2),
      fe = n(1);
    n(5), n(6), n(10), n(7), n(8), n(9), n(1);
    var ge, _e, ve, be, ye, we, Ce, ke, Se, xe, Ae = !1,
      Pe = !1,
      Re = !1,
      Ne = "",
      Le = "",
      De = !1,
      Ie = 0,
      Te = 0,
      Me = 0,
      Ue = 0,
      Oe = 0,
      Ee = new Array("AL", "AT", "BY", "BE", "BA", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MK", "MT", "MC", "ME", "NL", "NO", "PL", "PT", "RO", "RU", "BA", "ME", "RS", "SK", "SI", "ES", "SE", "CH", "TR", "UA", "ALB", "AUT", "BLR", "BEL", "BIH", "BGR", "HRV", "CYP", "CZE", "DNK", "EST", "FIN", "FRA", "DEU", "GRC", "HUN", "ISL", "IRL", "ITA", "LVA", "LTU", "LUX", "MKD", "MLT", "MCO", "MNE", "NLD", "NOR", "POL", "PRT", "ROU", "RUS", "BIH", "MNE", "SRB", "SVK", "SVN", "ESP", "SWE", "CHE", "TUR", "UKR"),
      Fe = !1,
      Be = ae("#errorModal"),
      Ge = [],
      qe = (ae(".js-formContainer"), he.buildFieldNameObject({
        email: "supporter.emailAddress",
        fname: "supporter.firstName",
        lname: "supporter.lastName",
        street1: "supporter.address1",
        street2: "supporter.address2",
        city: "supporter.city",
        region: "supporter.region",
        postal: "supporter.postcode",
        country: "supporter.country",
        phone: "supporter.phoneNumber",
        pay_source: "supporter.NOT_TAGGED_113",
        pay_type: "transaction.paymenttype",
        cc_num: "transaction.ccnumber",
        cc_cvv: "transaction.ccvv",
        cc_exp: "transaction.ccexpire",
        bank_holder: "supporter.NOT_TAGGED_117",
        bank_acct: "supporter.bankAccountNumber",
        bank_inst: "supporter.bankRoutingNumber",
        bank_type: "supporter.bankAccountType",
        bank_day: "supporter.NOT_TAGGED_112",
        amt: "transaction.donationAmt",
        amt_other: "transaction.donationAmt.other",
        currency: "transaction.paycurrency",
        recur_pay: "transaction.recurrpay",
        recur_freq: "transaction.recurrfreq",
        recur_day: "transaction.recurrday",
        optin: "supporter.questions.374",
        giftaid: "supporter.questions.64098",
        mon_upsell: "transaction.othamt1",
        process_fee: "transaction.othamt4"
      }, "pagebuilder")),
      je = !1,
      He = !1;
    ae(document).ready(function () {
      s(), g(), H() ? (p(), r()) : l(), ae(".mobile-button--wrapper button").click(function () {
        f()
      }), window.setTimeout(function () {
        ae(".se-pre-con").fadeOut("slow")
      }, 1e3)
    }), ae(window).scroll(function () {
      var e = ae("#campaign");
      e.length && (campaignOffset = e.offset().top - 100, scrolledY = ae(this).scrollTop(), scrolledY >= campaignOffset && ae(window).width() < 768 ? ae(".mobile-button--wrapper").show() : ae(".mobile-button--wrapper").hide())
    });
    var $e, Ve, Ye = 0
  }).call(t, n(0))
}, function (e, t) {}, , function (e, t, n) {
  function o(e) {
    return n(a(e))
  }

  function a(e) {
    var t = i[e];
    if (!(t + 1)) throw new Error("Cannot find module '" + e + "'.");
    return t
  }
  var i = {
    "./en-au": 5,
    "./en-au.js": 5,
    "./en-ca": 6,
    "./en-ca.js": 6,
    "./en-cb": 7,
    "./en-cb.js": 7,
    "./en-gb": 8,
    "./en-gb.js": 8,
    "./en-ie": 9,
    "./en-ie.js": 9,
    "./en-us": 1,
    "./en-us.js": 1,
    "./fr-ca": 10,
    "./fr-ca.js": 10
  };
  o.keys = function () {
    return Object.keys(i)
  }, o.resolve = a, e.exports = o, o.id = 18
}, function (e, t, n) {
  function o(e) {
    return n(a(e))
  }

  function a(e) {
    var t = i[e];
    if (!(t + 1)) throw new Error("Cannot find module '" + e + "'.");
    return t
  }
  var i = {
    "./GRRegions-CA": 13,
    "./GRRegions-CA.js": 13,
    "./GRRegions-US": 14,
    "./GRRegions-US.js": 14
  };
  o.keys = function () {
    return Object.keys(i)
  }, o.resolve = a, e.exports = o, o.id = 19
}, function (e, t, n) {
  (function (t) {
    function o(e) {
      if (missing = s.hasMissingOptions(e, a)) throw new Error("[ENdicator] Missing required options: " + missing.join(", "));
      this.options = t.extend(!0, {}, i, e, r), this.init()
    }
    var a = ["form"],
      i = {
        autoUpdateGoal: !0,
        updateGoal: function (e, t, n) {
          return 100 * ~~(((e + t) / .9 + 99) / 100)
        }
      },
      r = {
        enWidgetClass: "en__component--widgetblock"
      },
      s = n(2);
    o.prototype.init = function () {
      this.widgets = [], this.collectWidgetIds(this.options.form)
    }, o.prototype.collectWidgetIds = function (e) {
      var n = this;
      e.find("." + this.options.enWidgetClass + " script").each(function () {
        var o = {};
        o.id = t(this).data("id"), t.ajax({
          type: "GET",
          url: "/page/widget/" + o.id,
          dataType: "json",
          success: function (t, a, i) {
            if (t) {
              if (o.metrics = {}, t.data && t.data.rows && t.data.rows.length) {
                for (var r = {}, s = 0; s < t.data.rows.length; s++)
                  if (t.data.rows[s].columns && t.data.rows[s].columns.length)
                    for (var l = 0; l < t.data.rows[s].columns.length; l++)["xs:int", "xs:decimal"].indexOf(t.data.rows[s].columns[l].type) < 0 || (void 0 === r[t.data.rows[s].columns[l].name] && (r[t.data.rows[s].columns[l].name] = 0), r[t.data.rows[s].columns[l].name] += parseFloat(t.data.rows[s].columns[l].value));
                o.metrics = r, o.rawdata = t.data.rows
              }
              t.type && (o.type = t.type), t.jsonContent && (o.settings = JSON.parse(t.jsonContent)), n.options.autoUpdateGoal && (o = n.updateGoal(o)), n.widgets.push(o), e.trigger("endicator.widget.received", [o])
            }
          }
        })
      })
    }, o.prototype.updateGoal = function (e) {
      var t = 0;
      if (e.metrics[e.settings.metric]) {
        switch (e.metrics[e.settings.metric].type) {
          case "xs:int":
            t = parseInt(e.metrics[e.settings.metric].value, 10);
            break;
          case "xs:decimal":
            t = parseFloat(e.metrics[e.settings.metric].value);
            break;
          default:
            return e
        }
        t >= e.settings.goal && (e.settings.goal = this.options.updateGoal(e.settings.initial, t, e.settings.goal))
      }
      return e
    }, e.exports = o
  }).call(t, n(0))
}, function (e, t, n) {
  (function (t) {
    function o(e) {
      if (!this.hasRequiredOptions(e)) throw new Error("[GRAnalytics] Missing required options: " + this.missingOptions.join(", "));
      i = t.extend(!0, {}, s, e, l), this.init()
    }

    function a(e) {
      "/" != i.prefix.charAt(0) && (i.prefix = "/" + i.prefix), i.prependPath[0] = i.prefix
    }
    var i, r = [],
      s = {
        prefix: "/virtual",
        events: [],
        trackingPixels: {},
        ignoreGTM: !1,
        gtmTrackerName: !1,
        currency: "CAD",
        gtm: {
          socialAction: "socialAction",
          socialNetwork: "socialNetwork",
          socialTarget: "socialTarget",
          virtualPageURL: "virtualPageURL",
          virtualPageTitle: "virtualPageTitle",
          eCommerceEvent: "eCommerceTransaction",
          eeCheckoutEvent: "eeCheckout",
          eeCheckoutOptionEvent: "eeCheckoutOption",
          eePurchaseEvent: "eePurchase",
          virtualPageviewEvent: "VirtualPageview",
          socialActivityEvent: "SocialActivity"
        },
        extraTrackers: !1
      },
      l = {
        prependPath: []
      };
    o.prototype.hasRequiredOptions = function (e, t) {
      var n = [];
      void 0 === t && (t = r);
      for (var o = 0; o < t.length; o++) void 0 === e[t[o]] && n.push(t[o]);
      return !n.length || (this.missingOptions = n, !1)
    }, o.prototype.init = function () {
      this.productFieldObject = {}, a(i.prefix), !1 !== i.gtmTrackerName ? i.gtmTrackerName = i.gtmTrackerName + "." : i.gtmTrackerName = "", i.events.length && this.setEventListeners(i.events);
      for (var e in i.trackingPixels) i.trackingPixels[e] instanceof Object && this.hasRequiredOptions(i.trackingPixels[e], c) ? this.registerPixel(e, i.trackingPixels[e].id.toString(), i.trackingPixels[e].showPixel) : -1 != ["string", "number"].indexOf((typeof i.trackingPixels[e]).toLowerCase()) && this.registerPixel(e, i.trackingPixels[e].toString())
    }, o.prototype.setEventListeners = function (e) {
      if (void 0 === i.form) throw new Error('"form" option needs to be specified to use the auto-event-listener functionality');
      for (var t = this.analyticsReport, n = 0; n < e.length; n++) {
        var o = e[n];
        i.form.on(o.event, o.selector, function (e) {
          t(o.virtualPageview)
        })
      }
    }, o.prototype.addToPrefix = function (e) {
      i.prependPath.push(e.toString())
    }, o.prototype.ecommerceCheckoutReport = function (e, n, o) {
      var a, r = {};
      if (void 0 === o && (o = !1), o && void 0 !== e && void 0 !== n) r = {
        checkout_option: {
          actionField: {
            step: e,
            option: n
          }
        }
      }, a = i.gtm.eeCheckoutOptionEvent;
      else {
        r = {
          currencyCode: i.currency,
          checkout: {
            products: [this.productFieldObject]
          }
        };
        var s = {};
        void 0 !== e && (s.step = e), void 0 !== n && (s.option = n), t.isEmptyObject(s) || (r.checkout.actionField = s), a = i.gtm.eeCheckoutEvent
      }
      this.enhancedEcommerceReport(a, r)
    }, o.prototype.ecommercePurchaseReport = function (e, t) {
      void 0 === t && (t = [this.productFieldObject]);
      var n = {
        currencyCode: void 0 !== e.currency ? e.currency : i.currency,
        purchase: {
          actionField: e,
          products: t
        }
      };
      this.enhancedEcommerceReport(i.gtm.eePurchaseEvent, n)
    }, o.prototype.enhancedEcommerceReport = function (e, t) {
      "undefined" == typeof dataLayer || i.ignoreGTM || dataLayer.push({
        event: e,
        ecommerce: t
      })
    }, o.prototype.eCommerceReport = function (e, t) {
      if ("undefined" != typeof dataLayer && !i.ignoreGTM) {
        for (var n = 0; n < t.length; n++) delete t[n].id;
        return void dataLayer.push({
          transactionId: e.id,
          transactionAffiliation: e.affiliation,
          transactionCurrency: e.currency,
          transactionTotal: e.revenue,
          transactionTax: 0,
          transactionShipping: 0,
          transactionProducts: t,
          event: i.gtm.eCommerceEvent
        })
      }
      if ("undefined" != typeof ga) {
        ga(i.gtmTrackerName + "require", "ecommerce"), ga(i.gtmTrackerName + "ecommerce:addTransaction", e);
        for (var n = 0; n < t.length; n++) ga(i.gtmTrackerName + "ecommerce:addItem", t[n]);
        if (ga(i.gtmTrackerName + "ecommerce:send"), i.extraTrackers)
          for (var n = 0; n < i.extraTrackers.length; n++) {
            ga(i.extraTrackers[n] + ".require", "ecommerce"), ga(i.extraTrackers[n] + ".ecommerce:addTransaction", e);
            for (var n = 0; n < t.length; n++) ga(i.extraTrackers[n] + ".ecommerce:addItem", t[n]);
            ga(i.extraTrackers[n] + ".ecommerce:send")
          }
      }
      if ("undefined" != typeof _gaq) {
        _gaq.push(["_set", "currencyCode", e.currency]), _gaq.push(["_trackPageview"]), _gaq.push(["_addTrans", e.id, e.affiliation, e.revenue, "0", "0"]);
        for (var n = 0; n < t.length; n++) _gaq.push(["_addItem", t[n].id, t[n].sku, t[n].name, t[n].category, t[n].price, t[n].quantity]);
        _gaq.push(["_trackTrans"])
      }
    }, o.prototype.analyticsReport = function (e, t) {
      var n = i.prependPath.join("/") + "/" + e,
        o = {};
      if (o.page = n, t && (o.title = t), "undefined" != typeof dataLayer && !i.ignoreGTM) {
        var a = {
          event: i.gtm.virtualPageviewEvent
        };
        return a[i.gtm.virtualPageURL] = n, a[i.gtm.virtualPageTitle] = t, void dataLayer.push(a)
      }
      if ("undefined" != typeof ga && (ga(i.gtmTrackerName + "send", "pageview", o), i.extraTrackers, !0))
        for (var r = 0; r < i.extraTrackers.length; r++) ga(i.extraTrackers[r] + ".send", "pageview", o);
      "undefined" != typeof _gaq && _gaq.push(["_trackPageview", n])
    }, o.prototype.socialReport = function (e) {
      if ("undefined" != typeof dataLayer && !i.ignoreGTM) {
        var t = {
          event: i.gtm.socialActivityEvent
        };
        return t[i.gtm.socialNetwork] = e.socialNetwork, t[i.gtm.socialAction] = e.socialAction, t[i.gtm.socialTarget] = e.socialTarget, void dataLayer.push(t)
      }
      if ("undefined" != typeof ga && (ga(i.gtmTrackerName + "send", "social", e.socialNetwork, e.socialAction, e.socialTarget), i.extraTrackers, !0))
        for (var n = 0; n < i.extraTrackers.length; n++) ga(i.extraTrackers[n] + ".send", "social", e.socialNetwork, e.socialAction, e.socialTarget)
    };
    var c = ["id", "showPixel"],
      p = ["facebook", "facebookv2"],
      d = {},
      u = {};
    o.prototype.registerPixel = function (e, t, o) {
      "function" == typeof o ? d[e] = {
        id: t,
        showPixel: o
      } : -1 != p.indexOf(e.toLowerCase()) && (d[e] = "pending", n.e(0).then(function (n) {
        var o = ! function () {
          var e = new Error('Cannot find module "."');
          throw e.code = "MODULE_NOT_FOUND", e
        }();
        if (d[e] = {
            id: t,
            showPixel: o.showPixel
          }, void 0 !== u[e])
          for (var a = 0; a < u[e].length; a++) d[e].showPixel(d[e].id, u[e][a])
      }.bind(null, n)).catch(n.oe))
    }, o.prototype.fireTrackingPixels = function (e, t) {
      var n = e;
      null == e ? n = d.keys : "string" == typeof n && (n = [n]);
      for (var o = 0; o < n.length; o++) void 0 !== d[n[o]] && ("string" == typeof d[n[o]] ? (void 0 === u[n[o]] && (u[n[o]] = []), u[n[o]].push(t)) : "function" == typeof d[n[o]].showPixel && d[n[o]].showPixel(d[n[o]].id, t))
    }, e.exports = o
  }).call(t, n(0))
}, function (e, t) {
  e.exports = {
    BD: "BDT",
    BE: "EUR",
    BF: "XOF",
    BG: "BGN",
    BA: "BAM",
    BB: "BBD",
    WF: "XPF",
    BL: "EUR",
    BM: "BMD",
    BN: "BND",
    BO: "BOB",
    BH: "BHD",
    BI: "BIF",
    BJ: "XOF",
    BT: "BTN",
    JM: "JMD",
    BV: "NOK",
    BW: "BWP",
    WS: "WST",
    BQ: "USD",
    BR: "BRL",
    BS: "BSD",
    JE: "GBP",
    BY: "BYR",
    BZ: "BZD",
    RU: "RUB",
    RW: "RWF",
    RS: "RSD",
    TL: "USD",
    RE: "EUR",
    TM: "TMT",
    TJ: "TJS",
    RO: "RON",
    TK: "NZD",
    GW: "XOF",
    GU: "USD",
    GT: "GTQ",
    GS: "GBP",
    GR: "EUR",
    GQ: "XAF",
    GP: "EUR",
    JP: "JPY",
    GY: "GYD",
    GG: "GBP",
    GF: "EUR",
    GE: "GEL",
    GD: "XCD",
    GB: "GBP",
    GA: "XAF",
    SV: "USD",
    GN: "GNF",
    GM: "GMD",
    GL: "DKK",
    GI: "GIP",
    GH: "GHS",
    OM: "OMR",
    TN: "TND",
    JO: "JOD",
    HR: "HRK",
    HT: "HTG",
    HU: "HUF",
    HK: "HKD",
    HN: "HNL",
    HM: "AUD",
    VE: "VEF",
    PR: "USD",
    PS: "ILS",
    PW: "USD",
    PT: "EUR",
    SJ: "NOK",
    PY: "PYG",
    IQ: "IQD",
    PA: "PAB",
    PF: "XPF",
    PG: "PGK",
    PE: "PEN",
    PK: "PKR",
    PH: "PHP",
    PN: "NZD",
    PL: "PLN",
    PM: "EUR",
    ZM: "ZMK",
    EH: "MAD",
    EE: "EUR",
    EG: "EGP",
    ZA: "ZAR",
    EC: "USD",
    IT: "EUR",
    VN: "VND",
    SB: "SBD",
    ET: "ETB",
    SO: "SOS",
    ZW: "ZWL",
    SA: "SAR",
    ES: "EUR",
    ER: "ERN",
    ME: "EUR",
    MD: "MDL",
    MG: "MGA",
    MF: "EUR",
    MA: "MAD",
    MC: "EUR",
    UZ: "UZS",
    MM: "MMK",
    ML: "XOF",
    MO: "MOP",
    MN: "MNT",
    MH: "USD",
    MK: "MKD",
    MU: "MUR",
    MT: "EUR",
    MW: "MWK",
    MV: "MVR",
    MQ: "EUR",
    MP: "USD",
    MS: "XCD",
    MR: "MRO",
    IM: "GBP",
    UG: "UGX",
    TZ: "TZS",
    MY: "MYR",
    MX: "MXN",
    IL: "ILS",
    FR: "EUR",
    IO: "USD",
    SH: "SHP",
    FI: "EUR",
    FJ: "FJD",
    FK: "FKP",
    FM: "USD",
    FO: "DKK",
    NI: "NIO",
    NL: "EUR",
    NO: "NOK",
    NA: "NAD",
    VU: "VUV",
    NC: "XPF",
    NE: "XOF",
    NF: "AUD",
    NG: "NGN",
    NZ: "NZD",
    NP: "NPR",
    NR: "AUD",
    NU: "NZD",
    CK: "NZD",
    XK: "EUR",
    CI: "XOF",
    CH: "CHF",
    CO: "COP",
    CN: "CNY",
    CM: "XAF",
    CL: "CLP",
    CC: "AUD",
    CA: "CAD",
    CG: "XAF",
    CF: "XAF",
    CD: "CDF",
    CZ: "CZK",
    CY: "EUR",
    CX: "AUD",
    CR: "CRC",
    CW: "ANG",
    CV: "CVE",
    CU: "CUP",
    SZ: "SZL",
    SY: "SYP",
    SX: "ANG",
    KG: "KGS",
    KE: "KES",
    SS: "SSP",
    SR: "SRD",
    KI: "AUD",
    KH: "KHR",
    KN: "XCD",
    KM: "KMF",
    ST: "STD",
    SK: "EUR",
    KR: "KRW",
    SI: "EUR",
    KP: "KPW",
    KW: "KWD",
    SN: "XOF",
    SM: "EUR",
    SL: "SLL",
    SC: "SCR",
    KZ: "KZT",
    KY: "KYD",
    SG: "SGD",
    SE: "SEK",
    SD: "SDG",
    DO: "DOP",
    DM: "XCD",
    DJ: "DJF",
    DK: "DKK",
    VG: "USD",
    DE: "EUR",
    YE: "YER",
    DZ: "DZD",
    US: "USD",
    UY: "UYU",
    YT: "EUR",
    UM: "USD",
    LB: "LBP",
    LC: "XCD",
    LA: "LAK",
    TV: "AUD",
    TW: "TWD",
    TT: "TTD",
    TR: "TRY",
    LK: "LKR",
    LI: "CHF",
    LV: "EUR",
    TO: "TOP",
    LT: "LTL",
    LU: "EUR",
    LR: "LRD",
    LS: "LSL",
    TH: "THB",
    TF: "EUR",
    TG: "XOF",
    TD: "XAF",
    TC: "USD",
    LY: "LYD",
    VA: "EUR",
    VC: "XCD",
    AE: "AED",
    AD: "EUR",
    AG: "XCD",
    AF: "AFN",
    AI: "XCD",
    VI: "USD",
    IS: "ISK",
    IR: "IRR",
    AM: "AMD",
    AL: "ALL",
    AO: "AOA",
    AQ: "",
    AS: "USD",
    AR: "ARS",
    AU: "AUD",
    AT: "EUR",
    AW: "AWG",
    IN: "INR",
    AX: "EUR",
    AZ: "AZN",
    IE: "EUR",
    ID: "IDR",
    UA: "UAH",
    QA: "QAR",
    MZ: "MZN"
  }
}, function (e, t, n) {
  (function (t) {
    function o(e) {
      return void 0 !== e && void 0 !== e.selector && null != e.selector
    }

    function a(e) {
      return !(!o(e) || !_.find(e.selector).length)
    }

    function i(e, t, n) {
      null == n && (n = !1);
      var o = _.find(e.selector);
      switch (o.prop("tagName").toLowerCase()) {
        case "select":
          if (0 == o.find('option[value="' + t + '"]').length) {
            if (n) return !1;
            o.append('<option value="' + t + '">' + t + "</option>")
          }
          o.val(t);
          break;
        default:
          switch (o.attr("type").toLowerCase()) {
            case "checkbox":
            case "radio":
              if (!o.filter('[value="' + t + '"]').length) return !1;
              o.filter('[value="' + t + '"]').prop("checked", !0);
              break;
            default:
              o.val(t)
          }
      }
      return !0
    }

    function r(e) {
      var n = _.find(e.selector);
      switch (n.prop("tagName").toLowerCase()) {
        case "select":
          return n.val();
        default:
          switch (n.attr("type").toLowerCase()) {
            case "checkbox":
              var o = [];
              return n.filter(":checked").each(function (e) {
                o[e] = t(this).val()
              }), o;
            case "radio":
              return n.filter(":checked").length ? n.filter(":checked").val() : "";
            default:
              return n.val()
          }
      }
    }

    function s(e) {
      var n = _.find(e.selector);
      switch (n.prop("tagName").toLowerCase()) {
        case "select":
          var o = null;
          return n.children("option").each(function () {
            null != this.getAttributeNode("selected") && this.getAttributeNode("selected").specified && (o = t(this).attr("value"))
          }), o;
        default:
          switch (n.attr("type").toLowerCase()) {
            case "checkbox":
            case "radio":
              var a = null;
              return n.each(function () {
                this.getAttribute("checked") && (a = t(this).val())
              }), a;
            default:
              return "" == n[0].getAttribute("value") ? null : n[0].getAttribute("value")
          }
      }
    }

    function l(e) {
      0 == g.form.find("." + g.creditCardLogoContainerClass).length && g.form.find(g.components.creditcard.containerSelector).before('<div class="' + g.creditCardLogoContainerClass + '"></div>');
      var n = g.form.find("." + g.creditCardLogoContainerClass);
      n.hasClass(g.creditCardLogoClasses) || n.addClass(g.creditCardLogoClasses), n.children().remove(), e.each(function () {
        var e = c(t(this).attr("value"));
        "" != t(this).attr("value") && !1 !== e && n.append('<span class="ccLogo ccLogo-' + e + '" data-payment-value="' + t(this).attr("value") + '"></span>')
      })
    }

    function c(e) {
      switch (e.toString().toLowerCase()) {
        case "vi":
        case "visa":
          return "visa";
        case "mc":
        case "mastercard":
        case "master card":
        case "master":
          return "mastercard";
        case "amex":
        case "americanexpress":
        case "american express":
        case "ax":
          return "americanexpress";
        case "discover":
        case "disc":
        case "di":
          return "discover";
        default:
          return !1
      }
    }

    function p(e) {
      if (missing = P.hasMissingOptions(e, b)) throw new Error("[GRGivingSupport] Missing required options: " + missing.join(", "));
      g = t.extend(!0, {}, y, e, w), this.init()
    }

    function d(e) {
      return t("body").hasClass("ask_button_text") || (e = e.replace(/[^0-9\.]/g, ""), e = parseFloat(e), isNaN(e) && (e = 0)), e
    }

    function u(e, t) {
      "number" != typeof e && (e = d(e));
      var n = g.fixedCurrency;
      if (a(g.components.currency)) var n = _.find(g.components.currency.selector).val();
      var o = e.toLocaleString(t, {
        style: "currency",
        currency: n
      });
      switch (t) {
        case "fr-ca":
          return o.replace(/\,00/, "");
        case "es-MX":
          return o.replace("USD", "$").replace(/\.00/, "");
        default:
          return o.replace(/\.00$/, "")
      }
    }

    function m() {
      var e, t;
      if (g.collectAskButtons) {
        var n = "onetime";
        return o(g.components.recurrence) && _.find(g.components.recurrence.selector).length > 1 && (t = _.find(g.components.recurrence.selector + ":checked").data("index")) && (n = t), n
      }
      var n = [];
      return o(g.components.currency) && (e = _.find(g.components.currency.selector).val()) ? n.push(e) : void 0 !== g.components.currency.defaultVal && (e = g.components.currency.defaultVal, n.push(e)), o(g.components.recurrence) && _.find(g.components.recurrence.selector).length > 1 && (t = _.find(g.components.recurrence.selector + ":checked").siblings("label:eq(0)").text().toLowerCase().replace(/[^a-z0-9]/g, "_")) && n.push(t), 0 == n.length ? "default" : n.join("-")
    }

    function h(e) {
      var n = t(g.askStringSelector).find("ul." + e);
      if (n.length) {
        var o = [];
        n.find("li").each(function () {
          o.push(t(this).text())
        })
      } else o = !1;
      return {
        amounts: o
      }
    }

    function f(e) {
      var n = [];
      if (void 0 !== e && e)
        for (var i = 0; i < e.length; i++) {
          var r = e[i];
          n.push(P.createRadioComponent({
            name: g.components.amount.name,
            label: r.replace(/\*/g, ""),
            value: r.replace(/[^0-9\.]/g, ""),
            wrap: "<div class='amountbutton'></div>",
            atts: -1 != r.indexOf("*") ? ['checked="checked"'] : ""
          }))
        }
      if (a(g.components.other)) n.push(P.createRadioComponent({
        name: g.components.other.targetName,
        label: t("<div>").append(_.find(g.components.other.selector).clone()).html(),
        value: "other",
        classNames: [g.components.other.classNames],
        wrap: "<div class='amountbutton'></div>"
      }));
      else if (o(g.components.other) && !a(g.components.other)) {
        var s = P.createTextComponent({
          name: g.components.other.name,
          id: g.components.other.name.replace(/[^a-zA-Z0-9\-\_]/g, "-"),
          placeholder: void 0 !== g.components.other.label ? g.components.other.label : ""
        });
        n.push(P.createRadioComponent({
          name: g.components.other.targetName,
          label: t("<div>").append(s.clone()).html(),
          value: "other",
          classNames: [g.components.other.classNames],
          wrap: "<div class='amountbutton'></div>"
        }))
      }
      return n
    }
    var g, _, v, b = ["form"],
      y = {
        autoSelectCurrency: !1,
        autoBuildCurrencyList: !1,
        availableLogos: !1,
        creditCardLogoContainerClass: "js-creditCardLogos",
        creditCardLogoClasses: "eaRightColumnContent js-form-field-container inline-block-field-wrap half-wrap last-wrap",
        components: {
          country: {},
          region: {},
          currency: {},
          recurrence: {},
          amount: {},
          creditcard: {},
          other: {
            classNames: ["amountbutton--other"]
          },
          processor: {}
        },
        activeRegionLists: [],
        askStringSelector: ".js-donation-amounts",
        askStringContainerClass: "js-ask-string-container",
        autoDetectCreditCard: !1,
        collectAskButtons: !1,
        currencySymbol: "$",
        formFieldWrapperClass: "en__field__item",
        formFieldContainerClass: "en__field__item",
        processorFields: {},
        recurrenceOptions: [],
        recurrenceConfirmValue: "Y",
        recurrenceRejectValue: ""
      },
      w = {
        components: {
          other: {
            urlParam: null,
            defaultVal: null
          }
        }
      },
      C = [],
      k = {},
      S = ["US", "CA", "AU", "IN"],
      x = n(22),
      A = n(12),
      P = n(2),
      R = {},
      N = {},
      L = ["country", "region", "currency", "recurrence", "amount", "processor"];
    p.prototype.init = function () {
      _ = g.form, this.getDefaults();
      var e = this;
      if (o(g.components.recurrence) && (g.recurrenceOptions.length && this.buildRecurrenceSelector(g.recurrenceOptions), t(g.components.recurrence.selector).each(function () {
          t(this).data("index", "Y" == t(this).val() ? "recurring" : "onetime")
        }), _.find(g.components.recurrence.selector).on("change", function () {
          var t = "onetime";
          e.isRecurring() && (t = "recurring"), e.updateAskString.call(e), g.collectAskButtons && 0 === _.find(g.components.amount.selector).filter(":checked").length && void 0 !== C[t] && C[t].length > 0 && (e.setAmount.call(e, C[t]), _.find(g.components.amount.selector).filter(":checked").trigger("change"))
        })), o(g.components.processor) && (g.processorFields && this.setProcessorFields(g.processorFields), _.find(g.components.processor.selector).on("change", function (e) {
          void 0 !== R[r(g.components.processor)] && (R[r(g.components.processor)].hide && t(R[r(g.components.processor)].hide.join(", ")).hide().find("input, select, textarea").prop("disabled", !0), R[r(g.components.processor)].show && t(R[r(g.components.processor)].show.join(", ")).show().find("input, select, textarea").prop("disabled", !1))
        }), void 0 !== g.components.processor.countryMap)) {
        if (void 0 === g.components.processor.countryMap.default) throw new Error("[GRGivingSupport] No default processor list defined");
        t(g.components.processor.selector).find("option").each(function () {
          t(this).attr("data-name", t(this).text())
        }), v = t(g.components.processor.selector).find("option"), _.find(g.components.country.selector).on("change", function (e) {
          var n = t(g.components.processor.selector),
            o = g.components.processor.countryMap.default;
          void 0 !== g.components.processor.countryMap[t(this).val()] && (o = g.components.processor.countryMap[t(this).val()]), o = o.map(function (e) {
            return '[data-name="' + e + '"]'
          }), v.filter(o.join(",")).length != n.children().length && (n.children().remove(), n.append(v.filter(o.join(","))), n.find("option:first").prop("selected", !0), n.trigger("change"))
        })
      }
      if (o(g.components.amount) || o(g.components.other)) {
        var n = _.find(g.components.amount.selector + "," + g.components.other.selector);
        g.collectAskButtons ? n.first().closest(".en__field__element--radio").addClass(g.askStringContainerClass) : n.first().wrap('<div class="' + g.askStringContainerClass + '"></div>'), _.on("change", g.components.amount.selector, function (e) {
          e.stopPropagation(), "other" != _.find(g.components.amount.selector).val() && _.find(g.components.other.selector).val("")
        }).on("change", g.components.other.selector, function (e) {
          e.stopPropagation(), g.collectAskButtons ? t(this).val(d(t(this).val()).toFixed(2)) : t(this).closest("label").siblings("input[type=radio]").val(d(t(this).val()).toFixed(2))
        })
      }
      if (o(g.components.other) && _.on("focus", g.components.other.selector, function (e) {
          e.preventDefault(), _.find("#" + t(this).parent().attr("for")).length ? _.find("#" + t(this).parent().attr("for")).prop("checked", !0) : t(this).siblings("input").length && t(this).siblings("input").prop("checked", !0)
        }), o(g.components.currency) && (g.autoBuildCurrencyList && t(g.askStringSelector).length && this.buildCurrencyList(), _.find(g.components.currency.selector).on("change", t.proxy(this.updateAskString, this))), g.autoDetectCreditCard && o(g.components.creditcard) && o(g.components.processor)) {
        var a = _.find(g.components.processor.selector).find("option");
        a.length && l(a), void 0 !== g.components.processor.countryMap && _.find(g.components.country.selector).on("change", function (e) {
          l(_.find(g.components.processor.selector).find("option"))
        });
        var i = "",
          s = "";
        _.on("keyup change", g.components.creditcard.selector, function (e) {
          if (!t(this).val().length || t(this).val().substring(0, 1) !== i || _.find(g.components.processor.selector).val() !== s) {
            i = t(this).val().substring(0, 1);
            var n = null;
            switch (i) {
              case "3":
                n = "americanexpress";
                break;
              case "4":
                n = "visa";
                break;
              case "2":
              case "5":
                n = "mastercard";
                break;
              case "6":
                n = "discover";
                break;
              default:
                n = null
            }
            _.find("." + g.creditCardLogoContainerClass).find(".js-ccLogo-fade").removeClass("js-ccLogo-fade"), t(this).val().length && _.find("." + g.creditCardLogoContainerClass).find(".ccLogo").not(".ccLogo-" + n).addClass("js-ccLogo-fade"), null !== n ? (_.find(g.components.processor.selector).val(_.find("." + g.creditCardLogoContainerClass).find(".ccLogo-" + n).data("payment-value")), s = _.find(g.components.processor.selector).val()) : (_.find(g.components.processor.selector).val(""), s = "")
          }
        }), t(g.components.creditcard.selector).keyup()
      }!g.askStringSelector || o(g.components.recurrence) || o(g.components.currency) || this.updateAskString(), this.setDefaults()
    }, p.prototype.getDefaults = function () {
      for (var e in g.components) {
        if (a(g.components[e])) var t = (_.find(g.components[e].selector), s(g.components[e]));
        !t && void 0 !== g.components[e].urlParam && g.components[e].urlParam && (t = P.getURLParameter(g.components[e].urlParam)), g.components[e].startingValue = t
      }
    }, p.prototype.setDefaults = function () {
      for (var e = g.components, t = 0; t < L.length; t++) {
        var n = L[t];
        if (o(e[n])) switch (n) {
          case "currency":
            !e.currency.startingValue && o(e.country) && g.autoSelectCurrency ? this.setCurrencyByCountry(_.find(e.country.selector).val()) : !e.currency.startingValue && e.currency.defaultVal ? this.setCurrency(e.currency.defaultVal) : this.setCurrency(e.currency.startingValue);
            break;
          default:
            (e[n].startingValue || void 0 !== e[n].defaultVal) && this["set" + P.ucFirst(n)](e[n].startingValue ? e[n].startingValue : e[n].defaultVal)
        }
      }
    }, p.prototype.activateCountryRegions = function (e) {
      if (o(g.components.region)) {
        var a = _.find(g.components.region.selector);
        N = {
          default: t("<div>").append(a.clone()).html()
        };
        for (var i = 0; i < e.length; i++)
          if (-1 != S.indexOf(e[i])) {
            var r = n(19)("./GRRegions-" + e[i]);
            N[e[i]] = P.createSelectComponent({
              name: a.attr("name"),
              placeholder: r.name,
              classes: a.attr("class"),
              options: r.regions
            })
          }
      }
    }, p.prototype.getAmount = function (e, t) {
      void 0 === e && (e = !1), void 0 === t && (t = "en-ca");
      var n = 0,
        o = g.currencySymbol,
        i = _.find(g.components.amount.selector).filter(":checked");
      if (a(g.components.amount) && i.length && (n = i.val()), ("other" == n.toString().toLowerCase() || !a(g.components.amount) && a(g.components.other) || i.length && i.hasClass(g.components.other.classNames)) && (n = d(_.find(g.components.other.selector).val())), isNaN(parseFloat(n)) && (n = 0), a(g.components.currency)) {
        var r = _.find(g.components.currency.selector).val();
        void 0 !== A[r] && (o = A[r])
      }
      if (!e) return parseFloat(n).toFixed(2);
      switch (t) {
        case "fr-ca":
          return n.toString() + " " + o;
        default:
          return o + n.toString()
      }
    }, p.prototype.setAmount = function (e, t) {
      e = d(e);
      var n = g.components.amount,
        o = g.components.other;
      t && this.setCurrency(t), a(n) && 0 == i(n, e) ? i(n, "other") : a(n) && (_.find(n.selector).trigger("change"), e = ""), a(o) && (i(o, e), _.find(o.selector).trigger("change"))
    }, p.prototype.updateAskString = function () {
      if (o(g.components.amount)) {
        var e = m();
        if (k[e] || (g.collectAskButtons ? this.collectAskButtons() : k[e] = h(e)), !k[e]) throw new Error("[GRGivingSupport] No ask string defined for: " + e.toString());
        var n = t("." + g.askStringContainerClass);
        g.collectAskButtons || k[e].buttons || (k[e].buttons = f(k[e].amounts)), n.children().remove(), g.collectAskButtons ? n.append(k[e]) : (n.append(k[e].buttons), this.showLabel.call(n))
      }
    }, p.prototype.setComponent = function (e, t) {
      o(g.components[e]) && i(g.components[e], t, !0) && _.find(g.components[e].selector).eq(0).trigger("change")
    }, p.prototype.getComponent = function (e) {
      var t = "";
      return o(g.components[e]) && (t = r(g.components[e])), t
    }, p.prototype.getCurrency = function () {
      return this.getComponent("currency")
    }, p.prototype.getProcessor = function () {
      return this.getComponent("processor")
    }, p.prototype.getRegion = function () {
      return this.getComponent("region")
    }, p.prototype.getRecurrence = function () {
      return this.getComponent("recurrence")
    }, p.prototype.getCountry = function () {
      return this.getComponent("country")
    }, p.prototype.setCountry = function (e) {
      this.setComponent("country", e)
    }, p.prototype.setCurrencyByCountry = function (e) {
      void 0 !== x[e] && this.setCurrency(x[e])
    }, p.prototype.setCurrency = function (e) {
      this.setComponent("currency", e)
    }, p.prototype.setProcessor = function (e) {
      this.setComponent("processor", e)
    }, p.prototype.setProcessorFields = function (e) {
      R = e
    }, p.prototype.setRegion = function (e) {
      this.setComponent("region", e)
    }, p.prototype.setRecurrence = function (e, t) {
      void 0 === t && (t = !1), e === g.recurrenceConfirmValue || t || (e = g.recurrenceRejectValue), this.setComponent("recurrence", e)
    }, p.prototype.isRecurring = function () {
      return !!o(g.components.recurrence) && "Y" == _.find(g.components.recurrence.selector).filter(":checked").val()
    }, p.prototype.buildCurrencyList = function () {
      var e = t(g.askStringSelector).find("ul"),
        n = t(g.components.currency.selector),
        o = [];
      e.each(function () {
        var e = t(this).attr("class").substring(0, 3);
        for (var n in x)
          if (x[n] == e) break; - 1 == o.indexOf(e) && o.push(e)
      }), o = o.map(function (e) {
        return {
          name: e,
          code: e
        }
      }), n.replaceWith(P.createSelectComponent({
        name: n.attr("name"),
        classes: n.attr("class"),
        options: o
      }))
    }, p.prototype.collectAskButtons = function () {
      if (o(g.components.amount)) {
        k.onetime = [], o(g.components.recurrence) && (k.recurring = []);
        var e;
        _.find(g.components.amount.selector).each(function () {
          var n, a = "onetime";
          t(this).val().length && isNaN(parseFloat(t(this).val())) ? (e = t(this).closest("." + g.formFieldWrapperClass), o(g.components.other) && e.append(t(g.components.other.selector))) : ((type = t(this).closest("." + g.formFieldWrapperClass).find("label")).length ? (type.text().match(/monthly/) && (a = "recurring", type.text(type.text().replace(/monthly/, ""))), -1 != type.text().indexOf("*") && (type.text(type.text().replace(/\*/, "")), C[a] = t(this).val()), n = type) : n = t(this).closest("." + g.formFieldWrapperClass).find("label"), n.text(u(n.text(), g.locale)), k[a].push(t(this).closest("." + g.formFieldContainerClass)))
        }), o(g.components.recurrence) && 0 === k.onetime.length && (this.setRecurrence("Y"), _.find(g.components.recurrence.selector).closest("." + g.formFieldContainerClass).hide()), o(g.components.recurrence) && 0 === k.recurring.length && (this.setRecurrence(""), _.find(g.components.recurrence.selector).closest("." + g.formFieldContainerClass).hide()), e && (k.onetime.push(e.clone()), o(g.components.recurrence) && k.recurring.push(e.clone()))
      }
    }, p.prototype.buildRecurrenceSelector = function (e) {
      if (o(g.components.recurrence)) {
        for (var t = [], n = _.find(g.components.recurrence.selector), a = 0; a < e.length; a++) {
          var i = e[a];
          t.push(P.createRadioComponent({
            name: n.attr("name"),
            label: i.label,
            value: i.value,
            wrap: "<div class='radiobutton'></div>"
          }))
        }
        this.showLabel.call(n), n.replaceWith(t)
      }
    }, p.prototype.showLabel = function () {
      this.closest(".eaFormField").prev(".eaFormElementLabel").show()
    }, e.exports = p
  }).call(t, n(0))
}, function (e, t, n) {
  (function (t) {
    function n(e) {
      this.hasRequiredOptions(e) && (this.options = t.extend(!0, {}, a, e, i), this.init())
    }
    var o = ["steps"],
      a = {
        indicatorTarget: ".steps-list",
        activeClass: "is-active",
        completeClass: "is-complete",
        panelClass: "page",
        target: ".js-formSteps",
        stepHandler: [],
        stepPreSwitchCallback: [],
        stepLabels: [],
        stepButton: 'Next<span class="glyphicon glyphicon-chevron-right"></span>',
        actionButton: 'Donate<span class="glyphicon glyphicon-chevron-right"></span>',
        backButton: '<span class="glyphicon glyphicon-chevron-left"></span> Back',
        currentStep: !1,
        startStep: 0,
        useCSSAnimation: !0,
        addButtons: !1,
        backButtons: !0,
        enterAdvances: !0
      },
      i = {
        prependPath: []
      };
    n.prototype.init = function () {
      this.stepIndicators = t(), this.disabledSteps = [], this.$container = t(this.options.target), this.options.addButtons && this.buttonify.call(this.options.steps, this), this.$container.addClass("window--frame").append("<div id='window'></div>"), this.$target = this.$container.find("#window");
      var e = this;
      this.options.steps.each(function (n, o) {
        var a = t("<div>").addClass(e.options.panelClass).addClass(e.options.panelClass + "--" + (n + 1)).data("panel", n + 1).append(t(this).children());
        e.$target.append(a)
      }), this.addSteps(this.options.steps), this.handleProgressBar(), this.$container.on("click", ".btn-next.btn-submit", function (t) {
        e.options.currentStep = e.options.actionStep
      }).on("click", ".btn-next", function (n) {
        n.stopPropagation(), t(this).animate({
          top: "0"
        }, 50, function () {
          t(this).animate({
            top: "-4"
          }, 50)
        }), window.setTimeout(function () {
          e.nextStep()
        }, 100)
      }).on("click", ".btn-prev", function (t) {
        t.stopPropagation(), e.previousStep()
      }), this.switchTo(this.options.startStep);
      var n = this;
      t(".js-formContainer").on("keydown", "input, select, textarea, button", function (e) {
        if (9 == e.which) {
          var o = t(this).parents("." + n.options.panelClass).first(),
            a = o.find("input, select, textarea, button").filter(":last"),
            i = o.find("input, select, textarea, button").filter(":first");
          !e.shiftKey && t(this).is(a) ? (e.preventDefault(), i.focus()) : e.shiftKey && t(this).is(i) && (e.preventDefault(), a.focus())
        } else 13 == e.which && n.options.enterAdvances && (e.preventDefault(), e.stopPropagation(), t(this).trigger("change"), n.nextStep());
        t("#en__field_supporter_country").length && (0 == t("#en__field_supporter_country").val().length ? t("#en__field_supporter_country").attr("data-empty", "true") : t("#en__field_supporter_country").attr("data-empty", "false")), t("#supporter-region").length && (0 == t("#supporter-region").val().length ? t("#supporter-region").attr("data-empty", "true") : t("#supporter-region").attr("data-empty", "false"))
      }), this.$container.on("stepChanged.grsteps", function (n, o) {
        e.$container.promise().done(function () {
          t(e.options.steps).filter(function (e) {
            return o.currentStep == e
          }).find("input, select, textarea, button").first().focus()
        })
      }), this.$indicatorContainer.on("click", "." + this.options.completeClass, function () {
        var n = t(this).index();
        e.options.currentStep > n && e.switchTo(n)
      })
    }, n.prototype.hasRequiredOptions = function (e, t) {
      var n = [];
      void 0 === t && (t = o);
      for (var a = 0; a < t.length; a++) void 0 === e[t[a]] && n.push(t[a]);
      return !n.length || (this.missingOptions = n, !1)
    }, n.prototype.hideStep = function (e) {
      -1 === this.disabledSteps.indexOf(e) && (this.disabledSteps.push(e), t(this.options.steps[e]).children().css("visibility", "hidden").find("input,select,textarea").prop("disabled", !0), this.stepIndicators.filter(".step" + e).hasClass("hidden-step") || this.stepIndicators.filter(".step" + e).animate({
        width: "hide",
        paddingLeft: "hide",
        paddingRight: "hide"
      }, 400), this.handleProgressBar())
    }, n.prototype.showStep = function (e) {
      -1 !== this.disabledSteps.indexOf(e) && (this.disabledSteps.splice(this.disabledSteps.indexOf(e), 1), this.handleProgressBar(), t(this.options.steps[e]).children().css("visibility", "").find("input,select,textarea").prop("disabled", !1), this.stepIndicators.filter(".step" + e).hasClass("hidden-step") || this.stepIndicators.filter(".step" + e).animate({
        width: this.stepWidth + "%",
        paddingLeft: "show",
        paddingRight: "show"
      }, 400))
    }, n.prototype.recalculate = function () {
      if ("string" != typeof this.options.direction || "right" === this.options.direction || "left" === this.options.direction) {
        var e = 100 * this.stepIndicators.length,
          t = 1 / this.stepIndicators.length * 100;
        this.$target.css("width", e + "%"), this.$target.children().css("width", t + "%")
      }
    }, n.prototype.addSteps = function (e) {
      0 == t(this.options.indicatorTarget).children().length && (t(this.options.indicatorTarget).append("<ul>"), this.$indicatorContainer = t(this.options.indicatorTarget).find("ul"), this.$indicatorContainer.append('<div class="progress-bar"></div>'));
      for (var n = this.stepIndicators.length, o = n; o < n + e.length; o++) {
        var a = "",
          i = " hide hidden-step";
        void 0 !== this.options.stepLabels[o] && this.options.stepLabels[o].length && (a = this.options.stepLabels[o], i = ""), this.stepIndicators = this.stepIndicators.add('<li class="step' + o + i + '"><span class="stepLabel">' + a + "</span></li>")
      }
      this.$indicatorContainer.append(this.stepIndicators), this.recalculate()
    }, n.prototype.switchTo = function (e) {
      if (!("function" == typeof this.options.stepHandler[this.options.currentStep] && this.options.currentStep < e && !1 === this.options.stepHandler[this.options.currentStep].call(this.$target.children()[this.options.currentStep]) || this.$target.children().length <= e)) {
        if (this.options.currentStep = e, this.updateIndicators(), "function" == typeof this.options.stepPreSwitchCallback[this.options.currentStep] && this.options.currentStep > 0 && this.options.stepPreSwitchCallback[this.options.currentStep].call(this.$container), "string" != typeof this.options.direction || "right" === this.options.direction) {
          var n = (-100 * this.options.currentStep).toString() + "%";
          this.options.useCSSAnimation ? this.$target.css({
            marginLeft: n
          }) : this.$target.animate({
            marginLeft: n
          }, 300)
        } else if ("down" === this.options.direction) {
          var o = this.$target.children().eq(this.options.currentStep),
            a = o.prevAll().map(function () {
              return t(this).outerHeight()
            }).get().reduce(function (e, t) {
              return e + t
            }, 0);
          this.options.useCSSAnimation ? this.$target.css({
            scrollTop: a,
            height: o.outerHeight()
          }) : this.$target.animate({
            scrollTop: a,
            height: o.outerHeight()
          }, 300)
        }
        this.$container.trigger("stepChanged.grsteps", {
          currentStep: this.options.currentStep
        })
      }
    }, n.prototype.updateIndicators = function () {
      var e = "",
        n = "",
        o = this.options.currentStep - 1;
      for (this.stepIndicators.removeClass(this.options.activeClass), "" == t.trim(this.stepIndicators.eq(this.options.currentStep).text()) ? n = this.options.activeClass : (e = this.options.activeClass, n = this.options.completeClass); o >= 0 && ("" == t.trim(this.stepIndicators.eq(o).text()) || -1 !== this.disabledSteps.indexOf(o));) o--;
      o >= 0 && this.stepIndicators.eq(o).addClass(n), this.stepIndicators.eq(this.options.currentStep).addClass(e), this.handleProgressBar()
    }, n.prototype.handleProgressBar = function () {
      for (var e = t(".progress-bar"), n = 0, o = 0; o <= this.options.currentStep; o++) - 1 === this.disabledSteps.indexOf(o) && n++;
      this.stepWidth = 1 / (this.options.steps.length - this.disabledSteps.length) * 100, this.progressWidth = n * this.stepWidth;
      var a = this;
      window.setTimeout(function () {
        for (var n = 0, o = 0; o < a.stepIndicators.length; o++) - 1 === a.disabledSteps.indexOf(o) && (t(a.stepIndicators[o]).css("left", n * a.stepWidth + "%"), n++), t(a.stepIndicators[o]).css("width", a.stepWidth + "%");
        e.animate({
          width: a.progressWidth + "%"
        }, 500)
      }, 200)
    }, n.prototype.buttonify = function (e) {
      var n = e.options.actionStep;
      this.each(function (o, a) {
        o > 0 && !0 === e.options.backButtons && t(a).append('<p class="pull-left back-button">           <button type="button" class="go-back btn-prev">' + e.options.backButton + "</button>         </p>"), o == n ? t(a).append('<div class="btn-submit--wrapper"><button type="button" class="btn btn-danger btn-lg btn-next btn-submit">' + e.options.actionButton + "</button></div>") : 0 === o && void 0 !== e.options.firstStepButton ? t(a).append('<div class="btn-next--wrapper"><button type="button" class="btn btn-danger btn-lg btn-next">' + e.options.firstStepButton + "</button></div>") : t(a).append('<div class="btn-next--wrapper"><button type="button" class="btn btn-danger btn-lg btn-next">' + e.options.stepButton + "</button></div>")
      })
    }, n.prototype.nextStep = function () {
      for (var e = 1; - 1 !== this.disabledSteps.indexOf(this.options.currentStep + e);) e++;
      this.switchTo(this.options.currentStep + e)
    }, n.prototype.previousStep = function () {
      for (var e = 1; - 1 !== this.disabledSteps.indexOf(this.options.currentStep - e);) e++;
      this.switchTo(this.options.currentStep - e)
    }, n.prototype.refresh = function () {
      this.switchTo(this.options.currentStep)
    }, e.exports = n
  }).call(t, n(0))
}, function (module, exports, __webpack_require__) {
  (function ($) {
    function GRUpsell(e) {
      if (this.exists = !1, missing = grHelpers.hasMissingOptions(e, requiredOptions)) throw new Error("[GRUpsell] Missing required options: " + missing.join(", "));
      this.options = $.extend(!0, {}, defaults, e, protect), this.init()
    }

    function calculateUpsell(amt) {
      switch (this.options.upsellMethod) {
        case "range":
          if (void 0 !== this.options.range) return getUpsellFromRange.call(this, amt);
          break;
        case "function":
          if (void 0 !== this.options.calcFunction) return this.options.calcFunction(amt);
          break;
        case "formula":
          if (void 0 !== this.options.formula) return eval(this.options.formula)
      }
      return amt
    }

    function getUpsellFromRange(e) {
      try {
        e = parseFloat(e.replace(/[^0-9\.]/g, ""));
        for (var t = 0; t < this.options.range.length; t++)
          if (e >= this.options.range[t].min && e < this.options.range[t].max) return this.options.range[t].amount
      } catch (e) {}
      return e
    }

    function handleDecline(e) {
      $("." + this.options.declineClass + ",." + this.options.upsellClass).off("click"), e.preventDefault(), this.options.onDeclineFormUpdates.call(this), this.options.form.trigger("grupsell.declined", [this.initialAmount, this.upsellAmount]), $(this.options.upsellContentSelector).modal("hide"), "function" == typeof this.options.declineCallback && this.options.declineCallback.call(this), this.options.form.submit()
    }

    function handleUpsell(e) {
      $("." + this.options.declineClass + ",." + this.options.upsellClass).off("click"), e.preventDefault(), this.options.onUpsellFormUpdates.call(this), this.options.form.trigger("grupsell.upsold", [this.initialAmount, this.upsellAmount]), $(this.options.upsellContentSelector).modal("hide"), "function" == typeof this.options.upsellCallback && this.options.upsellCallback.call(this), this.options.form.submit()
    }
    var requiredOptions = ["form", "donationAmountFieldSelector", "donationAmountFieldSelectorOther", "recurringFieldSelector", "upsellContentSelector"],
      defaults = {
        declineClass: "js-single-donation",
        upsellClass: "js-monthly-donation",
        upsellMethod: "range",
        minGift: 1,
        maxGift: 300,
        donationAmountClass: "js-single-donation-amount",
        upsellAmountClass: "js-monthly-donation-amount",
        enabled: !0,
        formLanguage: $("html").attr("lang") && $("html").attr("lang").length ? $("html").attr("lang") : "en-ca",
        onDeclineFormUpdates: function () {
          this.options.recurringField.val("N")
        },
        onUpsellFormUpdates: function () {
          this.options.recurringField.val("Y"), this.options.donationAmountField.val(this.upsellAmount)
        },
        preventLaunch: function () {
          return "function" == typeof this.options.isRecurring ? this.options.isRecurring() : "Y" == this.options.recurringField.val() && -1 === ["checkbox", "radio"].indexOf(this.options.recurringField.attr("type").toLowerCase()) || this.options.recurringField.filter(":checked").length && "Y" == this.options.recurringField.filter(":checked").val() && -1 !== ["checkbox", "radio"].indexOf(this.options.recurringField.attr("type").toLowerCase())
        }
      },
      protect = {
        initialAmount: 0,
        upsellAmount: 0
      },
      grHelpers = __webpack_require__(2);
    GRUpsell.prototype.init = function () {
      var e = $(this.options.upsellContentSelector);
      e.length > 0 ? (this.exists = !0, e.appendTo($("body")), $("body").on("click", "." + this.options.declineClass, $.proxy(handleDecline, this)), $("body").on("click", "." + this.options.upsellClass, $.proxy(handleUpsell, this))) : this.exists = !1, this.options.donationAmountField = $(this.options.donationAmountFieldSelector), this.options.donationAmountFieldOther = $(this.options.donationAmountFieldSelectorOther), this.options.recurringField = $(this.options.recurringFieldSelector)
    }, GRUpsell.prototype.refreshFields = function () {
      this.options.donationAmountField = $(this.options.donationAmountFieldSelector), this.options.donationAmountFieldOther = $(this.options.donationAmountFieldSelectorOther), this.options.recurringField = $(this.options.recurringFieldSelector)
    }, GRUpsell.prototype.launch = function () {
      var e = this;
      if (this.refreshFields(), "function" == typeof this.options.getAmount) this.initialAmount = this.options.getAmount();
      else {
        var t = this.options.donationAmountField;
        t.length > 1 && (checkedField = t.filter(":checked"), 1 === checkedField.length && (t = checkedField)), this.initialAmount = parseFloat(t.val().replace(/[^0-9\.]/g, "")), isNaN(this.initialAmount) && this.options.donationAmountField.filter('[type="text"]').length && (this.initialAmount = parseFloat(this.options.donationAmountField.filter('[type="text"]').val().replace(/[^0-9\.]/g, "")))
      }
      return isNaN(this.initialAmount) && (this.initialAmount = 0), !(!1 === this.options.enabled || this.initialAmount >= this.options.maxGift || this.initialAmount < this.options.minGift || !this.exists || "function" == typeof this.options.preventLaunch && this.options.preventLaunch.call(this)) && (this.upsellAmount = calculateUpsell.call(this, this.initialAmount), "function" == typeof this.options.preLaunchCallback && this.options.preLaunchCallback.call(this), $(this.options.upsellContentSelector).find("." + this.options.donationAmountClass).text(this.initialAmount.toLocaleString(this.options.formLanguage, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })), $(this.options.upsellContentSelector).find("." + this.options.upsellAmountClass).val(this.upsellAmount.toLocaleString([], {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })).on("change", function (t) {
        var n = $(t.target),
          o = n.val();
        e.upsellAmount = parseFloat(o), e.upsellAmount = Math.floor(e.upsellAmount), n.val(e.upsellAmount.toLocaleString([], {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }))
      }), $(this.options.upsellContentSelector).modal({
        backdrop: "static",
        keyboard: !1
      }), $(this.options.upsellContentSelector).modal("show"), this.options.enabled = !1, !0)
    }, module.exports = GRUpsell
  }).call(exports, __webpack_require__(0))
}, function (e, t, n) {
  (function (t) {
    function n(e) {
      if (!this.hasRequiredOptions(e)) throw new Error("[Stringer] Missing required options: " + this.missingOptions.join(", "));
      this.clientId = e.clientId
    }

    function o(e, n, o) {
      t.ajax({
        type: "GET",
        url: e,
        dataType: "jsonp",
        cache: !1,
        context: o || this,
        crossDomain: !0,
        error: function () {},
        success: n
      })
    }
    var a = ["clientId"],
      i = "https://stringer.grassriots.com/api/v1";
    n.prototype.hasRequiredOptions = function (e) {
      for (var t = [], n = 0; n < a.length; n++) void 0 === e[a[n]] && t.push(a[n]);
      return !t.length || (this.missingOptions = t, !1)
    }, n.prototype.getStat = function (e) {
      if (void 0 === e.datapoint || void 0 === e.callback) throw new Error("[Stringer.getStat] A datapoint and callback are required");
      o(i + "/stats/client/" + encodeURIComponent(this.clientId) + (e.campaignId ? "/campaign/" + encodeURIComponent(e.campaignId) : "") + "/datapoint/" + encodeURIComponent(e.datapoint), e.callback)
    }, n.prototype.getFundraisingStat = function (e) {
      if (void 0 === e.datapoint || void 0 === e.campaignId || void 0 === e.callback) throw new Error("[Stringer.getFundraisingStat] A datapoint, campaign id, and callback are required");
      o(i + "/stats/client/" + encodeURIComponent(this.clientId) + "/campaign/" + encodeURIComponent(e.campaignId) + "/fundraising/" + encodeURIComponent(e.datapoint), e.callback)
    }, n.prototype.getRollCall = function (e) {
      if (void 0 === e.campaignId || void 0 === e.callback) throw new Error("[Stringer.getRollCall] A campaign id and callback are required");
      o(i + "/stats/client/" + encodeURIComponent(this.clientId) + "/campaign/" + encodeURIComponent(e.campaignId) + "/rollcall" + (void 0 !== e.fundraising && e.fundraising ? "?fundraising=1" : ""), e.callback)
    }, n.prototype.getUserData = function (e) {
      if (void 0 === e.email || void 0 === e.callback) throw new Error("[Stringer.getUserData] An email and callback are required");
      o(i + "/encrementer/client/" + encodeURIComponent(this.clientId) + "/email/" + encodeURIComponent(e.email), e.callback, e.context)
    }, e.exports = n
  }).call(t, n(0))
}, , , , , , , function (e, t, n) {
  n(15), e.exports = n(16)
}], [33]);