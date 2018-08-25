$(function() {
    // init masonry
    var $grid = $('.grid').masonry({
        itemSelector: '.grid__item',
        columnWidth: 470,
        gutter: 30,
        fitWidth: true,
        horizontalOrder: true
    });
    $grid.imagesLoaded().progress(function() {
        $grid.masonry('layout');
    });
    // init masonry --/

    // news popup
    $('.js-open-this-news-item').click(function(e) {
        e.preventDefault();
        var newsItemID = $(this).data('news-item-id');
        getNewsItemAndRender(newsItemID);
    });
    $(document).on('click', '.js-close-news-popup', destroyNewsPopup);
    $(document).on('click', '.js-next-news-item', renderNextNewsItem);
    $(document).on('click', '.js-prev-news-item', renderPrevNewsItem);
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            destroyNewsPopup();
        }
    });

    function getNewsItemAndRender(newsItemID, isNextOrPrev) {
        $.ajax({
            type: 'GET',
            url: 'news.json',
            dataType: 'json',
            success: function(data) {
                var item = $.grep(data, function(obj) { return obj.id === newsItemID })[0];
                if (isNextOrPrev) {
                    var nextItemIndex = isNextOrPrev == "next" ? $.inArray(item, data) + 1 : $.inArray(item, data) - 1;
                    item = (data.length > nextItemIndex) && (nextItemIndex >= 0) ? $.grep(data, function(obj, index) { return index === nextItemIndex })[0] : null;
                }
                if (item) {
                    renderNewsItem(item);
                    imagesInPopupLoaded();
                }
            }
        });
    }

    function imagesInPopupLoaded(){
        var popup = $('.js-toggle-news-popup');
        popup.imagesLoaded().always(function() {
            popup.removeClass('loading').addClass('showed');
        });
    }

    function renderNewsItem(item) {
        var newsListItem = "<li class='news__item' data-news-item-id='" + item.id + "'> <div class='news__img-wrap'> <figure class='news__img'><img src='" + item.img + "' alt=''></figure> <div class='news__nav'> <button class='news__nav-btn news__nav-btn--close js-close-news-popup' type='button'><i class='icon icon-close'></i></button> <button class='news__nav-btn news__nav-btn--prev js-prev-news-item' type='button'><i class='icon icon-greater'></i></button> <button class='news__nav-btn news__nav-btn--next js-next-news-item' type='button'><i class='icon icon-greater'></i></button> </div> </div> <section class='news__section'> <ul class='news__side'> <li class='news__side-item'> <div class='news__side-cptn'>Date</div> <div class='news__side-sub'>" + item.date + "</div> </li> <li class='news__side-item'> <div class='news__side-cptn'>Comments</div> <div class='news__side-sub'>" + item.commentsNumber + " Comments</div> </li> <li class='news__side-item'> <div class='news__side-cptn'>Share</div> <ul class='news__side-social'> <li class='news__side-social-item'><a class='news__side-social-link' href='#'><i class='icon icon-fb'></i></a></li> <li class='news__side-social-item'><a class='news__side-social-link' href='#'><i class='icon icon-twitter'></i></a></li> <li class='news__side-social-item'><a class='news__side-social-link' href='#'><i class='icon icon-google-plus'></i></a></li> <li class='news__side-social-item'><a class='news__side-social-link' href='#'><i class='icon icon-pinterest'></i></a></li> </ul> </li> </ul>" + item.content + " </section> </li>";
        $('.js-render-news-here').html('').append(newsListItem);
        $('.js-toggle-news-popup').removeClass('showed').addClass('loading');
        $('body').addClass('no-scroll');
    }

    function destroyNewsPopup() {
        $('.js-render-news-here').html('');
        $('.js-toggle-news-popup').removeClass('showed');
        $('body').removeClass('no-scroll');
    }

    function renderNextNewsItem() {
        var newsItemID = $(this).parents('[data-news-item-id]').data('news-item-id');
        getNewsItemAndRender(newsItemID, "next");
    }

    function renderPrevNewsItem() {
        var newsItemID = $(this).parents('[data-news-item-id]').data('news-item-id');
        getNewsItemAndRender(newsItemID, "prev");
    }
    // news popup --/
});