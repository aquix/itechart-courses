(function() {
    'use strict';

    angular
        .module('app', [
            'app.database',
            'ui.bootstrap',
            'ui.router',
            'ngCookies',
            'ngTagsInput'
        ])
        .run(['$window', 'db', '$cookies', function ($window, db, $cookies) {
            $window.onbeforeunload = function () {
                db.save();
                $cookies.remove('user');
            };
        }]);
})();