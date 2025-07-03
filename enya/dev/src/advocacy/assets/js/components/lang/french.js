/*
* french.js
* HSUS Engaging Networks Forms - Enya 2022
* Created: Fall 2022
* Purpose: Modify text on page for French locale.
*/

export function init() {
  console.log("This page is French.");
  translateFooter();
}

function translateFooter() {
  // Get handles to each footer element and change the text.
  const homeLink = document.querySelector(".footer-link-home");
  const privacyLink = document.querySelector(".footer-link-privacy");
  const contactLink = document.querySelector(".footer-link-contact");

  if (homeLink) {
    homeLink.textContent = "Accueil";
  }

  if (privacyLink) {
    privacyLink.textContent = "Politique sur la Vie Privée";
  }

  // Even though the text is the same in French, let's change, for completeness.
  if (contactLink) {
    contactLink.textContent = "Contact";
  }
}
