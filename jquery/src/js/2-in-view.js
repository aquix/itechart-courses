(function ($) {
    $.extend($.expr[':'], {
        inView: function (elem) {
            var $elem = $(elem);
            var $window = $(window);

            if ($elem.offset().top > $window.scrollTop - $elem.otuerHeight(false) &&
                $elem.offset().top < $window.scrollTop + $window.height() + $elem.otuerHeight(false)) {
                return true;
            } else {
                return false;
            }
        }
    });
}(jQuery));
