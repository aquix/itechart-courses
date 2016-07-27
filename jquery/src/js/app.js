(function() {
    // var $ = require('jquery');
    require('./1-select-sorter');


    $('#sort-btn').on('click', function () {
        var sortBy = $('#sort-key').val();
        var dataType = $('#data-type').val();
        var descending = $('#desc').is(':checked');
        $('#cities').sortOptions({ sortBy: sortBy, dataType: dataType, descending: descending });
    });
}());
