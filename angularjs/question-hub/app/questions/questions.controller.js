var questionsCtrl = function (db) {
    var currentDate = new Date();
    this.questions = db.questions;
};

questionsCtrl.$inject(['db']);
app.controller('questionsCtrl', questionsCtrl);