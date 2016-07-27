function map(array, callback) {
    let result = [];

    for(let item of array) {
        result.push(callback(item));
    }

    return result;
}

module.exports = map;
