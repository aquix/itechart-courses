(function ($) {
    $.fn.popup = function (settings) {
        var defaults = {
            text: 'Popup',
            color: '#fff',
            align: 'left',
            delay: 0
        };

        var config = $.extend({}, defaults, settings);

        this.each(function () {
            var $elem = $(this);
            var timeout;
            var $popup;
            $elem.hover(function (event) {
                timeout = setTimeout(function () {
                    $popup = $('<div />', {
                        'class': 'popup',
                        'text': config.text
                    }).css({
                        'background-color': config.color,
                        'text-align': config.align,
                        'top': event.pageY + 10,
                        'left': event.pageX + 10
                    });

                    $elem.on('mousemove.popUpMoving', function (event) {
                        console.log(event.pageX, event.pageY);
                        $popup.css({
                            top: event.pageY + 10,
                            left: event.pageX + 10
                        }).fadeIn('slow');
                    });

                    $elem.append($popup);
                }, config.delay);
            }, function () {
                clearTimeout(timeout);
                $elem.off('.popUpMoving');
                $popup.remove();
            });
        });

        return this;
    };
}(jQuery));
