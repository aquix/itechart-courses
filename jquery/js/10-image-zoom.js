(function ($) {
    $.fn.imageZoom = function (settings) {
        var defaults = {
            size: 150,
            zoom: 2
        };

        var config = $.extend({}, defaults, settings);

        this.each(function () {
            var $img = $(this);
            var $popup;
            $img.hover(function (event) {
                var $bigImage = $img.clone();
                var width = $img.css('width');
                var height = $img.css('height');
                $bigImage.css({
                    width: (parseInt(width) * config.zoom) + 'px',
                    height: (parseInt(height) * config.zoom) + 'px'
                });

                $popup = $('<div />', {
                    'class': 'zoom'
                }).css({
                    top: event.pageY - config.size / 2,
                    left: event.pageX - config.size / 2,
                    width: config.size + 'px',
                    height: config.size + 'px'
                });

                $img.on('mousemove.popUpMoving', function (event) {
                    var offset = $img.offset();
                    $popup.css({
                        top: event.pageY - config.size / 2,
                        left: event.pageX - config.size / 2
                    }).fadeIn('slow');

                    $bigImage.css({
                        top: (offset.top - event.pageY) * config.zoom + config.size / config.zoom + 'px',
                        left: (offset.left - event.pageX) * config.zoom + config.size / config.zoom + 'px'
                    });
                });

                $popup.append($bigImage);
                $popup.insertAfter($img);
            }, function () {
                $img.off('.popUpMoving');
                $popup.remove();
            });
        });

        return this;
    };
} (jQuery));
