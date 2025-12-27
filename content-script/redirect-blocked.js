// get the extension's id
const extensionId = chrome.runtime.id;
const blockedPageUrl = `chrome-extension://${extensionId}/templates/blocked-page.html`;

// current url
let url = window.location.href.toLowerCase();

// check if the current page is blocked
isPageBlocked(url).then(async pageBlocked => {
    // if so, redirect to the blocked page
    if (pageBlocked) {
        
        //increase blocked counter
        let blockedCounter = await getKey("blocked_access_prevented_count");
        blockedCounter ? blockedCounter : blockedCounter = 0;
        await setKey("blocked_access_prevented_count", blockedCounter + 1);
        window.location.href = blockedPageUrl;
    }
});

/**
 * @description Helper function that checks if the given url is among the list of blocked websites
 * @param {string} url: url to be checked
 * @returns {boolean}: whether the page is blocked or not 
 */
async function isPageBlocked(url) {
    // Get lists of blocked urls
    let fullPathBlockedSites = await getKey("full_path_blocked_sites");
    let startsWithPathBlockedSites = await getKey("starts_with_blocked_sites");
    let endsWithPathBlockedSites = await getKey("ends_with_blocked_sites");
    let containsPathBlockedSites = await getKey("contains_blocked_sites");

    //1. Check if the full url is blocked
    for (element in fullPathBlockedSites) {
        element = element.toLowerCase();
        if (url == fullPathBlockedSites[element] || url == `https://${fullPathBlockedSites[element]}/` || url == `https://www.${fullPathBlockedSites[element]}/` || url == `http://${fullPathBlockedSites[element]}/` || url == `http://www.${fullPathBlockedSites[element]}/`) {
            return true;
        }
    }

    //2. Check if the start of the url is blocked
    for (element in startsWithPathBlockedSites) {
        element = element.toLowerCase();
        if (url.startsWith(startsWithPathBlockedSites[element]) || url.startsWith(`https://${startsWithPathBlockedSites[element]}`) || url.startsWith(`https://www.${startsWithPathBlockedSites[element]}`) || url.startsWith(`http://${startsWithPathBlockedSites[element]}`) || url.startsWith(`http://www.${startsWithPathBlockedSites[element]}`)) {
            return true;
        }
    }


    //3. Check if the end of the url is blocked
    for (element in endsWithPathBlockedSites) {
        element = element.toLowerCase();
        if (url.endsWith(endsWithPathBlockedSites[element]) || url.endsWith(`${endsWithPathBlockedSites[element]}/`)){
            return true;
     }
    }

    //4. Check if some of the url's content is blocked
    for (element in containsPathBlockedSites) {
        element = element.toLowerCase();
        if (url.includes(containsPathBlockedSites[element])) {
        return true; 
    }
     }

     return false;
}

// copied and pasted functions from storage-helper.js
// This was needed to be done because content scripts did not allow ES Module imports
async function getKey(key) {
    // Tries to get a given key
    try {
        let object = await chrome.storage.local.get(key);
        // Extract the object value from the found key
        object = object[key]
        return object;
    }
    // If the key is not valid, return false
    catch (e) {
       return false;
    }
}

async function setKey(key, value) {
    // Set key and value to local storage
    await chrome.storage.local.set({    
        [key] : value })
    return true;
}