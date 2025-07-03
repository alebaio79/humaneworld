jQuery(document).ready(function($){
"use strict";
	$(".sceltacartolina").insertAfter(".en__field--1382917");
	
$( ".sceltacartolina" ).append( "<label class='etichetta'>COMPILA I TUOI DATI</strong>" );
$('.en__field__element--radio label').click(function() {

$(".cartolinaattiva").not($(this).addClass('cartolinaattiva')).removeClass();
});
	
	
/*leone attivo*/
$('.en__field__element--radio .en__field__item:nth-of-type(1) label').click(function() {
$('.leone').addClass('cartolinasceltaattiva');
$('.elefante').removeClass('cartolinasceltaattiva');
$('.rinoceronte').removeClass('cartolinasceltaattiva');

});
	
/*elefante attivo*/
$('.en__field__element--radio .en__field__item:nth-of-type(2) label').click(function() {
$('.elefante').addClass('cartolinasceltaattiva');
$('.leone').removeClass('cartolinasceltaattiva');
$('.rinoceronte').removeClass('cartolinasceltaattiva');
});
	
/*rinoceronte attivo*/
$('.en__field__element--radio .en__field__item:nth-of-type(3) label').click(function() {
$('.rinoceronte').addClass('cartolinasceltaattiva');
$('.leone').removeClass('cartolinasceltaattiva');
$('.elefante').removeClass('cartolinasceltaattiva');
});
	
	
$('.en__field--1541160 #en__field_transaction_donationAmt0').click(function() {
$('.custom_donation_content.single .transaction_donationAmt0').addClass('d-block');
$('.custom_donation_content.single .transaction_donationAmt1').removeClass('d-block');
});

$('.en__field--1541160 #en__field_transaction_donationAmt1').click(function() {
$('.custom_donation_content.single .transaction_donationAmt1').addClass('d-block');
$('.custom_donation_content.single .transaction_donationAmt0').removeClass('d-block');
});

	
$('.en__field--1541160 #en__field_transaction_donationAmt0').click(function() {
$('.donation-amount .en__field--1542804   .en__field__item:nth-child(3) label').removeClass('d-flex');
$('.donation-amount .en__field--1542804   .en__field__item:nth-child(4) label').removeClass('d-flex');
});

$('.en__field--1541160 #en__field_transaction_donationAmt1').click(function() {
$('.donation-amount .en__field--1542804   .en__field__item:nth-child(3) label').addClass('d-flex');
$('.donation-amount .en__field--1542804   .en__field__item:nth-child(4) label').addClass('d-flex');
});
	

	/**/


	
	
});