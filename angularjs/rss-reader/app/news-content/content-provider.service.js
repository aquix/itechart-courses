/// <reference path="../../typings/tsd.d.ts" />

app.factory('contentProvider', ['rss', '$rootScope', function (rss, $rootScope) {
    var data = window.localStorage.getItem('rssReaderNews');
    var news = data ? JSON.parse(data) : [];
    var service = {
        getNews: getNews,
        addNews: addNews,
        removeNewsBySourceId: removeNewsBySourceId,
        updateNews: updateNews,
        updateLocalStorage: updateLocalStorage
    }
    return service;

    function getNews() {
        return news;
    }

    function addNews(newItems, sourceId) {
        var formattedItems = _.map(newItems, function (entry) {
            return {
                content: entry.description,
                title: entry.title,
                sourceId: sourceId,
                id: sha256(entry.title)
            };
        });

        news = _.unionBy(news, formattedItems, function (item) {
            return item.id;
        });

    }

    function removeNewsBySourceId(id) {
        _.remove(news, function (item) {
            return item.sourceId === id;
        });
        updateLocalStorage();
    }

    function updateNews(source) {
        rss.get(source.url)
            .then(function (result) {
                addNews(result.feed.entries, source.id);
                updateLocalStorage();
            });
    }

    function updateLocalStorage() {
        window.localStorage.setItem('rssReaderNews', JSON.stringify(news));
    }

}]);