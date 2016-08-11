var newQuestionCtrl = function (db, userService) {
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

        db.questions.new(newQuestion);
    };
};

newQuestionCtrl.$inject = ['db', 'userService'];
app.controller('newQuestionCtrl', newQuestionCtrl);