var assert = require('chai').assert;
var RadixConverter = require('../radix_converter.js');

describe('RadixConverter', () => {
    describe('#anyToDecStr()', () => {
        it('should work', () => {
            var number = '1010';
            let result = (new RadixConverter).anyToDecStr(number, 2);
            assert.equal('10', result);
        });

        it('should work', () => {
            var number = 'A5';
            let result = (new RadixConverter).anyToDecStr(number, 16);
            assert.equal('165', result);
        });

        it('should crash', () => {
            var number = 'A5';
            var errorFunc = () => {
                let result = (new RadixConverter).anyToDecStr(number, 2);
            };
            assert.throws(errorFunc, Error);
        });
    });

    describe('#decToAnyStr()', () => {
        it('should work', () => {
            var number = '18';
            let result = (new RadixConverter).decToAnyStr(number, 16);
            assert.equal('12', result);
        });

        it('should work', () => {
            var number = '5';
            let result = (new RadixConverter).decToAnyStr(number, 2);
            assert.equal('101', result);
        });

        it('should crash', () => {
            var number = 'A5';
            var errorFunc = () => {
                let result = (new RadixConverter).decToAnyStr(number, 2);
            };
            assert.throws(errorFunc, Error);
        });
    });

    describe('#anyToAny()', () => {
        it('should work', () => {
            let result = (new RadixConverter).anyToAny('1010', 2, 16);
            assert.equal('A', result);
        });
    });
});