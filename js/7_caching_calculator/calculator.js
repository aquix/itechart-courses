function Calculator() {
    var operatorsList = ['+', '-', '*', '/', '^'];
    var operands = [];
    var operators = [];
    var priority = {
        '(': 0,
        '+': 1, '-': 1,
        '*': 2, '/': 2, '^': 2
    };

    // Cache is object with keys - string like 'a$b' where a, b - operands, $ - operator
    // if $ is commutative operator then a <= b
    var cache = {};

    this.calcString = function(expression) {
        operands = [];
        operators = [];
        var parsedResult
        var operator;
        var operand1;
        var operand2;
        var lastOperator;
        var returnObj = {
            result: null,
            operations: []
        };


        for (var i = 0; i < expression.length; i++) {
            if (isDelimiter(expression[i])) {
                continue;
            } else if (expression[i] === '(') {
                operators.push(expression[i]);
            } else if (expression[i] === ')') {
                lastOperator = operators.pop();
                while (lastOperator !== '(') {
                    processOperator(lastOperator, returnObj.operations);
                    lastOperator = operators.pop();
                }
            } else if (operatorsList.indexOf(expression[i]) !== -1) {
                operator = expression[i];

                while (!canPushOperator(operator)) {
                    lastOperator = operators.pop();
                    processOperator(lastOperator, returnObj.operations);
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
            processOperator(operators.pop(), returnObj.operations);
        }

        returnObj.result = operands.pop();
        return returnObj;
    };

    function processOperator(operator, operationsLog) {
        var b = operands.pop();
        var a = operands.pop();
        var result;
        var expression;
        var isCacheUsed = true;

        // Normalize operands (a <= b)
        if (operator === '+' || operator === '*') {
            if (a > b) {
                var temp = a;
                a = b;
                b = a;
            }
        }

        expression = a + operator + b;
        result = cache[expression];
        if (result === undefined) {
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

            cache[expression] = result;
            isCacheUsed = false;
        }

        operands.push(result);
        operationsLog.push({
            expression: expression,
            result: result,
            cached: isCacheUsed
        });
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