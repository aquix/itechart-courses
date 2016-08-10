var questionFormCtrl = function (db) {
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
    }
};

questionsCtrl.$inject(['db']);
app.controller('questionFormCtrl', questionFormCtrl);