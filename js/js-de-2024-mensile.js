var formfilled = false;
//window.formfilled = false;
jQuery(function () {

});

jQuery(document).ready(function ($) {

	// VARS
	var min_amount = 5;

	/*var form_id = $('#main-content-inner form').attr('action');
	console.log('FORM ID: '+form_id); //	/page/98320/donate/2
	*/

	/*------------------------------------------------------
	|
	|	INIT
	|
	|_______________________________________________________ */

	function sleep(miliseconds) {
		var currentTime = new Date().getTime();
		while (currentTime + miliseconds >= new Date().getTime()) { }
		console.log('Waiting 0.5 seconds before executing...');
	}
	//sleep(1500);

	// Check if Monthly
	var isMonthly = '';
	var cycleType = '';
	var donationChecked_id = '';

	console.log('%c ------------CHECK 1-------------------------', 'background: #222; color: #bada55');

	if (typeof isMonthly !== 'undefined' && isMonthly != '') {

		cycleType = 'monthly';

		$('#en__field_transaction_recurrpay1').attr('is_selected', true);
		$('#en__field_transaction_recurrpay0').removeAttr('is_selected');

		console.log('INIT - Default cycle is ' + cycleType + ' -> isMonthly var =' + isMonthly);
	} else {

		cycleType = 'single';

		$('#en__field_transaction_recurrpay0').attr('is_selected', true);
		$('#en__field_transaction_recurrpay1').removeAttr('is_selected');

		console.log('INIT - Default cycle is ' + cycleType + ' -> isMonthly var =' + isMonthly);
	}
	console.log('%c ------------END OF CHECK 1------------------\n\n', 'background: #222; color: #bada55');

	// What is the default amount
	console.log('%c ------------CHECK 2-------------------------', 'background: #222; color: #bada55');

	// Single
	var donationDefault_Single = $('input[name="transaction.donationAmt"]:checked').val();
	window.donationDefault_Single = donationDefault_Single;
	var donationChecked_Single = $('input[name="transaction.donationAmt"]:checked');
	var donationChecked_Single_val = donationChecked_Single.val();
	var donationChecked_Single_id = donationChecked_Single.attr('id');
	donationChecked_Single_id = donationChecked_Single_id.replace('en__field_', '');
	window.donationDefault_Single_id = donationChecked_Single_id;
	//console.log(donationDefault_Single);

	console.log('INIT - Default amount for ' + cycleType + ' is ' + donationChecked_Single_val + ' -> input ID=' + donationChecked_Single_id);

	// Monthly (this shouldnt be necessary, but EN doesnt pass the default for Monthly, so we get it from custom hidden field)
	var donationDefault_Monthly = $('input[name="supporter.NOT_TAGGED_20"]').val();
	window.donationDefault_Monthly = donationDefault_Monthly;
	var donationDefault_Monthly_position = $('input[name="supporter.NOT_TAGGED_21"]').val();
	window.donationDefault_Monthly_position = donationDefault_Monthly_position;

	console.log('INIT - Default amount for monthly is ' + donationDefault_Monthly + ' -> input ID=doesnt exist yet - click on monthly first');

	console.log('%c ------------END OF CHECK 2------------------\n\n', 'background: #222; color: #bada55');

	// 29 OTT 2020

	// Show custom content of default amount for default payment cycle
	console.log('%c ------------CHECK 3-------------------------', 'background: #222; color: #bada55');

	if (typeof isMonthly !== 'undefined' && isMonthly != '') {

		// Monthly - it will never be monthly by default
		/*console.log('Cycle is '+cycleType+' -> isMonthly ='+isMonthly+' (must be same value as CHECK 1)');

		$('.custom_donation_content.monthly .'+donationChecked_Monthly_id+'').toggle();

		donationChecked_id = donationChecked_Monthly_id;*/

	} else {
		// Single
		console.log('Cycle is ' + cycleType + ' -> isMonthly =' + isMonthly + ' (must be same value as CHECK 1)');

		$('.custom_donation_content.single .' + donationChecked_Single_id + '').toggle();

		donationChecked_id = donationChecked_Single_id;

	}

	donationChecked_id = donationChecked_id.replace('en__field_', '');

	console.log('Show this custom content: .custom_donation_content.' + cycleType + ' .' + donationChecked_id);

	console.log('%c ------------END OF CHECK 3------------------\n\n', 'background: #222; color: #bada55');

	/*------------------------------------------------------
	|
	|	FUNCTIONS
	|
	|_______________________________________________________ */

	// Click on Monthly
	$('input#en__field_transaction_recurrpay1').click(function () {

		// EN Trigger
		var $el = $('#en__field_transaction_recurrpay1')
		if ("createEvent" in document) {
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("change", false, true);
			$el[0].dispatchEvent(evt);
		} else {
			$el[0].fireEvent("onchange");
		}

		console.log('%c -----------CLICK ON MONTHLY-------------------', 'background: #222; color: #bada55');

		cycleType = 'monthly';

		//$('#en__field_transaction_recurrpay1[value=Y]').attr("checked", true);
		$('#en__field_transaction_recurrpay1').attr('is_selected', true);
		$('#en__field_transaction_recurrpay0').removeAttr('is_selected');

		// 30 OTT 2020
		// Nascondi altro blocco testo custom
		$('.custom_donation_content.single').hide();
		$('.custom_donation_content.monthly').show();

		// Add Monthly to button
		isMonthly = ' monatlich';
		console.log('SET - Changed cycle: now it\'s ' + cycleType + ' (isMontly var =' + isMonthly + ')');

		// Get the default amount for this cycle type
		//console.log('input[type="radio"][value="'+donationDefault_Monthly+'"]');
		//console.log('Wait 0.5 sec...');

		//sleep(500);

		setTimeout(function () {
			var donationChecked_Monthly = $('input[type="radio"][value="' + window.donationDefault_Monthly + '"]');
			/*$('input[name="transaction.donationAmt"]').removeAttr('is_selected');
			$(donationChecked_Monthly).attr('is_selected', true);*/
			$(donationChecked_Monthly).prop('checked', true);

			// Reset Other
			$('input[name="transaction.donationAmt.other"]').val('');
			$('input[name="transaction.donationAmt.other"]').attr('placeholder', '€ Anderer Betrag');

		}, 500);

		/*var donationChecked_Monthly_val = donationChecked_Monthly.val();
		var donationChecked_Monthly_id = donationChecked_Monthly.attr('id');*/

		var donationChecked_Monthly_val = window.donationDefault_Monthly;
		var donationChecked_Monthly_id = 'transaction_donationAmt' + window.donationDefault_Monthly_position;

		// Show default custom content for Monthly
		//setTimeout(function() { 
		$('.custom_donation_content.monthly .' + donationChecked_Monthly_id).toggle();
		//}, 500);

		console.log('SET - default amount for ' + cycleType + ' is ' + donationChecked_Monthly_val + ' -> input ID=' + donationChecked_Monthly_id);

		console.log('%c -----------END OF CLICK ON MONTHLY-------------------\n\n', 'background: #222; color: #bada55');
		//}, 500);

	});

	// Click on Single
	$('input#en__field_transaction_recurrpay0').click(function () {

		// EN Trigger
		/*var $el = $('#en__field_transaction_recurrpay0')
		if ("createEvent" in document) {
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("change", false, true);
			$el[0].dispatchEvent(evt);
		}else{
			$el[0].fireEvent("onchange");
		}*/

		console.log('%c -----------CLICK ON SINGLE-------------------', 'background: #222; color: #bada55');

		cycleType = 'single';

		$('#en__field_transaction_recurrpay0').attr('is_selected', true);
		$('#en__field_transaction_recurrpay1').removeAttr('is_selected');

		// 30 OTT 2020
		// Nascondi altro blocco testo custom
		$('.custom_donation_content.monthly').hide();
		$('.custom_donation_content.single').show();

		/*if($('#en__field_transaction_recurrpay1[value=Y]').attr('checked')) {
			$('#en__field_transaction_recurrpay1[value=Y]').attr("checked", false);*/
		// Remove Monthly from button
		isMonthly = '';
		console.log('SET - Changed cycle: now it\'s ' + cycleType + ' (isMontly var =' + isMonthly + ')');
		//}

		// Get the default amount for this cycle type
		/*console.log('Wait 0.5 sec...');
		sleep(1000);*/

		//console.log('default single was '+window.donationDefault_Single);


		setTimeout(function () {
			//console.log('default single should still be '+window.donationDefault_Single);

			//var donationChecked_Single = $('input[name="transaction.donationAmt"]:checked');
			var donationChecked_Single = $('input[type="radio"][value="' + window.donationDefault_Single + '"]');
			$(donationChecked_Single).prop('checked', true);
			//$('input[name="transaction.donationAmt"]').removeAttr('is_selected');
			//$(donationChecked_Single).attr('is_selected', true);

			// Reset Other
			$('input[name="transaction.donationAmt.other"]').val('');
			$('input[name="transaction.donationAmt.other"]').attr('placeholder', '€ Anderer Betrag');

		}, 500);

		/*var donationChecked_Single_val = donationChecked_Single.val();
		var donationChecked_Single_id = donationChecked_Single.attr('id');*/

		var donationChecked_Single_val = window.donationDefault_Single;
		var donationChecked_Single_id = window.donationDefault_Single_id;

		console.log(window.donationDefault_Single_id);

		$('.custom_donation_content div').hide();
		$('.custom_donation_content.single .' + donationChecked_Single_id + '').toggle();

		console.log('SET - default amount for ' + cycleType + ' is ' + donationChecked_Single_val + ' -> input ID=' + donationChecked_Single_id);

		console.log('%c -------------END OF CLICK ON SINGLE-----------------\n\n', 'background: #222; color: #bada55');
		//}, 500);

	});


	/*$(document).click(function(event) {
		console.log($(event.target));
	});*/

	//	[input#transaction_donationAmt1.en__field__input.en__field__input--radio]

	// 5 NOV 2020

	// DEBUG
	//$('label[for^="transaction.donationAmt"]').on('click', function(){
	//$('input[name="transaction.donationAmt"]').on('click', function(){
	/*$(document.body).on('click', 'input[name="transaction.donationAmt"], input[name="transaction.donationAmt.other"]', function(){

		// EN Trigger
		var $el = $('input[name="transaction.donationAmt"]')
		if ("createEvent" in document) {
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("change", false, true);
			$el[0].dispatchEvent(evt);
			console.log('dispatched event')
		}else{
			$el[0].fireEvent("onchange");
			console.log('fired event onchange');
		}
	

		//var donationChecked_val = $(this).next().val();
		var donationChecked_val = $(this).val();


		console.log('What is checked: '+$('input[name="transaction.donationAmt"]:checked').val());

		//$('input[name="transaction.donationAmt"]').removeAttr('is_selected');
		//$(this).attr('is_selected', true);
		//$('input[name="transaction.donationAmt"]').prop('checked', false);
		$('input[name="transaction.donationAmt"]').prop('checked', false);
		$('input[name="transaction.donationAmt"]').removeAttr('checked');
		$('input[name="transaction.donationAmt"][value="'+donationChecked_val+'"]').prop('checked', false);
		$('input[name="transaction.donationAmt"][value="'+donationChecked_val+'"]').removeAttr('checked');
		$(this).prop('checked', true);
		$(this).prop(":checked");

		console.log('What val is now: '+donationChecked_val);
		console.log('What is checked: '+$('input[name="transaction.donationAmt"]:checked').val());

	});*/

	// Custom content for each donation amount on Click su donation amount
	//$('input[name="transaction.donationAmt"], input[name="transaction.donationAmt.other"]').on('click', function(){
	$(document.body).on('click', 'input[name="transaction.donationAmt"], input[name="transaction.donationAmt.other"]', function () {
		//$(document.body).on('click', 'input[name="transaction.donationAmt"], input[name="transaction.donationAmt.other"]', function(e){

		//e.preventDefault();

		console.log('%c ------------CLICK ON DIFFERENT AMOUNT-------------------------', 'background: #222; color: #bada55');

		// EN Trigger
		var $el = $(this);
		if ("createEvent" in document) {
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("change", false, true);
			$el[0].dispatchEvent(evt);
			console.log('dispatched event')
		} else {
			$el[0].fireEvent("onchange");
			console.log('fired event onchange');
		}

		// Disable Next btn on click (because it's always empty at first)
		if (this.value == '') {
			$(".next-btn").attr("disabled", "disabled");
		}

		var donationChecked_val = $(this).val();
		console.log('isMontly =' + isMonthly);

		console.log('What val is now: ' + donationChecked_val);
		console.log('What is checked: ' + $('input[name="transaction.donationAmt"]:checked').val());

		/*
		//$('input[name="transaction.donationAmt"]').removeAttr('is_selected');
		//$(this).attr('is_selected', true);
		//$('input[name="transaction.donationAmt"]').prop('checked', false);
		$('input[name="transaction.donationAmt"]').prop('checked', false);
		$('input[name="transaction.donationAmt"]').removeAttr('checked');
		$('input[name="transaction.donationAmt"][value="'+donationChecked_val+'"]').prop('checked', false);
		$('input[name="transaction.donationAmt"][value="'+donationChecked_val+'"]').removeAttr('checked');
		$(this).prop('checked', true);
		$(this).prop(":checked");

		console.log('What val is now: '+donationChecked_val);
		console.log('What is checked: '+$('input[name="transaction.donationAmt"]:checked').val());*/

		$('input[name="transaction.donationAmt"]:checked').prop('checked', false);
		$(this).prop('checked', true);
		$(this).prop(":checked");

		// Style the amounts
		$('input[name="transaction.donationAmt"]').attr('is_selected', false);
		$(this).attr('is_selected', true);

		if ($(this).attr('name') != 'transaction.donationAmt.other') {
			var donationChecked_id = $(this).attr('id');
		} else {
			var donationChecked_id = $(this).attr('name').replace(/\./g, '_');
		}

		//console.log('Amount is now: '+donationChecked_val+' -> input ID='+donationChecked_id);

		if (typeof isMonthly !== 'undefined' && isMonthly != '') {

			// Monthly
			console.log(cycleType + ' amount is now: ' + donationChecked_val + ' -> input ID=' + donationChecked_id);

			$('.custom_donation_content div').hide();
			$('.custom_donation_content.monthly .' + donationChecked_id + '').toggle();

		} else {

			// Single
			console.log(cycleType + ' amount is now: ' + donationChecked_val + ' -> input ID=' + donationChecked_id);

			$('.custom_donation_content div').hide();
			$('.custom_donation_content.single .' + donationChecked_id + '').toggle();

		}

		console.log('%c ------------END OF CLICK ON DIFFERENT AMOUNT-------------------------', 'background: #222; color: #bada55');

	});

	// 19 MAG 2020

	// Disable Next Btn when Other is clicked
	/*$('input[name="transaction.donationAmt.other"]').on('click', function() {
		$(".next-btn").attr("disabled", "disabled");
	});
	// Enable Next Btn when Radio is clicked
	$('input[name="transaction.donationAmt"]').on('click', function() {
		$(".next-btn").removeAttr("disabled");
	});*/

	// 11 FEB 2022 (added min_amount)

	// Listen to changes to Other field
	$('input[name="transaction.donationAmt.other"]').on('keyup', function () {
		selectdonate_other = $('input[name="transaction.donationAmt.other"]').val();
		//console.log('this.value: ' + this.value);
		if (this.value >= min_amount) {
			$(".next-btn").removeAttr("disabled");
		} else {
			$(".next-btn").attr("disabled", "disabled");
		}

		console.log('Value is now: ' + this.value);
	});

	// Behaviour on Next click
	$(document.body).on('click', '.action-button .next-btn', function (e) {
		e.preventDefault();

		console.log('Clicked on Next btn');

		$('.en__component.en__component--formblock.form-second-part, .paymentDetails, .credit_card_form, .IBNPayment').removeClass("d-none").show("slide", { direction: "left" }, 1000);
		$('.en__component.en__component--formblock.donation-amount').addClass("d-none").slideUp();
		$('.form-check').addClass("d-none").slideUp();
		$('#FormStepSlider ul li.step').removeClass('active');
		$('#FormStepSlider ul li.step.two').addClass('active');
		$('#FormStepSlider ul').addClass('ulright');
		var selectdonate = $('input[name="transaction.donationAmt"]:checked').val();
		if (selectdonate == 'other') selectdonate = $('input[name="transaction.donationAmt.other"]').val();
		$(this).text('Spende' + ' €' + selectdonate);
		$(this).removeClass('next-btn text-left').addClass('text-center');

		// 7 MAR 2023
		// Disable Captcha if Stripe card or Iban is empty
		$('.credit_card_form .en__captcha').addClass("d-none");

		// 27 FEB 2020

		// Stripe built-in - Add amount to button
		//$('.credit_card_form .en__submit button').text('Donate' + ' €' + selectdonate);
		//$('.credit_card_form .en__submit button').text('Spende' + ' €' + selectdonate + isMonthly);
		$('.credit_card_form .en__submit button').text('Spende' + ' €' + selectdonate + ' monatlich');

		// Add default red btn in first step (amount)
		$('.action-button.default_red_btn').addClass("d-none");

		// 28 FEB 2020
		// Disable Stripe button if fields are empty
		//$('.en__component.en__component--formblock.credit_card_form .en__submit button').prop('disabled', true);

		// 29 OTT 2020
		// Hide custom content for donation amount
		$('.custom_donation_content div').hide();

	});

	// Slide Up input group
	$('.form-second-part input, .credit_card_form input').focus(function () {
		me = $(this);
		$("label[for='" + me.attr('id') + "']").addClass("animate-label");
	});
	$('.form-second-part input, .credit_card_form input').blur(function () {
		me = $(this);
		if (me.val() == "") {
			$("label[for='" + me.attr('id') + "']").removeClass("animate-label");
		}
	});

	// 23 GIU 2021
	// Disable Paypal button if fields are empty
	$('.en__component.en__component--copyblock .paypalButton').addClass('disable_btn ppal_btn');
	$('.en__component.en__component--copyblock .paypalButton').removeClass('paypalButton');

	// Payment Form 
	$(document.body).on('click', '.paymentDetails a', function () {

		//$('.en__component.en__component--formblock.credit_card_form .en__submit button').prop('disabled',true);
		//$('select[name="transaction.paymenttype"]').trigger('change');

		var thisid = $(this).attr('id');
		//console.log('id: ' + thisid);
		$('.paymentDetails').find('a').removeClass('active');
		$(this).addClass('active');

		if (thisid == 'payViaPaypal') {

			console.log('Click on Paypal Tab');

			// 29 OTT 2020
			$('select[name="transaction.paymenttype"] option[value="sepa_debit"]').attr("selected", false);
			$('select[name="transaction.paymenttype"] option[value="VI"]').attr("selected", false);
			$('select[name="transaction.paymenttype"] option[value="Paypal"]').attr("selected", true);

			$('select[name="transaction.paymenttype"]').val('Paypal');
			$('.ppal_btn').removeClass('d-none');
			$('.credit_card_form').addClass('d-none');
			$('.action-button').addClass('d-none');

			// 17 MAR 2023
			// Enable Captcha if Paypal is chosen -------- MUST SHOW ANYWAY EVEN IF IBAN IS EMPTY
			$('.en__component.en__component--formblock.credit_card_form .en__captcha').removeClass('d-none');

			// 22 OTT 2020

			// Stripe SEPA
		} else if (thisid == 'payViaSEPA') {

			console.log('Click on SEPA Tab');
			/*var option_value = $('select[name="transaction.paymenttype"] option:selected').val();
			console.log(option_value);*/

			$('select[name="transaction.paymenttype"]').val('sepa_debit');

			// 29 OTT 2020
			$('select[name="transaction.paymenttype"] option[value="Paypal"]').attr("selected", false);
			$('select[name="transaction.paymenttype"] option[value="VI"]').attr("selected", false);
			$('select[name="transaction.paymenttype"] option[value="sepa_debit"]').attr("selected", true);

			var $el = $('#en__field_transaction_paymenttype')
			if ("createEvent" in document) {
				var evt = document.createEvent("HTMLEvents");
				evt.initEvent("change", false, true);
				$el[0].dispatchEvent(evt);
			} else {
				$el[0].fireEvent("onchange");
			}

			/*console.log('last val '+option_value2);
			console.log($('#en__field_transaction_paymenttype option:selected'));*/

			$('.ppal_btn').addClass('d-none');
			$('.credit_card_form').removeClass('d-none');

			// Add default red btn in first step (amount)
			$('.action-button.default_red_btn').addClass("d-none");

			// 9 NOV 2020 - SHOULD BE TRUE BUT WE CANT LISTEN TO IBAN FIELD
			$('.en__component.en__component--formblock.credit_card_form .en__submit button').prop('disabled', false);

			// 7 MAR 2023
			// Enable Captcha if Stripe card or Iban is not empty -------- MUST SHOW ANYWAY EVEN IF IBAN IS EMPTY
			$('.en__component.en__component--formblock.credit_card_form .en__captcha').removeClass('d-none');

			
		} else {
			
			// Stripe Card
			console.log('Click on Stripe Tab');

			$('select[name="transaction.paymenttype"]').val('VI');

			// 29 OTT 2020
			$('select[name="transaction.paymenttype"] option[value="Paypal"]').attr("selected", false);
			$('select[name="transaction.paymenttype"] option[value="sepa_debit"]').attr("selected", false);
			$('select[name="transaction.paymenttype"] option[value="VI"]').attr("selected", true);

			var $el = $('#en__field_transaction_paymenttype')
			if ("createEvent" in document) {
				var evt = document.createEvent("HTMLEvents");
				evt.initEvent("change", false, true);
				$el[0].dispatchEvent(evt);
			} else {
				$el[0].fireEvent("onchange");
			}

			$('.ppal_btn').addClass('d-none');
			$('.credit_card_form').removeClass('d-none');
			//$('.action-button').removeClass('d-none');

			// 27 FEB 2020

			// Add default red btn in first step (amount)
			$('.action-button.default_red_btn').addClass("d-none");

			// 28 FEB 2020

			// Disable Stripe pay button
			//var sripe_btn = $('.en__component.en__component--formblock.credit_card_form .en__submit button');
			//$(sripe_btn).prop('disabled',true);
			//$('.en__component.en__component--formblock.credit_card_form .en__submit button').prop('disabled', true);

			// 7 MAR 2023
			// Disable Captcha if Stripe card or Iban is empty
			$('.en__component.en__component--formblock.credit_card_form .en__captcha').addClass("d-none");

		}
	});

	// Box Content Slide up / down 
	$(document.body).on('click', 'h2.box-size', function () {
		$(this).closest('.contorl1').find('.box-size-ptag').slideToggle();
		$(this).closest('.contorl1').toggleClass('active');
	});

	// Maximum length of expiry Date 
	$('input[name="transaction.ccexpire"]').attr('maxlength', 2);
	$('input.en__field__input.en__field__input--splittext').attr('placeholder', 'YY');
	$('input#en__field_transaction_ccexpire').attr('placeholder', 'MM');

	// Toggle Checkbox checked
	//$(document.body).on('click', '.en__field.en__field--checkbox.en__field--othamt1', function () {
	$(document.body).on('click', 'input[type="checkbox"]', function () {
		var checkBoxes = $(this).find('input');
		checkBoxes.prop("checked", !checkBoxes.prop("checked"));
	});

	// Toggle Side using li 
	$(document.body).on('click', 'div#FormStepSlider ul li', function () {

		// 29 OTT 2020

		// What is the checked amount
		var donationChecked = $('input[name="transaction.donationAmt"]:checked');
		//var donationChecked_val = donationChecked.val();
		var donationChecked_id = donationChecked.attr('id');

		//console.log('last amount: '+donationChecked_id);

		// Show custom content for donation amount
		if (typeof isMonthly !== 'undefined' && isMonthly != '') {

			// Monthly
			//console.log('Monthly');

			$('.custom_donation_content div').hide();
			$('.custom_donation_content.monthly .' + donationChecked_id + '').toggle();

		} else {

			// Single
			//console.log('Single');

			$('.custom_donation_content div').hide();
			$('.custom_donation_content.single .' + donationChecked_id + '').toggle();

		}

		if (!$(this).hasClass('active')) {
			$('div#FormStepSlider ul li').removeClass('active');
			$(this).addClass('active');

			if ($(this).is(':first-child')) {
				$('#FormStepSlider ul').removeClass('ulright');
				$('.en__component.en__component--formblock.form-second-part, .paymentDetails, .credit_card_form, .IBNPayment').addClass("d-none").slideUp();
				$('.en__component.en__component--formblock.donation-amount').removeClass("d-none").slideDown();
				$('.form-check').removeClass("d-none").slideDown();
				$('.action-button').find('button').text('Next');
				$('.action-button').find('button').removeClass('text-center').addClass('text-right next-btn');

				// 27 FEB 2020
				// Add default red btn in first step (amount)
				$('.action-button.default_red_btn').removeClass("d-none");

			} else {

				$('#FormStepSlider ul').addClass('ulright');
				$('.en__component.en__component--formblock.form-second-part, .paymentDetails, .credit_card_form, .IBNPayment').removeClass("d-none").slideDown();
				$('.en__component.en__component--formblock.donation-amount').addClass("d-none").slideDown();
				$('.form-check').addClass("d-none").slideDown();

				var selectdonate = $('input[name="transaction.donationAmt"]:checked').val();
				if (selectdonate == 'other') selectdonate = $('input[name="transaction.donationAmt.other"]').val();

				//$('.action-button').find('button').text('Donate' + ' €' + selectdonate );
				//$('.action-button').find('button').removeClass('next-btn text-left').addClass('text-center');

				// 27 FEB 2020

				// Stripe built-in - Add amount to button
				$('.credit_card_form .en__submit button').text('Spende' + ' €' + selectdonate);
				//$('.credit_card_form .en__submit button').text('Donate' + ' €' + selectdonate + isMonthly );

				// Remove default red btn from second step (payment)
				$('.action-button.default_red_btn').addClass("d-none");

				// 28 FEB 2020

				// Disable Stripe button if fields are empty
				//$('.en__component.en__component--formblock.credit_card_form .en__submit button').prop('disabled', true);

				// 29 OTT 2020
				// Hide custom content for donation amount
				$('.custom_donation_content div').hide();

			}
		}
	});

	// 3 MAR 2020

	// 4242424242424242

	// Stripe - Exp date must be num field
	$(".en__field__input--splittext").attr('type', 'number');

	// Stripe Card - Listen to inputs
	$('.en__component.en__component--formblock.credit_card_form input').on('keyup', function () {

		// Check if fields are filled and show send button
		if ($("#en__field_transaction_ccnumber").val().length == 16 && $("#en__field_transaction_ccexpire").val().length == 2 && $(".en__field__input--splittext:not(#en__field_transaction_ccexpire)").val().length == 2 && $("#en__field_transaction_ccvv").val().length == 3) {

			console.log('Stripe inputs are all filled');

			$('.en__component.en__component--formblock.credit_card_form .en__submit button').prop('disabled', false);

			// 7 MAR 2023
			// Enable Captcha if Stripe card or Iban is not empty
			$('.en__component.en__component--formblock.credit_card_form .en__captcha').removeClass('d-none');

		} else {

			console.log('Stripe inputs are NOT all filled');

			//$('.en__component.en__component--formblock.credit_card_form .en__submit button').prop('disabled', true);

			// 7 MAR 2023
			// Disable Captcha if Stripe card or Iban is empty
			$('.en__component.en__component--formblock.credit_card_form .en__captcha').addClass("d-none");
		}

	});

	// Paypal - Listen to form inputs

	// Checkbox change
	// .form-second-part .en__field--checkbox.en__mandatory
	//$('#en__field_supporter_questions_606233').change(function () {
	$('.form-second-part .en__field--checkbox.en__mandatory .en__field__input--checkbox').change(function () {
		console.log('%c -------------CHANGE OF CHECKBOX-----------------', 'background: #222; color: #bada55');
		//console.log('checkbox clicked 1');
		if (this.checked) {
			$(this).prop('checked', true);
			$(this).attr('checked', true);
			console.log('Privacy checkbox is checked.');
		} else {
			$(this).prop('checked', false);
			$(this).attr('checked', false);
			console.log('Privacy checkbox is unchecked.');
		}
		//console.log(this);
		console.log('%c -------------END OF CHANGE OF CHECKBOX-----------------\n\n', 'background: #222; color: #bada55');
	});

	// Checkbox check
	function check_checkbox(formfilled) {

		console.log('%c -------------CHECK_CHECKBOX-----------------', 'background: #D0D1D3; color: #000');

		// debug
		/*if ($('#en__field_supporter_questions_606233').is(':checked')) {
			console.log('OK - check_checkbox is(:chcked)');
		} else {
			console.log('NO - check_checkbox is(:chcked)');
		}*/

		if ($('.form-second-part .en__field--checkbox.en__mandatory .en__field__input--checkbox').is(':checked') && formfilled === true) {
			console.log('Form is filled? ' + formfilled);
			$('.en__component.en__component--copyblock .ppal_btn').removeClass('disable_btn');
			$('.en__component.en__component--copyblock .ppal_btn').addClass('enable_btn');
			$('.en__component.en__component--copyblock .ppal_btn').addClass('paypalButton');
			console.log('Paypal button is available.');
		} else {
			console.log('Form is filled? ' + formfilled);
			$('.en__component.en__component--copyblock .ppal_btn').removeClass('enable_btn');
			$('.en__component.en__component--copyblock .ppal_btn').addClass('disable_btn');
			$('.en__component.en__component--copyblock .ppal_btn').removeClass('paypalButton');
			console.log('Paypal button is unavailable.');
		}

		console.log('%c -------------END OF CHECK_CHECKBOX-----------------\n\n', 'background: #D0D1D3; color: #000');
	}

	// Form fields check
	function check_fields() {

		//console.log('%c -------------CHECK_FIELDS-----------------', 'background: #222; color: #bada55');

		var field_id = $(this).attr("id");
		var field_val = $(this).val();

		// Check if fields are filled and show send button
		if ($("#en__field_supporter_firstName").val().length >= 1 && $("#en__field_supporter_lastName").val().length >= 1 && $("#en__field_supporter_emailAddress").val().length >= 1 && $("#en__field_supporter_phoneNumber2").val().length >= 1 && $("#en__field_supporter_address1").val().length >= 1 && $("#en__field_supporter_city").val().length >= 1 && $("#en__field_supporter_region").val().length >= 1 && $("#en__field_supporter_postcode").val().length >= 1) {
			var formfilled = true;
			//check_checkbox(formfilled);
		} else {
			var formfilled = false;
		}
		check_checkbox(formfilled);
		//console.log(field_id + " -> " + field_val + ". All inputs done? " + formfilled);

		//console.log('%c -------------END OF CHECK FIELDS-----------------\n\n', 'background: #222; color: #bada55');
	}

	$('.en__component.en__component--formblock.form-second-part .en__mandatory input').on('change', check_fields);
	$('.form-second-part .en__field--checkbox.en__mandatory .en__field__input--checkbox').on('change', check_fields);

	// 9 NOV 2020

	// https://stripe.com/docs/testing
	// DE89370400440532013000 - 22 chars
	// IT40S0542811101000000123456

	// Stripe - Listen to inputs for IBAN ------------- DOESNT WORK

	/*$('.en__field__iban, .en__field__iban input').on('change', function () {
		console.log('.en__field__iban, .en__field__iban input - change');
	});
	$('.en__field__iban, .en__field__iban input').on('click', function () {
		console.log('.en__field__iban, .en__field__iban input - click');
	});
	$('.en__field__iban, .en__field__iban input').on('keyup', function () {
		console.log('.en__field__iban, .en__field__iban input - keyup');
	});
	$('.en__field__iban, .en__field__iban input').on('event', function () {
		$('.en__field__iban').addClass('iban_event_custom').trigger('classChange');
		console.log('.en__field__iban, .en__field__iban input - event');
	});
	$('.en__field__iban, .en__field__iban input').on('classChange', function() {
		console.log('.en__field__iban, .en__field__iban input - classChange');
	});

	//$('.IbanField-input-container input').on('keyup', function () {
	$('.en__field__iban, .en__field__iban input').on('keyup', function () {

		console.log('iban keyup');

		// Check if fields are filled and show send button
		if ($("#en__field_transaction_ccnumber").val().length >= 22) {

			console.log('iban lenght more or equal than 22 chars');

			$('.en__component.en__component--formblock.credit_card_form .en__submit button').prop('disabled', false);

			// 7 MAR 2023
			// Enable Captcha if Stripe card or Iban is not empty
			$('.en__component.en__component--formblock.credit_card_form .en__captcha').removeClass('d-none');

		} else {

			console.log('iban lenght less than 22 chars');

			$('.en__component.en__component--formblock.credit_card_form .en__submit button').prop('disabled', true);

			// 7 MAR 2023
			// Disable Captcha if Stripe card or Iban is empty
			$('.en__component.en__component--formblock.credit_card_form .en__captcha').addClass("d-none");
		}

	});*/

	// 7 MAR 2023
	// Stripe SEPA - Listen to inputs ----------------- DOESNT WORK

	/*$('.en__field__input.en__field__iban.StripeElement').on('change', function () {
		
		//en__field__input en__field__input--text en__field__iban StripeElement StripeElement--complete
		//en__field__input en__field__input--text en__field__iban StripeElement StripeElement--invalid
		//en__field__input en__field__input--text en__field__iban StripeElement StripeElement--invalid StripeElement--focus
		//en__field__input en__field__input--text en__field__iban StripeElement StripeElement--empty

		console.log('SEPA keyup 3');

		// Check if fields are filled and show send button
		if ($(".en__field__iban").val().length == 16) {

			console.log('en__field__iban has 16 chars');

			$('.en__component.en__component--formblock.credit_card_form .en__submit button').prop('disabled', false);

			// 7 MAR 2023
			// Enable Captcha if Stripe card or Iban is not empty
			$('.en__component.en__component--formblock.credit_card_form .en__captcha').removeClass('d-none');

		} else {

			$('.en__component.en__component--formblock.credit_card_form .en__submit button').prop('disabled', true);

			// 7 MAR 2023
			// Disable Captcha if Stripe card or Iban is empty
			$('.en__component.en__component--formblock.credit_card_form .en__captcha').addClass("d-none");
		}

	}); */

	// 4 MAR 2020

	// Stripe fields validation
	$('#en__field_transaction_ccnumber').on('keyup', function () {
		if ($(this).val().length != 16) {
			$(this).after('<div class="en__field__error">Il numero della carta è obbligatorio (16 cifre).</div>');
		} else {
			$(this).parent().find('.en__field__error').remove();
		}
	});
	$('#en__field_transaction_ccexpire').on('keyup', function () {
		if ($(this).val().trim().length != 2) {
			$(this).after('<div class="en__field__error">Il mese di scadenza è obbligatorio (2 cifre).</div>');
		} else {
			$(this).parent().find('.en__field__error').remove();
		}
	});
	$('.en__field__input--splittext:not(#en__field_transaction_ccexpire)').on('keyup', function () {
		if ($(this).val().trim().length != 2) {
			$(this).after('<div class="en__field__error">L\'anno di scadenza è obbligatorio (2 cifre).</div>');
		} else {
			$(this).parent().find('.en__field__error').remove();
		}
	});
	$('#en__field_transaction_ccvv').on('keyup', function () {
		if ($(this).val().trim().length != 3) {
			$(this).after('<div class="en__field__error">Il CVV è obbligatorio (3 cifre).</div>');
		} else {
			$(this).parent().find('.en__field__error').remove();
		}
	});

	// Paypal validate fields

	// Paypal Submit (dont send Stripe fields)
	$(document.body).on('click', '.paypalButton', function () {
		$('input[name="transaction.ccnumber"], input[name="transaction.ccexpire"], input[name="transaction.ccvv"]').remove();

		// 28 FEB 2020

		// Remove Stripe completely on Paypal send
		/*$('input[name="transaction.ccnumber"], input[name="transaction.ccexpire"], input[name="transaction.ccvv"]').remove();
		$('#en__field_transaction_ccnumber, .en__field--ccexpire input, #en__field_transaction_ccvv').remove();
		$('.en__component.en__component--formblock.credit_card_form').remove();*/

		/*if ($('input[name="transaction.ccnumber"]').val().trim().length == 0){
			$(this).val('4242424242424242');
		}
		if ($('#en__field_transaction_ccexpire').val().trim().length == 0){
			$(this).val('12');
		}
		if ($('input.en__field__input--splittext:not(#en__field_transaction_ccexpire)').val().trim().length == 0){
			$(this).val((new Date).getFullYear() + 1);
		}
		if ($('#en__field_transaction_ccexpire').val().trim().length == 0){
			$(this).val('123');
		}*/

		$(this).closest('form').submit();
	});

	// Other amount
	$('input[name="transaction.donationAmt.other"]').attr('placeholder', '€ Anderer Betrag');
	$(document.body).on('click', 'input[name="transaction.donationAmt.other"]', function () {
		// $('input[name="transaction.donationAmt"]').prop('checked', false);
		$('input[value="other"][name="transaction.donationAmt"]').prop('checked', true);
	});

	// Errors
	$('.en__errorHeader').insertBefore('.action-button');
	$('.en__errorList').insertBefore('.action-button');

	// Field Types
	$("input.en__field__input--other").attr('type', 'number');

	// Header
	$('.fixed_div_right, .topBanner').css('height', $(window).height());


}); // end of jQuery(document).ready(function($){


// DEBUG
/*jQuery(function ($) {

	//$("#el").click(function(){ alert("click"); });
	//$("#el").mouseover(function(){ alert("mouseover"); });
	  
	$.each($._data($(".en__component en__component--formblock.donation-amount")[0], "events"), function(i, event) {
		output(i);
		$.each(event, function(j, h) {
			output("- " + h.handler);
		});
	});
});
	  
function output(text) {
	//$("#output").html(function(i, h) {
	//	return h + text + "<br />";
	//});
	$(body).html(function(i, h) {
		console.log('%c ------------DEBUG-------------------------', 'background: #222; color: #bada55');
		console.log(h + text + "<br />");
	});
} */

// EN VALIDATORS IDs
/*
	en.validators = [{"componentId":1193813,"type":"REQ","format":"","errorMessage":"null è un campo obbligatorio."},{"componentId":1193823,"type":"REQ","format":"","errorMessage":"Monthly Default List Position è un campo obbligatorio."},{"componentId":1193824,"type":"AMNT","format":"5~1000","errorMessage":"Per favore, controlla che limporto della donazione sia scritto correttamente e non contenga il simbolo della valuta"},{"componentId":1193835,"type":"REQ","format":"","errorMessage":"Monthly Default Amount è un campo obbligatorio."},{"componentId":1193821,"type":"REQ","format":"","errorMessage":"Nome è un campo obbligatorio."},{"componentId":1193825,"type":"REQ","format":"","errorMessage":"Città è un campo obbligatorio."},{"componentId":1193826,"type":"REQ","format":"","errorMessage":"CAP è un campo obbligatorio."},{"componentId":1193830,"type":"REQ","format":"","errorMessage":"Regione è un campo obbligatorio."},{"componentId":1193831,"type":"REQ","format":"","errorMessage":"Telefono (<span>Inserisci il numero di cellulare per comunicarti l'esito delle tue donazioni</span>) è un campo obbligatorio."},{"componentId":1193832,"type":"REQ","format":"","errorMessage":"Indirizzo è un campo obbligatorio."},{"componentId":1193833,"type":"REQ","format":"","errorMessage":"Email è un campo obbligatorio."},{"componentId":1193834,"type":"REQ","format":"","errorMessage":"Cognome è un campo obbligatorio."},{"componentId":606233,"type":"REQ","format":"","errorMessage":"Privacy Policy è un campo obbligatorio."}];

*/

//HTML template for Custom content for each donation amount 
/*

		<div class="custom_donation_content single">
			<div class="transaction_donationAmt0">
				<img src="https://www.gravatar.com/avatar/077db5466d3b58e7bbbd498dca173f04?s=32&d=identicon&r=PG">
				<p>Testo Single 1</p>
			</div>
			<div class="transaction_donationAmt1">
				<img src="https://www.gravatar.com/avatar/0074cc38713683a92d8b157f19306ce2?s=32&d=identicon&r=PG&f=1">
				<p>Testo Single 2</p>
			</div>
			<div class="transaction_donationAmt2">
				<img src="https://www.gravatar.com/avatar/af51c6931061ef040e863467aa8cc6cf?s=32&d=identicon&r=PG&f=1">
				<p>Testo Single 3</p>
			</div>
			<div class="transaction.donationAmt.other">
				<img src="https://www.gravatar.com/avatar/ccef621551500f020c5f963ed4e4c63b?s=32&d=identicon&r=PG&f=1">
				<p>Testo Single Other</p>
			</div>
		</div>
		<div class="custom_donation_content monthly">
			<div class="transaction_donationAmt0">
				<img src="https://www.gravatar.com/avatar/077db5466d3b58e7bbbd498dca173f04?s=32&d=identicon&r=PG">
				<p>Testo Monthly 1</p>
			</div>
			<div class="transaction_donationAmt1">
				<img src="https://www.gravatar.com/avatar/0074cc38713683a92d8b157f19306ce2?s=32&d=identicon&r=PG&f=1">
				<p>Testo Monthly 2</p>
			</div>
			<div class="transaction_donationAmt2">
				<img src="https://www.gravatar.com/avatar/af51c6931061ef040e863467aa8cc6cf?s=32&d=identicon&r=PG&f=1">
				<p>Testo Monthly 3</p>
			</div>
			<div class="transaction.donationAmt.other">
				<img src="https://www.gravatar.com/avatar/ccef621551500f020c5f963ed4e4c63b?s=32&d=identicon&r=PG&f=1">
				<p>Testo Monthly Other</p>
			</div>
		</div>

*/