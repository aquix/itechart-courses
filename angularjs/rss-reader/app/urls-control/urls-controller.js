/// <reference path="../../typings/tsd.d.ts" />

app.controller('UrlsController', ['content', function(content) {
    var self = this;

    this.newUrl = '';
    this.invalidInput = false;

    this.sources = [];

    this.addSource = function () {
        content.addSource(self.newUrl, function (err) {
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
            }
        })
    };

    this.revalid = function () {
        self.invalidInput = false;
    }
}]);