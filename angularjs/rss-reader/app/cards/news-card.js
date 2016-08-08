/// <reference path="../../typings/tsd.d.ts" />

app.directive('newsCard', function (Content) {
    return {
        // controller: 'newsCtrl',
        restrict: 'E',
        templateUrl: 'app/cards/news-card.html',
        scope: {
            news: '='
        },
        link: function ($scope, $window) {
            $scope.markAsRead = function (item) {
                item.read = true;
                window.localStorage.setItem('rssReaderUnreadItems', JSON.stringify(Content.news));
            }
        }
    }
});