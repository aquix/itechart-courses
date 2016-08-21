import templateUrl from 'html!./answer-form.html'

export default function answerForm() {
    var directive = {
        templateUrl: templateUrl,
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