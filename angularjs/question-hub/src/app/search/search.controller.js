(function() {
    'use strict';

    angular
        .module('app')
        .controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['searchService'];
    function SearchCtrl(searchService) {
        this.searchService = searchService;
    }
})();