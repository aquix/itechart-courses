/**
 * Returns partial applicated function F with accepted first args
 * @param arguments
 * @return {Function} partial
 */
function partial () {
    let self = this;
    let args = [].slice.call(arguments);
    let func = args[args.length - 1];
    args = args.slice(0, args.length - 1);

    return function () {
        let argsToPass = args.concat([].slice.call(arguments));
        return func.apply(self, argsToPass);
    };
}

module.exports = partial;
