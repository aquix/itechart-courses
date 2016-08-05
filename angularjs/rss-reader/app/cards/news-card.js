/// <reference path="../../typings/tsd.d.ts" />

app.directive('newsCard', function () {
    return {
        link: function (scope, elem, attrs) {
            debugger
        },
        restrict: 'E',
        templateUrl: 'app/cards/news-card.html',
        scope: {
            news: '='
        }
    }
});