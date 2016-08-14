export default function answerForm() {
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
function AnswerFormCtrl(db, userService) {
    var self = this;

    self.submit = function () {
        self.hide();
        return self.submitAction.apply(self, arguments);
    }
}