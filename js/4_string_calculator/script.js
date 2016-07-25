(function () {
    'use strict';
    document.getElementById('calc-btn').onclick = function () {
        var expression = document.getElementById('input-text').value;
        var calculator;
        var result;

        if (expression.trim() === '') {
            return;
        }

        calculator = new Calculator();

        try {
            result = calculator.calcString(expression);
        } catch  (e) {
            result = e.message;
        }

        document.getElementById('result').innerHTML = result;
    };

    function Calculator() {
        var operatorsList = ['+', '-', '*', '/', '^'];
        var operands = [];
        var operators = [];
        var priority = {
            '(': 0,
            '+': 1, '-': 1,
            '*': 2, '/': 2, '^': 2
        };

        this.calcString = function(expression) {
            operands = [];
            operators = [];
            var parsedResult, operator, operand1, operand2, lastOperator;


            for (var i = 0; i < expression.length; i++) {
                if (isDelimiter(expression[i])) {
                    continue;
                } else if (expression[i] === '(') {
                    operators.push(expression[i]);
                } else if (expression[i] === ')') {
                    lastOperator = operators.pop();
                    while (lastOperator !== '(') {
                        processOperator(lastOperator);
                        lastOperator = operators.pop();
                    }
                } else if (operatorsList.indexOf(expression[i]) !== -1) {
                    operator = expression[i];

                    while (!canPushOperator(operator)) {
                        lastOperator = operators.pop();
                        processOperator(lastOperator);
                    }

                    operators.push(operator);
                } else if (isDigit(expression[i])) {
                    parsedResult = parseNumber(expression, i);
                    operands.push(parsedResult.result);
                    i = parsedResult.newPos;
                } else {
                    throw Error('Incorrect Expression');
                }
            }

            while (operators.length !== 0) {
                processOperator(operators.pop());
            }

            return operands.pop();
        };

        function processOperator(operator) {
            var b = operands.pop();
            var a = operands.pop();
            var result;
            switch (operator) {
                case '+':
                    result =  a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '*':
                    result =  a * b;
                    break;
                case '/':
                    result = a / b;
                    break;
                case '^':
                    result = Math.pow(a, b);
                    break;
            }

            operands.push(result);
        }

        function canPushOperator(operator) {
            return operators.length === 0 ||
                    priority[operator] >= priority[operators[operators.length - 1]];
        }

        function isDigit(char) {
            return !isNaN(parseInt(char));
        }

        // Function parse number from string 'str' beginning from position 'pos'
        // Returns object { result, newPos }
        function parseNumber(str, pos) {
            var number = parseFloat(str.slice(pos));
            var newPosition = pos + number.toString().length - 1;
            return {
                result: number,
                newPos: newPosition
            };
        }

        function isDelimiter(char) {
            return char === ' ' || char === '\t';
        }

        function isOperator(char) {

        }
    }


}());