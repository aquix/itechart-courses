import answerForm from './answers/answer-form.directive';
import answer from './answers/answer.directive';
import appDatabase from './app.database/app.database.module';
import NewQuestionCtrl from './new-question/new-question.controller';
import QuestionListCtrl from './question-list/question-list.controller';
import QuestionViewCtrl from './question-view/question-view.controller';
import SearchCtrl from './search/search.controller';
import searchService from './search/search.service';
import userService from './users/user.service';
import routesConfig from './app.routes';

angular
    .module('app', [
        appDatabase,
        'ui.bootstrap',
        'ui.router',
        'ngCookies',
        'ngTagsInput',
        'ngAnimate'
    ])
    .config(routesConfig)
    .run(['$window', 'db', '$cookies', function ($window, db, $cookies) {
        $window.onbeforeunload = function () {
            db.save();
            $cookies.remove('user');
        };
    }])
    .directive('answerForm', answerForm)
    .directive('answer', answer)
    .controller('NewQuestionCtrl', NewQuestionCtrl)
    .controller('QuestionListCtrl', QuestionListCtrl)
    .controller('QuestionViewCtrl', QuestionViewCtrl)
    .controller('SearchCtrl', SearchCtrl)
    .service('searchService', searchService)
    .service('userService', userService);