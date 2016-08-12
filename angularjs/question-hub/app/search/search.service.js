(function() {
    'use strict';

    angular
        .module('app')
        .service('searchService', searchService);

    function searchService() {
        this.query = '';
    }
})();