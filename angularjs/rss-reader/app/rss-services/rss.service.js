app.service('rss', ['$q', function ($q) {
    this.get = function (url) {
        return $q(function (resolve) {
            feednami.load(url, resolve);
        });
    };
}]);