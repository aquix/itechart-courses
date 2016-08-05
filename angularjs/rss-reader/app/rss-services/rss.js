app.service('Rss', function () {
    this.get = function (url, callback) {
        feednami.load(url, callback);
    }
})