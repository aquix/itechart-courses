(function ($) {
    $.fn.sortOptions = function (settings) {
        var defaults = {
            sortBy: 'value',
            descending: false,
            dataType: 'string'
        };

        var config = $.extend({}, defaults, settings);

        this.each(function () {
            var $this = $(this);
            // element-specific code here
            if (!$this.is('select')) {
                return;
            }

            var options = $this.find('option').toArray();
            options.sort(function(op1, op2) {
                var key;
                var result;

                if (config.sortBy === 'text') {
                    key = function (op) {
                        return $(op).text();
                    };
                } else if (config.sortBy === 'value') {
                    key = function (op) {
                        return $(op).val();
                    };
                }

                if (config.dataType === 'number') {
                    key = (function(key) {
                        return function (op) {
                            return parseInt(key(op));
                        };
                    }(key));
                }

                if (key(op1) < key(op2)) {
                    result = -1;
                } else {
                    result = 1;
                }

                return config.descending ? -result : result;
            });

            $this.empty();
            $this.append(options);
        });

        return this;
    };
}(jQuery));
