/// <reference path="../typings/tsd.d.ts" />

app.factory('Content', ['Rss', function (Rss) {
    var data = window.localStorage.getItem('rssReaderUnreadItems');
    var news = data ? JSON.parse(data) : [];
    console.log(news);

    return {
        news: news,
    }

}]);