var answerForm = function (db, userService) {
    var AnswerFormCtrl = function () {
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
    return {
        templateUrl: 'app/answers/answer-form.html',
        controller: AnswerFormCtrl,
        controllerAs: 'ctrl',
        scope: {
            question: '=',
            hide: '='
        },
        bindToController: true
    }
};

answerForm.$inject = ['db', 'userService'];

app.directive('answerForm', answerForm);
