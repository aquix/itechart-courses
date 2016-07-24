(function () {
    /* eslint no-undef: 0 */
    var yservice = new YoutubeService();
    yservice.getTopViewed(10, init);

    function init (previews) {
        var slider = new Slider();
        slider.buildSlider(previews);
        slider.insertSlider(document.querySelector('.outer-container'));
    }

    function Slider () {
        var slider,
            previews,
            previewWidth,
            previewMargin,
            previewFullWidth,
            pageWidth,
            sliderFullWidth,
            pageSize,
            container,
            buttons,
            currentFirstPreview;

        var MIN_PREVIEW_MARGIN = 10;

        function redraw () {
            var i;

            pageWidth = parseInt(getComputedStyle(slider).width);
            previewWidth = parseInt(getComputedStyle(previews[0]).width);

            // Calculate number of visible previews
            pageSize = 0;
            while (pageSize * (previewWidth + 2 * MIN_PREVIEW_MARGIN) <= pageWidth) {
                pageSize++;
            }
            pageSize--;

            previewMargin = Math.floor((pageWidth / pageSize - previewWidth) / 2);
            for (i = 0; i < previews.length; i++) {
                previews[i].style.marginLeft = previewMargin + 'px';
                previews[i].style.marginRight = previewMargin + 'px';
            }

            previewFullWidth = previewWidth + previewMargin * 2;
            sliderFullWidth = previewFullWidth * previews.length;

            buildButtons();
            container.querySelector('.btn-container').innerHTML = '';
            for (i = 0; i < buttons.length; i++) {
                container.querySelector('.btn-container').appendChild(buttons[i]);
            }
            scrollTo(currentFirstPreview);
        }

        this.insertSlider = function (parent) {
            var sliderContainer = createDiv('slider-container');
            var buttonContainer = createDiv('btn-container');

            sliderContainer.appendChild(slider);
            container = parent;
            container.appendChild(sliderContainer);
            container.appendChild(buttonContainer);
            redraw();
        };

        this.buildSlider = function (previewsData) {
            var preview,
                img,
                link,
                title,
                i,
                playBtn;

            slider = createDiv('slider');

            for (i = 0; i < previewsData.length; i++) {
                preview = createDiv('preview');
                playBtn = createDiv('play');

                img = document.createElement('img');
                img.src = previewsData[i].img;

                link = createLink(previewsData[i].link, img);
                title = createDiv('title');
                title.innerHTML = previewsData[i].title;

                preview.appendChild(link);
                preview.appendChild(title);
                preview.appendChild(playBtn);

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
            };
        };

        function sliderMove (e) {
            var sliderOffsetLeft;

            slider.onclick = function (e) {
                e.preventDefault();
            };

            sliderOffsetLeft = slider.offsetLeft + e.movementX;
            slider.style.left = sliderOffsetLeft + 'px';
        }

        function sliderRelease () {
            var leftOffset = -(parseInt(slider.style.left || getComputedStyle(slider).left));
            var rightLimit = sliderFullWidth - pageWidth;
            var elementToScroll;
            var borderPos = leftOffset;
            var leftPreview = 0;
            var rightPreview;

            if (leftOffset <= 0) {
                elementToScroll = 0;
            } else if (leftOffset >= rightLimit) {
                elementToScroll = previews.length - pageSize;
            } else {
                while (borderPos >= pageWidth) {
                    borderPos -= pageWidth;
                    leftPreview += pageSize;
                }

                rightPreview = leftPreview + pageSize;

                if (borderPos < pageWidth / 2) {
                    elementToScroll = leftPreview;
                } else {
                    elementToScroll = rightPreview;
                }
            }
            scrollTo(elementToScroll);
        }

        // Scrolls slider to index-s preview
        function scrollTo (index) {
            var leftOffset = -(parseInt(slider.style.left || getComputedStyle(slider).left));
            var posToScroll = index * previewFullWidth;
            var interval;
            var j;
            var currentPage;

            if (leftOffset < posToScroll) {
                interval = setInterval(movingLeft, 1);
            } else {
                interval = setInterval(movingRight, 1);
            }

            // Set active class to pressed button
            for (j = 0; j < buttons.length; j++) {
                buttons[j].classList.remove('active');
            }
            currentPage = getPage(index);
            currentFirstPreview = currentPage * pageSize;
            buttons[currentPage].classList.add('active');

            function movingLeft () {
                if (leftOffset >= posToScroll) {
                    leftOffset = posToScroll;
                    slider.style.left = -leftOffset + 'px';
                    clearInterval(interval);
                } else {
                    leftOffset += 10;
                    slider.style.left = -leftOffset + 'px';
                }
            }

            function movingRight () {
                if (leftOffset <= posToScroll) {
                    leftOffset = posToScroll;
                    slider.style.left = -leftOffset + 'px';
                    clearInterval(interval);
                } else {
                    leftOffset -= 10;
                    slider.style.left = -leftOffset + 'px';
                }
            }
        }

        function buildButtons () {
            var buttonsCount = Math.ceil(previews.length / pageSize),
                button,
                i;

            buttons = [];
            for (i = 0; i < buttonsCount; i++) {
                button = createDiv('slider-dot');
                (function (i) {
                    button.onclick = function () {
                        scrollTo(i * pageSize);
                    };
                }(i));
                buttons.push(button);
            }

            // Last button shoudn't scroll out of slider
            buttons[buttons.length - 1].onclick = function () {
                scrollTo(previews.length - pageSize);
            };
        }

        function getPage (element) {
            return Math.floor((element + pageSize - 1) / pageSize);
        }
    }

    function createLink (href, inner) {
        var link = document.createElement('a');
        link.href = href;

        if (inner !== undefined) {
            link.appendChild(inner);
        }

        return link;
    }

    function createDiv () {
        var div = document.createElement('div');
        div.classList.add(Array.prototype.slice.call(arguments));
        return div;
    }
}());
