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
	
	
/**/
	
	
		/*
$('.foche').on('click', function(){
    var $checkbox = $('#en__field_supporter_NOT_TAGGED_680');
    var isChecked = $checkbox.prop('checked');
    
    // Alterna lo stato del checkbox
    $checkbox.prop('checked', !isChecked).change();
    
    // Rimuove la classe 'cartolinaattiva' da tutte le etichette
    $('.en__field--1913506 .en__field__item label').removeClass('cartolinaattiva');
    
    // Aggiunge la classe 'cartolinaattiva' solo se non era già selezionato
    if (!isChecked) {
        $('.en__field--1913506 .en__field__item:nth-child(1) label').addClass('cartolinaattiva');
    }
});

$('.cani').on('click', function(){
    var $checkbox = $('#en__field_supporter_NOT_TAGGED_681');
    var isChecked = $checkbox.prop('checked');
    
    // Alterna lo stato del checkbox
    $checkbox.prop('checked', !isChecked).change();
    
    // Rimuove la classe 'cartolinaattiva' da tutte le etichette
    $('.en__field--1913506 .en__field__item label').removeClass('cartolinaattiva');
    
    // Aggiunge la classe 'cartolinaattiva' solo se non era già selezionato
    if (!isChecked) {
        $('.en__field--1913506 .en__field__item:nth-child(2) label').addClass('cartolinaattiva');
    }
});

$('.pellicce').on('click', function(){
    var $checkbox = $('#en__field_supporter_NOT_TAGGED_682');
    var isChecked = $checkbox.prop('checked');
    
    // Alterna lo stato del checkbox
    $checkbox.prop('checked', !isChecked).change();
    
    // Rimuove la classe 'cartolinaattiva' da tutte le etichette
    $('.en__field--1913506 .en__field__item label').removeClass('cartolinaattiva');
    
    // Aggiunge la classe 'cartolinaattiva' solo se non era già selezionato
    if (!isChecked) {
        $('.en__field--1913506 .en__field__item:nth-child(3) label').addClass('cartolinaattiva');
    }
});

$('.gabbie').on('click', function(){
    var $checkbox = $('#en__field_supporter_NOT_TAGGED_683');
    var isChecked = $checkbox.prop('checked');
    
    // Alterna lo stato del checkbox
    $checkbox.prop('checked', !isChecked).change();
    
    // Rimuove la classe 'cartolinaattiva' da tutte le etichette
    $('.en__field--1913506 .en__field__item label').removeClass('cartolinaattiva');
    
    // Aggiunge la classe 'cartolinaattiva' solo se non era già selezionato
    if (!isChecked) {
        $('.en__field--1913506 .en__field__item:nth-child(4) label').addClass('cartolinaattiva');
    }
});

$('.carne').on('click', function(){
    var $checkbox = $('#en__field_supporter_NOT_TAGGED_684');
    var isChecked = $checkbox.prop('checked');
    
    // Alterna lo stato del checkbox
    $checkbox.prop('checked', !isChecked).change();
    
    // Rimuove la classe 'cartolinaattiva' da tutte le etichette
    $('.en__field--1913506 .en__field__item label').removeClass('cartolinaattiva');
    
    // Aggiunge la classe 'cartolinaattiva' solo se non era già selezionato
    if (!isChecked) {
        $('.en__field--1913506 .en__field__item:nth-child(5) label').addClass('cartolinaattiva');
    }
});

$('.trofeo').on('click', function(){
    var $checkbox = $('#en__field_supporter_NOT_TAGGED_685');
    var isChecked = $checkbox.prop('checked');
    
    // Alterna lo stato del checkbox
    $checkbox.prop('checked', !isChecked).change();
    
    // Rimuove la classe 'cartolinaattiva' da tutte le etichette
    $('.en__field--1913506 .en__field__item label').removeClass('cartolinaattiva');
    
    // Aggiunge la classe 'cartolinaattiva' solo se non era già selezionato
    if (!isChecked) {
        $('.en__field--1913506 .en__field__item:nth-child(6) label').addClass('cartolinaattiva');
    }
});
	

	$('.foche').on('click', function(){
    var $checkbox = $('#en__field_supporter_NOT_TAGGED_680');
    var isChecked = $checkbox.prop('checked');
    
    // Alterna lo stato del checkbox
    $checkbox.prop('checked', !isChecked).change();
    
    // Rimuove la classe 'cartolinaattiva' da tutte le etichette
    $('.en__field--1905155 .en__field__item label').removeClass('cartolinaattiva');
    
    // Aggiunge la classe 'cartolinaattiva' solo se non era già selezionato
    if (!isChecked) {
        $('.en__field--1905155 .en__field__item:nth-child(1) label').addClass('cartolinaattiva');
    }
});

$(' .cani').on('click', function(){
    var $checkbox = $('#en__field_supporter_NOT_TAGGED_681');
    var isChecked = $checkbox.prop('checked');
    
    // Alterna lo stato del checkbox
    $checkbox.prop('checked', !isChecked).change();
    
    // Rimuove la classe 'cartolinaattiva' da tutte le etichette
    $('.en__field--1905155 .en__field__item label').removeClass('cartolinaattiva');
    
    // Aggiunge la classe 'cartolinaattiva' solo se non era già selezionato
    if (!isChecked) {
        $('.en__field--1905155 .en__field__item:nth-child(2) label').addClass('cartolinaattiva');
    }
});

$(' .pellicce').on('click', function(){
    var $checkbox = $('#en__field_supporter_NOT_TAGGED_682');
    var isChecked = $checkbox.prop('checked');
    
    // Alterna lo stato del checkbox
    $checkbox.prop('checked', !isChecked).change();
    
    // Rimuove la classe 'cartolinaattiva' da tutte le etichette
    $('.en__field--1905155 .en__field__item label').removeClass('cartolinaattiva');
    
    // Aggiunge la classe 'cartolinaattiva' solo se non era già selezionato
    if (!isChecked) {
        $('.en__field--1905155 .en__field__item:nth-child(3) label').addClass('cartolinaattiva');
    }
});

$(' .gabbie').on('click', function(){
    var $checkbox = $('#en__field_supporter_NOT_TAGGED_683');
    var isChecked = $checkbox.prop('checked');
    
    // Alterna lo stato del checkbox
    $checkbox.prop('checked', !isChecked).change();
    
    // Rimuove la classe 'cartolinaattiva' da tutte le etichette
    $('.en__field--1905155 .en__field__item label').removeClass('cartolinaattiva');
    
    // Aggiunge la classe 'cartolinaattiva' solo se non era già selezionato
    if (!isChecked) {
        $('.en__field--1905155 .en__field__item:nth-child(4) label').addClass('cartolinaattiva');
    }
});

$(' .carne').on('click', function(){
    var $checkbox = $('#en__field_supporter_NOT_TAGGED_684');
    var isChecked = $checkbox.prop('checked');
    
    // Alterna lo stato del checkbox
    $checkbox.prop('checked', !isChecked).change();
    
    // Rimuove la classe 'cartolinaattiva' da tutte le etichette
    $('.en__field--1905155 .en__field__item label').removeClass('cartolinaattiva');
    
    // Aggiunge la classe 'cartolinaattiva' solo se non era già selezionato
    if (!isChecked) {
        $('.en__field--1905155 .en__field__item:nth-child(5) label').addClass('cartolinaattiva');
    }
});

$(' .trofeo').on('click', function(){
    var $checkbox = $('#en__field_supporter_NOT_TAGGED_685');
    var isChecked = $checkbox.prop('checked');
    
    // Alterna lo stato del checkbox
    $checkbox.prop('checked', !isChecked).change();
    
    // Rimuove la classe 'cartolinaattiva' da tutte le etichette
    $('.en__field--1905155 .en__field__item label').removeClass('cartolinaattiva');
    
    // Aggiunge la classe 'cartolinaattiva' solo se non era già selezionato
    if (!isChecked) {
        $('.en__field--1905155 .en__field__item:nth-child(6) label').addClass('cartolinaattiva');
    }
});
	/**/

	
	/*nuovo*/
  $('.en__field--1905155 .en__field__item:first-child label').addClass('cartolinaattiva');

	// Mappiamo i checkbox e le classi dei label
var options = {
    'foche': {
        checkbox: '#en__field_supporter_NOT_TAGGED_680',
        labelIndex: 1
    },
    'cani': {
        checkbox: '#en__field_supporter_NOT_TAGGED_681',
        labelIndex: 2
    },
    'pellicce': {
        checkbox: '#en__field_supporter_NOT_TAGGED_682',
        labelIndex: 3
    },
    'gabbie': {
        checkbox: '#en__field_supporter_NOT_TAGGED_683',
        labelIndex: 4
    },
    'carne': {
        checkbox: '#en__field_supporter_NOT_TAGGED_684',
        labelIndex: 5
    },
    'trofeo': {
        checkbox: '#en__field_supporter_NOT_TAGGED_685',
        labelIndex: 6
    }
};

// Funzione per gestire il click
/*function handleClick(className, fieldClass) {
    var option = options[className];
    var $checkbox = $(option.checkbox);
    var isChecked = $checkbox.prop('checked');
    
    // Alterna lo stato del checkbox
    $checkbox.prop('checked', !isChecked).change();
    
    // Rimuove la classe 'cartolinaattiva' da tutte le etichette
    $(fieldClass + ' .en__field__item label').removeClass('cartolinaattiva');
    
    // Aggiunge la classe 'cartolinaattiva' solo se non era già selezionato
    if (!isChecked) {
        $(fieldClass + ' .en__field__item:nth-child(' + option.labelIndex + ') label').addClass('cartolinaattiva');
    }
}

// Imposta gli handler per tutti i pulsanti
$.each(options, function(className) {
    $('.' + className).on('click', function() {
        // Applica la logica a entrambe le sezioni
        handleClick(className, '.en__field--1913506'); // Per il primo gruppo
        handleClick(className, '.en__field--1905155'); // Per il secondo gruppo
    });
});
	
	*/
	
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
        handleClick(className, '.en__field--1913506'); // Per il primo gruppo
        handleClick(className, '.en__field--1905155'); // Per il secondo gruppo
    });
});


	
	
	/*nuovo*/
	
/*$('.cani, #en__field_supporter_NOT_TAGGED_681').on('click', function(){
			 $('.en__field--1913500').toggleClass('caniattivi');
			
});		
	
// Aggiungi l'evento click ai campi 'foche', 'gatti' e altri
$('.foche, .gatti, .pellicce, .gabbie, carne, .trofeo, #en__field_supporter_NOT_TAGGED_680, #en__field_supporter_NOT_TAGGED_682, #en__field_supporter_NOT_TAGGED_683, #en__field_supporter_NOT_TAGGED_684, #en__field_supporter_NOT_TAGGED_685').on('click', function() {
    // Rimuove la classe 'caniattivi' dall'elemento desiderato
    $('.en__field--1913500').removeClass('caniattivi');
});
	
	
/**/
	
	
/*$('.cani, #en__field_supporter_NOT_TAGGED_681').on('click', function(){
			 $('.en__field--1986724').toggleClass('caniattivi');
			
});		
	
// Aggiungi l'evento click ai campi 'foche', 'gatti' e altri
$('.foche, .gatti, .pellicce, .gabbie, carne, .trofeo, #en__field_supporter_NOT_TAGGED_680, #en__field_supporter_NOT_TAGGED_682, #en__field_supporter_NOT_TAGGED_683, #en__field_supporter_NOT_TAGGED_684, #en__field_supporter_NOT_TAGGED_685').on('click', function() {
    // Rimuove la classe 'caniattivi' dall'elemento desiderato
    $('.en__field--1986724').removeClass('caniattivi');
});
	
	*/
	
$('.foche').on('click', function(){
	$('.cardmissioni .foche picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');
	
	

 });
	
$('.trofeo').on('click', function(){
	$('.cardmissioni .trofeo picture').toggleClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
 });
	
$('.carne').on('click', function(){
	$('.cardmissioni .carne picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
 });
	
$('.pellicce').on('click', function(){
	$('.cardmissioni .pellicce picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
 });
	
$('.gabbie').on('click', function(){
	$('.cardmissioni .gabbie picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
 });
	
$('.cani').on('click', function(){
	$('.cardmissioni .cani picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
 });
	
	
$('#en__field_supporter_NOT_TAGGED_680').on('click', function(){
	$('.cardmissioni .foche picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');

 });
	
$('#en__field_supporter_NOT_TAGGED_685').on('click', function(){
	$('.cardmissioni .trofeo picture').toggleClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .foche').removeClass('primoattivo');	
 });
	
$('#en__field_supporter_NOT_TAGGED_684').on('click', function(){
	$('.cardmissioni .carne picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
 });
	
$('#en__field_supporter_NOT_TAGGED_682').on('click', function(){
	$('.cardmissioni .pellicce picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
 });
	
$('#en__field_supporter_NOT_TAGGED_683').on('click', function(){
  $('.cardmissioni .gabbie picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .cani picture').removeClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
 });
	
$('#en__field_supporter_NOT_TAGGED_681').on('click', function(){
	$('.cardmissioni .cani picture').toggleClass('cardattiva');
	$('.cardmissioni .trofeo picture').removeClass('cardattiva');
	$('.cardmissioni .pellicce picture').removeClass('cardattiva');
	$('.cardmissioni .carne picture').removeClass('cardattiva');
	$('.cardmissioni .foche picture').removeClass('cardattiva');
	$('.cardmissioni .gabbie picture').removeClass('cardattiva');	
	$('.cardmissioni .foche').removeClass('primoattivo');	
 });


	$('.foche-de').on('click', function() {
			$('label[for="en__field_supporter_NOT_TAGGED_680"]').addClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_681"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_682"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_683"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_684"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_685"]').removeClass('cartolinaattiva');
    });	
	
	$('.cani-de').on('click', function() {
			$('label[for="en__field_supporter_NOT_TAGGED_681"]').addClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_680"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_682"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_683"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_684"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_685"]').removeClass('cartolinaattiva');
    });
	
		$('.pellicce-de').on('click', function() {
			$('label[for="en__field_supporter_NOT_TAGGED_682"]').addClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_680"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_681"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_683"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_684"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_685"]').removeClass('cartolinaattiva');
    });
	
		$('.gabbie-de').on('click', function() {
			$('label[for="en__field_supporter_NOT_TAGGED_683"]').addClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_680"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_681"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_682"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_684"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_685"]').removeClass('cartolinaattiva');
    });
	
		$('.carne-de').on('click', function() {
			$('label[for="en__field_supporter_NOT_TAGGED_684"]').addClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_680"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_681"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_682"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_683"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_685"]').removeClass('cartolinaattiva');
    });
	
		$('.trofeo-de').on('click', function() {
			$('label[for="en__field_supporter_NOT_TAGGED_685"]').addClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_680"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_681"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_682"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_683"]').removeClass('cartolinaattiva');
			$('label[for="en__field_supporter_NOT_TAGGED_684"]').removeClass('cartolinaattiva');
    });
	
	
	
            $('.en__field--1913500 input').click(function(event){
                // Controllare se esiste un elemento con la classe cartolinaattiva
                if($('.en__field--1913506 label.cartolinaattiva').length > 0) {
                    // Prevenire qualsiasi azione di rimozione della classe cartolinaattiva
                    event.stopPropagation();
                }
            });
	
            $('.en__field--1986724 input').click(function(event){
                // Controllare se esiste un elemento con la classe cartolinaattiva
                if($('.en__field--1905155 label.cartolinaattiva').length > 0) {
                    // Prevenire qualsiasi azione di rimozione della classe cartolinaattiva
                    event.stopPropagation();
                }
            });
	
   if ($(window).width() <= 768) { // Cambia il valore se necessario per definire la larghezza del "mobile"
        $(".foche, .cani, .pellicce, .gabbie, .carne, .trofeo").on("click", function () {
            // Effettuiamo lo scroll verso la div con id 'FormStepSlider'
            $('html, body').animate({
                scrollTop: $("#FormStepSlider").offset().top
            }, 800); // 800 millisecondi per uno scroll fluido
        });
    }
});



