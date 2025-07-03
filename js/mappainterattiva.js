(function ($) {

'use strict';

$(document).ready(function() {
		
jQuery('#AMERICANORD').click(function(){
jQuery("#Americanord").modal("show");
});	
	
	
jQuery('#AMERICASUD').click(function(){
jQuery("#AmericaSudmodal").modal("show");
});	
	
	
jQuery('#AFRICA').click(function(){
jQuery("#Africamodal").modal("show");
});	
	
jQuery('#ASIA').click(function(){
jQuery("#Asiamodal").modal("show");
});	
	
jQuery('#EUROPA1').click(function(){
jQuery("#Europa1modal").modal("show");
});	
	
jQuery('#EUROPA2').click(function(){
jQuery("#Europa2modal").modal("show");
});	
	
	
	
		
jQuery('#AMERICANORD').hover(function(){
jQuery(this).toggleClass('markerattivo');
jQuery('#AmericaNord').toggleClass('mappaattiva');
});	
	
jQuery('#AMERICASUD').hover(function(){
jQuery(this).toggleClass('markerattivo');
jQuery('#AmericaSud').toggleClass('mappaattiva');
});	
	
jQuery('#AFRICA').hover(function(){
jQuery(this).toggleClass('markerattivo');
jQuery('#Africa').toggleClass('mappaattiva');
});	
	
jQuery('#ASIA').hover(function(){
jQuery(this).toggleClass('markerattivo');
jQuery('#Asia').toggleClass('mappaattiva');
});	
	
jQuery('#EUROPA1').hover(function(){
jQuery(this).toggleClass('markerattivo');
jQuery('#Europa2').toggleClass('mappaattiva');
});	
	
jQuery('#EUROPA2').hover(function(){
jQuery(this).toggleClass('markerattivo');
jQuery('#Europa2').toggleClass('mappaattiva');
});	
	
	
jQuery('.foche').click(function(){
jQuery(".modal").modal('hide');

});	
	
jQuery('.cani').click(function(){
jQuery(".modal").modal('hide');

});	
	
jQuery('.pellicce').click(function(){
jQuery(".modal").modal('hide');

});	
	
jQuery('.gabbie').click(function(){
jQuery(".modal").modal('hide');

});	
	
jQuery('.trofeo').click(function(){
jQuery(".modal").modal('hide');

});	
	
jQuery('.carne').click(function(){
jQuery(".modal").modal('hide');

});	
		
});
	
}(jQuery));
