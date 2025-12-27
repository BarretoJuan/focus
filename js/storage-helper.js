export const Variables =  {
    
    // Number of times access to a blocked site has been prevented
    BLOCKED_ACCESS_PREVENTED_COUNT: "blocked_access_prevented_count",

    // Lists of blocked sites
    FULL_PATH_BLOCKED_SITES: "full_path_blocked_sites",
    STARTS_WITH_BLOCKED_SITES: "starts_with_blocked_sites",
    ENDS_WITH_BLOCKED_SITES: "ends_with_blocked_sites",
    CONTAINS_BLOCKED_SITES: "contains_blocked_sites",

    // Customizable variables
    BLOCK_PAGE_CUSTOM_TEXT: "block_page_custom_text",
    BLOCK_PAGE_CUSTOM_IMG_URL: "block_page_custom_img_url"
}

/** 
   @description Helper function to safely obtain a local storage key the objective of this is to return a falsey value if the key does not exist Enabling the possibility of set fallback values with ternary operators
   @param {string} key: Local storage key to find
   @returns {Object|false} the value of the key found, or false in case of non existence 
*/
export async function getKey(key) {
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

/** 
   @description Helper function to set a given storage key 
   @param {string} key: Local storage key to set 
   @param {string} value: Local storage value to set 
   @returns {void}
*/
export async function setKey(key, value) {
    // Set key and value to local storage
    await chrome.storage.local.set({    
        [key] : value })
    return true;
}

/** 
   @description Helper function to clear a given storage key 
   @param {string} key: Local storage key to clear 
   @returns {void}
*/
export async function clearKey(key) {
    await chrome.storage.local.remove(key);
    return true
}

/** 
   @description Helper function to get all keys and values
   @returns {Object[]}: List of objects with their corresponding keys and values
*/
export async function getAllKeys() {

    // Get all keys
    let foundKeys = await chrome.storage.local.getKeys();

    // Map each key with its corresponding value
    let output = [];
     await foundKeys.map(async (key) => {
        output.push({[key]: (await getKey([key]))});
    });
    return output;
}

