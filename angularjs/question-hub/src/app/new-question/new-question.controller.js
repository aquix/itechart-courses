/* @ngInject */
export default function NewQuestionCtrl(db, userService, $state) {
    var self = this;

    self.title = '';
    self.body = '';
    self.author = '';
    self.tags = [];

    self.addQuestion = function () {
        var tags = _.map(self.tags, function (tag) {
            return tag.text;
        });

        var newQuestion = {
            title: self.title,
            body: self.body,
            author: self.author,
            tags: tags,
            date: Date.now(),
            userId: userService.userId
        }

        db.addQuestion(newQuestion);
        $state.transitionTo('questionView', { id: newQuestion.id });
    };
}