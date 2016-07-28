(function ($) {
    jQuery.fn.audioPlayer = function (srcPath) {
        this.each(function () {
            var $this = $(this);
            var $audio = $('<audio />');
            $('<source />').attr('src', srcPath).appendTo($audio);
            $audio.appendTo($this);
            var audio = ($audio.get())[0];

            $this.click(function () {
                $this.toggleClass('playing');
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }
            });

        });

        return this;
    };
}(jQuery));
