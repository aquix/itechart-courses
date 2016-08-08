/// <reference path="../typings/tsd.d.ts" />

app.service('Content', ['Rss', function (Rss) {
    var self = this;

    this.news = [];
    this.addSource = function (url, err, callback) {
        Rss.get(url, function (result) {
            if (result.error) {
                err({
                    code: result.error.code,
                    message: result.error.message
                });

                return;
            }

            if (callback(result.feed)) {
                self.news = _.concat(self.news, result.feed.entries);
            }
        });
    };
}]);