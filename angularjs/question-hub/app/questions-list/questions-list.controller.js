var QuestionsListCtrl = function (db, searchService) {
    this.data = searchService.data;
    this.questions = db.questions;
};

QuestionsListCtrl.$inject = ['db', 'searchService'];
app.controller('QuestionsListCtrl', QuestionsListCtrl);