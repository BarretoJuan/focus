import {
  commaSeparatedStrToArr,
  arrToCommaSeparatedStr,
} from "./str-helper.js";
import { getKey, setKey, Variables, clearKey } from "./storage-helper.js";

/**
 * @description: Helper function that receives a variable and a text area to update the placeholder and value of said element
 * @param {*} variable: Value to be set to the text area
 * @param {*} textArea: text area element to be updated
 */
export async function setTextAreaValue(variable, textArea) {
  if (variable) {
    let string = arrToCommaSeparatedStr(variable);
    textArea.value = string;
  }
}

/**
 * @description: Helper function that receives a button element, and updates a value in the local storage with the contents of a given text area
 * @param {*} button: button to which listen for a click event
 * @param {*} variable: key to be set to the local storage
 * @param {*} textArea: text area from which the value to set in the local storage will be obtained
 */
export async function buttonSubmit(button, variable, textArea) {
  button.addEventListener("click", async function () {
    // clear key if the text area is empty
    if (!textArea?.value || textArea.value == "") {
      await clearKey(variable);
      return;
    }

    // else, update the local storage value
    await setKey(variable, commaSeparatedStrToArr(textArea.value));
  });
}

/**
 * @description: Function that returns the number of sites blocked, getting the information from the local storage
 * @returns {int} pathCount: number of sites blocked
 */
export async function getBlockedSitesCount() {
  // get the length of each variable from the local storage
  let fullPathCount = (await getKey(Variables.FULL_PATH_BLOCKED_SITES))?.length;
  let startsWithCount = (await getKey(Variables.STARTS_WITH_BLOCKED_SITES))
    ?.length;
  let endsWithCount = (await getKey(Variables.ENDS_WITH_BLOCKED_SITES))?.length;
  let containsCount = (await getKey(Variables.CONTAINS_BLOCKED_SITES))?.length;

  // null check
  if (!fullPathCount) fullPathCount = 0;
  if (!startsWithCount) startsWithCount = 0;
  if (!endsWithCount) endsWithCount = 0;
  if (!containsCount) containsCount = 0;

  return fullPathCount + startsWithCount + endsWithCount + containsCount;
}
