var assert = require('chai').assert;
var ArrayTools = require('../array_tools');

describe('ArrayTools', () => {
    describe('#getMaxSubSum2()', () => {
        it('should be correct', () => {
            assert.equal(6, ArrayTools.getMaxSubSum2([1, 2, 3]));
            assert.equal(5, ArrayTools.getMaxSubSum2([-1, 2, 3, -9]));
            assert.equal(6, ArrayTools.getMaxSubSum2([2, -1, 2, 3, -9]));
            assert.equal(100, ArrayTools.getMaxSubSum2([100, -9, 2, -3, 5]));
        });
    });
});

// describe('ArrayTools', () => {
//     describe('#getMaxSubSum()', () => {
//         it('should be correct', () => {
//             assert.equal(6, ArrayTools.getMaxSubSum([1, 2, 3]));
//             assert.equal(5,ArrayTools. getMaxSubSum([-1, 2, 3, -9]));
//             assert.equal(6, ArrayTools.getMaxSubSum([2, -1, 2, 3, -9]));
//             assert.equal(100, ArrayTools.getMaxSubSum([100, -9, 2, -3, 5]));
//         });
//     });
// });

describe('ArrayTools', () => {
   describe('#findMin()', () => {
       it('should return min element', () => {
               assert.equal(-40, ArrayTools.findMin([7, -7, 13, 39, 1, -40, 8]));
       });
   });
});

describe('ArrayTools', () => {
    describe('#findMax()', () => {
        it('should return max element', () => {
            assert.equal(39, ArrayTools.findMax([7, -7, 13, 39, 1, -40, 8]));
        });
    });
});

describe('ArrayTools', () => {
    describe('#findMedian()', () => {
        it('should return median element', () => {
            assert.equal(39, ArrayTools.findMedian([7, -7, 13, 39, 1, -40, 8]));
            assert.equal(20, ArrayTools.findMedian([7, -7, 13, 39, 1, -40, 8, 5]));
        });
    });
});