app.controller('ContentCtrl', ['Content', function (Content) {
    var self = this;

    this.news = function () {
        return Content.news;
    }
}]);