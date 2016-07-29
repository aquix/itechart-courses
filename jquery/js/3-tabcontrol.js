(function ($) {
    $.fn.tabControl = function (selectedTab) {
        selectedTab = selectedTab || 0;

        this.each(function () {
            var $tabButtons = $('.tab-btn');
            var $tabs = $('.tab-content');

            $('.tab-header').click(function (e) {
                var $btn = $(e.target);
                $tabButtons.removeClass('selected');
                $btn.addClass('selected');
                $tabs.removeClass('selected');
                $tabs.eq($tabButtons.index($btn)).addClass('selected');
            });

            $tabButtons.eq(selectedTab).trigger('click');
        });

        return this;
    };
}(jQuery));
