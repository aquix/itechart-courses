(function () {
    'use strict';

    angular
        .module('app')
        .directive('answerForm', answerForm);

    function answerForm() {
        var directive = {
            templateUrl: 'app/answers/answer-form.html',
            bindToController: true,
            controller: AnswerFormCtrl,
            controllerAs: 'ctrl',
            scope: {
                question: '=',
                hide: '='
            }
        };
        return directive;
    }
    /* @ngInject */
    AnswerFormCtrl.$inject = ['db', 'userService'];
    function AnswerFormCtrl(db, userService) {
        var self = this;

        self.author = '';
        self.body = '';

        self.newAnswer = function () {
            var answer = {
                author: self.author,
                body: self.body,
                rating: 0,
                userId: userService.userId,
                liked: [],
                disliked: []
            };

            db.addAnswer(answer, self.question);
            self.hide();
        }
    }
})();