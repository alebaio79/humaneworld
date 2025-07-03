/*
* unused.js
* HSUS Donation Forms - Enya 2021
* Name
* Created: Winter 2021
* Purpose: Holding area for code we aren't using, but may come in handy.
*/

// Insert placeholder option as first element in state dropdown.
// We may not need this at all. Added a blank value at top of select list in EN.
function addPlaceholderToRegionSelect() {
  const stateField = document.querySelector("#en__field_supporter_region");
  if (!stateField) return;
  const newOption = new Option("Select a state", "");
  newOption.setAttribute("selected", "");
  newOption.setAttribute("disabled", "");
  stateField.add(newOption, 0);
}