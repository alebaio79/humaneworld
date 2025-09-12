var formfilled = false;
var selectdonate_other;
//window.formfilled = false;
jQuery(function () {
	$('.aiuto-mobile a[href="https://www.hsi-europe/it/faq/"]').attr('href', 'https://www.hsi-europe.org/it/faq/');
});

jQuery(document).ready(function ($) {

	// VARS
	var min_amount = 5;

	/*------------------------------------------------------
	|
	|	INIT
	|
	|_______________________________________________________ */
	// $('input[name="transaction.donationAmt.other"]').attr('step', 'any');
	// $('input[name="transaction.donationAmt.other"]').attr('min', min_amount);
	let input_donationAmt_other = $('input[name="transaction.donationAmt.other"]');

    input_donationAmt_other.on('input', function() {
		let value = $(this).val();
		
		// Remove all invalid characters except numbers, commas, and dots
		value = value.replace(/[^0-9.,]/g, '');
	
		// Ensure only one comma or dot is allowed
		let commaCount = (value.match(/,/g) || []).length;
		let dotCount = (value.match(/\./g) || []).length;
	
		if (commaCount > 1 || dotCount > 1 || (commaCount > 0 && dotCount > 0)) {
			value = value.slice(0, -1); // Remove the last entered character
		}
	
		// Ensure only two decimal places after the last dot or comma
		let separator = value.includes('.') ? '.' : value.includes(',') ? ',' : null;
		if (separator) {
			let parts = value.split(separator);
			if (parts[1] && parts[1].length > 2) {
				parts[1] = parts[1].slice(0, 2); // Keep only two decimal places
			}
			value = parts.join(separator);
		}
	
		$(this).val(value);
	});
	
	
	//$(".form-second-part").prepend('<label class="en__field__label">Your information</label>');

	setTimeout(()=>{
		$('.ppal_btn').detach().insertAfter('.en__field--paymenttype');
	}, 1000);
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


	// Hide initial 
	function hideAllFormFields(){
		$('.credit_card_form').addClass('d-none');
	}
	hideAllFormFields();
	function hideFormFields(){
		$('.next-btn').hide();
		$('.credit_card_form').removeClass('d-none');
		
		let activeRadio = $('.en__field--paymenttype input[type="radio"]:checked').val();

		var $el = $('.en__field--paymenttype input[type="radio"]:checked');
		if ("createEvent" in document) {
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("change", false, true);
			$el[0].dispatchEvent(evt);
			console.log('dispatched event')
		} else {
			$el[0].fireEvent("onchange");
			console.log('fired event onchange');
		}

		if (activeRadio == 'Paypal') {
			console.log('Click on Paypal Tab');
			$('.ppal_btn').removeClass('d-none');
			$('.en__field--ccnumber, .en__field--ccexpire, .en__field--ccvv').addClass('d-none');
			$('.action-button').addClass('d-none');
			$('.en__submit').addClass('d-none');
			// 17 MAR 2023
			// Enable Captcha if Paypal is chosen -------- MUST SHOW ANYWAY EVEN IF IBAN IS EMPTY
			$('.en__component.en__component--formblock.credit_card_form .en__captcha').removeClass('d-none');
			// Stripe SEPA
		} else if (activeRadio == 'sepa_debit') {

			console.log('Click on SEPA Tab');
			$('.ppal_btn').addClass('d-none');
			$('.en__field--ccnumber, .en__field--ccexpire, .en__field--ccvv').addClass('d-none');
			// Add default red btn in first step (amount)
			$('.action-button.default_red_btn').addClass("d-none");

			// 9 NOV 2020 - SHOULD BE TRUE BUT WE CANT LISTEN TO IBAN FIELD
			$('.en__component.en__component--formblock.credit_card_form .en__submit button').prop('disabled', false);
			// 7 MAR 2023
			// Enable Captcha if Stripe card or Iban is not empty -------- MUST SHOW ANYWAY EVEN IF IBAN IS EMPTY
			$('.en__component.en__component--formblock.credit_card_form .en__captcha').removeClass('d-none');			
			$('.en__submit').removeClass('d-none');
		} else {			
			// Stripe Card
			console.log('Click on Stripe Tab');
			$('select[name="transaction.paymenttype"]').val('CreditCard');
			$('.ppal_btn').addClass('d-none');
			$('.en__field--ccnumber, .en__field--ccexpire, .en__field--ccvv').removeClass('d-none');
			// Add default red btn in first step (amount)
			$('.action-button.default_red_btn').addClass("d-none");
			$('.en__component.en__component--formblock.credit_card_form .en__captcha').addClass("d-none");
			$('.en__submit').removeClass('d-none');
		}
	}
	function toggleFormStepTwo(disable) {
		const $step = $('#FormStepSlider ul li:nth-child(2)');
		if (disable) {
			$step.css({
				'pointer-events': 'none',
				'opacity': '0.5'
			});
		} else {
			$step.css({
				'pointer-events': '',
				'opacity': ''
			});
		}
	}
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
		//$('.en__field--donationAmt > label.en__field__label').text('Select monthly gift amount');
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
		isMonthly = ' Mensilmente';
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
			$('input[name="transaction.donationAmt.other"]').attr('placeholder', '€ Altro importo');
			$(".next-btn").removeAttr("disabled");
			toggleFormStepTwo(false);
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

		console.log('%c -----------CLICK ON SINGLE-------------------', 'background: #222; color: #bada55');
		//$('.en__field--donationAmt > label.en__field__label').text('Select single gift amount');
		cycleType = 'single';

		$('#en__field_transaction_recurrpay0').attr('is_selected', true);
		$('#en__field_transaction_recurrpay1').removeAttr('is_selected');

		// 30 OTT 2020
		// Nascondi altro blocco testo custom
		$('.custom_donation_content.monthly').hide();
		$('.custom_donation_content.single').show();
		isMonthly = '';
		console.log('SET - Changed cycle: now it\'s ' + cycleType + ' (isMontly var =' + isMonthly + ')');
		//}


		setTimeout(function () {
			//console.log('default single should still be '+window.donationDefault_Single);

			//var donationChecked_Single = $('input[name="transaction.donationAmt"]:checked');
			var donationChecked_Single = $('input[type="radio"][value="' + window.donationDefault_Single + '"]');
			$(donationChecked_Single).prop('checked', true);
			//$('input[name="transaction.donationAmt"]').removeAttr('is_selected');
			//$(donationChecked_Single).attr('is_selected', true);

			// Reset Other
			$('input[name="transaction.donationAmt.other"]').val('');
			$('input[name="transaction.donationAmt.other"]').attr('placeholder', '€ Altro importo');
			$(".next-btn").removeAttr("disabled");
			toggleFormStepTwo(false);
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
		if ($(this).val() == '') {
			$(".next-btn").attr("disabled", "disabled"); 
			toggleFormStepTwo(true);
		} else {
			$(".next-btn").removeAttr("disabled");
			toggleFormStepTwo(false);
		}
		var donationChecked_val = $(this).val();
		console.log('isMontly =' + isMonthly);

		console.log('What val is now: ' + donationChecked_val);
		console.log('What is checked: ' + $('input[name="transaction.donationAmt"]:checked').val());

		
		$('input[name="transaction.donationAmt"]:checked').prop('checked', false);
		$(this).prop('checked', true);
		$(this).prop(":checked");

		// Style the amounts
		$('input[name="transaction.donationAmt"]').attr('is_selected', false);
		$(this).attr('is_selected', true);

		if ($(this).attr('name') != 'transaction.donationAmt.other') {
			var donationChecked_id = $(this).attr('id').replace('en__field_', '');
		} else {
			var donationChecked_id = $(this).attr('name').replace(/\./g, '_');
		}


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


	// Listen to changes to Other field
	$('input[name="transaction.donationAmt.other"]').on('keyup', function () {
		selectdonate_other = $('input[name="transaction.donationAmt.other"]').val();
		//console.log('this.value: ' + this.value);
		if (parseFloat(this.value.replace(',', '.')) >= min_amount) {
			this.setCustomValidity("");
			$(".next-btn").removeAttr("disabled");
			toggleFormStepTwo(false);
		} else {
			this.setCustomValidity("L'importo minimo della donazione è di 5 euro. Ti preghiamo di inserire un importo pari o superiore a 5 euro.");
			this.reportValidity();
			$(".next-btn").attr("disabled", "disabled");
			toggleFormStepTwo(true);
		}

		console.log('Value is now: ' + this.value);
	});

	// Behaviour on Next click
	$(document.body).on('click', '.action-button .next-btn', function (e) {
		e.preventDefault();

		console.log('Clicked on Next btn');

		$('.en__component.en__component--formblock.form-second-part, .IBNPayment').removeClass("d-none").slideDown();
		$('.en__component.en__component--formblock.donation-amount').addClass("d-none").slideUp();
		$('.form-check').addClass("d-none").slideUp();
		$('#FormStepSlider ul li.step').removeClass('active');
		$('#FormStepSlider ul li.step.two').addClass('active');
		$('#FormStepSlider ul').addClass('ulright');
		var selectdonate = $('input[name="transaction.donationAmt"]:checked').val();
		if (selectdonate == 'other') selectdonate = selectdonate_other;
		$(this).text('Dona' + ' €' + selectdonate);
		$(this).removeClass('next-btn text-left').addClass('text-center');

		// 7 MAR 2023
		// Disable Captcha if Stripe card or Iban is empty
		$('.credit_card_form .en__captcha').addClass("d-none");

		// 27 FEB 2020

		// Stripe built-in - Add amount to button
		//$('.credit_card_form .en__submit button').text('Donate' + ' €' + selectdonate);
		$('.credit_card_form .en__submit button').text('Dona' + ' €' + selectdonate + isMonthly);

		// Add default red btn in first step (amount)
		$('.action-button.default_red_btn').addClass("d-none");

		// 28 FEB 2020
		// Disable Stripe button if fields are empty
		//$('.en__component.en__component--formblock.credit_card_form .en__submit button').prop('disabled', true);

		// 29 OTT 2020
		// Hide custom content for donation amount
		$('.custom_donation_content div').hide();
		hideFormFields();
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
	$(document).on('change', '.en__field--paymenttype .en__field__input--radio', function () {
		hideFormFields();
		
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
		var donationChecked_id = '';
		if (donationChecked.attr('name') != 'transaction.donationAmt.other') {
			 donationChecked_id = donationChecked.attr('id').replace('en__field_', '');
		} else {
			 donationChecked_id = donationChecked.attr('name').replace(/\./g, '_');
		}
		if(donationChecked_id == 'transaction_donationAmt3'){
			donationChecked_id = 'transaction_donationAmt_other';
		}
		//console.log('last amount: '+donationChecked_id);

		// Show custom content for donation amount
		if ($(this).is(':first-child') && !$(this).hasClass('active')) {
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
		}
		if (!$(this).hasClass('active')) {
			$('div#FormStepSlider ul li').removeClass('active');
			$(this).addClass('active');

			if ($(this).is(':first-child')) {
				$('#FormStepSlider ul').removeClass('ulright');
				$('.credit_card_form').addClass('d-none');
				$('.en__component.en__component--formblock.donation-amount').removeClass("d-none").slideDown();
				$('.form-check').removeClass("d-none").slideDown();
				$('.form-second-part').hide();
				$('.action-button').find('button').text('Continua');
				$('.action-button').find('button').removeClass('text-center').addClass('text-right next-btn');
				
				$('.next-btn').show();
				// 27 FEB 2020
				// Add default red btn in first step (amount)
				$('.action-button.default_red_btn').removeClass("d-none");

			} else {

				$('#FormStepSlider ul').addClass('ulright');
				$('.credit_card_form').removeClass('d-none');
				hideFormFields();
				$('.en__component.en__component--formblock.donation-amount').addClass("d-none").slideDown();
				$('.form-check').addClass("d-none").slideDown();
				$('.form-second-part').slideDown();
				var selectdonate = $('input[name="transaction.donationAmt"]:checked').val();
				if (selectdonate == 'other') selectdonate = $('input[name="transaction.donationAmt.other"]').val();

				//$('.action-button').find('button').text('Donate' + ' €' + selectdonate );
				//$('.action-button').find('button').removeClass('next-btn text-left').addClass('text-center');

				// 27 FEB 2020

				// Stripe built-in - Add amount to button
				$('.credit_card_form .en__submit button').text('Dona' + ' €' + selectdonate);
				

				// Remove default red btn from second step (payment)
				$('.action-button.default_red_btn').addClass("d-none");
				
				$('.custom_donation_content div').hide();
				// if($('.paymentDetails a.active').attr('id') == 'payViaPaypal'){
				// 	$('.ppal_btn').removeClass('d-none');
				// 	$('.credit_card_form').addClass('d-none');
				// }
				// else{
				// 	$('.ppal_btn').addClass('d-none');
				// 	$('.credit_card_form').removeClass('d-none');
				// }
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
			$('.ppal_btn').removeClass('disable_btn');
			$('.ppal_btn').addClass('enable_btn');
			$('.ppal_btn').addClass('paypalButton');
			console.log('Paypal button is available.');
		} else {
			console.log('Form is filled? ' + formfilled);
			$('.ppal_btn').removeClass('enable_btn');
			$('.ppal_btn').addClass('disable_btn');
			$('.ppal_btn').removeClass('paypalButton');
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
	$('input[name="transaction.donationAmt.other"]').attr('placeholder', '€ Altro importo');
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
	input_donationAmt_other.attr('type', 'text');
	$('#main-content-inner > form').on('submit', function(){
		let flt_val = parseFloat(input_donationAmt_other.val().replace(',', '.'));
		if (flt_val !== "" && !isNaN(flt_val)) {
			input_donationAmt_other.val(flt_val);
		}
	});
}); // end of jQuery(document).ready(function($){



jQuery(document).ready(function($) {
    function lockMonthlyIfSelected() {
        var $monthly = $('#en__field_transaction_recurrpay1');

        if ($monthly.attr('is_selected') === 'true') {
            // Disabilito il click su quell'opzione
            $monthly.prop('disabled', true);
        } else {
            $monthly.prop('disabled', false);
        }
    }

    // Al caricamento
    lockMonthlyIfSelected();

    // Ogni volta che cambia selezione aggiorno
    $('input[name="transaction.recurrpay"]').on('change', function() {
        setTimeout(lockMonthlyIfSelected, 50);
    });
});


jQuery(document).ready(function($) {
    var readyToAdd = false; // flag per sapere se dobbiamo aggiungere la classe

    // Radio 1 → se cliccato, prepara aggiunta (toggle solo dopo step two)
    $(document).on('click', '#en__field_transaction_recurrpay1', function() {
        readyToAdd = true; // pronto ad aggiungere la classe
    });

    // Radio 0 → rimuove sempre la classe e resetta il flag
    $(document).on('click', '#en__field_transaction_recurrpay0', function() {
        $('.en__submit.aggiungimensilebottonestile').removeClass('aggiungimensilebottonestile');
        readyToAdd = false;
    });

    // Step two → se pronto, aggiunge la classe
    $(document).on('click', '.step.two', function() {
        if (readyToAdd) {
            $('.en__submit').addClass('aggiungimensilebottonestile');
            readyToAdd = false; // resetta il flag per non riaggiungere
        }
    });
});