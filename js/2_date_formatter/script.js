/* eslint no-undef: 0 */

function printDate(date) {
    let resultElement = document.getElementById('result');
    resultElement.innerHTML = `Day: ${date.getDay()}, month: ${date.getMonth()}, year: ${date.getYear()}`;
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
    let date = parseDate();
    printDate(date);
};

document.getElementById('reformat-btn').onclick = () => {
    let date = parseDate();
    let reformatString = document.getElementById('reformat-input').value;
    document.getElementById('result').innerHTML = date.format(reformatString);
};

document.getElementById('fromnow-btn').onclick = () => {
    let date = parseDate();
    document.getElementById('result').innerHTML = date.fromNow();
};
