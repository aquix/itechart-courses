app.controller('ContentCtrl', ['Content', function (Content) {
    var self = this;

    this.news = function () {
        return Content.news;
    }

    this.unreadNews = [];
    this.readNews = [];

    this.markAsRead = function (item) {
        debugger
    }
}]);