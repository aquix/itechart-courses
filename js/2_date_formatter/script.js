function printDate(date) {
    let resultElement = document.getElementById("result");
    resultElement.innerHTML = `Day: ${date.getDay()}, month: ${date.getMonth()}, year: ${date.getYear()}`;
}

document.getElementById('parse-btn').onclick = () => {
    let dateString = document.getElementById("date-input").value;
    let formatString = document.getElementById("format-input").value || undefined;

    let date = DateFormatter.parse(dateString, formatString);
    printDate(date);
};

document.getElementById('reformat-btn').onclick = () => {
    let dateString = document.getElementById("date-input").value;
    let formatString = document.getElementById("format-input").value || undefined;
    let reformatString = document.getElementById("reformat-input").value;

    let date = DateFormatter.parse(dateString, formatString);

    document.getElementById("result").innerHTML = date.format(reformatString);
};