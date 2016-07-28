(function ($) {
    $.fn.tabControl = function (selectedTab) {
        selectedTab = selectedTab || 0;

        this.each(function () {
            var $tabButtons = $('.tab-btn');
            var $tabs = $('.tab-content');
            $tabButtons.each(function (tabIndex) {
                $tabButtons.eq(tabIndex).on('click', function () {
                    $tabButtons.removeClass('selected');
                    $tabButtons.eq(tabIndex).addClass('selected');
                    $tabs.removeClass('selected');
                    $tabs.eq(tabIndex).addClass('selected');
                });
            });

            $tabButtons.eq(selectedTab).trigger('click');
        });

        return this;
    };
}(jQuery));
