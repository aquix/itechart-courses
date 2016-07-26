/**
 * Fold array to one value applying callback
 * @param {array} array
 * @param {function(result any, any, number, number[])} callback - Callback to run
 * @param {number} initialValues
 */
function fold(array, callback, initialValue) {
    let i = 0;
    let result = initialValue;

    if (initialValue === undefined) {
        i = 1;
        result = array[0];
    }

    for (; i < array.length; i++) {
        result = callback(result, array[i], i, array);
    }

    return result;
}

module.exports = fold;
