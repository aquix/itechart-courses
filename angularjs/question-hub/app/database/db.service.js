var db = function () {
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
                answers: [],
                tags: []
            };
            save();
        }

        db.questions.new = function(data) {
            data.id = db.questions.length;
            db.questions.push(new Question(data, db));
        };

        db.questions.getById = function (id) {
            return _.find(db.questions, { id: id });
        };

        db.answers.new = function(data, question) {
            data.id = db.answers.length;
            data.questionId = question.id;
            db.answers.push(new Answer(data, db));
        };

        for (var i = 0; i < db.questions.length; i++) {
            db.questions[i] = new Question(db.questions[i], db);
        }

        for (var i = 0; i < db.answers.length; i++) {
            db.answers[i] = new Answer(db.answers[i], db);
        }

    }

    function save() {
        localStorage.setItem('questions-hub', JSON.stringify(db));
    }
};

app.service('db', db);