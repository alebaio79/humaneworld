jQuery(document).ready(function($){
"use strict";


		$('.en__field.en__field--radio.en__field--withOther .en__field__item:nth-of-type(1)').click(function(){
		$('.custom_donation_content.single .transaction_donationAmt0').addClass('active');
        $('.custom_donation_content.single .transaction_donationAmt1').removeClass('active');
        $('.custom_donation_content.single .transaction_donationAmt2').removeClass('active');
        $('.custom_donation_content.single .transaction_donationAmt_other').removeClass('active');		
    });
	
	$('.en__field.en__field--radio.en__field--withOther .en__field__item:nth-of-type(2)').click(function(){
		$('.custom_donation_content.single .transaction_donationAmt0').removeClass('active');
        $('.custom_donation_content.single .transaction_donationAmt1').addClass('active');
        $('.custom_donation_content.single .transaction_donationAmt2').removeClass('active');
        $('.custom_donation_content.single .transaction_donationAmt_other').removeClass('active');		
    });
	
	$('.en__field.en__field--radio.en__field--withOther .en__field__item:nth-of-type(3)').click(function(){
				$('.custom_donation_content.single .transaction_donationAmt0').removeClass('active');
        $('.custom_donation_content.single .transaction_donationAmt1').removeClass('active');
        $('.custom_donation_content.single .transaction_donationAmt2').addClass('active');
        $('.custom_donation_content.single .transaction_donationAmt_other').removeClass('active');		
    });
	
	
	$('.en__field.en__field--radio.en__field--withOther .en__field__item--other').click(function(){
				$('.custom_donation_content.single .transaction_donationAmt0').removeClass('active');
        $('.custom_donation_content.single .transaction_donationAmt1').removeClass('active');
        $('.custom_donation_content.single .transaction_donationAmt2').removeClass('active');
        $('.custom_donation_content.single .transaction_donationAmt_other').addClass('active');		
    });	
	
	

		$('.en__field.en__field--radio.en__field--withOther .en__field__item:nth-of-type(1)').click(function(){
		$('.custom_donation_content.monthly .transaction_donationAmt0').addClass('active');
        $('.custom_donation_content.monthly .transaction_donationAmt1').removeClass('active');
        $('.custom_donation_content.monthly .transaction_donationAmt2').removeClass('active');
        $('.custom_donation_content.monthly .transaction_donationAmt_other').removeClass('active');		
    });
	
	$('.en__field.en__field--radio.en__field--withOther .en__field__item:nth-of-type(2)').click(function(){
		$('.custom_donation_content.monthly .transaction_donationAmt0').removeClass('active');
        $('.custom_donation_content.monthly .transaction_donationAmt1').addClass('active');
        $('.custom_donation_content.monthly .transaction_donationAmt2').removeClass('active');
        $('.custom_donation_content.monthly .transaction_donationAmt_other').removeClass('active');		
    });
	
	$('.en__field.en__field--radio.en__field--withOther .en__field__item:nth-of-type(3)').click(function(){
				$('.custom_donation_content.monthly .transaction_donationAmt0').removeClass('active');
        $('.custom_donation_content.monthly .transaction_donationAmt1').removeClass('active');
        $('.custom_donation_content.monthly .transaction_donationAmt2').addClass('active');
        $('.custom_donation_content.monthly .transaction_donationAmt_other').removeClass('active');		
    });
	
	
	$('.en__field.en__field--radio.en__field--withOther .en__field__item--other').click(function(){
				$('.custom_donation_content.monthly .transaction_donationAmt0').removeClass('active');
        $('.custom_donation_content.monthly .transaction_donationAmt1').removeClass('active');
        $('.custom_donation_content.monthly .transaction_donationAmt2').removeClass('active');
        $('.custom_donation_content.monthly .transaction_donationAmt_other').addClass('active');		
    });	
	

}); // End Document Ready 