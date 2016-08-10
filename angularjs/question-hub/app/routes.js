app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'app/views/questions.html',
            controller: 'questionsCtrl as ctrl'
        })
        .state('answers', {
            url: '/answers:id',
            templateUrl: 'app/views/answers.html',
            controller: 'questionsCtrl as ctrl'
            // we'll get to this in a bit
        })
        .state('newQuestion', {
            url: '/new',
            templateUrl: 'app/views/new.html',
            controller: 'questionFormCtrl as ctrl'
        });

});