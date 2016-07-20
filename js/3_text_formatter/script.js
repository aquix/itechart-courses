(function () {
    WrapOptions = {
        WORD: "word",
        SENTENCE: "sentence",
        SYMBOL: "symbol",
        NONE: "none"
    };

    function formatText (text, wrapOption, linesCount, maxLength) {
        text = text || '';
        maxLength = maxLength || document.getElementById('output-area').cols;

        var formattedText,
            lines,
            regExp,
            currentLine,
            words;

        switch (wrapOption) {
            case WrapOptions.SENTENCE:
                formattedText = text.replace(/([^.!?]+[.!?])(\s)/g, '$1\n');
                break;
            case WrapOptions.SYMBOL:
                regExp = new RegExp('.{1,' + maxLength + '}', 'g');
                lines = text.match(regExp);
                formattedText = lines.join('\n');
                break;
            case WrapOptions.NONE:
                formattedText = text;
                break;
            case WrapOptions.WORD:
                formattedText = text;
                break;
        }

        if (linesCount != 0) {
            formattedText = formattedText.split('\n').slice(0, linesCount).join('\n');
        }

        return formattedText;
    }

    // Bind listeners
    document.getElementById('format-btn').onclick = function () {
        var text = document.getElementById('input-area').value,
            wrapOption = document.getElementById('options-select').value,
            linesCount = document.getElementById('lines-count').value,
            formattedText;
        formattedText = formatText(text, wrapOption, linesCount);
        document.getElementById('output-area').value = formattedText;

    };

    // Some shit code to auto reformat text when resizing textarea
    document.getElementById('output-area').onmouseup = function () {
        var magicNumber = 7.35,
            self = document.getElementById('output-area'),
            width = parseInt(self.style.width);
        self.cols = width / magicNumber;

        document.getElementById('format-btn').onclick();
    };

    document.getElementById('output-area').onmouseup();

}());