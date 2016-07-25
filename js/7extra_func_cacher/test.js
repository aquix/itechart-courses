var math = require('mathjs');
var Cacher = require('./scripts/cacher');
var cacher = new Cacher();

var factorial = function(n) {
    var i = n;
    var result = 1;
    while (i > 1) {
        result *= i;
        i--;
    }

    return result;
};

math.

factorial = cacher.wrap(math.factorial);

var bignumber = math.bignumber('1000');
var result = factorial(bignumber);
console.log(result);
