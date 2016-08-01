(function ($) {
    $.fn.lockBanner = function (settings) {
        var defaults = {
            text: 'Test',
            delay: 1000
        };

        var config = $.extend({}, defaults, settings);

        this.each(function () {
            // element-specific code here
            var $this = $(this);
            $this.css('position', 'relative');
            var $background = $('<div />', { 'class': 'banner-background' });
            var $bannerContent = $('<div />', {
                'class': 'banner-content',
                'text': config.text
            });
            $background.append($bannerContent);
            $background.on('mousedown', function (event) {
                event.preventDefault();
                event.stopPropagation();
            });
            setTimeout(function () {
                $background.remove();
            }, config.delay);
            $this.append($background);
        });

        return this;
    };
}(jQuery));
