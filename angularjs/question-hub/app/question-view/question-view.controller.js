var QuestionViewCtrl = function (db, $state, $stateParams, userService) {
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
        self.question.remove();
        $state.go('index');
    }

};

QuestionViewCtrl.$inject = ['db', '$state', '$stateParams', 'userService'];
app.controller('QuestionViewCtrl', QuestionViewCtrl);