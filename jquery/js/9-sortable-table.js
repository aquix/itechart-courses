(function ($) {
    $.fn.sortableTable = function (settings) {
        var defaults = {
            decreasing: false,
            dataType: 'string'
        };

        // Create config for each column
        var config = [];
        settings.forEach(function(setting) {
            config.push($.extend({}, defaults, setting));
        }, this);

        this.each(function () {
            // element-specific code here
            var $this = $(this);
            var columnHeads = $this.find('tr').eq(0).find('th');
            var tableState = [];
            columnHeads.each(function (index) {
                var state = {
                    isSorted: false,
                    isSortedDecreasing: false
                };
                tableState.push(state);

                $(this).click(function(event) {
                    event.preventDefault();

                    tableState.forEach(function(state, i) {
                        if (i !== index) {
                            state.isSorted = false;
                            state.isSortedDecreasing = false;
                            $(columnHeads[i]).removeClass('sorted');
                            $(columnHeads[i]).removeClass('decreasing');
                        }
                    }, this);

                    if (!state.isSorted) {
                        sort($this, index, false, config[index].dataType);
                        state.isSorted = true;
                        $(this).addClass('sorted');
                    } else {
                        state.isSortedDecreasing = !state.isSortedDecreasing;
                        sort($this, index, state.isSortedDecreasing, config[index].dataType);
                        $(this).toggleClass('decreasing');
                    }
                });
            });
        });

        return this;
    };

    function sort($table, columnIndex, decreasing, dataType) {
        var rows = $table.find('tr');
        if ($(rows[0]).has('th').length !== 0) {
            rows = rows.slice(1);
        }

        rows.detach();

        var key = function ($row) {
            return $row.find('td').eq(columnIndex).text();
        };

        if (dataType === 'int') {
            (function (prevKey) {
                key = function ($row) {
                    return parseInt(prevKey($row));
                };
            }(key));
        }

        rows.sort(function(row1, row2) {
            var result;

            if (key($(row1)) < key($(row2))) {
                result = -1;
            } else {
                result = 1;
            }

            return decreasing ? -result : result;
        });

        rows.appendTo($table);
    }
}(jQuery));
