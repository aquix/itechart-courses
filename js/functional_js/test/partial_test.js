var assert = require('chai').assert;
var partial = require('../src/partial');

let mul = (...args) => {
    let result = 1;
    for(let item of args) {
        result *= item;
    }
    return result;
};

describe('#partial()', function() {
    it('should mul by 2', function() {
        let mul2 = partial(2, mul);
        assert.equal(mul2(10), 20);
        assert.equal(mul2(-80), -160);
    });

    it('should multiply variable count of arguments', function() {
        let mulVar = partial(10, -1, mul);
        assert.equal(mulVar(10), -100);
        assert.equal(mulVar(0), 0);
    });

});