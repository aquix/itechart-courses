(function() {
    'use strict';

    angular
        .module('app')
        .controller('QuestionListCtrl', QuestionListCtrl);

    QuestionListCtrl.$inject = ['db', 'searchService'];
    function QuestionListCtrl(db, searchService) {
        var self = this;

        self.searchService = searchService;
        self.db = db;
    }
})();