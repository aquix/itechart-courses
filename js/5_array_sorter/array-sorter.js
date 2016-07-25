function ArraySorter() {
    var self = this;

    this.bubbleSort = function (array) {
        var result = array.slice();

        for (var i = 0; i < result.length - 1; i++) {
            for (var j = result.length - 1; j > i; j--) {
                if (result[j - 1] > result[j]) {
                    _swap(result, j, j - 1);
                }
            }
        }

        return result;
    };

    this.quickSort = function (array) {
        var result = array.slice();
        _qSort(result, 0, result.length - 1);
        return result;
    };

    function _qSort(array, left, right) {
        if (left >= right) {
            return;
        }

        var medium = array[Math.floor((left + right) / 2)],
            i = 0,
            j = right;

        while (i <= j) {
            while (array[i] < medium) {
                i++;
            }

            while (array[j] > medium) {
                j--;
            }

            if (i <= j) {
                _swap(array, i, j);
                i++;
                j--;
            }
        }

        if (j > left) {
            _qSort(array, left, j);
        }

        if (i < right) {
            _qSort(array, i, right);
        }
    }

    this.mergeSort = function (array) {
        if (array.length <= 1) {
            return array;
        }

        var medium = Math.ceil(array.length / 2);
        var arrLeft = this.mergeSort(array.slice(0, medium));
        var arrRight = this.mergeSort(array.slice(medium, array.length));

        return _merge(arrLeft, arrRight);
    };

    function _merge(arrLeft, arrRight) {
        var i = 0;
        var j = 0;
        var result = [];

        while (i < arrLeft.length && j < arrRight.length) {
            if (arrLeft[i] < arrRight[j]) {
                result.push(arrLeft[i]);
                i++;
            } else {
                result.push(arrRight[j]);
                j++;
            }
        }

        while (i < arrLeft.length) {
            result.push(arrLeft[i]);
            i++;
        }

        while (j < arrRight.length) {
            result.push(arrRight[j]);
            j++;
        }

        return result;
    }

    this.heapSort = function (array) {
        var result = array.slice();
        var i;
        var heapSize = result.length;

        // Build heap
        for (i = Math.floor(result.length / 2); i >= 0; i--) {
            _siftDown(result, i, result.length);
        }

        for (i = 0; i < result.length - 1; i++) {
            _swap(result, 0, heapSize - 1);
            heapSize--;
            _siftDown(result, 0, heapSize);
        }

        return result;
    };

    function _siftDown(array, i, heapSize) {
        var left;
        var right;
        var min;

        while (2 * i + 1 < heapSize) {
            left = 2 * i + 1;
            right = 2 * i + 2;
            min = left;

            if (right < heapSize && array[right] > array[left]) {
                min = right;
            }

            if (array[i] >= array[min]) {
                break;
            } else {
                _swap(array, i, min);
                i = min;
            }
        }
    }

    function _swap(array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}