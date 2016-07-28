(function() {
    // Sorting select options
    function demo1() {
        $('#sort-btn').on('click', function () {
            var sortBy = $('#sort-key').val();
            var dataType = $('#data-type').val();
            var descending = $('#desc').is(':checked');
            $('#cities').sortOptions({ sortBy: sortBy, dataType: dataType, descending: descending });
        });
    }

    function demo2() {
        $('#inview-btn').on('click', function () {
            var visibleDivs = $('.task:inView').toArray();
            var list = $('#inview-tasks');
            list.empty();
            for (var i = 0; i < visibleDivs.length; i++) {
                list.append($('<li></li>').text(visibleDivs[i].classList.toString()));
            }
        });
    }

    function demo3() {
        $('.tab-control').tabControl();
    }

    function demo4() {
        $('.popup-test').popup({
            text: 'Hello, I\'m popup',
            delay: 100,
            color: '#2979FF'
        });
    }

    function demo5() {
        $('.input-test').tableNavigation();
    }

    function demo6() {
        $('.player').audioPlayer('../media/audio.mp3');
    }

    function demo7() {
        $('#browser-input').optionsList([
            'Internet Explorer',
            'Firefox',
            'Chrome',
            'Opera',
            'Safari'
        ]);
    }

    function demo8() {
        $('#lock-interface-btn').click(function () {
            $('body').lockBanner({
                delay: 5000,
                text: 'Ahaha! Your browser is locked'
            });
        });
    }

    function demo9() {
        $('.sortable-table').sortableTable([
            {}, {}, { dataType: 'int' }
        ]);
    }

    demo1();
    demo2();
    demo3();
    demo4();
    demo5();
    demo6();
    demo7();
    demo8();
    demo9();
}());
