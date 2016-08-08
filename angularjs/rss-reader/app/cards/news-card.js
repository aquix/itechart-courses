/// <reference path="../../typings/tsd.d.ts" />

app.directive('newsCard', function (Content) {
    return {
        // controller: 'newsCtrl',
        restrict: 'E',
        templateUrl: 'app/cards/news-card.html',
        scope: {
            news: '='
        },
        link: function ($scope) {
            $scope.markAsRead = function (item) {
                _.remove(Content.news, item);
            }
        }
    }
});