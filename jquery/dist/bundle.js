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

	(function() {
	    // var $ = require('jquery');
	    __webpack_require__(1);


	    $('#sort-btn').on('click', function () {
	        var sortBy = $('#sort-key').val();
	        var dataType = $('#data-type').val();
	        var descending = $('#desc').is(':checked');
	        $('#cities').sortOptions({ sortBy: sortBy, dataType: dataType, descending: descending });
	    });
	}());


/***/ },
/* 1 */
/***/ function(module, exports) {

	(function ($) {
	    $.fn.sortOptions = function (settings) {
	        var defaults = {
	            sortBy: 'value',
	            descending: false,
	            dataType: 'string'
	        };

	        var config = $.extend({}, defaults, settings);

	        this.each(function () {
	            // element-specific code here
	            if (!$(this).is('select')) {
	                return;
	            }

	            var options = $(this).find('option').toArray();
	            options.sort(function(op1, op2) {
	                var key;
	                var result;

	                if (config.sortBy === 'text') {
	                    key = function (op) {
	                        return $(op).text();
	                    };
	                } else if (config.sortBy === 'value') {
	                    key = function (op) {
	                        return $(op).val();
	                    };
	                }

	                if (config.dataType === 'number') {
	                    key = (function(key) {
	                        return function (op) {
	                            return parseInt(key(op));
	                        };
	                    }(key));
	                }

	                if (key(op1) < key(op2)) {
	                    result = -1;
	                } else {
	                    result = 1;
	                }

	                return config.descending ? -result : result;
	            });

	            $(this).empty();
	            $(this).append(options);
	        });

	        return this;
	    };
	}(jQuery));


/***/ }
/******/ ]);