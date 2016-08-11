var QuestionListCtrl = function (db, searchService) {
    this.data = searchService.data;
    this.db = db;
};

QuestionListCtrl.$inject = ['db', 'searchService'];
app.controller('QuestionListCtrl', QuestionListCtrl);