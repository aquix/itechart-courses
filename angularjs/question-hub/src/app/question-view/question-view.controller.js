/* @ngInject */
export default function QuestionViewCtrl(db, $state, $stateParams, userService, $timeout, $anchorScroll, searchService) {
    var self = this;
    var id = $stateParams.id;

    self.searchService = searchService;
    self.question = db.getQuestionById(id);
    self.iAmAuthor = (self.question.userId === userService.userId);
    self.newAnswer = {
        author: '',
        body: '',
        date: Date.now(),
        rating: 0,
        userId: userService.userId,
        liked: [],
        disliked: []
    };

    self.isFormVisible = false;

    self.showAnswerForm = function () {
        self.isFormVisible = true;
        $timeout(function () {
            $anchorScroll('answer-form');
        }, 50);
    }

    self.hideAnswerForm = function () {
        self.isFormVisible = false;
    }

    self.deleteQuestion = function () {
        db.removeQuestion(self.question);
        $state.go('index');
    }

    self.addAnswer = function (answer) {
        answer.date = Date.now()
        db.addAnswer(answer, self.question);
    }
}