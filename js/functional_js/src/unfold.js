function unfold(callback, initialValue) {
    let sequence = [];
    let nextElement;
    let stateValue = initialValue;

    while (true) {
        [nextElement, stateValue] = callback(stateValue);
        if (stateValue) {
            sequence.push(nextElement);
        } else {
            break;
        }
    }

    return sequence;
}

module.exports = unfold;
