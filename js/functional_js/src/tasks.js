var filter = require('filter');
var fold = require('fold');

let array = [1, 2, 3, 4, 5, 6];

// Find average of even numbers in array
let average = fold(filter(array, x => x % 2 === 0), (sum, val, i, array) => sum + val / array.length, 0);
console.log(average);

// Sum of random numbers
// Don't know

// Find first element that mathces predicate
let first = (array, predicate) => {
    return fold(filter(array, predicate), result => result);
};

let firstDivByThree = first(array, n => n % 3 === 0);
console.log(firstDivByThree);

