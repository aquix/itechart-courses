(function () {
    var yservice = new YoutubeService();
    var text = '';
    yservice.getTopViewed(20, buildSlider);

    function buildSlider(previews) {
        var slider = document.querySelector('.slider'),
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

            previewDiv.appendChild(link);
            previewDiv.appendChild(title);

            slider.appendChild(previewDiv);
        }

        // Bind listeners to slider
        slider.onmousedown = function (e) {
            e.preventDefault();
            slider.style.zIndex = -1;
            window.onmousemove = sliderMove;
            console.log('mouse down');
        };

        window.onmouseup = function () {
            slider.style.zIndex = 0;
            console.log('mouse up');
            window.onmousemove = function () {
            }
        };

        window.onclick = function(e) {
            console.log(e);
        }
    }

    function sliderMove(e) {
        var slider = document.querySelector('.slider');
        if (e.movementX < 0) {
            debugger
        }
        var sliderOffsetLeft = slider.offsetLeft + e.movementX;
        slider.style.left = sliderOffsetLeft + 'px';
        console.log(e);
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