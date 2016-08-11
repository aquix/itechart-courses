var NewQuestionCtrl = function (db, userService, $state) {
    var self = this;

    self.title = '';
    self.body = '';
    self.author = '';

    self.addQuestion = function () {
        var newQuestion = {
            title: self.title,
            body: self.body,
            author: self.author,
            date: Date.now(),
            userId: userService.userId
        }

        db.addQuestion(newQuestion);
        $state.transitionTo('questionView', { id: newQuestion.id });
    };
};

NewQuestionCtrl.$inject = ['db', 'userService', '$state'];
app.controller('NewQuestionCtrl', NewQuestionCtrl);