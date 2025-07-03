document.addEventListener('DOMContentLoaded', function () {
    const fixedElement = document.querySelector('.form_fixed_right');
    const initialTop = 132;
    const threshold = 132;

    // Check if the viewport width is at least 1036px
    const mediaQuery = window.matchMedia('(min-width: 1036px)');

    function handleScroll() {
        const scrollTop = window.scrollY;
        const newTop = Math.max(0, initialTop - scrollTop);
        if (newTop === 0) {
            fixedElement.classList.add('top0');
        } else {
            fixedElement.classList.remove('top0');
        }
        fixedElement.style.top = `${newTop}px`;
    }

    function setupScrollListener() {
        if (mediaQuery.matches) {
            // Add scroll event listener if the condition is met
            window.addEventListener('scroll', handleScroll);
        } else {
            // Reset element position and remove scroll listener if condition is not met
            fixedElement.style.top = '';
            window.removeEventListener('scroll', handleScroll);
        }
    }

    // Set up listener initially
    setupScrollListener();

    // Listen for changes in screen size
    mediaQuery.addEventListener('change', setupScrollListener);

    // Function to monitor and update the display property
    function ensureFlexDisplay(selector) {
        // Select the target elements
        const targets = document.querySelectorAll(selector);

        // Callback function to handle style changes
        const callback = (mutationsList) => {
            mutationsList.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const target = mutation.target;
                    const currentDisplay = getComputedStyle(target).display;

                    if (currentDisplay === 'block') {
                        target.style.display = 'flex';
                        target.style.alignItems = 'center';
                    }
                }
            });
        };

        // Create a MutationObserver
        const observer = new MutationObserver(callback);

        // Observe each target element for style changes
        targets.forEach((target) => {
            observer.observe(target, { attributes: true, attributeFilter: ['style'] });
        });
    }

    // Call the function with the desired selector
    ensureFlexDisplay('div[class*="transaction_donationAmt"]');

});
