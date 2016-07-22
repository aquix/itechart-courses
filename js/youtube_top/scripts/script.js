(function () {
    var yservice = new YoutubeService();
    yservice.getTopViewed(10, init);

    function init (previews) {
        var slider = new Slider();
        slider.buildSlider(previews);
        slider.insertSlider(document.querySelector('.slider-container'));
    }

    function Slider() {
        var slider,
            previews,
            previewWidth,
            previewMargin,
            previewFullWidth,
            sliderVisibleWidth,
            sliderFullWidth,
            visiblePreviewsCount;

        var MIN_PREVIEW_MARGIN = 10;

        function calcSizes() {
            sliderVisibleWidth = parseInt(getComputedStyle(slider).width);
            previewWidth = parseInt(getComputedStyle(previews[0]).width);

            // Calculate number of visible previews
            visiblePreviewsCount = 0;
            while (visiblePreviewsCount * (previewWidth + 2 * MIN_PREVIEW_MARGIN) <= sliderVisibleWidth) {
                visiblePreviewsCount++;
            }
            visiblePreviewsCount--;
            console.log(visiblePreviewsCount);
            debugger

            previewMargin = Math.floor((sliderVisibleWidth / visiblePreviewsCount - previewWidth) / 2);
            for (var i = 0; i < previews.length; i++) {
                previews[i].style.marginLeft = previewMargin + 'px';
                previews[i].style.marginRight = previewMargin + 'px';
            }

            previewFullWidth = previewWidth + previewMargin * 2;
            sliderFullWidth = previewFullWidth * previews.length;
        }

        this.insertSlider = function(parent) {
            parent.appendChild(slider);
            calcSizes();
        };

        this.buildSlider = function(previewsData) {
            var preview,
                img,
                link,
                title,
                i;

            slider = createDiv('slider');

            for (i = 0; i < previewsData.length; i++) {
                preview = createDiv('preview');

                img = document.createElement('img');
                img.src = previewsData[i].img;

                link = createLink(previewsData[i].link, img);
                title = createDiv('title');
                title.innerHTML = previewsData[i].title;

                preview.appendChild(link);
                preview.appendChild(title);

                slider.appendChild(preview);
            }

            previews = slider.children;

            // Bind listeners to slider
            slider.onmousedown = function (e) {
                e.preventDefault();
                slider.onclick = function () {};
                window.onmousemove = sliderMove;
            };

            window.onmouseup = function (e) {
                console.log(e);
                sliderRelease(e);
                window.onmousemove = function () {};
            };

            window.onresize = function () {
                calcSizes();
            }
        };

        function sliderMove(e) {
            slider.onclick = function(e) {
                e.preventDefault();
            };

            var sliderOffsetLeft = slider.offsetLeft + e.movementX;
            slider.style.left = sliderOffsetLeft + 'px';
        }

        function sliderRelease(e) {
            var leftOffset = parseInt(slider.style.left || getComputedStyle(slider).left);
            var rightLimit = sliderVisibleWidth - sliderFullWidth;

            var interval;

            if (leftOffset >= 0) {
                scrollTo(0, leftOffset);
            } else if (leftOffset <= rightLimit) {
                var elementToScroll = previews.length - visiblePreviewsCount;
                scrollTo(elementToScroll, leftOffset);
            }
        }

        // Scrolls slider to index-s preview
        function scrollTo(index, leftOffset) {
            var posToScroll = -index * previewFullWidth;

            if (leftOffset > posToScroll) {
                interval = setInterval(movingLeft, 1);
            } else {
                interval = setInterval(movingRight, 1);
            }

            function movingLeft () {
                if (leftOffset <= posToScroll) {
                    leftOffset = posToScroll;
                    slider.style.left = leftOffset + 'px';
                    clearInterval(interval)
                } else {
                    leftOffset -= 10;
                    slider.style.left = leftOffset + 'px';
                }
            }

            function movingRight () {
                if (leftOffset >= posToScroll) {
                    leftOffset = posToScroll;
                    slider.style.left = leftOffset + 'px';
                    clearInterval(interval)
                } else {
                    leftOffset += 10;
                    slider.style.left = leftOffset + 'px';
                }
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