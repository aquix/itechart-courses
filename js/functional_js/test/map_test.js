var assert = require('chai').assert;
var map = require('../src/map');

describe('#map()', function() {
    let array = [1, 2, 3];

    it('should mul array by 2', function() {
        let result = map(array, x => x * 2);
        assert.equal(JSON.stringify([2, 4, 6]), JSON.stringify(result));
    });
});
