(function () {
    var yservice = new YoutubeService();
    var text = '';
    yservice.getTopViewed(20, buildSlider);

    function buildSlider(previews) {
        var sliderContainer = document.querySelector('.slider-container'),
            previewDivs = [],
            previewDiv,
            img,
            link,
            title,
            i;

        for (i = 0; i < previews.length; i++) {
            previewDiv = createDiv('preview');

            img = document.createElement('img');
            img.src = previews[i].img;

            link = createLink(previews[i].link, img);
            title = createDiv('title');
            title.innerHTML = previews[i].title;

            previewDiv.appendChild(link, title)

            sliderContainer.appendChild(previewDiv);
        }
    }

    function createLink(href, inner) {
        var link = document.createElement('a');
        link.href = href;

        if (inner !== undefined) {
            link.appendChild(inner);
        }

        return link;
    }

    function createDiv() {
        var div = document.createElement('div');
        div.classList.add(Array.prototype.slice.call(arguments));
        return div;
    }

}());