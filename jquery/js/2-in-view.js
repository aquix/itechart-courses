(function ($) {
    $.extend($.expr[':'], {
        inView: function (elem) {
            var $elem = $(elem);
            var $window = $(window);

            if ($elem.offset().top > $window.scrollTop() - $elem.outerHeight(false) &&
                $elem.offset().top < $window.scrollTop() + $window.height() + $elem.outerHeight(false)) {
                return true;
            }

            return false;
        }
    });
}(jQuery));
