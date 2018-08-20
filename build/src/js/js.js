$(function() {
    // init masonry
    var $grid;

    buildMasonry();
    function buildMasonry() {
        $grid = $('.js-init-masonry').imagesLoaded(function() {
            $grid.masonry({
                itemSelector: '.grid__item',
                columnWidth: 470,
                gutter: 30,
                fitWidth: true,
                horizontalOrder: true
            });
        });
    }

    function reloadMasonry() {
        console.log($grid)
        setTimeout(function(){
            $grid.masonry('reloadItems')
            console.log('masonry')
        },2000)
    }

    $(window).resize(function() {
        reloadMasonry();
    });
    // init masonry --/
});