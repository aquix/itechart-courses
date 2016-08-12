(function () {
    'use strict';

    angular
        .module('app')
        .directive('answer', answer);

    function answer() {
        var directive = {
            templateUrl: 'app/answers/answer.html',
            bindToController: true,
            controller: AnswerCtrl,
            controllerAs: 'ctrl',
            scope: {
                answer: '=data'
            }
        };
        return directive;
    }
    /* @ngInject */
    AnswerCtrl.$inject = ['userService'];
    function AnswerCtrl(userService) {
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
})();