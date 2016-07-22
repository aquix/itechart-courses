(function () {
    document.getElementById('convert-btn').onclick = function () {
        var number = document.getElementById('input').value,
            radixFrom = parseInt(document.getElementById('radix-from').value),
            radixTo = parseInt(document.getElementById('radix-to').value);

        var result = (new RadixConverter()).anyToAny(number, radixFrom, radixTo);
        document.getElementById('result').innerHTML = 'Result: ' + result;
    }
}());