import { getKey, Variables } from "./storage-helper.js";

// get custom variables
let customText = await getKey(Variables.BLOCK_PAGE_CUSTOM_TEXT);
let customImg = await getKey(Variables.BLOCK_PAGE_CUSTOM_IMG_URL);

// set custom variables if they exist
if (customText) {
  document.getElementById("block-txt").innerHTML = customText;
}

if (customImg && customImg[0] != "") {
  document.getElementById("block-img").src = customImg;
}
