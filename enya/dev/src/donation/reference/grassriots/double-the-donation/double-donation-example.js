/* eslint-disable */
//360MatchPro variables
var publicKey;
var companyID; //set to 319 or 51 for local testing
var companyName;
var campaign
var donationID;
var donationAmount;
var donorFirstName;
var donorLastName;
var donorEmail;
var donorPhone;



/* 
* set cookies with collected information which we will be submitting to 360MatchPro on the post action page.
*/
function handle360MatchPro(){

  // console.log('IN FUNCTION handle360MatchPro');
  // console.log($('input[name="doublethedonation_company_name"]').val());

  // console.log($form.find(fields.fname.selector).val());
  // console.log($form.find(fields.lname.selector).val());
  // console.log($form.find(fields.email.selector).val());
  // console.log($form.find(fields.phone.selector).val());

  localStorage.setItem('companyID', $('input[name="doublethedonation_company_id"]').val());
  sessionStorage.setItem('companyID', $('input[name="doublethedonation_company_id"]').val());
  localStorage.setItem('companyName', $('input[name="doublethedonation_company_name"]').val());
  localStorage.setItem('donorFirstName', $form.find(fields.fname.selector).val());
  localStorage.setItem('donorLastName', $form.find(fields.lname.selector).val());
  localStorage.setItem('donorEmail', $form.find(fields.email.selector).val());
  localStorage.setItem('donorPhone', $form.find(fields.phone.selector).val());

  companyID = $('input[name="doublethedonation_company_id"]').val();
  donorFirstName = $form.find(fields.fname.selector).val();
  donorLastName = $form.find(fields.lname.selector).val();
  donorEmail = $form.find(fields.email.selector).val();
  donorPhone = $form.find(fields.phone.selector).val();

  // console.log('console log variables to see what I have available');
  // console.log('companyID: ' + companyID);
  // console.log('donationAmount: ' + donationAmount);
  // console.log('donorFirstName: ' + donorFirstName);
  // console.log('donorLastName: ' + donorLastName);
  // console.log('donorEmail: ' + donorEmail);
  // console.log('donorPhone: ' + donorPhone);


}

/* 
* for successfully submitted donation, register information with 360MatchPro if employer matching is selected. 
*/
function handle360MatchProSubmit(){
  // console.log('IN FUNCTION handle360MatchProSubmit');

  //determine which copy to present the user on post action
  //grab doublethedonation status value from localStorage
  if ( localStorage.getItem('doublethedonation') === null ) {
    var doubleDonationStatus = 'no_interaction';
  }
  else {
    var doubleDonationDetails = JSON.parse(localStorage.getItem('doublethedonation'));
    // console.log('Double Donation status: ', doubleDonationDetails);
    var doubleDonationStatus = doubleDonationDetails['doublethedonation_status'];
  }
  // console.log('Double Donation status: ', doubleDonationStatus);

  if (doubleDonationStatus == 'no_interaction' || doubleDonationStatus == 'not_found' || doubleDonationStatus == 'entered_text') {
    // console.log('no interaction / not found status');
    $('.company_found').remove();
    $('.next_steps').hide();
    // $('.next_steps').remove();
  }
  else if (doubleDonationStatus == 'found') {
    // console.log('found status');
    $('.company_search').remove();
    $('.search_now').hide();  
    // $('.search_now').remove();  

    // var co = gr.getCookie('companyID');
    // var co = localStorage.getItem('companyID');
    // var co = doubleDonationDetails['doublethedonation_company_id'];
    // var co = localStorage.getItem('companyID');
    var co = sessionStorage.getItem('companyID');
    // console.log('company ID: ' + co);

    // console.log('360matchProScript');
    // console.log($('.360matchProScript'));

    //append the search container with pre-populated company information 
    // $( ".360matchProScript" ).append( "var DDCONF = { COMPANY: "+co+", API_KEY: \"ZjUwNjAyOTEtOTM1\" };" ); 
    
    $( ".360matchProScript" ).append( "doublethedonation.plugin.set_company("+co+");" ); 

    // console.log($('.360matchProScript'));

    //get the company name from the appended form 
    $('.company_name').text(localStorage.getItem('companyName'));

  }



  campaign = window.pageJson.pageName;
  //get the payment gateway's transactionID as the donationID to send to 360MatchPro
  donationID = (window.pageJson.donationLogId).toString();
  donationAmount = window.pageJson.amount;
  companyID = localStorage.getItem('companyID'); //set to 319 or 51 for local testing
  donorFirstName = localStorage.getItem('donorFirstName');
  donorLastName = localStorage.getItem('donorLastName');
  donorEmail = localStorage.getItem('donorEmail');
  donorPhone = localStorage.getItem('donorPhone');



  // console.log('console log variables to see what I have available');
  // console.log('companyID: ' + companyID);
  // console.log('companyName: ' + companyName);
  // console.log('campaign: ' + campaign);
  // console.log('donationID: ' + donationID);
  // console.log(jQuery.type(donationID));
  // console.log('donationAmount: ' + donationAmount);
  // console.log('donorFirstName: ' + donorFirstName);
  // console.log('donorLastName: ' + donorLastName);
  // console.log('donorEmail: ' + donorEmail);
  // console.log('donorPhone: ' + donorPhone);



  doublethedonation.integrations.core.register_donation({
    "360matchpro_public_key": "ZjUwNjAyOTEtOTM1",
    "campaign": campaign,
    "donation_identifier": donationID,
    "donation_amount": donationAmount,
    "donor_first_name": donorFirstName,
    "donor_last_name": donorLastName,
    "donor_email": donorEmail,
    "donor_phone": donorPhone,
    "doublethedonation_company_id": companyID
  });



}



var dd_company_found = false;
var dd_successful_search = false;


function handle360MatchProStatus() {

  var checkExist = setInterval(function() {
    console.log('checking for .dtd-search-input elment');
    if ($('.dtd-search-input').length) {
      // console.log('dtd-search-input exists');
      clearInterval(checkExist);
      handle360MatchProInit();
    }
  }, 100); // check every 100ms

}


function handle360MatchProInit() {

  //remove all lingering double the donation status details from localstorage
  localStorage.removeItem('doublethedonation');
  localStorage.removeItem('companyID');
  sessionStorage.removeItem('companyID');

  // console.log($('.dtd-search-input').attr('placeholder'));
  $('.dtd-search-input').attr('placeholder', 'Enter company name...');

  //disable autocomplete on company search field
  $('.dtd-search-input').attr('autocomplete', 'disabled');

  //add event listener to input field 
  $('.dtd-search-input').on('change keyup', function(){
    // console.log($(this)[0].value);
    //check if input has value and Select-menu-outer container doesn't exist
    if ( ($(this)[0].value.length > 3) && ($('.Select-menu-outer').length == 0) ){
      // console.log('input is empty');
      $('.no_match').show();
    }
    else if ( ($(this)[0].value != '') || ( ($(this)[0].value.length > 3) && ($('.Select-menu-outer').length > 0)  )) {
      $('.no_match').hide();
    }
  });

  //attach event listener to more info and close button
  $('.more_info').on('click', function(){
    $('.more-info-modal').removeClass('hide');
  });

  $('.more-info-modal .close').on('click', function(){
    $('.more-info-modal').addClass('hide');
  });

  //attach passive mutation observer to hidden input field
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  var trackChange = function(element) {
    var observer = new MutationObserver(function(mutations, observer) {
      if(mutations[0].attributeName == "value") {
        // console.log($(element)[0].value);
        if ($(element)[0].value.length) {
          // console.log('found company');
          dd_company_found = true;
          dd_successful_search = true;
        }
        else {
          dd_company_found = false;
        }

        if (dd_successful_search && !dd_company_found) {
          dd_successful_search = false;
          //reset initialiation 
          handle360MatchProInit();
        }
      }
    });
    observer.observe(element, {
      attributes: true
    });
  }
  //pass an element to the function to start tracking
  //trackChange( $('input[name="doublethedonation_entered_text"]')[0] );
  trackChange( $('input[name="doublethedonation_company_id"]')[0] );

}
