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
            var $banner = $('<div />', { 'class': 'banner' });
            var $bannerContent = $('<div />', {
                'class': 'banner-content',
                'text': config.text
            });
            $banner.append($bannerContent);
            $banner.on('mousedown', function (event) {
                event.preventDefault();
                event.stopPropagation();
            });
            setTimeout(function () {
                $banner.remove();
            }, config.delay);
            $this.append($banner);
        });

        return this;
    };
}(jQuery));
