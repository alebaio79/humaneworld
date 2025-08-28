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
	

	
	

});