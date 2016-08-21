/* @ngInject */
export default function routesConfig ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: require('./question-list/question-list.html'),
            controller: 'QuestionListCtrl as ctrl'
        })
        .state('questionView', {
            url: '/questions/:id',
            templateUrl: require('./question-view/question-view.html'),
            controller: 'QuestionViewCtrl as ctrl'
        })
        .state('newQuestion', {
            url: '/new',
            templateUrl: require('./new-question/new-question.html'),
            controller: 'NewQuestionCtrl as ctrl'
        });

};