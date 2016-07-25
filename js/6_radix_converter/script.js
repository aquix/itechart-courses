(function () {
    var converter = new RadixConverter();
    document.getElementById('convert-btn').onclick = function () {
        var number = document.getElementById('input').value,
            radixFrom = parseInt(document.getElementById('radix-from').value),
            radixTo = parseInt(document.getElementById('radix-to').value);

        var result;
        
        try {
            result = converter.anyToAny(number, radixFrom, radixTo);
        } catch (e) {
            result = e.message;
        }

        document.getElementById('result').innerHTML = 'Result: ' + result;
    }
}());