/// <reference path="../../typings/tsd.d.ts" />

app.controller('UrlsCtrl', ['Content', function(Content) {
    var self = this;

    this.newUrl = '';
    this.invalidInput = false;

    this.sources = [];

    this.addSource = function () {
        Content.addSource(self.newUrl, function (err) {
            self.invalidInput = true;
        }, function (feed) {
            var newSource = {};
            newSource.url = feed.meta.link;
            newSource.title = feed.meta.title;
            newSource.favicon = feed.meta.favicon;

            if (_.findIndex(self.sources, function (source) {
                return source.url === newSource.url;
            }) === -1) {
                self.sources.push(newSource);
                window.localStorage.setItem('rssReaderSources', JSON.stringify(self.sources));
                return true;
            }

            return false;
        })
    };

    this.revalid = function () {
        self.invalidInput = false;
    }

    (function init() {
        var data = window.localStorage.getItem('rssReaderSources');
        self.sources = data ? JSON.parse(data) : [];
    }());
}]);