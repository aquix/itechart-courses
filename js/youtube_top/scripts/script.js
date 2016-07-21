(function () {
    var yservice = new YoutubeService();
    var text = '';
    yservice.getTopViewed(10, buildSlider);

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

            slider.onclick = function () {}
            window.onmousemove = sliderMove;
        };

        window.onmouseup = function (e) {
            console.log(e);
            sliderRelease(e);
            window.onmousemove = function () {};
        };
    }

    function sliderMove(e) {
        document.querySelector('.slider').onclick = function(e) {
            e.preventDefault();
        };

        var slider = document.querySelector('.slider');
        var sliderOffsetLeft = slider.offsetLeft + e.movementX;
        slider.style.left = sliderOffsetLeft + 'px';
    }

    function sliderRelease(e) {
        var slider = document.querySelector('.slider'),
            leftOffset = parseInt(slider.style.left || getComputedStyle(slider).left),
            width = parseInt(getComputedStyle(slider).width);

        var previews = slider.children;
        var previewWidth = parseInt(getComputedStyle(previews[0]).width);
        var previewIndent = parseInt(getComputedStyle(previews[0]).marginLeft) +
            parseInt(getComputedStyle(previews[0]).marginRight);
        var fullWidth = (previewWidth + previewIndent) * previews.length;
        var rightLimit = width - fullWidth;

        var interval;
        if (leftOffset > 0) {
            interval = setInterval(movingLeft, 1);
        } else if (leftOffset < rightLimit) {
            interval = setInterval(movingRight, 1);
        }

        function movingLeft () {
            if (leftOffset <= 0) {
                leftOffset = 0;
                slider.style.left = leftOffset + 'px';
                clearInterval(interval)
            } else {
                leftOffset -= 10;
                slider.style.left = leftOffset + 'px';
            }
        }

        function movingRight () {
            debugger
            if (leftOffset >= rightLimit) {
                leftOffset = rightLimit;
                slider.style.left = leftOffset + 'px';
                clearInterval(interval)
            } else {
                leftOffset += 10;
                slider.style.left = leftOffset + 'px';
            }
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