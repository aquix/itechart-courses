var newQuestionCtrl = function (db) {
    var self = this;

    self.title = '';
    self.body = '';
    self.author = '';

    self.addQuestion = function () {
        var newQuestion = {
            title: self.title,
            body: self.body,
            author: self.author,
            date: Date.now()
        }

        db.questions.new(newQuestion);
    };
};

newQuestionCtrl.$inject = ['db'];
app.controller('newQuestionCtrl', newQuestionCtrl);