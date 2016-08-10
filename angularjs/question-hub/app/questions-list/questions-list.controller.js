var questionsListCtrl = function (db) {
    var currentDate = new Date();
    this.questions = db.questions;
};

questionsListCtrl.$inject = ['db'];
app.controller('questionsListCtrl', questionsListCtrl);