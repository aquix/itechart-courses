/// <reference path="../../typings/tsd.d.ts" />

app.controller('UrlsCtrl', ['Content', 'Rss', function(Content, Rss) {
    var self = this;

    this.newUrl = '';
    this.invalidInput = false;

    this.sources = [];

    this.addSource = function () {
        Rss.get(self.newUrl, function (result) {
            if (result.error) {
                self.invalidInput = true;
                return;
            }

            var newSource = {};
            newSource.url = self.newUrl;
            newSource.title = result.feed.meta.title;
            newSource.favicon = result.feed.meta.favicon;
            newSource.id = sha256(newSource.url);

            if (_.findIndex(self.sources, function (source) {
                return source.id === newSource.id;
            }) === -1) {
                self.sources.push(newSource);

                var news = _.map(result.feed.entries, function (entry) {
                    return {
                        content: entry.description,
                        title: entry.title,
                        sourceId: newSource.id
                    };
                });
                Content.news = _.concat(Content.news, news);
                updateLocalStorage();
            }
        });
    };

    this.removeSource = function (source, $event) {
        _.remove(self.sources, source);
        _.remove(Content.news, function (item) {
            return item.sourceId === source.id;
        });
        updateLocalStorage();
        $event.preventDefault();
    }

    this.revalid = function () {
        self.invalidInput = false;
    }

    function updateLocalStorage() {
        window.localStorage.setItem('rssReaderSources', JSON.stringify(self.sources));
        window.localStorage.setItem('rssReaderUnreadItems', JSON.stringify(Content.news));
    }

    function updateNews(source) {
        Rss.get(source.url, function (result) {
            var news = _.map(result.feed.entries, function (entry) {
                return {
                    content: entry.description,
                    title: entry.title,
                    sourceId: source.id
                };
            });
            Content.news = _.concat(Content.news, news);
            updateLocalStorage();
        });
    }

    (function init() {
        var data = window.localStorage.getItem('rssReaderSources');
        self.sources = data ? JSON.parse(data) : [];
        self.sources.forEach(function (source) {
            updateNews(source);
        });
    }());
}]);