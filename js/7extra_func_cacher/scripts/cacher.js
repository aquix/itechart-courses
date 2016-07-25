function Cacher() {
    var cache = {};

    String.prototype.hashCode = function() {
        var hash = 0, i, chr, len;
        if (this.length === 0) return hash;
        for (i = 0, len = this.length; i < len; i++) {
            chr = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    this.wrap = function(func) {
        return function () {
            var name = func.name;
            var args = Array.prototype.slice.call(arguments);
            var argsHash = JSON.stringify(args).hashCode();
            var funcResult;
            var isFuncInCache = cache.hasOwnProperty(name);

            if (isFuncInCache && cache[name].hasOwnProperty(argsHash)) {
                return cache[name][argsHash];
            }

            funcResult = func.call(undefined, args);

            if (!isFuncInCache) {
                cache[name] = {};
            }

            cache[name][argsHash] = funcResult;
            return funcResult;
        };
    }
}