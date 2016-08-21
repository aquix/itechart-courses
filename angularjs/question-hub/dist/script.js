/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
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
	__webpack_require__(20);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html";

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _answerForm = __webpack_require__(3);
	
	var _answerForm2 = _interopRequireDefault(_answerForm);
	
	var _answer = __webpack_require__(5);
	
	var _answer2 = _interopRequireDefault(_answer);
	
	var _appDatabase = __webpack_require__(7);
	
	var _appDatabase2 = _interopRequireDefault(_appDatabase);
	
	var _newQuestion = __webpack_require__(10);
	
	var _newQuestion2 = _interopRequireDefault(_newQuestion);
	
	var _questionList = __webpack_require__(11);
	
	var _questionList2 = _interopRequireDefault(_questionList);
	
	var _questionView = __webpack_require__(12);
	
	var _questionView2 = _interopRequireDefault(_questionView);
	
	var _search = __webpack_require__(13);
	
	var _search2 = _interopRequireDefault(_search);
	
	var _search3 = __webpack_require__(14);
	
	var _search4 = _interopRequireDefault(_search3);
	
	var _user = __webpack_require__(15);
	
	var _user2 = _interopRequireDefault(_user);
	
	var _app = __webpack_require__(16);
	
	var _app2 = _interopRequireDefault(_app);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	angular.module('app', [_appDatabase2.default, 'ui.bootstrap', 'ui.router', 'ngCookies', 'ngTagsInput', 'ngAnimate']).config(_app2.default).run(['$window', 'db', '$cookies', function ($window, db, $cookies) {
	    $window.onbeforeunload = function () {
	        db.save();
	        $cookies.remove('user');
	    };
	}]).directive('answerForm', _answerForm2.default).directive('answer', _answer2.default).controller('NewQuestionCtrl', _newQuestion2.default).controller('QuestionListCtrl', _questionList2.default).controller('QuestionViewCtrl', _questionView2.default).controller('SearchCtrl', _search2.default).service('searchService', _search4.default).service('userService', _user2.default);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = answerForm;
	
	var _answerForm = __webpack_require__(4);
	
	var _answerForm2 = _interopRequireDefault(_answerForm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function answerForm() {
	    var directive = {
	        templateUrl: _answerForm2.default,
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
/* 4 */
/***/ function(module, exports) {

	module.exports = "var path = 'd:/Programming/itechart-courses/angularjs/question-hub/src/app/answers/answer-form.html';\nvar html = \"<form id=\\\"answer-form\\\" name=\\\"answerForm\\\" class=\\\"container-fluid\\\">\\r\\n    <div class=\\\"row\\\">\\r\\n        <div class=\\\"form-group\\\">\\r\\n            <textarea ng-model=\\\"ctrl.model.body\\\" required=\\\"required\\\" class=\\\"form-control\\\" placeholder=\\\"Type your answer here\\\" rows=\\\"5\\\"></textarea>\\r\\n        </div>\\r\\n    </div>\\r\\n    <div class=\\\"row\\\">\\r\\n        <div class=\\\"form-group\\\">\\r\\n            <input ng-model=\\\"ctrl.model.author\\\" required=\\\"required\\\" type=\\\"text\\\" class=\\\"form-control\\\" placeholder=\\\"Author\\\">\\r\\n        </div>\\r\\n        <button ng-click=\\\"ctrl.submit(ctrl.model)\\\" ng-disabled=\\\"!answerForm.$valid\\\" class=\\\"btn btn-primary\\\">Answer</button>\\r\\n        <button ng-click=\\\"ctrl.hide()\\\" class=\\\"btn btn-danger\\\">Cancel</button>\\r\\n    </div>\\r\\n</form>\";\nwindow.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);\nmodule.exports = path;";

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = answer;
	
	var _answer = __webpack_require__(6);
	
	var _answer2 = _interopRequireDefault(_answer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function answer() {
	    var directive = {
	        templateUrl: _answer2.default,
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
/***/ function(module, exports) {

	module.exports = "var path = 'd:/Programming/itechart-courses/angularjs/question-hub/src/app/answers/answer.html';\nvar html = \"<div class=\\\"thumbnail\\\" ng-mouseover=\\\"ctrl.showEditGroup()\\\" ng-mouseleave=\\\"ctrl.hideEditGroup()\\\">\\r\\n    <div class=\\\"caption row\\\">\\r\\n        <div class=\\\"col-xs-1\\\">\\r\\n            <div class=\\\"vote-panel\\\">\\r\\n                <div><button ng-click=\\\"ctrl.like()\\\" ng-disabled=\\\"ctrl.likedByMe()\\\" class=\\\"btn btn-default btn-xs\\\">▲</button></div>\\r\\n                <div>\\r\\n                    <h4 ng-class=\\\"ctrl.usefullness()\\\">{{ ctrl.model.rating }}</h4>\\r\\n                </div>\\r\\n                <div><button ng-click=\\\"ctrl.dislike()\\\" ng-disabled=\\\"ctrl.dislikedByMe()\\\" class=\\\"btn btn-default btn-xs\\\">▼</button></div>\\r\\n            </div>\\r\\n        </div>\\r\\n        <div class=\\\"col-xs-11\\\">\\r\\n            <p>{{ ctrl.model.body }}</p>\\r\\n            <div ng-if=\\\"ctrl.isEditGroupVisible\\\" class=\\\"edit-group\\\">\\r\\n                <button ng-click=\\\"ctrl.showEditForm()\\\" class=\\\"btn btn-primary btn-xs\\\">\\r\\n                    <span class=\\\"glyphicon glyphicon-pencil\\\"></span>\\r\\n                </button>\\r\\n                <button ng-click=\\\"ctrl.deleteAnswer()\\\" class=\\\"btn btn-danger btn-xs\\\">\\r\\n                    <span class=\\\"glyphicon glyphicon-remove\\\"></span>\\r\\n                </button>\\r\\n            </div>\\r\\n            <div class=\\\"question-footer\\\">\\r\\n                <p class=\\\"author\\\"><em>{{ ctrl.model.author }}</em></p>\\r\\n                <p class=\\\"date\\\"><em>{{ ctrl.model.date | date: 'medium' }}</em></p>\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n</div>\\r\\n\\r\\n<div class=\\\"row\\\">\\r\\n    <answer-form ng-if=\\\"ctrl.isEditFormVisible\\\" question=\\\"ctrl.question\\\" model='ctrl.model' submit=\\\"ctrl.editAnswer\\\" hide=\\\"ctrl.hideEditForm\\\"></answer-form>\\r\\n</div>\";\nwindow.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);\nmodule.exports = path;";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _db = __webpack_require__(8);
	
	var _db2 = _interopRequireDefault(_db);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = angular.module('app.database', []).factory('db', _db2.default).name;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = db;
	
	var _jsSha = __webpack_require__(9);
	
	var _jsSha2 = _interopRequireDefault(_jsSha);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	        answer.id = (0, _jsSha2.default)(Date.now().toString());
	        question.answers.push(answer);
	    }
	
	    function addQuestion(question) {
	        question.id = (0, _jsSha2.default)(Date.now().toString());
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
/* 9 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	/*
	 * js-sha256 v0.3.0
	 * https://github.com/emn178/js-sha256
	 *
	 * Copyright 2014-2015, emn178@gmail.com
	 *
	 * Licensed under the MIT license:
	 * http://www.opensource.org/licenses/MIT
	 */
	;(function (root, undefined) {
	  'use strict';
	
	  var NODE_JS = typeof module != 'undefined';
	  if (NODE_JS) {
	    root = global;
	  }
	  var TYPED_ARRAY = typeof Uint8Array != 'undefined';
	  var HEX_CHARS = '0123456789abcdef'.split('');
	  var EXTRA = [-2147483648, 8388608, 32768, 128];
	  var SHIFT = [24, 16, 8, 0];
	  var K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
	
	  var blocks = [];
	
	  var sha224 = function sha224(message) {
	    return sha256(message, true);
	  };
	
	  var sha256 = function sha256(message, is224) {
	    var notString = typeof message != 'string';
	    if (notString && message.constructor == root.ArrayBuffer) {
	      message = new Uint8Array(message);
	    }
	
	    var h0,
	        h1,
	        h2,
	        h3,
	        h4,
	        h5,
	        h6,
	        h7,
	        block,
	        code,
	        first = true,
	        end = false,
	        i,
	        j,
	        index = 0,
	        start = 0,
	        bytes = 0,
	        length = message.length,
	        s0,
	        s1,
	        maj,
	        t1,
	        t2,
	        ch,
	        ab,
	        da,
	        cd,
	        bc;
	
	    if (is224) {
	      h0 = 0xc1059ed8;
	      h1 = 0x367cd507;
	      h2 = 0x3070dd17;
	      h3 = 0xf70e5939;
	      h4 = 0xffc00b31;
	      h5 = 0x68581511;
	      h6 = 0x64f98fa7;
	      h7 = 0xbefa4fa4;
	    } else {
	      // 256
	      h0 = 0x6a09e667;
	      h1 = 0xbb67ae85;
	      h2 = 0x3c6ef372;
	      h3 = 0xa54ff53a;
	      h4 = 0x510e527f;
	      h5 = 0x9b05688c;
	      h6 = 0x1f83d9ab;
	      h7 = 0x5be0cd19;
	    }
	    block = 0;
	    do {
	      blocks[0] = block;
	      blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
	      if (notString) {
	        for (i = start; index < length && i < 64; ++index) {
	          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
	        }
	      } else {
	        for (i = start; index < length && i < 64; ++index) {
	          code = message.charCodeAt(index);
	          if (code < 0x80) {
	            blocks[i >> 2] |= code << SHIFT[i++ & 3];
	          } else if (code < 0x800) {
	            blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];
	            blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
	          } else if (code < 0xd800 || code >= 0xe000) {
	            blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];
	            blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
	            blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
	          } else {
	            code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
	            blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];
	            blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];
	            blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
	            blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
	          }
	        }
	      }
	      bytes += i - start;
	      start = i - 64;
	      if (index == length) {
	        blocks[i >> 2] |= EXTRA[i & 3];
	        ++index;
	      }
	      block = blocks[16];
	      if (index > length && i < 56) {
	        blocks[15] = bytes << 3;
	        end = true;
	      }
	
	      var a = h0,
	          b = h1,
	          c = h2,
	          d = h3,
	          e = h4,
	          f = h5,
	          g = h6,
	          h = h7;
	      for (j = 16; j < 64; ++j) {
	        // rightrotate
	        t1 = blocks[j - 15];
	        s0 = (t1 >>> 7 | t1 << 25) ^ (t1 >>> 18 | t1 << 14) ^ t1 >>> 3;
	        t1 = blocks[j - 2];
	        s1 = (t1 >>> 17 | t1 << 15) ^ (t1 >>> 19 | t1 << 13) ^ t1 >>> 10;
	        blocks[j] = blocks[j - 16] + s0 + blocks[j - 7] + s1 << 0;
	      }
	
	      bc = b & c;
	      for (j = 0; j < 64; j += 4) {
	        if (first) {
	          if (is224) {
	            ab = 300032;
	            t1 = blocks[0] - 1413257819;
	            h = t1 - 150054599 << 0;
	            d = t1 + 24177077 << 0;
	          } else {
	            ab = 704751109;
	            t1 = blocks[0] - 210244248;
	            h = t1 - 1521486534 << 0;
	            d = t1 + 143694565 << 0;
	          }
	          first = false;
	        } else {
	          s0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
	          s1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
	          ab = a & b;
	          maj = ab ^ a & c ^ bc;
	          ch = e & f ^ ~e & g;
	          t1 = h + s1 + ch + K[j] + blocks[j];
	          t2 = s0 + maj;
	          h = d + t1 << 0;
	          d = t1 + t2 << 0;
	        }
	        s0 = (d >>> 2 | d << 30) ^ (d >>> 13 | d << 19) ^ (d >>> 22 | d << 10);
	        s1 = (h >>> 6 | h << 26) ^ (h >>> 11 | h << 21) ^ (h >>> 25 | h << 7);
	        da = d & a;
	        maj = da ^ d & b ^ ab;
	        ch = h & e ^ ~h & f;
	        t1 = g + s1 + ch + K[j + 1] + blocks[j + 1];
	        t2 = s0 + maj;
	        g = c + t1 << 0;
	        c = t1 + t2 << 0;
	        s0 = (c >>> 2 | c << 30) ^ (c >>> 13 | c << 19) ^ (c >>> 22 | c << 10);
	        s1 = (g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7);
	        cd = c & d;
	        maj = cd ^ c & a ^ da;
	        ch = g & h ^ ~g & e;
	        t1 = f + s1 + ch + K[j + 2] + blocks[j + 2];
	        t2 = s0 + maj;
	        f = b + t1 << 0;
	        b = t1 + t2 << 0;
	        s0 = (b >>> 2 | b << 30) ^ (b >>> 13 | b << 19) ^ (b >>> 22 | b << 10);
	        s1 = (f >>> 6 | f << 26) ^ (f >>> 11 | f << 21) ^ (f >>> 25 | f << 7);
	        bc = b & c;
	        maj = bc ^ b & d ^ cd;
	        ch = f & g ^ ~f & h;
	        t1 = e + s1 + ch + K[j + 3] + blocks[j + 3];
	        t2 = s0 + maj;
	        e = a + t1 << 0;
	        a = t1 + t2 << 0;
	      }
	
	      h0 = h0 + a << 0;
	      h1 = h1 + b << 0;
	      h2 = h2 + c << 0;
	      h3 = h3 + d << 0;
	      h4 = h4 + e << 0;
	      h5 = h5 + f << 0;
	      h6 = h6 + g << 0;
	      h7 = h7 + h << 0;
	    } while (!end);
	
	    var hex = HEX_CHARS[h0 >> 28 & 0x0F] + HEX_CHARS[h0 >> 24 & 0x0F] + HEX_CHARS[h0 >> 20 & 0x0F] + HEX_CHARS[h0 >> 16 & 0x0F] + HEX_CHARS[h0 >> 12 & 0x0F] + HEX_CHARS[h0 >> 8 & 0x0F] + HEX_CHARS[h0 >> 4 & 0x0F] + HEX_CHARS[h0 & 0x0F] + HEX_CHARS[h1 >> 28 & 0x0F] + HEX_CHARS[h1 >> 24 & 0x0F] + HEX_CHARS[h1 >> 20 & 0x0F] + HEX_CHARS[h1 >> 16 & 0x0F] + HEX_CHARS[h1 >> 12 & 0x0F] + HEX_CHARS[h1 >> 8 & 0x0F] + HEX_CHARS[h1 >> 4 & 0x0F] + HEX_CHARS[h1 & 0x0F] + HEX_CHARS[h2 >> 28 & 0x0F] + HEX_CHARS[h2 >> 24 & 0x0F] + HEX_CHARS[h2 >> 20 & 0x0F] + HEX_CHARS[h2 >> 16 & 0x0F] + HEX_CHARS[h2 >> 12 & 0x0F] + HEX_CHARS[h2 >> 8 & 0x0F] + HEX_CHARS[h2 >> 4 & 0x0F] + HEX_CHARS[h2 & 0x0F] + HEX_CHARS[h3 >> 28 & 0x0F] + HEX_CHARS[h3 >> 24 & 0x0F] + HEX_CHARS[h3 >> 20 & 0x0F] + HEX_CHARS[h3 >> 16 & 0x0F] + HEX_CHARS[h3 >> 12 & 0x0F] + HEX_CHARS[h3 >> 8 & 0x0F] + HEX_CHARS[h3 >> 4 & 0x0F] + HEX_CHARS[h3 & 0x0F] + HEX_CHARS[h4 >> 28 & 0x0F] + HEX_CHARS[h4 >> 24 & 0x0F] + HEX_CHARS[h4 >> 20 & 0x0F] + HEX_CHARS[h4 >> 16 & 0x0F] + HEX_CHARS[h4 >> 12 & 0x0F] + HEX_CHARS[h4 >> 8 & 0x0F] + HEX_CHARS[h4 >> 4 & 0x0F] + HEX_CHARS[h4 & 0x0F] + HEX_CHARS[h5 >> 28 & 0x0F] + HEX_CHARS[h5 >> 24 & 0x0F] + HEX_CHARS[h5 >> 20 & 0x0F] + HEX_CHARS[h5 >> 16 & 0x0F] + HEX_CHARS[h5 >> 12 & 0x0F] + HEX_CHARS[h5 >> 8 & 0x0F] + HEX_CHARS[h5 >> 4 & 0x0F] + HEX_CHARS[h5 & 0x0F] + HEX_CHARS[h6 >> 28 & 0x0F] + HEX_CHARS[h6 >> 24 & 0x0F] + HEX_CHARS[h6 >> 20 & 0x0F] + HEX_CHARS[h6 >> 16 & 0x0F] + HEX_CHARS[h6 >> 12 & 0x0F] + HEX_CHARS[h6 >> 8 & 0x0F] + HEX_CHARS[h6 >> 4 & 0x0F] + HEX_CHARS[h6 & 0x0F];
	    if (!is224) {
	      hex += HEX_CHARS[h7 >> 28 & 0x0F] + HEX_CHARS[h7 >> 24 & 0x0F] + HEX_CHARS[h7 >> 20 & 0x0F] + HEX_CHARS[h7 >> 16 & 0x0F] + HEX_CHARS[h7 >> 12 & 0x0F] + HEX_CHARS[h7 >> 8 & 0x0F] + HEX_CHARS[h7 >> 4 & 0x0F] + HEX_CHARS[h7 & 0x0F];
	    }
	    return hex;
	  };
	
	  if (!root.JS_SHA256_TEST && NODE_JS) {
	    sha256.sha256 = sha256;
	    sha256.sha224 = sha224;
	    module.exports = sha256;
	  } else if (root) {
	    root.sha256 = sha256;
	    root.sha224 = sha224;
	  }
	})(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = userService;
	
	var _jsSha = __webpack_require__(9);
	
	var _jsSha2 = _interopRequireDefault(_jsSha);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* @ngInject */
	function userService($cookies) {
	    init();
	
	    this.userId = $cookies.get('user');
	
	    ////////////////
	
	    function init() {
	        if (!$cookies.get('user')) {
	            var userId = (0, _jsSha2.default)(Date.now().toString());
	            $cookies.put('user', userId);
	        }
	    }
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

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
	        templateUrl: __webpack_require__(17),
	        controller: 'QuestionListCtrl as ctrl'
	    }).state('questionView', {
	        url: '/questions/:id',
	        templateUrl: __webpack_require__(18),
	        controller: 'QuestionViewCtrl as ctrl'
	    }).state('newQuestion', {
	        url: '/new',
	        templateUrl: __webpack_require__(19),
	        controller: 'NewQuestionCtrl as ctrl'
	    });
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	var path = 'd:/Programming/itechart-courses/angularjs/question-hub/src/app/question-list/question-list.html';
	var html = "<div ng-if=\"ctrl.db.questions.length\">\r\n\t<div class=\"row repeated-item\" ng-repeat=\"question in ctrl.db.questions\r\n\t\t | filter: ctrl.searchFilter\">\r\n\t    <div class=\"col-md-8 col-md-offset-2\">\r\n\t        <div class=\"thumbnail\">\r\n\t            <div class=\"caption\">\r\n\t                <h3><a ui-sref=\"questionView({ id: question.id })\">{{ question.title }}</a></h3>\r\n\t                <p>{{ question.body }}</p>\r\n\t                <div class=\"question-footer\">\r\n\t                    <p class=\"author\"><em>{{ question.author }}</em></p>\r\n\t                    <p class=\"date\"><em>{{ question.date | date: 'medium' }}</em></p>\r\n\t                </div>\r\n\t\t\t\t\t<h4 class=\"tags\">\r\n\t\t\t\t\t\t<span ng-repeat=\"tag in question.tags\" class=\"label label-info\">\r\n\t\t\t\t\t\t\t{{ tag }}\r\n\t\t\t\t\t\t</span>\r\n\t\t\t\t\t</h4>\r\n\t            </div>\r\n\t        </div>\r\n\t    </div>\r\n\t</div>\r\n</div>\r\n<div ng-if=\"ctrl.db.questions.length === 0\">\r\n    <div class=\"col-md-6 col-md-offset-3\">\r\n        <h2>\r\n            <p>It's so lonely here.</p>\r\n            <span>\r\n                Ask new question <a ui-sref=\"newQuestion\">here</a>\r\n            </span>\r\n        </h2>\r\n    </div>\r\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 18 */
/***/ function(module, exports) {

	var path = 'd:/Programming/itechart-courses/angularjs/question-hub/src/app/question-view/question-view.html';
	var html = "<div class=\"row\">\r\n    <div class=\"col-md-8 col-md-offset-2\">\r\n        <div>\r\n            <div class=\"caption\">\r\n                <h3>{{ ctrl.question.title }}</h3>\r\n                <h4 class=\"tags\">\r\n                    <span ng-repeat=\"tag in ctrl.question.tags\" class=\"label label-info\">\r\n                        {{ tag }}\r\n                    </span>\r\n                </h4>\r\n                <p>{{ ctrl.question.body }}</p>\r\n                <div class=\"question-footer\">\r\n                    <p class=\"author\"><em>{{ ctrl.question.author }}</em></p>\r\n                    <p class=\"date\"><em>{{ ctrl.question.date | date: 'medium' }}</em></p>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"answers\">\r\n                <answer ng-repeat=\"answer in ctrl.question.answers | filter: ctrl.searchService.query track by answer.id\"\r\n                        model=\"answer\" question=\"ctrl.question\" class=\"repeated-item\"></answer>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-offset-9\">\r\n        <button ng-hide=\"ctrl.iAmAuthor\" class=\"btn btn-success\" ng-click=\"ctrl.showAnswerForm()\">Answer this question</button>\r\n        <button ng-show=\"ctrl.iAmAuthor\" ng-click=\"ctrl.deleteQuestion()\" class=\"btn btn-danger\" ng-click=\"ctrl.deleteQuestion()\">Delete question</button>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n<div ng-if=\"ctrl.isFormVisible\" class=\"row\">\r\n    <div class=\"col-sm-8 col-sm-offset-2\">\r\n        <legend>New answer</legend>\r\n        <answer-form question=\"ctrl.question\" model='ctrl.newAnswer' submit=\"ctrl.addAnswer\" hide=\"ctrl.hideAnswerForm\"></answer-form>\r\n    </div>\r\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 19 */
/***/ function(module, exports) {

	var path = 'd:/Programming/itechart-courses/angularjs/question-hub/src/app/new-question/new-question.html';
	var html = "<form name=\"questionForm\">\r\n    <legend>New question</legend>\r\n    <div class=\"row\">\r\n        <div class=\"col-sm-offset-2 col-sm-4 form-group\">\r\n            <input ng-model=\"ctrl.title\" required=\"required\" type=\"text\" class=\"form-control\" placeholder=\"Title\">\r\n        </div>\r\n        <div class=\"col-sm-offset-1 col-sm-3 form-group\">\r\n            <input ng-model=\"ctrl.author\" required=\"required\" type=\"text\" class=\"form-control\" placeholder=\"Author\">\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-sm-offset-2 col-sm-8 form-group\">\r\n            <textarea ng-model=\"ctrl.body\" required=\"required\" class=\"form-control\" placeholder=\"Type your question here\" rows=\"20\"></textarea>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-sm-offset-2 col-sm-8 form-group\">\r\n            <tags-input ng-model=\"ctrl.tags\" add-on-space=\"true\" min-length=\"2\"></tags-input>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-sm-offset-2 col-sm-8\">\r\n            <button ng-click=\"ctrl.addQuestion()\" ng-disabled=\"!questionForm.$valid\"\r\n                    class=\"btn btn-primary\">Ask</button>\r\n        </div>\r\n    </div>\r\n</form>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(21);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(23)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./app.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./app.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(22)();
	// imports
	
	
	// module
	exports.push([module.id, "/*.ask-btn {\r\n  margin-left: 18.67%;\r\n}*/\r\n\r\n.question-footer {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  border-top: 1px solid #EEEEEE;\r\n  padding-top: 10px;\r\n}\r\n\r\nanswer .good {\r\n  color: green;\r\n}\r\n\r\nanswer .bad {\r\n  color: red;\r\n}\r\n\r\n.vote-panel {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  margin-left: 10px;\r\n}\r\n\r\n.edit-group {\r\n  position: absolute;\r\n  top: 0px;\r\n  right: 15px;\r\n}\r\n\r\n.tags span {\r\n  margin-right: 5px;\r\n}\r\n\r\n.state.ng-enter {\r\n    transition: .5s;\r\n    opacity: 0;\r\n}\r\n\r\n.state.ng-enter-active {\r\n    opacity: 1;\r\n}\r\n\r\n.repeated-item.ng-enter,\r\n.repeated-item.ng-leave {\r\n    -webkit-transition: 400ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;\r\n    -moz-transition: 400ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;\r\n    -ms-transition: 400ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;\r\n    -o-transition: 400ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;\r\n    transition: 400ms cubic-bezier(0.250, 0.250, 0.750, 0.750) all;\r\n    position: relative;\r\n    display: block;\r\n    overflow: hidden;\r\n    text-overflow: clip;\r\n    white-space:nowrap;\r\n}\r\n\r\n.repeated-item.ng-leave.ng-leave-active,\r\n.repeated-item.ng-enter {\r\n    opacity: 0;\r\n    width: 0px;\r\n    height: 0px;\r\n}\r\n\r\n.repeated-item.ng-enter.ng-enter-active,\r\n.repeated-item.ng-leave {\r\n    opacity: 1;\r\n    width: 150px;\r\n    height: 30px;\r\n}", ""]);
	
	// exports


/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	
	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);
//# sourceMappingURL=script.js.map