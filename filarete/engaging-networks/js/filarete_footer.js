jQuery(document).ready(function($){
"use strict";

$(".en__field.en__field--text.en__field--iban iframe").contents().find(".InputElement").addClass('filarete-test').css("height", "30px !important");

            // modal
            $('#helpModal').appendTo("body");
                        
          

$('.fixed-header a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
});

$("input.en__field__input--other").attr('type', 'number');

$(window).scroll(function(){
			
    if ($(window).scrollTop() >= 15) {
        $('.fixed-header').addClass('sticky');
    } else {
        $('.fixed-header').removeClass('sticky');

    }
});



$(".faimensile").insertAfter('.en__field--764405');
 
$('input#en__field_transaction_recurrpay0').on('click', function() {
    $(".faimensile").toggleClass("d-block");
});

jQuery('label[for="en__field_transaction_recurrpay1"]').click(function() {
jQuery('.faimensile').removeClass('d-block');

});

jQuery('.chiudiblocco').click(function() {
jQuery('.faimensile').css('display','none !important');

});
}); // End Document Ready