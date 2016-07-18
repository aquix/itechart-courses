class DateFormatter {
    constructor(date=new Date()) {
        this._date = date;
        this._dividers = ['.', '-', '/', ' '];
        this._months = {
            "Jan": 0,
            "Feb": 1,
            "Mar": 2,
            "Apr": 3,
            "May": 4,
            "Jun": 5,
            "Jul": 6,
            "Aug": 7,
            "Sep": 8,
            "Oct": 9,
            "Nov": 10,
            "Dec": 11
        };
    };

    asDate() {
        return this._date;
    };

    parse(dateString, formatString) {
        if (formatString !== undefined) {
            dateString.trim();
            formatString.trim();

            let tokenStart = 0;
            let tokenEnd = 1;

            let parsePosition = 0;

            let tokens = {};

            while (true) {
                if (this._dividers.indexOf(formatString[tokenEnd]) != -1 ||
                    tokenEnd === formatString.length ||
                    (formatString[tokenEnd] != formatString[tokenEnd - 1] &&
                        this._dividers.indexOf(formatString[tokenEnd - 1]) == -1)) {

                    let token = formatString.slice(tokenStart, tokenEnd).toLowerCase();
                    let value = this._parseTokenValue(token, dateString, parsePosition);
                    tokens[token] = value;

                    tokenStart = tokenEnd;
                    parsePosition += value.length;

                    // Skip dividers
                    while (this._dividers.indexOf(formatString[tokenStart]) !== -1 ) {
                        if (formatString[tokenStart] === dateString[parsePosition]) {
                            parsePosition++;
                            tokenStart++;
                        } else {
                            throw new Error("Date not matches pattern");
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
        } else {
            // try all variants
        }
    }

    _validateTokens(tokens) {
        let day = 1;
        let month = 0;
        let year = 1970;

        let cleanDate = {};
        for (var token in tokens) {
            if (!tokens.hasOwnProperty(token)) {
                continue;
            }

            let value = tokens[token];

            switch (token) {
                case 'd':
                    if (value[0] === '0') {
                        throw new InvalidDateString(value);
                    }
                // fallthrough
                case 'dd':
                    let day = parseInt(value);
                    if (day === undefined || !this._isDayCorrect(day)) {
                        throw new InvalidDateString(value);
                    }
                    cleanDate['day'] = day;
                    break;
                case 'm':
                    if (value[0] === '0') {
                        throw new InvalidDateString(value);
                    }
                // fallthrough
                case 'mm':
                    month = parseInt(value);
                    if (month === undefined || !this._isMonthCorrect(month)) {
                        throw new InvalidDateString(value);
                    }
                    cleanDate['month'] = month - 1;
                    break;
                case 'mmm':
                case 'mmmm':
                    let shortedMonthName = value.slice(0, 3);
                    month = this._months[shortedMonthName];
                    if (month === undefined) {
                        throw new InvalidDateString(value);
                    }
                    cleanDate['month'] = month;
                    break;
                case 'yyyy':
                case 'yy':
                    let year = parseInt(value);
                    if (year === undefined) {
                        throw new InvalidDateString(value);
                    }

                    // If year in format YY
                    if (year < 100) {
                        if (year >= 70) {
                            year += 1900;
                        } else {
                            year += 2000;
                        }
                    }

                    if (!this._isYearCorrect(year)) {
                        throw new InvalidDateString(value);
                    }

                    cleanDate['year'] = year;
                    break;
            }
        }

        return cleanDate;
    }

    _isMonthCorrect(month) {
        return month >= 0 && month < 12;
    };

    _isDayCorrect(day) {
        return day > 0 && day < 32;
    }

    _isYearCorrect(year) {
        // FIX year interval
        return year >= 1970 && year <= 3000;
    }

    _parseTokenValue(token, str, parsePosition) {
        switch (token) {
            case 'd':
            case 'm':
            case 'mmmm':
                return this._getVariableTokenValue(str, parsePosition);
                break;
            case 'dd':
            case 'mm':
            case 'mmm':
            case 'yy':
            case 'yyyy':
                return str.slice(parsePosition, parsePosition + token.length);
            default:
                throw new InvalidFormatString(token);
        }
    }

    _getVariableTokenValue(str, parsePosition) {
        let i = parsePosition;
        while (this._dividers.indexOf(str[i]) == -1) {
            i++;
        }
        return str.slice(parsePosition, i);
    }
}