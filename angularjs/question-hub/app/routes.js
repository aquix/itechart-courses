app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'app/views/questions.html',
            controller: 'QuestionsListCtrl as ctrl'
        })
        .state('answers', {
            url: '/answers/:id',
            templateUrl: 'app/views/answers.html',
            controller: 'AnswersCtrl as ctrl'
        })
        .state('newQuestion', {
            url: '/new',
            templateUrl: 'app/views/new.html',
            controller: 'NewQuestionCtrl as ctrl'
        });

});