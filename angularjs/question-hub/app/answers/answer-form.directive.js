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
                hide: '=',
                submitAction: '=submit',
                model: '='
            }
        };
        return directive;
    }
    /* @ngInject */
    AnswerFormCtrl.$inject = ['db', 'userService'];
    function AnswerFormCtrl(db, userService) {
        var self = this;

        self.submit = function () {
            self.hide();
            return self.submitAction.apply(self, arguments);
        }
    }
})();