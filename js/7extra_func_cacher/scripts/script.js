(function () {
    var cacher = new Cacher();

    var factorial = cacher.wrap(math.factorial);

    document.getElementById('calc').onclick = function () {
        var bignumber = math.bignumber(document.getElementById('input').value);
        document.getElementById('result').innerHTML = '...';
        setTimeout(function () {
            var result = factorial(bignumber);
            document.getElementById('result').innerHTML = result;
        }, 5);

    };
}());