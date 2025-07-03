jQuery(document).ready(function($){
"use strict";
	
$('a.smooth').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
});
$(window).scroll(function(){
			
    if ($(window).scrollTop() >= 5) {
        $('.menu').addClass('sticky');
    }
    else {
			$('.menu').removeClass('sticky');

    }
});	
	

}); // End Document Ready 