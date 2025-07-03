/*
 * advocacyForm.js
 * HSUS Hub - Enya 2021
 * Enya Hub Controller
 * Author: Deron Hurst (deron@zurigroup.com)
 * Created: Winter 2021
 * Purpose: Main controller for the Hub as a whole.
 */

import * as bodyClasses from "./bodyClasses";
import * as background from "./background";
import * as hero from "./hero";
import * as login from "./login";
import * as gadget from "./gadget";
import * as tracking from "commonComponents/tracking";
import * as fieldHelpers from "commonHelpers/fieldHelpers";
import * as pageHelpers from "commonHelpers/pageHelpers";
import * as autologin from "commonComponents/autologin";
//import { LoaderOptionsPlugin } from "webpack";

export function init() {
  // Add body classes
  bodyClasses.init();

  // Add current page as a class to the body
  pageHelpers.addPageClass();

  // Set background image if on login or logout page
  background.init();

  // Set hero image if in Hub
  hero.init();

  // Customize the login page
  login.init();

  // Customize the gadget page
  gadget.init();

  // Initialize tracking id and redirect 
  tracking.init();

  // add input mask to phone field
  fieldHelpers.smartenPhoneField("en__field_supporter_phoneNumber2");

  // handle sms hash auto-fill
  autologin.init();

}