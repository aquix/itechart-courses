app.service('content', ['rss', function (rss) {
    this.news = [];
    this.addSource = function (url, err, callback) {
        rss.get(url, function (result) {
            if (result.error) {
                err({
                    code: result.error.code,
                    message: result.error.message
                });

                return;
            }

            this.news = result.feed.entries;
            callback(result.feed);
        })
    }
}]);