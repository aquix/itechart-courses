(function () {
    document.getElementById('sort-btn').onclick = function () {
        var sorter = new ArraySorter();
        var array = document.getElementById('input').value.split(' ').map(function (elem) {
            return parseInt(elem);
        });

        sorter.quickSort(array);
        document.getElementById('result').innerHTML = 'Result: ' + array;
    };
}());