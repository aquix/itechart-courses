(function() {
    'use strict';

    angular
        .module('app.database')
        .factory('db', db);

    function db() {
        var self = this;

        var db;
        init();

        var service = {
            questions: db.questions,
            save: save,
            getQuestionById: getQuestionById,
            addAnswer: addAnswer,
            addQuestion: addQuestion,
            removeQuestion: removeQuestion
        };
        return service;

        ////////////

        function init() {
            db = JSON.parse(localStorage.getItem('questions-hub'));
            if (!db) {
                db = {
                    questions: [],
                    tags: []
                };
                save();
            }
        }

        function save() {
            localStorage.setItem('questions-hub', JSON.stringify(db));
        };

        function getQuestionById(id) {
            return _.find(db.questions, { id: id });
        }

        function addAnswer(answer, question) {
            answer.id = sha256(Date.now().toString());
            question.answers.push(answer);
        }

        function addQuestion(question) {
            question.id = sha256(Date.now().toString());
            question.answers = [];
            db.questions.push(question);
        }

        function removeQuestion(question) {
            _.pull(db.questions, question);
        }
    }
})();