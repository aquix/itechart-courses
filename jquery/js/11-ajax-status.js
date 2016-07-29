(function ($) {
    $.fn.ajaxWithStatus  = function (settings) {
        this.each(function () {
            // element-specific code here
            var $img = $('<img />', {
                src: '../images/ajax-loader.gif'
            });
            $img.insertAfter($(this));

            var userComplete = settings.complete;
            settings.complete = function () {
                $img.remove();
                userComplete && userComplete.apply(this, arguments);
            };

            $.ajax(settings);
        });

        return this;
    };
}(jQuery));