(function () {
    'use strict';
    var calculator = new Calculator();
    document.getElementById('calc-btn').onclick = function () {
        var expression = document.getElementById('input-text').value;
        var result;
        var log;
        var logItems;

        if (expression.trim() === '') {
            return;
        }

        try {
            result = calculator.calcString(expression);
        } catch  (e) {
            result = e.message;
        }

        document.querySelector('.result').innerHTML = 'Result: ' + result.result;
        log = document.querySelector('.operations-log');
        logItems = buildlLog(result.operations);
        for (var i = 0; i < logItems.length; i++) {
            log.appendChild(logItems[i]);
        }
    };

    function buildlLog(operations) {
        var logItems = [];
        var logItem;

        for (var i = 0; i < operations.length; i++) {
            logItem = document.createElement('li');
            if (operations[i].cached) {
                logItem.classList.add('cached');
            }
            logItem.innerHTML = operations[i].expression + ' = ' + operations[i].result;
            logItems.push(logItem);
        }

        return logItems;
    }
}());