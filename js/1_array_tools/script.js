(function () {
    let getArray = function() {
        let data = document.getElementById('array-input').value;
        let result = data.split(' ').map(parseFloat);

        if (result.some(isNaN)) {
            throw new TypeError('Incorrect array. Enter float numbers through space');
        }

        return result;
    };

    let processArray = function(func) {
        return function() {
            let result;

            try {
                let arr = getArray();
                result = func(arr);
            } catch (e) {
                result = e.message;
            }

            document.getElementById('result').innerHTML = `Result: ${result}`;
        };
    };

    // Bind listeners
    document.getElementById('subsum-btn').onclick = processArray(ArrayTools.getMaxSubSum2);
    document.getElementById('min-btn').onclick = processArray(ArrayTools.findMin);
    document.getElementById('max-btn').onclick = processArray(ArrayTools.findMax);
    document.getElementById('median-btn').onclick = processArray(ArrayTools.findMedian);
})();