
/**
 * @description: Helper function that receives a string of comma separated values and returns an array with those values
 * @param {string} string: string of comma separated values to be converted to an array
 * @returns {array}: array of values from the string 
 */
export function commaSeparatedStrToArr(string) {

    // create an array splitting the string by commas
    let output = string.split(",");

    // trim each element in the array
    for (let element in output) {
        output[element] = output[element].trim();
    }
    return output;
}

/**
 * @description: Helper function that receives an array of elements and returns a string of those elements as comma separated values. 
 * @param {array} array: Array of elements
 * @returns {string}: string of the elements in comma separated values 
 */
export function arrToCommaSeparatedStr(array) {
    let output = "";

    // Iterate the array
    for (let element in array) {

        element = element.trim();
        // Populate the output string
        output += array[element].toString();

        //Add a comma after adding and element if that element is not the last of the array
        if (element != array.length - 1) output += ", ";
    }
    return output;

}