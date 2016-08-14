import sha256 from 'js-sha256';

/* @ngInject */
export default function userService($cookies) {
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