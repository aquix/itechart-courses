(function () {
    window.onload = function () {
        document.getElementById('input').value = generateRandArray(100).join(' ');
    };

    document.getElementById('sort-btn').onclick = function () {
        var sorter = new ArraySorter();
        var array = document.getElementById('input').value.split(' ').map(function (elem) {
            return parseInt(elem);
        });

        var sortMethod;
        switch (document.getElementById('sort-type').value) {
            case 'bubble':
                sortMethod = sorter.bubbleSort;
                break;
            case 'quick':
                sortMethod = sorter.quickSort;
                break;
            case 'merge':
                sortMethod = sorter.mergeSort;
                break;
            case 'heap':
                sortMethod = sorter.heapSort;
                break;
            default:
                sortMethod = sorter.quickSort;
        }

        // Time profiling
        var startTime = window.performance.now()
        var result = sortMethod(array);
        var workTime = window.performance.now() - startTime;

        document.getElementById('result').innerHTML = 'Result: ' + result + '\nTime: ' + workTime + 'ms';
        console.log(workTime);
    };

    function generateRandArray(count) {
        var result = [];
        for (var i = 0; i < count; i++) {
            result.push(Math.floor(Math.random() * 1000));
        }

        return result;
    }
}());