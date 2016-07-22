var assert = require('chai').assert;
var RadixConverter = require('../radix_converter.js');

describe('RadixConverter', () => {
    describe('#anyToDec()', () => {
        it('should work', () => {
            var number = '1010'.split('').reverse();
            let result = (new RadixConverter).anyToDec(number, 2);
            assert.equal(10, result);
        });

        it('should work', () => {
            var number = 'A5'.split('').reverse();
            let result = (new RadixConverter).anyToDec(number, 16);
            assert.equal(165, result);
        });

        it('should crash', () => {
            var number = 'A5'.split('').reverse();
            var errorFunc = () => {
                let result = (new RadixConverter).anyToDec(number, 2);
            };
            assert.throws(errorFunc, Error);
        });
    });
});