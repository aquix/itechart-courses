var assert = require('chai').assert;
var filter = require('../src/filter');

function isEven(number) {
    return number % 2 === 0;
}

describe('#filter()', function() {
    let array = [1, 2, 3, 4, 5];

    it('should filter even numbers', function() {
        let result = filter(array, isEven);
        assert.equal(JSON.stringify([2, 4]), JSON.stringify(result));
    });
});
