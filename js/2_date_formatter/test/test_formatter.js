var assert = require('chai').assert;
var DateFormatter = require('../date_formatter');

describe('DateFormatter', () => {
    describe('#parse()', () => {
        it('should parse date in format "DD-MM-YYYY"', () => {
            let date = DateFormatter.parse("25-02-2015", "DD-MM-YYYY");
            assert.equal(25, date.getDay());
            assert.equal("Feb", date.getMonthShortName());
            assert.equal(2015, date.getYear());
        });

        it('should parse date in format "MMMM/DD/YYYY"', () => {
            let date = DateFormatter.parse("January/1/71", "MMMM/D/YY");
            assert.equal(1, date.getDay());
            assert.equal("Jan", date.getMonthShortName());
            assert.equal(1971, date.getYear());
        });

        it('should parse date in format without separators ', () => {
            let date = DateFormatter.parse("01082000", "DDMMYYYY");
            assert.equal(1, date.getDay());
            assert.equal("Aug", date.getMonthShortName());
            assert.equal(2000, date.getYear());
        });

        it('should parse date in unknown format', () => {
            let date = DateFormatter.parse("01082000");
            assert.equal(1, date.getDay());
            assert.equal("Aug", date.getMonthShortName());
            assert.equal(2000, date.getYear());
        });
    });

    describe('#format()', () => {
        it('should present date in correct format', () => {
            let date = new Date(2015, 0, 16);
            let formattedDate = (new DateFormatter(date)).format("MM-DD-YYYY");
            assert.equal("01-16-2015", formattedDate);
        });

        it('should present date in correct format', () => {
            let date = new Date(2015, 0, 16);
            let formattedDate = (new DateFormatter(date)).format("DDMMYY");
            assert.equal("160115", formattedDate);
        });
    })
});