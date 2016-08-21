import templateUrl from 'html!./answer.html';

export default function answer() {
    var directive = {
        templateUrl: templateUrl,
        bindToController: true,
        controller: AnswerCtrl,
        controllerAs: 'ctrl',
        scope: {
            question: '=',
            model: '='
        }
    };
    return directive;
}

/* @ngInject */
function AnswerCtrl(db, userService, $anchorScroll, $timeout) {
    var self = this;

    self.iAmAuthor = self.model.userId === userService.userId;
    self.isEditFormVisible = false;
    self.isEditGroupVisible = false;

    self.usefullness = function () {
        if (self.model.rating > 0) {
            return 'good';
        } else if (self.model.rating < 0) {
            return 'bad';
        } else {
            return 'neutral';
        }
    };


    self.like = function () {
        if (!self.likedByMe()) {
            self.model.rating += 1;

            if (self.dislikedByMe()) {
                _.pull(self.model.disliked, userService.userId)
            } else {
                self.model.liked.push(userService.userId);
            }
        }
    };

    self.dislike = function () {
        if (!self.dislikedByMe()) {
            self.model.rating -= 1;

            if (self.likedByMe()) {
                _.pull(self.model.liked, userService.userId)
            } else {
                self.model.disliked.push(userService.userId);
            }
        }
    };

    self.likedByMe = function () {
        return self.model.liked.indexOf(userService.userId) !== -1;
    };

    self.dislikedByMe = function () {
        return self.model.disliked.indexOf(userService.userId) !== -1;
    };

    self.showEditForm = function () {
        self.isEditFormVisible = true;
        $timeout(function () {
            $anchorScroll('answer-form');
        }, 50)
    };

    self.hideEditForm = function () {
        self.isEditFormVisible = false;
    };

    self.showEditGroup = function () {
        if (self.iAmAuthor) {
            self.isEditGroupVisible = true;
        }
    }

    self.hideEditGroup = function () {
        self.isEditGroupVisible = false;
    }

    self.editAnswer = function (answer) {
        answer.date = Date.now();
    };

    self.deleteAnswer = function () {
        db.removeAnswer(self.model, self.question);
    }
}