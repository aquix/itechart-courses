/// <reference path="../../typings/tsd.d.ts" />

app.directive('newsCard', ['contentProvider', function (contentProvider) {
    return {
        // controller: 'newsCtrl',
        restrict: 'E',
        templateUrl: 'app/cards/news-card.html',
        link: function ($scope, $window) {
            $scope.markAsRead = function (item) {
                item.read = true;
                contentProvider.updateLocalStorage();
            }

            $scope.getUnread = function () {
                return _.filter(contentProvider.getNews(), function (item) {
                    return !item.read;
                });
            };
        }
    }
}]);