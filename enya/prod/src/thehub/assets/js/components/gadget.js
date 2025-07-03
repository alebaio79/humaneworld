import * as utils from "utils/utilities";

export function init() {
  addClasses();
  initGadgets();
  initImpactGadget();
}

const addClasses = () => {
  document.querySelectorAll('.en__component--hubgadget').forEach(el => {
    el.parentElement.parentElement.classList.add('hubgadget-row');
    el.parentElement.classList.add('hubgadget-column');
  });
};

const initGadgets = () => {
  const handleGadgetClick = (e) => {
    // Wait for overlays to load before cutomizing
    setTimeout(() => {
      const overlay = document.querySelector('.en__hubOverlay__content');
      let submitButton = null;

      if (overlay) {
        submitButton = overlay.querySelector('.en__button--submit');
        if (submitButton) {
          overlay.querySelector('.en__button--submit').addEventListener('click', e => {
            overlay.classList.add('confirmation');
          });
        }
      }
    }, 500);
  };

  document.querySelectorAll('.en__component--hubgadget').forEach(el => {
    el.addEventListener('click', handleGadgetClick);
  });
};

const initImpactGadget = () => {
  const impactGadget = document.querySelector('.en__component--hubgadget[data-componenttype="IMPACT"]');
  let actions = null;
  let impactOverlay = null;

  // Handle clicks on the impact gadget
  const handleImpactGadgetClick = () => {
    const handleBackButtonClick = (e) => {
      if (actions) {
        actions.forEach(el => {
          el.parentElement.classList.remove('active');
        });
        impactOverlay.classList.remove('show-back');
      }
    };

    // Add a back button as per design
    const addBackButton = () => {
      const backButton = document.createElement('a');
      const closeButton = document.querySelector('.en__hubOverlay__header a');

      if (closeButton) {
        backButton.classList.add('button-link');
        backButton.setAttribute('href', '#');
        backButton.textContent = 'Back';
        backButton.addEventListener('click', handleBackButtonClick);
        closeButton.insertAdjacentElement('beforebegin', backButton);
        // The back button behavior is same as close button for this gadget
        closeButton.addEventListener('click', handleBackButtonClick)
      }
    };

    // Handle clicks on an action item
    const handleActionClick = (e) => {
      e.target.parentElement.classList.add('active');
      impactOverlay.classList.add('show-back');
    };

    // Customize the impact overlay
    const initActions = () => {
      if (document.querySelector('.en__myImpact__hubCopyEmpty')) {
        // No actions found
        impactOverlay.classList.add('no-actions');
      } else {
        // Found actions
        actions = document.querySelectorAll('.en__myImpact__hubCopy > span');

        actions.forEach(el => {
          el.addEventListener('click', handleActionClick);
        });
      }
    };

    // Wait for the overlay to load before customizing
    setTimeout(() => {
      impactOverlay = document.querySelector('.en__hubOverlay__impact');
      if (impactOverlay) {
        addBackButton();
        initActions();
      }
    }, 500);
  };

  // Listen for clicks on the impact gadget
  if (impactGadget) {
    impactGadget.addEventListener('click', handleImpactGadgetClick);
    // The overlay may already by open on page reload
    handleImpactGadgetClick();
  }
};