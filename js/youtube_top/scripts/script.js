(function () {
    var yservice = new YoutubeService();
    yservice.getTopViewed(10, init);

    function init (previews) {
        var slider = new Slider();
        slider.buildSlider(previews);
        slider.insertSlider(document.querySelector('.outer-container'));
    }

    function Slider() {
        var slider,
            previews,
            previewWidth,
            previewMargin,
            previewFullWidth,
            sliderVisibleWidth,
            sliderFullWidth,
            visiblePreviewsCount,
            container,
            buttons,
            currentFirstPreview;

        var MIN_PREVIEW_MARGIN = 10;

        function redraw() {
            var i;

            sliderVisibleWidth = parseInt(getComputedStyle(slider).width);
            previewWidth = parseInt(getComputedStyle(previews[0]).width);

            // Calculate number of visible previews
            visiblePreviewsCount = 0;
            while (visiblePreviewsCount * (previewWidth + 2 * MIN_PREVIEW_MARGIN) <= sliderVisibleWidth) {
                visiblePreviewsCount++;
            }
            visiblePreviewsCount--;

            previewMargin = Math.floor((sliderVisibleWidth / visiblePreviewsCount - previewWidth) / 2);
            for (i = 0; i < previews.length; i++) {
                previews[i].style.marginLeft = previewMargin + 'px';
                previews[i].style.marginRight = previewMargin + 'px';
            }

            previewFullWidth = previewWidth + previewMargin * 2;
            sliderFullWidth = previewFullWidth * previews.length;

            buildButtons();
            container.querySelector('.btn-container').innerHTML = "";
            for (i = 0; i < buttons.length; i++) {
                container.querySelector('.btn-container').appendChild(buttons[i]);
            }
            scrollTo(currentFirstPreview);
        }

        this.insertSlider = function(parent) {
            var sliderContainer = createDiv('slider-container'),
                buttonContainer = createDiv('btn-container');
            sliderContainer.appendChild(slider);
            container = parent;
            container.appendChild(sliderContainer);
            container.appendChild(buttonContainer);
            redraw();
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
            currentFirstPreview = 0;
            // Create navigation buttons

            // Bind listeners to slider
            slider.onmousedown = function (e) {
                e.preventDefault();
                slider.onclick = function () {};
                window.onmousemove = sliderMove;
            };

            window.onmouseup = function (e) {
                sliderRelease(e);
                window.onmousemove = function () {};
            };

            window.onresize = function () {
                redraw();
                // sliderRelease();
            }
        };

        function sliderMove(e) {
            slider.onclick = function(e) {
                e.preventDefault();
            };

            var sliderOffsetLeft = slider.offsetLeft + e.movementX;
            slider.style.left = sliderOffsetLeft + 'px';
        }

        function sliderRelease() {
            var leftOffset = -(parseInt(slider.style.left || getComputedStyle(slider).left));
            var rightLimit = sliderFullWidth - sliderVisibleWidth;
            var elementToScroll;

            if (leftOffset <= 0) {
                elementToScroll = 0;
            } else if (leftOffset >= rightLimit) {
                elementToScroll = previews.length - visiblePreviewsCount;
            } else {
                var borderPos = leftOffset;
                var leftPreview = 0;
                var rightPreview;
                while (borderPos >= previewFullWidth) {
                    borderPos -= previewFullWidth;
                    leftPreview++;
                }
                rightPreview = leftPreview + 1;
                if (borderPos < previewFullWidth / 2) {
                    elementToScroll = leftPreview;
                } else {
                    elementToScroll = rightPreview;
                }
            }
            scrollTo(elementToScroll);
        }

        // Scrolls slider to index-s preview
        function scrollTo(index) {
            console.log(index);
            var leftOffset = -(parseInt(slider.style.left || getComputedStyle(slider).left)),
                posToScroll = index * previewFullWidth,
                interval;

            if (leftOffset < posToScroll) {
                interval = setInterval(movingLeft, 1);
            } else {
                interval = setInterval(movingRight, 1);
            }

            // Set active class to pressed button
            for (var j = 0; j < buttons.length; j++) {
                buttons[j].classList.remove('active');
            }
            var currentPage = getPage(index);
            currentFirstPreview = currentPage * visiblePreviewsCount;
            buttons[currentPage].classList.add('active');

            function movingLeft () {
                if (leftOffset >= posToScroll) {
                    leftOffset = posToScroll;
                    slider.style.left = -leftOffset + 'px';
                    clearInterval(interval)
                } else {
                    leftOffset += 10;
                    slider.style.left = -leftOffset + 'px';
                }
            }

            function movingRight () {
                if (leftOffset <= posToScroll) {
                    leftOffset = posToScroll;
                    slider.style.left = -leftOffset + 'px';
                    clearInterval(interval)
                } else {
                    leftOffset -= 10;
                    slider.style.left = -leftOffset + 'px';
                }
            }
        }

        function buildButtons() {
            var buttonsCount = Math.ceil(previews.length / visiblePreviewsCount),
                button,
                i;

            buttons = [];
            for (i = 0; i < buttonsCount; i++) {
                button = createDiv('slider-btn');
                (function (i) {
                   button.onclick = function () {
                       scrollTo(i * visiblePreviewsCount);
                   };
                }(i));
                buttons.push(button);
            }

            // Last button shoudn't scroll out of slider
            buttons[buttons.length - 1].onclick = function () {
                scrollTo(previews.length - visiblePreviewsCount);
            };
        }

        function getPage(element) {
            return Math.floor(element / visiblePreviewsCount);
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