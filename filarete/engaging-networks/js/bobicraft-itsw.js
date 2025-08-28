jQuery(document).ready(function($){
"use strict";
	$(".sceltacartolina").insertAfter(".en__field--1382917");
	
$( ".sceltacartolina" ).append( "<label class='etichetta'>COMPILA I TUOI DATI</strong>" );
    // Modificato per escludere label all'interno di .en__field--1913500
	
    $('.en__field__element--radio label').click(function() {
        if (!$(this).closest('.en__field--1913500').length) {
            $(".cartolinaattiva").not($(this).addClass('cartolinaattiva')).removeClass('cartolinaattiva');
        } else {
            $(this).addClass('cartolinaattiva');
        }
    });
	
    $('.en__field__element--radio label').click(function() {
        if (!$(this).closest('.en__field--1986724').length) {
            $(".cartolinaattiva").not($(this).addClass('cartolinaattiva')).removeClass('cartolinaattiva');
        } else {
            $(this).addClass('cartolinaattiva');
        }
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
	
	
$('.en__field--2047883   .en__field__item:nth-child(1)').addClass('costattivo');
/**/

	
	/*nuovo*/
  $('.en__field--2026714  .en__field__item:first-child label').addClass('cartolinaattiva');

	// Mappiamo i checkbox e le classi dei label
var options = {
    'foche': {
        checkbox: '#en__field_supporter_NOT_TAGGED_710',
        labelIndex: 1
    },
    'cani': {
        checkbox: '#en__field_supporter_NOT_TAGGED_711',
        labelIndex: 2
    },
    'pellicce': {
        checkbox: '#en__field_supporter_NOT_TAGGED_712',
        labelIndex: 3
    },
    'gabbie': {
        checkbox: '#en__field_supporter_NOT_TAGGED_713',
        labelIndex: 4
    },
    'carne': {
        checkbox: '#en__field_supporter_NOT_TAGGED_714',
        labelIndex: 5
    },
    'trofeo': {
        checkbox: '#en__field_supporter_NOT_TAGGED_715',
        labelIndex: 6
    },
    'carnedue': {
        checkbox: '#en__field_supporter_NOT_TAGGED_716',
        labelIndex: 7
    },
    'trofeodue': {
        checkbox: '#en__field_supporter_NOT_TAGGED_717',
        labelIndex: 8
    }

};

	
	// Funzione per gestire il click
function handleClick(className, fieldClass) {
    var option = options[className];
    var $checkbox = $(option.checkbox);

    // Seleziona il checkbox se non è già selezionato
    if (!$checkbox.prop('checked')) {
        $checkbox.prop('checked', true).change();
    }

    // Rimuove la classe 'cartolinaattiva' da tutte le etichette
    $(fieldClass + ' .en__field__item label').removeClass('cartolinaattiva');

    // Aggiunge la classe 'cartolinaattiva' all'etichetta corrispondente
    $(fieldClass + ' .en__field__item:nth-child(' + option.labelIndex + ') label').addClass('cartolinaattiva');
}

// Imposta gli handler per tutti i pulsanti
$.each(options, function(className) {
    $('.' + className).on('click', function() {
        // Applica la logica a entrambe le sezioni
        handleClick(className, '.en__field--2026714'); // Per il primo gruppo
        //handleClick(className, '.en__field--1905155'); // Per il secondo gruppo
    });
});
 
	


	
	
	/*nuovo*/

	
$('.foche').on('click', function(){
	$('.cardmissioni .foche picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');
	$('.cardmissioni .carnedue picture').removeClass('cardattiva');
	$('.cardmissioni .trofeodue picture').removeClass('cardattiva');
	
	
	$('.en__field--2047883    .en__field__item:nth-child(1)').addClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(2)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(3)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(4)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(5)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(6)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(7)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(8)').removeClass('costattivo');
	
 $('.en__field--2047883    .en__field__item.costattivo input').prop('checked', true); 
	
	

 });
	
$('.trofeo').on('click', function(){
	$('.cardmissioni .trofeo picture').toggleClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
	$('.cardmissioni .carnedue picture').removeClass('cardattiva');
	$('.cardmissioni .trofeodue picture').removeClass('cardattiva');
	
	
	
	$('.en__field--2047883    .en__field__item:nth-child(6)').addClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(2)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(3)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(4)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(5)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(1)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(7)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(8)').removeClass('costattivo');
	
 $('.en__field--2047883    .en__field__item.costattivo input').prop('checked', true); 
	
	
 });
	
$('.carne').on('click', function(){
	$('.cardmissioni .carne picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
	$('.cardmissioni .carnedue picture').removeClass('cardattiva');
	$('.cardmissioni .trofeodue picture').removeClass('cardattiva');
	
	
	$('.en__field--2047883    .en__field__item:nth-child(5)').addClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(2)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(1)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(3)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(4)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(6)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(7)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(8)').removeClass('costattivo');
	
 $('.en__field--2047883    .en__field__item.costattivo input').prop('checked', true); 
 });
	
$('.pellicce').on('click', function(){
	$('.cardmissioni .pellicce picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
	$('.cardmissioni .carnedue picture').removeClass('cardattiva');
	$('.cardmissioni .trofeodue picture').removeClass('cardattiva');
	
	
	
	$('.en__field--2047883    .en__field__item:nth-child(3)').addClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(2)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(1)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(4)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(5)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(6)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(7)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(8)').removeClass('costattivo');
	
 $('.en__field--2047883    .en__field__item.costattivo input').prop('checked', true); 
	
 });
	
$('.gabbie').on('click', function(){
	$('.cardmissioni .gabbie picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
	$('.cardmissioni .carnedue picture').removeClass('cardattiva');
	$('.cardmissioni .trofeodue picture').removeClass('cardattiva');
	
	$('.en__field--2047883    .en__field__item:nth-child(4)').addClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(2)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(1)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(3)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(5)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(6)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(7)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(8)').removeClass('costattivo');
	
 $('.en__field--2047883    .en__field__item.costattivo input').prop('checked', true); 
 });
	
$('.cani').on('click', function(){
	$('.cardmissioni .cani picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
	$('.cardmissioni .carnedue picture').removeClass('cardattiva');
	$('.cardmissioni .trofeodue picture').removeClass('cardattiva');
	
	$('.en__field--2047883    .en__field__item:nth-child(2)').addClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(1)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(3)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(4)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(5)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(6)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(7)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(8)').removeClass('costattivo');
	
 $('.en__field--2047883    .en__field__item.costattivo input').prop('checked', true); 
 });
	

	$('.trofeodue').on('click', function(){
	$('.cardmissioni .trofeodue picture').toggleClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
	$('.cardmissioni .carnedue picture').removeClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
		
	$('.en__field--2047883    .en__field__item:nth-child(8)').addClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(2)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(3)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(4)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(5)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(1)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(6)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(7)').removeClass('costattivo');
	
 $('.en__field--2047883    .en__field__item.costattivo input').prop('checked', true); 
 });
	
$('.carnedue').on('click', function(){
	$('.cardmissioni .carnedue picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .trofeodue picture').removeClass('cardattiva');
	
	$('.en__field--2047883    .en__field__item:nth-child(7)').addClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(2)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(3)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(4)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(5)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(1)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(6)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(8)').removeClass('costattivo');
	
 $('.en__field--2047883    .en__field__item.costattivo input').prop('checked', true); 

 });
	
	
$('#en__field_supporter_NOT_TAGGED_710').on('click', function(){
	$('.cardmissioni .foche picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');
		$('.cardmissioni .carnedue picture').removeClass('cardattiva');
	$('.cardmissioni .trofeodue picture').removeClass('cardattiva');
	
	
	
	$('.en__field--2047883    .en__field__item:nth-child(1)').addClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(2)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(3)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(4)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(5)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(6)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(7)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(8)').removeClass('costattivo');
	
 $('.en__field--2047883    .en__field__item.costattivo input').prop('checked', true); 

 });
	
$('#en__field_supporter_NOT_TAGGED_711').on('click', function(){
	$('.cardmissioni .cani picture').toggleClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .foche').removeClass('primoattivo');	
	$('.cardmissioni .carnedue picture').removeClass('cardattiva');
	$('.cardmissioni .trofeodue picture').removeClass('cardattiva');
	
	$('.en__field--2047883    .en__field__item:nth-child(2)').addClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(1)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(3)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(4)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(5)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(6)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(7)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(8)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item.costattivo input').prop('checked', true); 
 });
	
$('#en__field_supporter_NOT_TAGGED_712').on('click', function(){
	$('.cardmissioni .pellicce picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
	$('.cardmissioni .carnedue picture').removeClass('cardattiva');
	$('.cardmissioni .trofeodue picture').removeClass('cardattiva');
	
	$('.en__field--2047883    .en__field__item:nth-child(3)').addClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(2)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(1)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(4)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(5)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(6)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(7)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(8)').removeClass('costattivo');
	
 $('.en__field--2047883    .en__field__item.costattivo input').prop('checked', true); 
 });
	
$('#en__field_supporter_NOT_TAGGED_713').on('click', function(){
	$('.cardmissioni .gabbie picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
	$('.cardmissioni .carnedue picture').removeClass('cardattiva');
	$('.cardmissioni .trofeodue picture').removeClass('cardattiva');
	
	
	$('.en__field--2047883    .en__field__item:nth-child(4)').addClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(2)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(1)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(3)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(5)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(6)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(7)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(8)').removeClass('costattivo');
	
 $('.en__field--2047883    .en__field__item.costattivo input').prop('checked', true); 
 });
	
$('#en__field_supporter_NOT_TAGGED_714').on('click', function(){
  $('.cardmissioni .carne picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
	$('.cardmissioni .carnedue picture').removeClass('cardattiva');
	$('.cardmissioni .trofeodue picture').removeClass('cardattiva');
	
	$('.en__field--2047883    .en__field__item:nth-child(5)').addClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(2)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(1)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(3)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(4)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(6)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(7)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(8)').removeClass('costattivo');
	
 $('.en__field--2047883    .en__field__item.costattivo input').prop('checked', true); 
 });
	
$('#en__field_supporter_NOT_TAGGED_715').on('click', function(){
	$('.cardmissioni .trofeo picture').toggleClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
	$('.cardmissioni .carnedue picture').removeClass('cardattiva');
	$('.cardmissioni .trofeodue picture').removeClass('cardattiva');
	
		$('.en__field--2047883    .en__field__item:nth-child(6)').addClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(2)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(3)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(4)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(5)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(1)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(7)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(8)').removeClass('costattivo');
	
 $('.en__field--2047883    .en__field__item.costattivo input').prop('checked', true); 
 });
	
	
$('#en__field_supporter_NOT_TAGGED_716').on('click', function(){
  $('.cardmissioni .carnedue picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');
	$('.cardmissioni .trofeodue picture').removeClass('cardattiva');
	
	$('.en__field--2047883    .en__field__item:nth-child(7)').addClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(2)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(3)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(4)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(5)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(1)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(6)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(8)').removeClass('costattivo');
	
 $('.en__field--2047883    .en__field__item.costattivo input').prop('checked', true); 
 });
	
$('#en__field_supporter_NOT_TAGGED_717').on('click', function(){
	$('.cardmissioni .trofeodue picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
	$('.cardmissioni .carnedue picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	
	$('.en__field--2047883    .en__field__item:nth-child(8)').addClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(2)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(3)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(4)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(5)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(1)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(6)').removeClass('costattivo');
	$('.en__field--2047883    .en__field__item:nth-child(7)').removeClass('costattivo');
	
 $('.en__field--2047883    .en__field__item.costattivo input').prop('checked', true); 
 });



	


		$('.en__field--2047883     input').click(function(event){
				// Controllare se esiste un elemento con la classe cartolinaattiva
				if($('.en__field--2026714  label.cartolinaattiva').length > 0) {
						// Prevenire qualsiasi azione di rimozione della classe cartolinaattiva
						event.stopPropagation();
				}
		});

	
   if ($(window).width() <= 768) { // Cambia il valore se necessario per definire la larghezza del "mobile"
        $(".foche, .cani, .pellicce, .gabbie, .carne, .trofeo, .carnedue, .trofeodue").on("click", function () {
            // Effettuiamo lo scroll verso la div con id 'FormStepSlider'
            $('html, body').animate({
                scrollTop: $("#FormStepSlider").offset().top
            }, 800); // 800 millisecondi per uno scroll fluido
        });
    }
});



