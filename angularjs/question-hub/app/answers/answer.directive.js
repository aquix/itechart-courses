var answer = function (userService) {
    var answerCtrl = function () {
        var self = this;

        self.usefullness = function () {
            if (self.answer.rating > 0) {
                return 'good';
            } else if (self.answer.rating < 0) {
                return 'bad';
            } else {
                return 'neutral';
            }
        };


        self.like = function () {
            if (!self.likedByMe()) {
                self.answer.rating += 1;

                if (self.dislikedByMe()) {
                    _.pull(self.answer.disliked, userService.userId)
                } else {
                    self.answer.liked.push(userService.userId);
                }
            }
        }

        self.dislike = function () {
            if (!self.dislikedByMe()) {
                self.answer.rating -= 1;

                if (self.likedByMe()) {
                    _.pull(self.answer.liked, userService.userId)
                } else {
                    self.answer.disliked.push(userService.userId);
                }
            }
        }

        self.likedByMe = function () {
            return self.answer.liked.indexOf(userService.userId) !== -1;
        }

        self.dislikedByMe = function () {
            return self.answer.disliked.indexOf(userService.userId) !== -1;
        }

    }
    return {
        templateUrl: 'app/answers/answer.html',
        controller: answerCtrl,
        controllerAs: 'ctrl',
        scope: {
            answer: '=data',
        },
        bindToController: true
    }
};

answer.$inject = ['userService'];

app.directive('answer', answer);
