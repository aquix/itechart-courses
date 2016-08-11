var db = function () {
    var self = this;
    var db;

    init();

    return {
        questions: db.questions,
        save: save,
        getQuestionById: getQuestionById,
        addAnswer: addAnswer,
        addQuestion: addQuestion
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
};

app.factory('db', db);