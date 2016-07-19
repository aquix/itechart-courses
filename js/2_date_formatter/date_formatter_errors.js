class InvalidDateStringError extends Error {
    constructor(dateString) {
        super();
        this.message = `Invalid date string: ${dateString}`;
        this.name = this.constructor.name;
    }
}

class InvalidFormatStringError extends Error {
    constructor(formatString) {
        super();
        this.message = `Invalid format string: ${formatString}`;
        this.name = this.constructor.name;
    }
}

class DateFormatMatchingError extends Error {
    constructor(dateString, formatString) {
        super();
        this.message = `Date ${dateString} doesn't matches format ${formatString}`;
        this.name = this.constructor.name;
    }
}