/*
* characterCounter.js
* HSUS Engaging Networks Forms - Enya 2021
* Created: Winter 2021
* Purpose: Dynamically update a character count message beneath a text field.
*/

import * as utils from "utils/utilities";

let sourceTextElement;

export function init(textElement, maxCount = 0) {
  if (!textElement) return;
  sourceTextElement = textElement;
  setUpCounter(maxCount);
}

function setUpCounter(maxCount) {
  if (!sourceTextElement) return;

  // Create the counter note, and get a handle to its count span.
  const characterCountNote = getCharacterCountNote();
  const countElement = characterCountNote.querySelector("#character-count");
  if (!countElement) return;

  // Add counter below the text field.
  sourceTextElement.insertAdjacentElement("afterend", characterCountNote);

  // Wrap the field and the note.
  // TODO: Remove this if we really don't need it.
  // utils.wrapAll([sourceTextElement, characterCountNote], "div", "character-count-wrapper");

  // Set the maxlength.
  sourceTextElement.setAttribute("maxLength", maxCount);

  // Add event listeners to update character count.
  ["focus", "keydown", "keyup"].forEach(function(e) {
    sourceTextElement.addEventListener(e, function(element) {
      countChars(element.target, countElement, maxCount);
    });
  });

  // Call countChars on load too.
  countChars(sourceTextElement, countElement, maxCount);
}

function getCharacterCountNote() {
  const characterCountNote = document.createElement("p");
  characterCountNote.classList.add("character-count-note");
  characterCountNote.innerHTML = `
    Characters remaining: <span id="character-count"></span>
  `;
  return characterCountNote;
}

function countChars(textElement, counterElement, maxCount = 0) {
  if (!textElement) return;
  if (!counterElement) return;

  const count = maxCount - textElement.value.length;
  if (count < 0) {
    counterElement.innerHTML = "<span style=\"color: red;\">" + count + "</span>";
  } else {
    counterElement.innerHTML = count;
  }
}
