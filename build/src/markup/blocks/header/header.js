$(function() {
    $('.js-toggle-menu').click(function(){
        $(this).toggleClass('collapsed');
        $('.js-menu-showing').toggleClass('show');
    });

    $('.js-toggle-share').click(function(){
    	$('.js-share-showing').toggleClass('show');
    });
    $(window).click(function(e)
    {
        if(!$(e.target).hasClass('js-toggle-share') && !$(e.target).hasClass('js-share-showing') && !$('.js-share-showing').has($(e.target)).length)
        {
            $('.js-share-showing').removeClass('show');
        }
    });

});