(function () {
    'use strict';

    angular
        .module('app')
        .service('userService', userService);

    userService.$inject = ['$cookies'];
    function userService($cookies) {
        init();

        this.userId = $cookies.get('user');

        ////////////////

        function init() {
            if (!$cookies.get('user')) {
                var userId = sha256(Date.now().toString());
                $cookies.put('user', userId);
            }
        }
    }
})();