class DateFormatter {
    constructor(date=new Date()) {
        this._date = new Date();
        this._format = 'DD-MM-YYYY';
    };

    asDate() {
        return this._date;
    };

    static parse(dateString, formatString) {
        let year = 1970;
        let month = 0;
        let day = 0;
        let hours = 0;
        let minutes = 0;
        let seconds = 0;

        if (formatString === undefined) {
            // Try to split date by - . / or space
            let dateParts = dateString.split(' ').split('-').split('/').split('.');

            if (dateParts.length !== 0 && dateParts.length !== 3) {
                throw new InvalidDateString(dateString);
            }

            // Date in format DMY, YMD or MDY
            if (dateParts.length === 3) {
                // Sort by string length to find year
                let datePartsSorted = dateParts.slice().sort((s1, s2) => {
                    return s1.length - s2.length;
                });

                // If length of last element is 4 symbols - it's year
                // else it's month in full word format
                if (datePartsSorted[2] === 4) {
                    year = parseInt(datePartsSorted[2]);
                    if (isNaN(year)) {
                        throw new InvalidDateString(dateString);
                    }

                    // If second element length is 3 - it's month in short word format
                    if (datePartsSorted[1].length === 3) {
                        month = this._months[datePartsSorted[1]];
                        if (month === undefined) {
                            throw new InvalidDateString(dateString);
                        }

                        day = datePartsSorted[0];
                        if (day > 31) {
                            throw new InvalidDateString(dateString);
                        }
                    } else {

                    }
                }
            }
        }
    }

    static _months = {
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
}