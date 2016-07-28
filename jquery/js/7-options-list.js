(function ($) {
    $.fn.optionsList = function (source) {
        source = source || [];

        this.each(function () {
            // element-specific code here
            var $this = $(this);

            if (!$this.is('input')) {
                return;
            }

            var listId;

            if ($this.attr('id')) {
                listId = $this.attr('id') + '-list';
            } else {
                listId = 'list-' + Math.round(Math.random() * 1000);
            }

            $this.attr('list', listId);

            var $dataList = $('<datalist />', { id: listId });
            source.forEach(function(option) {
                var $option = $('<option />', { value: option });
                $dataList.append($option);
            }, this);

            $dataList.insertAfter($this);
        });

        return this;
    };
}(jQuery));
