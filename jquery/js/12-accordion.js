(function ($) {
    $.fn.accordion = function () {
        this.each(function () {
            var $heads = $('.accordion-head');
            var $contents = $('.accordion-content');

            $heads.each(function (index) {
                var $this = $(this);
                $this.click(function () {
                    // $contents.eq(index).toggleClass('visible');
                    var $content = $contents.eq(index);
                    if ($content.css('display') === 'none') {
                        $content.show('slow');
                    } else {
                        $content.hide('slow');
                    }
                    $this.toggleClass('active');
                });
            });
        });

        return this;
    };
}(jQuery));
