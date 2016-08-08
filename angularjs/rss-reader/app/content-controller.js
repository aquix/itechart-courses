app.controller('ContentCtrl', ['Content', function (Content) {
    var self = this;

    this.news = function () {
        return Content.news;
    };

    this.unread = function (item) {
        return !item.read;
    };
}]);