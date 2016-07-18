class InvalidDateString extends Error {
    constructor(dateString) {
        super();
        this.message = `Invalid date string: ${dateString}`;
        this.name = this.constructor.name;
    }
}