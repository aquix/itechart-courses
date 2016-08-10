var answersCtrl = function (db, $stateParams) {
    var self = this;
    var id = parseInt($stateParams.id);

    self.question = db.questions.getById(id);
    self.answers = self.question.getAnswers();
};

answersCtrl.$inject = ['db', '$stateParams'];
app.controller('answersCtrl', answersCtrl);