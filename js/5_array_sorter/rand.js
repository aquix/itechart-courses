function rand () {
    var result = [];
    for (var i = 0; i < 1000; i++) {
        result.push(Math.floor(Math.random() * 1000));
    }

    console.log(result.join(' '));
}

rand();