function RadixConverter() {
    var digits = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];

    this.anyToDec = function (number, radix) {
        if (radix === undefined) {
            radix = 2;
        }

        var result = 0,
            i,
            decValue;

        for (i = 0; i < number.length; i++) {
            decValue = digits.indexOf(number[i]);
            if (decValue === -1 || decValue >= radix) {
                throw new TypeError(number.reverse().join('') + ' isn\'t number in ' + radix + '-radix');
            }

            result += decValue * Math.pow(radix, i);
        }

        return result;
    };

    this.decToAny = function (number, radix) {
        debugger
        var result = [],
            decNumber = parseInt(number.reverse().join(''));

        if (isNaN(decNumber)) {
            throw new TypeError(number.reverse().join('') + ' isn\'t 10-radix number');
        }

        while (true) {
            result.push(decNumber % radix);

            if (Math.floor(decNumber / radix) === 0) {
                break;
            }

            decNumber = Math.floor(decNumber / radix);
        }

        return result.reverse().join('');
    }
}

module.exports = RadixConverter;