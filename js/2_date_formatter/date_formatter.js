/* eslint no-undef: 0 */
/* eslint no-magic-numbers: 0 */

class DateFormatter {
    // Static constructor

    constructor(date=new Date()) {
        // If date passed in milliseconds
        if (typeof date === 'number') {
            date = new Date(date);
        }
        this._date = date;
    }

    static get MAX_YEAR() {
        return 3000;
    }

    static get MIN_YEAR() {
        return 1970;
    }

    static get MAX_DAY() {
        return 31;
    }

    static get MAX_MONTH() {
        return 12;
    }

    asDate() {
        return this._date;
    }

    getDay() {
        return this._date.getDate();
    }

    getMonth() {
        return this._date.getMonth() + 1;
    }

    getMonthFullName() {
        let month = this.getMonth();
        return DateFormatter._getFullMonths()[month - 1];
    }

    getMonthShortName() {
        return this.getMonthFullName().slice(0, 3);
    }

    getYear() {
        return this._date.getFullYear();
    }

    fromNow() {
        let dateNow = new Date();
        let millisecondsDiff = this._date - dateNow;
        let inPast = millisecondsDiff < 0;

        if (millisecondsDiff < 0) {
            millisecondsDiff *= -1;
        }

        let diffDate = new Date(millisecondsDiff);

        let years = diffDate.getFullYear() - DateFormatter.MIN_YEAR;

        let postfix = inPast ? ' ago' : 'in future';
        return years + ' year(s)' + postfix;
    }

    format(formatString) {
        if (!formatString) {
            formatString = 'DD-MM-YYYY';
        }

        let result = [];
        let tokenStart = 0;
        let tokenEnd = 1;

        while (true) {
            if (DateFormatter._getDividers().indexOf(formatString[tokenEnd]) !== -1 ||
                tokenEnd === formatString.length ||
                (formatString[tokenEnd] !== formatString[tokenEnd - 1] &&
                DateFormatter._getDividers().indexOf(formatString[tokenEnd - 1]) === -1)) {

                let token = formatString.slice(tokenStart, tokenEnd).toLowerCase();
                result.push(this._getTokenFormattedValue(token));

                tokenStart = tokenEnd;

                // Skip dividers
                while (DateFormatter._getDividers().indexOf(formatString[tokenStart]) !== -1 ) {
                    // Add divider to result string
                    result.push(formatString[tokenStart]);
                    tokenStart++;
                }

                tokenEnd = tokenStart + 1;

                if (tokenStart >= formatString.length) {
                    break;
                }
            } else {
                tokenEnd++;
            }
        }

        return result.join('');
    }

    _getTokenFormattedValue(token) {
        switch (token) {
        case 'd':
            return this.getDay().toString();
        case 'dd':
            let day = this.getDay().toString();
            if (day.length === 1) {
                day = '0' + day;
            }
            return day;
        case 'm':
            return this.getMonth().toString();
        case 'mm':
            let month = (this.getMonth()).toString();
            if (month.length === 1) {
                month = '0' + month;
            }
            return month;
        case 'mmm':
            return this.getMonthShortName();
        case 'mmmm':
            return this.getMonthFullName();
        case 'yy':
            let year = this.getYear().toString();
            return year.slice(2, 4);
        case 'yyyy':
            return this.getYear().toString();
        default:
            throw new InvalidFormatStringError(token);
        }
    }

    static parse(dateString, formatString) {
        if (formatString !== undefined) {
            return this.parseWithFormat(dateString, formatString);
        }

        return this.parseWithoutFormat(dateString);
    }

    static parseWithFormat(dateString, formatString) {
        dateString.trim();
        formatString.trim();

        let tokenStart = 0;
        let tokenEnd = 1;

        let parsePosition = 0;

        let tokens = {};

        while (true) {
            if (this._getDividers().indexOf(formatString[tokenEnd]) !== -1 ||
                tokenEnd === formatString.length ||
                (formatString[tokenEnd] !== formatString[tokenEnd - 1] &&
                this._getDividers().indexOf(formatString[tokenEnd - 1]) === -1)) {

                // Get token and parse it value from dateString
                let token = formatString.slice(tokenStart, tokenEnd).toLowerCase();
                let value = this._parseTokenValue(token, dateString, parsePosition);
                tokens[token] = value;

                tokenStart = tokenEnd;
                parsePosition += value.length;

                // Skip dividers
                while (this._getDividers().indexOf(formatString[tokenStart]) !== -1 ) {
                    if (formatString[tokenStart] === dateString[parsePosition]) {
                        parsePosition++;
                        tokenStart++;
                    } else {
                        throw new DateFormatMatchingError(dateString, formatString);
                    }
                }

                tokenEnd = tokenStart + 1;

                if (tokenStart >= formatString.length) {
                    break;
                }
            } else {
                tokenEnd++;
            }
        }

        let cleanDate = this._validateTokens(tokens);
        let date = new Date(0);
        date.setYear(cleanDate['year']);
        date.setDate(cleanDate['day']);
        date.setMonth(cleanDate['month']);

        return new DateFormatter(date);
    }

    static parseWithoutFormat(dateString) {
        for (var format of this._getKnownFormats()) {
            try {
                return this.parseWithFormat(dateString, format);
            } catch (e) { }
        }

        // If no patterns match the date then date is incorrect
        throw new InvalidDateStringError(dateString);
    }

    static _validateTokens(tokens) {
        let day = 1;
        let month = 0;
        let year = DateFormatter.MIN_YEAR;

        const FIRST_THOUSAND_PREFIX = 1900;
        const SECOND_THOUSAND_PREFIX = 2000;
        const THOUSAND_BORDER = 70;

        let cleanDate = {};
        for (var token in tokens) {
            if (!tokens.hasOwnProperty(token)) {
                continue;
            }

            let value = tokens[token];

            switch (token) {
            case 'd':
                if (value[0] === '0') {
                    throw new InvalidDateStringError(value);
                }
                // fallthrough
            case 'dd':
                day = parseInt(value);
                if (day === undefined || !this._isDayCorrect(day)) {
                    throw new InvalidDateStringError(value);
                }
                cleanDate['day'] = day;
                break;
            case 'm':
                if (value[0] === '0') {
                    throw new InvalidDateStringError(value);
                }
                // fallthrough
            case 'mm':
                month = parseInt(value) - 1;
                if (month === undefined || !this._isMonthCorrect(month)) {
                    throw new InvalidDateStringError(value);
                }
                cleanDate['month'] = month;
                break;
            case 'mmm':
            case 'mmmm':
                let shortedMonthName = value.slice(0, 3);
                month = this._getMonths()[shortedMonthName];
                if (month === undefined) {
                    throw new InvalidDateStringError(value);
                }
                cleanDate['month'] = month;
                break;
            case 'yyyy':
            case 'yy':
                year = parseInt(value);
                if (year === undefined) {
                    throw new InvalidDateStringError(value);
                }

                // If year in format YY
                if (year < 100) {
                    if (year >= THOUSAND_BORDER) {
                        year += FIRST_THOUSAND_PREFIX;
                    } else {
                        year += SECOND_THOUSAND_PREFIX;
                    }
                }

                if (!this._isYearCorrect(year)) {
                    throw new InvalidDateStringError(value);
                }

                cleanDate['year'] = year;
                break;
            default:
                throw new InvalidFormatStringError(token);
            }
        }

        return cleanDate;
    }

    static _isMonthCorrect(month) {
        return month >= 0 && month < DateFormatter.MAX_MONTH;
    }

    static _isDayCorrect(day) {
        return day > 0 && day <= DateFormatter.MAX_DAY;
    }

    static _isYearCorrect(year) {
        // FIX year interval
        return year >= this.MIN_YEAR && year <= this.MAX_YEAR;
    }

    static _parseTokenValue(token, str, parsePosition) {
        switch (token) {
        case 'd':
        case 'm':
        case 'mmmm':
            return this._getVariableTokenValue(str, parsePosition);
        case 'dd':
        case 'mm':
        case 'mmm':
        case 'yy':
        case 'yyyy':
            return str.slice(parsePosition, parsePosition + token.length);
        default:
            throw new InvalidFormatStringError(token);
        }
    }

    static _getVariableTokenValue(str, parsePosition) {
        let i = parsePosition;
        while (this._getDividers().indexOf(str[i]) === -1) {
            i++;
        }
        return str.slice(parsePosition, i);
    }

    static _getDividers() {
        return ['.', '-', '/', ' '];
    }

    static _getMonths() {
        return {
            'Jan': 0,
            'Feb': 1,
            'Mar': 2,
            'Apr': 3,
            'May': 4,
            'Jun': 5,
            'Jul': 6,
            'Aug': 7,
            'Sep': 8,
            'Oct': 9,
            'Nov': 10,
            'Dec': 11
        };
    }

    static _getFullMonths() {
        return [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
    }

    static _getKnownFormats() {
        return [
            'DDMMYYYY', 'DDMMYY', 'DD-MM-YYYY', 'D-MM-YYYY', 'DD-MMM-YYYY', 'D-MMM-YYYY', 'DD-MMMM-YYYY', 'D-MMMM-YYYY',
            'DD-MM-YY', 'D-MM-YY', 'DD-MMM-YY', 'D-MMM-YY', 'DD-MMMM-YY', 'D-MMMM-YY',
            'DD/MM/YYYY', 'D/MM/YYYY', 'DD/MMM/YYYY', 'D/MMM/YYYY', 'DD/MMMM/YYYY',
            'D/MMMM/YYYY', 'DD/MM/YY', 'D/MM/YY', 'DD/MMM/YY', 'D/MMM/YY', 'DD/MMMM/YY', 'D/MMMM/YY',
            'DD MM YYYY', 'D MM YYYY', 'DD MMM YYYY', 'D MMM YYYY', 'DD MMMM YYYY', 'D MMMM YYYY',
            'DD MM YY', 'D MM YY', 'DD MMM YY', 'D MMM YY', 'DD MMMM YY', 'D MMMM YY', 'DD.MM.YYYY', 'D.MM.YYYY',
            'DD.MMM.YYYY', 'D.MMM.YYYY', 'DD.MMMM.YYYY', 'D.MMMM.YYYY', 'DD.MM.YY', 'D.MM.YY', 'DD.MMM.YY',
            'D.MMM.YY', 'DD.MMMM.YY', 'D.MMMM.YY', 'MM-DD-YYYY', 'MM-D-YYYY', 'MMM-DD-YYYY', 'MMM-D-YYYY',
            'MMMM-DD-YYYY', 'MMMM-D-YYYY', 'MM-DD-YY', 'MM-D-YY', 'MMM-DD-YY', 'MMM-D-YY', 'MMMM-DD-YY', 'MMMM-D-YY',
            'DDMMYYYY', 'DDMMYY', 'MM/DD/YYYY', 'MM/D/YYYY', 'MMM/DD/YYYY', 'MMM/D/YYYY', 'MMMM/DD/YYYY',
            'MMMM/D/YYYY', 'MM/DD/YY', 'MM/D/YY', 'MMM/DD/YY', 'MMM/D/YY', 'MMMM/DD/YY', 'MMMM/D/YY',
            'MM DD YYYY', 'MM D YYYY', 'MMM DD YYYY', 'MMM D YYYY', 'MMMM DD YYYY', 'MMMM D YYYY',
            'MM DD YY', 'MM D YY', 'MMM DD YY', 'MMM D YY', 'MMMM DD YY', 'MMMM D YY', 'MM.DD.YYYY', 'MM.D.YYYY',
            'MMM.DD.YYYY', 'MMM.D.YYYY', 'MMMM.DD.YYYY', 'MMMM.D.YYYY', 'MM.DD.YY', 'MM.D.YY', 'MMM.DD.YY',
            'MMM.D.YY', 'MMMM.DD.YY', 'MMMM.D.YY', 'YYYY-MM-DD', 'YYYY-MM-D', 'YYYY-MMM-DD', 'YYYY-MMM-D',
            'YYYY-MMMM-DD', 'YYYY-MMMM-D', 'YY-MM-DD', 'YY-MM-D', 'YY-MMM-DD', 'YY-MMM-D', 'YY-MMMM-DD', 'YY-MMMM-D',
            'DDMMYYYY', 'DDMMYY', 'YYYY/MM/DD', 'YYYY/MM/D', 'YYYY/MMM/DD', 'YYYY/MMM/D', 'YYYY/MMMM/DD',
            'YYYY/MMMM/D', 'YY/MM/DD', 'YY/MM/D', 'YY/MMM/DD', 'YY/MMM/D', 'YY/MMMM/DD', 'YY/MMMM/D',
            'YYYY MM DD', 'YYYY MM D', 'YYYY MMM DD', 'YYYY MMM D', 'YYYY MMMM DD', 'YYYY MMMM D',
            'YY MM DD', 'YY MM D', 'YY MMM DD', 'YY MMM D', 'YY MMMM DD', 'YY MMMM D', 'YYYY.MM.DD', 'YYYY.MM.D',
            'YYYY.MMM.DD', 'YYYY.MMM.D', 'YYYY.MMMM.DD', 'YYYY.MMMM.D', 'YY.MM.DD', 'YY.MM.D', 'YY.MMM.DD',
            'YY.MMM.D', 'YY.MMMM.DD', 'YY.MMMM.D'
        ];
    }
}

// module.exports = DateFormatter;
