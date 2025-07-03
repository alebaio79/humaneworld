import * as utils from "utils/utilities";

// export function init() {
// 	initValidation();
// }

// const initValidation = () => {
//   const errorBoxClass = 'error-box';
//   let el;
//   let els;

//   // Is there a processing error?
//   els = utils.getAll('.en__errorHeader, .en__errorList');
//   if (els.length > 0 && !utils.isEmpty(document.querySelector('.en__errorList'))) {
//     utils.wrapAll(els, 'div', errorBoxClass);
//   }
// };

export const validation = () => {
  

  

  
  

// Processing error don't always trigger a reload
const errorList = theForm.querySelector('.en__errorList');
if (errorList) {
  const mutationCallback = (mutationsList, observer) => {
    for (let i = 0; i < mutationsList.length; i++) {
      if (mutationsList[i].addedNodes.length > 0) {
        formatError(mutationsList[i].addedNodes[0]);
        errorList.classList.add(errorBoxClass);
        scrollToEl(errorList);
      } else {
        errorList.classList.remove(errorBoxClass);
      }
    }
  };

  const errorObserver = new MutationObserver(mutationCallback);

  errorObserver.observe(errorList, {
    attributes: false,
    childList: true,
    subtree: false,
  });
}
