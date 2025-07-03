$(document).ready(function () {

  // Need to add IDs and Labels to radio button elements to use the fancy button CSS

  function change_gift_boxes() {
    if (!$("#first-gift-radio").length) {
      $("div.en__pg__select input").first().attr("id", "first-gift-radio");
      var label1 = $("<label>").attr("for", "first-gift-radio");
      $("div.en__pg__select input").first().after(label1);
    }
    if (!$("#last-gift-radio").length) {
      $("div.en__pg__select input").last().attr("id", "last-gift-radio");
      var label2 = $("<label>").attr("for", "last-gift-radio");
      $("div.en__pg__select input").last().after(label2);
    }

  }

  $("body").on('DOMSubtreeModified', ".en__component--premiumgiftblock .en__pg__optionType", function () {
    console.log('change');
    setTimeout(change_gift_boxes, 200);
    //setTimeout(change_gift_boxes, 200);
  });

  $("body").on('DOMSubtreeModified', ".en__component--premiumgiftblock .en__pgList", function () {
    console.log('change');
    setTimeout(change_gift_boxes, 200);
    //setTimeout(change_gift_boxes, 200);
  });


});