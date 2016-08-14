/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(2);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html";

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _angular = __webpack_require__(3);

	var _angular2 = _interopRequireDefault(_angular);

	var _answerForm = __webpack_require__(4);

	var _answerForm2 = _interopRequireDefault(_answerForm);

	var _answer = __webpack_require__(5);

	var _answer2 = _interopRequireDefault(_answer);

	var _appDatabase = __webpack_require__(6);

	var _appDatabase2 = _interopRequireDefault(_appDatabase);

	var _newQuestion = __webpack_require__(8);

	var _newQuestion2 = _interopRequireDefault(_newQuestion);

	var _questionList = __webpack_require__(9);

	var _questionList2 = _interopRequireDefault(_questionList);

	var _questionView = __webpack_require__(10);

	var _questionView2 = _interopRequireDefault(_questionView);

	var _search = __webpack_require__(11);

	var _search2 = _interopRequireDefault(_search);

	var _search3 = __webpack_require__(12);

	var _search4 = _interopRequireDefault(_search3);

	var _user = __webpack_require__(13);

	var _user2 = _interopRequireDefault(_user);

	var _app = __webpack_require__(14);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_angular2.default.module('app', [_appDatabase2.default, 'ui.bootstrap', 'ui.router', 'ngCookies', 'ngTagsInput', 'ngAnimate']).config(_app2.default).run(['$window', 'db', '$cookies', function ($window, db, $cookies) {
	    $window.onbeforeunload = function () {
	        db.save();
	        $cookies.remove('user');
	    };
	}]).directive('answerForm', _answerForm2.default).directive('answer', _answer2.default).controller('NewQuestionCtrl', _newQuestion2.default).controller('QuestionListCtrl', _questionList2.default).controller('QuestionViewCtrl', _questionView2.default).controller('SearchCtrl', _search2.default).service('searchService', _search4.default).service('userService', _user2.default);

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = angular;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = answerForm;
	function answerForm() {
	    var directive = {
	        templateUrl: 'app/answers/answer-form.html',
	        bindToController: true,
	        controller: AnswerFormCtrl,
	        controllerAs: 'ctrl',
	        scope: {
	            question: '=',
	            hide: '=',
	            submitAction: '=submit',
	            model: '='
	        }
	    };
	    return directive;
	}

	/* @ngInject */
	function AnswerFormCtrl(db, userService) {
	    var self = this;

	    self.submit = function () {
	        self.hide();
	        return self.submitAction.apply(self, arguments);
	    };
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = answer;
	function answer() {
	    var directive = {
	        templateUrl: 'app/answers/answer.html',
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
	                _.pull(self.model.disliked, userService.userId);
	            } else {
	                self.model.liked.push(userService.userId);
	            }
	        }
	    };

	    self.dislike = function () {
	        if (!self.dislikedByMe()) {
	            self.model.rating -= 1;

	            if (self.likedByMe()) {
	                _.pull(self.model.liked, userService.userId);
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
	        }, 50);
	    };

	    self.hideEditForm = function () {
	        self.isEditFormVisible = false;
	    };

	    self.showEditGroup = function () {
	        if (self.iAmAuthor) {
	            self.isEditGroupVisible = true;
	        }
	    };

	    self.hideEditGroup = function () {
	        self.isEditGroupVisible = false;
	    };

	    self.editAnswer = function (answer) {
	        answer.date = Date.now();
	    };

	    self.deleteAnswer = function () {
	        db.removeAnswer(self.model, self.question);
	    };
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _db = __webpack_require__(7);

	var _db2 = _interopRequireDefault(_db);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = angular.module('app.database', []).factory('db', _db2.default).name;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = db;
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
	        removeQuestion: removeQuestion,
	        removeAnswer: removeAnswer
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

	    function removeAnswer(answer, question) {
	        _.pull(question.answers, answer);
	    }
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = NewQuestionCtrl;
	/* @ngInject */
	function NewQuestionCtrl(db, userService, $state) {
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
	        };

	        db.addQuestion(newQuestion);
	        $state.transitionTo('questionView', { id: newQuestion.id });
	    };
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = QuestionListCtrl;
	/* @ngInject */
	function QuestionListCtrl(db, searchService) {
	    var self = this;

	    self.searchService = searchService;
	    self.db = db;

	    self.searchFilter = function (item) {
	        if (item.title.toLowerCase().includes(self.searchService.query.toLowerCase()) || item.body.toLowerCase().includes(self.searchService.query.toLowerCase()) || item.author.toLowerCase().includes(self.searchService.query.toLowerCase())) {

	            return true;
	        }

	        // Check by tags
	        var queryTags = self.searchService.query.split(' ');
	        return _.difference(queryTags, item.tags).length === 0;
	    };
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = QuestionViewCtrl;
	/* @ngInject */
	function QuestionViewCtrl(db, $state, $stateParams, userService, $timeout, $anchorScroll, searchService) {
	    var self = this;
	    var id = $stateParams.id;

	    self.searchService = searchService;
	    self.question = db.getQuestionById(id);
	    self.iAmAuthor = self.question.userId === userService.userId;
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
	    };

	    self.hideAnswerForm = function () {
	        self.isFormVisible = false;
	    };

	    self.deleteQuestion = function () {
	        db.removeQuestion(self.question);
	        $state.go('index');
	    };

	    self.addAnswer = function (answer) {
	        answer.date = Date.now();
	        db.addAnswer(answer, self.question);
	    };
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = SearchCtrl;
	/* @ngInject */
	function SearchCtrl(searchService) {
	    this.searchService = searchService;
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = searchService;
	/* @ngInject */
	function searchService() {
	    this.query = '';
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = userService;
	/* @ngInject */
	function userService($cookies) {
	    init();

	    this.userId = $cookies.get('user');

	    ////////////////

	    function init() {
	        if (!$cookies.get('user')) {
	            var userId = sha256(Date.now().toString());
	            $cookies.put('user', userId);
	        }
	    }
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = routesConfig;
	/* @ngInject */
	function routesConfig($stateProvider, $urlRouterProvider) {
	    $urlRouterProvider.otherwise('/');

	    $stateProvider.state('index', {
	        url: '/',
	        templateUrl: 'app/question-list/question-list.html',
	        controller: 'QuestionListCtrl as ctrl'
	    }).state('questionView', {
	        url: '/questions/:id',
	        templateUrl: 'app/question-view/question-view.html',
	        controller: 'QuestionViewCtrl as ctrl'
	    }).state('newQuestion', {
	        url: '/new',
	        templateUrl: 'app/new-question/new-question.html',
	        controller: 'NewQuestionCtrl as ctrl'
	    });
	};

/***/ }
/******/ ]);