function RadixConverter() {
    var MIN_RADIX = 2;
    var MAX_RADIX = 36;

    var digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var self = this;

    var checkRadix = function (radix) {
        if (radix === undefined || radix < MIN_RADIX || radix > MAX_RADIX) {
            throw new Error('Incorrect radix: ' + radix);
        }
    };

    this.anyToDec = function (number, radix) {
        var result = 0;
        var i;
        var decValue;

        checkRadix(radix);

        for (i = 0; i < number.length; i++) {
            decValue = digits.indexOf(number[i].toUpperCase());
            if (decValue === -1 || decValue >= radix) {
                throw new TypeError(number.reverse().join('') + ' isn\'t number in ' + radix + '-radix');
            }

            result += decValue * Math.pow(radix, i);
        }

        return result.toString().split('').reverse();
    };

    this.anyToDecStr = function (number, radix) {
        var result = self.anyToDec(number.split('').reverse(), radix);
        return result.reverse().join('');
    };

    this.decToAny = function (number, radix) {
        var result = [];
        var decNumber = parseInt(number.reverse().join(''));

        checkRadix(radix);

        if (isNaN(decNumber)) {
            throw new TypeError(number.reverse().join('') + ' isn\'t 10-radix number');
        }

        while (true) {
            result.push(digits[decNumber % radix]);

            if (Math.floor(decNumber / radix) === 0) {
                break;
            }

            decNumber = Math.floor(decNumber / radix);
        }

        return result;
    };

    this.decToAnyStr = function (number, radix) {
        var result = self.decToAny(number.split('').reverse(), radix);
        return result.reverse().join('');
    };

    this.anyToAny = function (numberStr, radixFrom, radixTo) {
        var number = numberStr.split('').reverse();
        var decNumber = self.anyToDec(number, radixFrom);
        return self.decToAny(decNumber, radixTo).reverse().join('');
    };
}

// module.exports = RadixConverter;
