(function () {
    angular
        .module('app')
        .config(function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('index', {
                    url: '/',
                    templateUrl: 'app/question-list/question-list.html',
                    controller: 'QuestionListCtrl as ctrl'
                })
                .state('questionView', {
                    url: '/questions/:id',
                    templateUrl: 'app/question-view/question-view.html',
                    controller: 'QuestionViewCtrl as ctrl'
                })
                .state('newQuestion', {
                    url: '/new',
                    templateUrl: 'app/new-question/new-question.html',
                    controller: 'NewQuestionCtrl as ctrl'
                });

        });
})();