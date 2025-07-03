/*
 * customizations.js
 * HSUS Engaging Networks Forms - Enya
 * Created: Winter 2021
 * Purpose: Special functions needed for certain survey and HumanePro pages.
 */

export function init() {
  formatSurveyQuestions();
  changeEmailAndPhoneTypes();
  markGeneralThanksPage();
  customizeHumanePro();
}

// Add a div around Questions in Surveys to add margins.
function formatSurveyQuestions() {
  const x = document.querySelectorAll(
    ".en__component--svblock  .en__field__label--positionabove"
  );

  for (let i = 0; i < x.length; i++) {
    const str = window
      .getComputedStyle(x[i], ":after")
      .getPropertyValue("content");

    if (str === '"*"') {
      x[i].innerHTML =
        '<div class="en_format">' + x[i].innerHTML + "*" + "</div>";
    } else {
      x[i].innerHTML = '<div class="en_format">' + x[i].innerHTML + "</div>";
    }
  }
}

// Make sure email and phone are the correct types.
function changeEmailAndPhoneTypes() {
  const ea = document.getElementById("en__field_supporter_emailAddress");
  const pn = document.getElementById("en__field_supporter_phoneNumber2");

  if (ea != null) {
    ea.type = "email";
  }
  if (pn != null) {
    pn.type = "tel";
  }
}

// If we're on the general thanks page, which appears as page 2 for many
// surveys, add a class to the body tag. That class will customize the thanks
// page styling.
function markGeneralThanksPage() {
  const div = document.querySelector(".advo-main");
  if (div) {
    const ele = document.getElementsByClassName("enya");
    for (let a = 0; a < ele.length; a++) {
      ele[a].classList.add("en__generalthankyou");
    }
  }
}

// Add header and footer to HumanePro iframe signup form thank you
// page. Also adds other customizations.
function customizeHumanePro() {
  const p2 = document.querySelectorAll(".hposignupform");
  if (
    typeof window.pageJson?.pageNumber !== "undefined" &&
    window.pageJson.pageNumber === 2
  ) {
    if (p2.length > 0) {
      document.querySelectorAll("html").forEach((efn) => {
        efn.style.overflowX = "hidden";
      });
      document.querySelectorAll("#page-header").forEach((efn) => {
        efn.style.display = "block";
      });
      document.querySelectorAll("#page-footer").forEach((efn) => {
        efn.style.display = "block";
      });
    }
  }
  if (p2.length > 0) {
    const tf = document.getElementById("en__field_supporter_emailAddress");
    tf.placeholder = "Your email address";
  }
}
