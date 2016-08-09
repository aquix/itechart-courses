app.controller('ContentCtrl', ['contentProvider', '$scope', function (contentProvider, $scope) {
    var self = this;

    this.getUnreadItems = function () {
        return contentProvider.getNews()
    };

}]);
