function ArraySorter() {
    var self = this;

    this.bubbleSort = function (array) {
        var result = array.slice(),
            temp;

        for (var i = 0; i < result.length - 1; i++) {
            for (var j = result.length - 1; j > i; j--) {
                if (result[j - 1] > result[j]) {
                    swap(result, j, j - 1);
                }
            }
        }

        return result;
    };

    this.quickSort = function (array, left, right) {
        if (left === undefined) {
            left = 0;
        }

        if (right === undefined) {
            right = array.length - 1;
        }

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
                swap(array, i, j);
                i++;
                j--;
            }
        }

        if (j > left) {
            self.quickSort(array, left, j);
        }

        if (i < right) {
            self.quickSort(array, i, right);
        }
    };

    function swap(array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}