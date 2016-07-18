class ArrayTools {
    static getMaxSubSum2(arr=[]) {
        if (arr.length === 0) {
            return 0;
        }

        let max_subsum = arr[0];
        for (let i = 0; i < arr.length; i++) {
            let current_sum = 0;
            for (let j = i; j < arr.length; j++) {
                current_sum += arr[j];
                if (current_sum > max_subsum) {
                    max_subsum = current_sum;
                }
            }
        }

        return max_subsum;
    }

    static getMaxSubSum(arr=[]) {
        if (arr.length === 0) {
            return 0;
        }

        let max_subsum = arr[0];

        // TODO O(n) subsum
    }

    static findMin(arr=[]) {
        if (arr.length === 0) {
            return;
        }

        let min = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
        }

        return min;
    }

    static findMax(arr=[]) {
        if (arr.length === 0) {
            return;
        }

        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }

        return max;
    }

    static findMedian(arr=[]) {
        if (arr.length === 0) {
            return;
        }

        if (arr.length % 2 !== 0) {
            return arr[(arr.length - 1) / 2];
        } else {
            let medianIndex = Math.floor(arr.length / 2);
            return (arr[medianIndex] + arr[medianIndex - 1]) / 2;
        }
    }
}

// module.exports = ArrayTools;