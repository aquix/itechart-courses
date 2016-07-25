/* eslint no-undef: 0 */

function printDate(date) {
    let resultElement = document.getElementById('result');
    resultElement.innerHTML = `Day: ${date.getDay()}, month: ${date.getMonth()}, year: ${date.getYear()}`;
}

function printError(error) {
    let resultElement = document.getElementById('result');
    resultElement.innerHTML = `Error: ${error.message}`;
}

function createDateByString(dateString, formatString) {
    let date;
    // Check if date is in milliseconds
    if (isNaN(+dateString)) {
        date = DateFormatter.parse(dateString, formatString);
    } else {
        date = new DateFormatter(+dateString);
    }

    return date;
}

function parseDate() {
    let dateString = document.getElementById('date-input').value;
    let formatString = document.getElementById('format-input').value || undefined;

    return createDateByString(dateString, formatString);
}

document.getElementById('parse-btn').onclick = () => {
    try {
        let date = parseDate();
        printDate(date);
    } catch (e) {
        printError(e)
    }
};

document.getElementById('reformat-btn').onclick = () => {
    try {
        let date = parseDate();
        let reformatString = document.getElementById('reformat-input').value;
        document.getElementById('result').innerHTML = date.format(reformatString);
    } catch (e) {
        printError(e)
    }
};

document.getElementById('fromnow-btn').onclick = () => {
    try {
        let date = parseDate();
    } catch (e) {
        document.getElementById('result').innerHTML = date.fromNow();
    }
};
