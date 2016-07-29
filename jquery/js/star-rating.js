(function ($) {
    $.fn.starRating = function () {
        this.each(function () {
            var $container = $(this);
            var $stars = $container.find('.star');
            var prevState;

            var mouseIn = function (event) {
                prevState = saveState($stars);
                $container.off('mouseenter', mouseIn);
            };

            $container.hover(mouseIn, function (e) {
                restoreState($stars, prevState);
                $container.on('mouseenter', mouseIn);
            });



            $stars.each(function () {
                var $this = $(this);
                var $img = $('<img />', {
                    src: '../images/star.png'
                });
                $img.appendTo($this);

                $this.mouseenter(function () {
                    $this.prevAll().add($this).html($('<img />', {
                        src: '../images/star-active.png'
                    }));

                    $this.nextAll().html($('<img />', {
                        src: '../images/star.png'
                    }));
                });
            });

            $stars.find('img').click(function (e) {
                e.stopPropagation();
            });

            $stars.click(function () {
                prevState = saveState($stars);
            });
        });

        return this;
    };

    function saveState($stars) {
        var imgSources = [];
        $stars.each(function () {
            imgSources.push($(this).find('img').attr('src'));
        });

        return imgSources;
    }

    function restoreState($stars, imgSources) {
        $stars.each(function (index) {
            $(this).find('img').attr('src', imgSources[index]);
        });
    }
}(jQuery));
