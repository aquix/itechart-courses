app.service('rss', function () {
    this.get = function (url, callback) {
        feednami.load(url, callback);
    }
})