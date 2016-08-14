/* @ngInject */
export default function QuestionListCtrl(db, searchService) {
    var self = this;

    self.searchService = searchService;
    self.db = db;

    self.searchFilter = function (item) {
        if (item.title.toLowerCase().includes(self.searchService.query.toLowerCase()) ||
            item.body.toLowerCase().includes(self.searchService.query.toLowerCase()) ||
            item.author.toLowerCase().includes(self.searchService.query.toLowerCase())) {

            return true;
        }

        // Check by tags
        var queryTags = self.searchService.query.split(' ');
        return _.difference(queryTags, item.tags).length === 0;
    }
}