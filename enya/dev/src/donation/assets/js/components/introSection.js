/*
 * introSection.js
 * HSUS Engaging Networks Forms - Enya 2023
 * Created: Spring 2023
 * Purpose: Manage the donation form intro section, which includes the headline,
 * hero image, and intro text.
 */

import state from "commonComponents/stateManager";
import * as pageManager from "commonComponents/pageManager";
import * as pageHelpers from "commonHelpers/pageHelpers";

export function init() {
  initMobileImage();
  initHumaneLeadersTest();
}

function initMobileImage() {
  // If there's no mobile-hero-container, we want to show the full-size hero on
  // mobile too.
  if (getMobileHeroContainer()) {
    // This class will trigger CSS that shows the mobile hero on mobile and
    // hides the full-size hero.
    pageManager.addClassToBody("show-mobile-hero-banner");
    unhideMobileHeroBanner();
  }
  unhideFullSizeHero();
}

// To avoid a flash of content on page load, we had to hide the main hero
// container and the mobile hero container with the utility class
// "hidden-except-pb". That class is hard-coded in the markup. Remove that class
// from the appropriate container when needed.
function unhideMobileHeroBanner() {
  const mobileHeroContainer = getMobileHeroContainer();
  if (!mobileHeroContainer) return;
  mobileHeroContainer.classList.remove("hidden-except-pb");
}

function unhideFullSizeHero() {
  const heroContainer = document.querySelector(".hero-container");
  if (!heroContainer) return;
  heroContainer.classList.remove("hidden-except-pb");
}

function getMobileHeroContainer() {
  return document.querySelector(".mobile-hero-container");
}

// This function controls the A/B test we're running on certain DM forms in
// April 2023. Once that test concludes, we'll need to revise things to
// incorporate the winner.
function initHumaneLeadersTest() {
  if (typeof state.activeURLParams.hl !== "undefined") {
    if (state.activeURLParams.hl === "1") {
      unhideAndMoveHumaneLeadersBlurb();
    }
  }
}

// Show the Humane Leaders blurb and move it into position.
function unhideAndMoveHumaneLeadersBlurb() {
  const introTextBlock = document.querySelector(".intro-text-block");
  if (!introTextBlock) return;
  const humaneLeadersBlock = document.querySelector(".humane-leaders-block");
  if (!humaneLeadersBlock) return;

  // Form ID 82752 is the EMD form. All other forms use the "not-emd" copy.
  if (pageHelpers.getPageId() === 82752) {
    // Unhide the EMD version of the blurb.
    const emdBlurb = humaneLeadersBlock.querySelector(
      ".humane-leaders-blurb-emd"
    );
    if (emdBlurb) {
      // Move the humane leaders block above the final para. But if there's only
      // one paragraph in the intro text, append the humane leaders block to the
      // end of the intro section.
      if (introTextBlock.children.length === 1) {
        introTextBlock.append(humaneLeadersBlock);
      } else {
        introTextBlock.lastElementChild.before(humaneLeadersBlock);
      }
      emdBlurb.classList.remove("hidden-except-pb");
      // Also remove the link from "Leadership support" in the existing intro
      // text.
      const leadershipLink = document.querySelector(".emd-leadership-link");
      if (leadershipLink) {
        leadershipLink.textContent = "Leadership support";
      }
    }
  } else {
    // Unhide the non-EMD version of the blurb.
    const notEmdBlurb = humaneLeadersBlock.querySelector(
      ".humane-leaders-blurb-not-emd"
    );
    if (notEmdBlurb) {
      // Move the humaneLeadersBlock into the introTextBlock, at the bottom.
      introTextBlock.append(humaneLeadersBlock);
      notEmdBlurb.classList.remove("hidden-except-pb");
    }
  }

  // Finally, unhide the entire Humane Leaders block.
  humaneLeadersBlock.classList.remove("hidden-except-pb");
}
