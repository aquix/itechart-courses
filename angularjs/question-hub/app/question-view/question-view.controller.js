(function () {
    'use strict';

    angular
        .module('app')
        .controller('QuestionViewCtrl', QuestionViewCtrl);

    QuestionViewCtrl.$inject = ['db', '$state', '$stateParams', 'userService'];
    function QuestionViewCtrl(db, $state, $stateParams, userService) {
        var self = this;
        var id = $stateParams.id;

        self.question = db.getQuestionById(id);
        self.iAmAuthor = (self.question.userId === userService.userId);

        self.isFormVisible = false;

        self.showAnswerForm = function () {
            self.isFormVisible = true;
        }

        self.hideAnswerForm = function () {
            self.isFormVisible = false;
        }

        self.deleteQuestion = function () {
            db.removeQuestion(self.question);
            $state.go('index');
        }
    }
})();