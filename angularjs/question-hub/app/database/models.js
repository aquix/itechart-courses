function Question(data, db) {
    var self = this;

    self.id = data.id;
    self.title = data.title;
    self.body = data.body;
    self.author = data.author;
    self.date = data.date;
    self.userId = data.userId;
}

Question.prototype.getAnswers = function () {
    return _.filter(db.answers, { questionId: self.id });
};

Question.prototype.remove = function () {
    _.remove(db.answers, function (ans) {
        return ans.questionId === self.id;
    });
    _.pull(db.questions, self);
};

function Answer(data, db) {
    var self = this;

    self.id = data.id;
    self.questionId = data.questionId;
    self.title = data.title;
    self.body = data.body;
    self.author = data.author;
    self.rating = data.rating;
    self.userId = data.userId,
    self.liked = data.liked;
    self.disliked = data.disliked;
}

Answer.prototype.remove = function () {
    _.pull(db.answers, this);
};

function Tag(data) {
    self.id = data.id;
    self.name = data.name;
}