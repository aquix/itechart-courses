(function () {
    let getArray = function() {
        let data = document.getElementById('array-input').value;
        return data.split(' ').map(parseFloat);
    };

    let processArray = function(func) {
        return function() {
            let arr = getArray();
            let result = func(arr);
            document.getElementById('result').innerHTML = `Result: ${result}`;
        };
    };

    // Bind listeners
    document.getElementById('subsum-btn').onclick = processArray(ArrayTools.getMaxSubSum2);
    document.getElementById('min-btn').onclick = processArray(ArrayTools.findMin);
    document.getElementById('max-btn').onclick = processArray(ArrayTools.findMax);
    document.getElementById('median-btn').onclick = processArray(ArrayTools.findMedian);
})();