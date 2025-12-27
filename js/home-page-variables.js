import { getKey, Variables } from "./storage-helper.js";
import {
  buttonSubmit,
  getBlockedSitesCount,
  setTextAreaValue,
} from "./form-helper.js";

// // 1. SET VARIABLES TO THE STATISTICS BLOCK
// Variables to be used
let blockedSitesCount = (await getBlockedSitesCount()) || 0;
let preventedAccessCount =
  (await getKey(Variables.BLOCKED_ACCESS_PREVENTED_COUNT)) || 0;

addEventListener("DOMContentLoaded", (event) => {});

// Get paragraphs
let blockedSitesCountP = document.getElementById("blocked-sites-count");
let preventedAccessCountP = document.getElementById("prevented-access-count");

// Modify the paragraph's inner HTML
blockedSitesCountP.innerHTML = `Blocking ${blockedSitesCount} websites`;
preventedAccessCountP.innerHTML = `Preventing you from entering blocked websites ${preventedAccessCount} times`;

// // 2. SET VARIABLES TO THE BLOCKED SITES TEXT AREAS
// get blocked sites lists
let fullPathBlockedSites = await getKey(Variables.FULL_PATH_BLOCKED_SITES);
let startsWithPathBlockedSites = await getKey(
  Variables.STARTS_WITH_BLOCKED_SITES
);
let endsWithPathBlockedSites = await getKey(Variables.ENDS_WITH_BLOCKED_SITES);
let containsPathBlockedSites = await getKey(Variables.CONTAINS_BLOCKED_SITES);

// get custom variables
let customTextVar = await getKey(Variables.BLOCK_PAGE_CUSTOM_TEXT);
let customImgVar = await getKey(Variables.BLOCK_PAGE_CUSTOM_IMG_URL);

// get textareas
let fullPathTextArea = document.getElementById("full-path-blocked-sites");
let startsWithTextArea = document.getElementById("starts-with-blocked-sites");
let endsWithTextArea = document.getElementById("ends-with-blocked-sites");
let containsTextArea = document.getElementById("contains-blocked-sites");
let customTextTextArea = document.getElementById("custom-txt");
let customImgTextArea = document.getElementById("custom-img");

// populate the text areas with the local storage if they exist
setTextAreaValue(fullPathBlockedSites, fullPathTextArea);
setTextAreaValue(startsWithPathBlockedSites, startsWithTextArea);
setTextAreaValue(endsWithPathBlockedSites, endsWithTextArea);
setTextAreaValue(containsPathBlockedSites, containsTextArea);
setTextAreaValue(customTextVar, customTextTextArea);
setTextAreaValue(customImgVar, customImgTextArea);

// // 3. SET THE CONTENT OF EACH TEXT AREA TO THE LOCAL STORAGE
// get buttons
let fullPathButton = document.getElementById("full-path-button");
let startsWithButton = document.getElementById("starts-with-button");
let endsWithButton = document.getElementById("ends-with-button");
let containsButton = document.getElementById("contains-button");
let customButton = document.getElementById("custom-button");

// update local storage upon submitting text areas
buttonSubmit(
  fullPathButton,
  Variables.FULL_PATH_BLOCKED_SITES,
  fullPathTextArea
);
buttonSubmit(
  startsWithButton,
  Variables.STARTS_WITH_BLOCKED_SITES,
  startsWithTextArea
);
buttonSubmit(
  endsWithButton,
  Variables.ENDS_WITH_BLOCKED_SITES,
  endsWithTextArea
);
buttonSubmit(
  containsButton,
  Variables.CONTAINS_BLOCKED_SITES,
  containsTextArea
);
buttonSubmit(
  customButton,
  Variables.BLOCK_PAGE_CUSTOM_IMG_URL,
  customImgTextArea
);
buttonSubmit(
  customButton,
  Variables.BLOCK_PAGE_CUSTOM_TEXT,
  customTextTextArea
);
