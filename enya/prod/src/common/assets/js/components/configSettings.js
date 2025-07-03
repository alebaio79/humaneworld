/*
* config.js
* Enya Configuration Manager
* Created: Winter 2021
* Purpose: A central location for configuring some of Enya's core behaviors.
    The stateManager reads these values and merges them with passed-in overrides.
*/

// Enya configuration settings go here. These settings apply to all Enya forms.
// They can be overridden by setting a value in a code block on a form.
const config = {
  enableMonthlyModal: true,
  // Don't show monthly modal if user has chosen a one-time gift of this amount
  // or more.
  monthlyModalCutoffAmount: 400,
  // Amount to show in monthly modal by default, or if calculations fail.
  monthlyModalDefaultAmount: "19.00"
};

// We don't want anyone changing our config values outside of this module.
// So let's freeze it before exporting.
// eslint-disable-next-line no-unused-vars
Object.freeze(config);

export default config;
