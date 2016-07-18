class InvalidDateString extends Error {
    constructor(dateString) {
        super();
        this.message = `Invalid date string: ${dateString}`;
        this.name = this.constructor.name;
    }
}

class InvalidFormatString extends Error {
    constructor(formatString) {
        super();
        this.message = `Invalid format string: ${formatString}`;
        this.name = this.constructor.name;
    }
}