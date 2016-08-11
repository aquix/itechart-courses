var app = angular.module('questionHub', ['ui.bootstrap', 'ui.router', 'ngCookies']);

app.run(['$window', 'db', '$cookies', function ($window, db, $cookies) {
    $window.onbeforeunload = function () {
        db.save();
        $cookies.remove('user');
    };
}]);