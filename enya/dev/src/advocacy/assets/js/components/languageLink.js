/*
* languageLink.js
* HSUS Engaging Networks Forms - Enya 2022
* Created: Fall 2022
* Purpose: Manage the language link in the header on advos.
*/

let languageLink;

export function init() {
  languageLink = document.querySelector("body.enya-hsi .language-link");
  const pageContent = document.querySelector("#page-content");
  if (languageLink && pageContent) {
    languageLink.classList.remove("hidden-except-pb");
    pageContent.prepend(languageLink);
  }
}
