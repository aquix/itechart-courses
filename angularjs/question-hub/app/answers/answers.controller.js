var AnswersCtrl = function (db, $state, $stateParams, userService) {
    var self = this;
    var id = parseInt($stateParams.id);

    self.question = db.questions.getById(id);
    self.answers = self.question.getAnswers();
    self.iAmAuthor = (self.question.userId === userService.userId);

    self.isFormVisible = false;

    self.showAnswerForm = function () {
        self.isFormVisible = true;
    }

    self.hideAnswerForm = function () {
        self.isFormVisible = false;
    }

    self.deleteQuestion = function () {
        self.question.remove();
        $state.go('index');
    }

};

AnswersCtrl.$inject = ['db', '$state', '$stateParams', 'userService'];
app.controller('AnswersCtrl', AnswersCtrl);