function filter(array, predicate) {
    let result = [];
    for(let item of array) {
        if (predicate(item)) {
            result.push(item);
        }
    }

    return result;
}

module.exports = filter;
