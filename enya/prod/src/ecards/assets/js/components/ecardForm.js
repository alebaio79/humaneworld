/*
 * ecardForm.js
 * HSUS Ecard Forms - Enya 2021
 * Enya Ecard Form Controller
 * Created: Winter 2021
 * Purpose: Main controller for ecard form as a whole.
 */

export const init = () => {
  rearrange();
  datePicker();
  preview();
};

const rearrange = () => {
  const ecardBlock = document.querySelector('.en__component--ecardblock');
  const previewButton = document.querySelector('.en__ecarditems__action');
  const sendDate = document.querySelector('.en__ecardrecipients__futureDelivery');

  // preview button after ecard message
  if (ecardBlock && previewButton && sendDate) {
    ecardBlock.insertBefore(previewButton, sendDate);
  }
};

const datePicker = () => {
  // disallow past dates
  let today = new Date();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  const yyyy = today.getFullYear();

  // add leading zeros if needed
  if (dd < 10) { dd = '0' + dd; }
  if (mm < 10) { mm = '0' + mm; }
  // build date string
  today = yyyy + '-' + mm + '-' + dd;

  document.querySelectorAll('input[type="date"]').forEach(el => {
    el.setAttribute('min', today);
  });
};

const preview = () => {
  const previewIframe = document.querySelector('.en__ecarditems__preview iframe');

  // auto-resize iframe
  if (previewIframe && window.iFrameResize) {
    iFrameResize({
      checkOrigin: false,
      log: false,
      scrolling: true,
      maxHeight: 800
    }, previewIframe);
  }
};
