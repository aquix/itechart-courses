app.service('db', function () {
    var db;

    init();

    var service = {
        questions: db.questions,
        answers: db.answers,
        save: save
    };
    return service;

    function init() {
        db = JSON.parse(localStorage.getItem('questions-hub'));
        if (!db) {
            db = {
                questions: [],
                answers: []
            };
            save();
        }

        var questionProto = {
            getAnswers: function () {
                var self = this;
                return _.filter(db.answers, { id: self.answerId });
            }
        };

        db.questions.new = function(question) {
            question.__proto__ = questionProto;
            question.id = db.questions.length;
            db.questions.push(question);
        };

        db.questions.getById = function (id) {
            return _.find(db.questions, { id: id });
        };

        db.answers.new = function(answer) {
            answer.id = db.answers.length;
            db.answers.push(answer);
        };

        db.questions.forEach(function(question) {
            question.__proto__ = questionProto;
        });
    }

    function save() {
        localStorage.setItem('questions-hub', JSON.stringify(db));
    }
});