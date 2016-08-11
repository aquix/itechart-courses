var SearchCtrl = function (searchService) {
    this.data = searchService.data;
}

SearchCtrl.$inject = ['searchService'];
app.controller('SearchCtrl', SearchCtrl);