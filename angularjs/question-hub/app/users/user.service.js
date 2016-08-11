var userService = function ($cookies) {
    if (!$cookies.get('user')) {
        var userId = sha256(Date.now().toString());
        $cookies.put('user', userId);
    }

    this.userId = $cookies.get('user');
}

userService.$inject = ['$cookies'];

app.service('userService', userService);