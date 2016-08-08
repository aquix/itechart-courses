app.controller('ContentCtrl', ['Content', function (Content) {
    var self = this;

    this.news = Content.news;

    this.unread = function (item) {
        return !item.read;
    };
}]);