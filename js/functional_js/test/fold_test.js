var assert = require('chai').assert;
var fold = require('../src/fold');


describe('#fold()', function() {
    let array = [1, 2, 4, 5];
    it('should calculate sum of array', function() {
        let sum = fold(array, (a, b) => a + b);
        assert.equal(sum, 12);
    });

    it('should calculate sum of array with initial value', function() {
        let sum = fold(array, (a, b) => a + b, -12);
        assert.equal(sum, 0);
    });
});
