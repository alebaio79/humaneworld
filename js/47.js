jQuery(document).ready(function($){
"use strict";
	
	$('.en__field__element--radio .en__field__item:nth-of-type(1)').click(function(){
				$(this).addClass('bottoneattivouno');
				$('.en__field__element--radio .en__field__item:nth-of-type(2)').removeClass('bottoneattivodue');
	
    });
	
	$('.en__field__element--radio .en__field__item:nth-of-type(2)').click(function(){
				$(this).addClass('bottoneattivodue');
				$('.en__field__element--radio .en__field__item:nth-of-type(1)').removeClass('bottoneattivouno');
	
    });	
 });