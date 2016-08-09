/// <reference path="../../typings/tsd.d.ts" />

app.controller('UrlsCtrl', ['contentProvider', 'rss', '$scope', function(contentProvider, rss, $scope) {
    var self = this;

    this.newUrl = '';
    this.invalidInput = false;
    this.sources = [];

    init();

    this.addSource = function () {
        rss.get(self.newUrl)
            .then(function (result) {
                if (result.error) {
                    self.invalidInput = true;
                    return;
                }

                var newSource = {};
                newSource.url = self.newUrl;
                newSource.title = result.feed.meta.title;
                newSource.favicon = result.feed.meta.favicon;
                newSource.id = sha256(newSource.url);

                if (!isSourceAdded(newSource)) {
                    contentProvider.addNews(result.feed.entries, newSource.id)

                    self.sources.push(newSource);
                    updateLocalStorage();
                }
            });
    };

    this.removeSource = function (source, $event) {
        _.remove(self.sources, source);
        contentProvider.removeNewsBySourceId(source.id);
        updateLocalStorage();
        $event.preventDefault();
    }

    this.revalid = function () {
        self.invalidInput = false;
    }

    function init() {
        var data = window.localStorage.getItem('rssReaderSources');
        self.sources = data ? JSON.parse(data) : [];
        self.sources.forEach(function (source) {
            contentProvider.updateNews(source, source.id);
        });
    };

    function updateLocalStorage() {
        window.localStorage.setItem('rssReaderSources', JSON.stringify(self.sources));
    }

    function isSourceAdded(source) {
        return _.findIndex(self.sources, function (source) {
                    return source.id === newSource.id;
                }) !== -1;
    }
}]);