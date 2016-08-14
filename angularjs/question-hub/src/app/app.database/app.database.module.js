import db from './db.service';

export default angular.module('app.database', [])
    .factory('db', db)
    .name;