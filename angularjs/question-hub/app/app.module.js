var app = angular.module('questionHub', ['ui.bootstrap', 'ui.router', 'ngCookies']);

app.run(['$window', 'db', function ($window, db) {
    $window.onbeforeunload = function () {
        db.save();
    };
}]);