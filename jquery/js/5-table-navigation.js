(function ($) {
    var KEYS = {
        left: 37,
        up: 38,
        right: 39,
        down: 40
    };

    var isArrowKey = function (keyCode) {
        if (KEYS.left === keyCode ||
            KEYS.right === keyCode ||
            KEYS.up === keyCode ||
            KEYS.down === keyCode) {

            return true;
        }

        return false;
    };

    $.fn.tableNavigation = function () {

        this.each(function () {
            // element-specific code here
            var $table = $(this);
            if (!$table.is('table')) {
                return;
            }

            $table.find('input').keydown(function (event) {
                if (isArrowKey(event.keyCode)) {
                    event.preventDefault();
                }
                // console.log('From input' + event);
            });

            $table.keydown(function (event) {
                if (!isArrowKey(event.keyCode)) {
                    return;
                }

                // Find current focused input
                // If no one - by default it will be input with imaginary coords (-1, -1)
                var $currentInput = $table.find('input:focus');
                var inputCoords = { x: -1, y: -1};
                var dx = 0;
                var dy = 0;

                switch (event.keyCode) {
                case KEYS.left:
                    dx = -1;
                    break;
                case KEYS.right:
                    dx = 1;
                    break;
                case KEYS.up:
                    dy = -1;
                    break;
                case KEYS.down:
                    dy = 1;
                    break;
                }

                if ($currentInput.length !== 0) {
                    var $rows = $table.find('tr');
                    // Find row which contains input
                    var $row = $rows.filter(function () {
                        return $(this).has($currentInput).length !== 0;
                    });

                    // Find cell which contains input
                    var $cells = $row.find('td');
                    var $cell = $cells.filter(function () {
                        return $(this).has($currentInput).length !== 0;
                    });

                    inputCoords.x    = $cells.index($cell);
                    inputCoords.y = $rows.index($row);

                    var $nextRow = $rows.eq(inputCoords.y + dy);
                    if ($nextRow.length === 0) {
                        if (dy === 1) {
                            $nextRow = $rows.eq(0);
                        } else {
                            $nextRow = $rows.eq(-1);
                        }
                    }

                    var $nextCell = $nextRow.find('td').eq(inputCoords.x + dx);
                    if ($nextCell.length === 0) {
                        if (dx === 1) {
                            $nextCell = $nextRow.find('td').eq(0);
                        } else {
                            $nextCell = $nextRow.find('td').eq(-1);
                        }
                    }

                    $nextCell.find('input').trigger('focus');
                }
            });
        });

        return this;
    };
}(jQuery));
