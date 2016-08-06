/// <reference path="../../typings/tsd.d.ts" />

app.directive('newsCard', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/cards/news-card.html',
        scope: {
            news: '='
        }
    }
});