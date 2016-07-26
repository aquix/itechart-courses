function carry(func) {
    let argsCount = func.length;
    let args = [];

    return function carryOneArg (arg) {
        args.push(arg);
        if (args.length === argsCount) {
            return func.apply(this, args);
        } else {
            return carryOneArg;
        }
    };
}

module.exports = carry;