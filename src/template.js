var children = $('.grid-container').children();
var childrenCache = $('.grid-container').children();
var isDesktop = false;
var isMobile = false;

/**
 * Function for swaping cells around
 */
function swap() {

    if (children.length >= 8) {
        var temp1 = children[1];
        children[1] = children[3];
        children[3] = temp1;

        temp1 = children[2];
        children[2] = children[6];
        children[6] = temp1;

        temp1 = children[5];
        children[5] = children[7];
        children[7] = temp1;

        for (var i = 0; i < children.length; i++) {

            children[i].remove();
        }

        for (var i = 0; i < children.length; i++) {
            $('.grid-container').append($(children[i]))
        }
    }
    else if (children.length === 7) {
        var temp1 = children[1];
        children[1] = children[3];
        children[3] = temp1;

        temp1 = children[2];
        children[2] = children[6];
        children[6] = temp1;


        for (var i = 0; i < children.length; i++) {
            children[i].remove();
        }

        for (var i = 0; i < children.length; i++) {
            $('.grid-container').append($(children[i]))
        }
    }
    else if (children.length === 6) {
        var temp1 = children[1];
        children[1] = children[3];
        children[3] = temp1;

        temp1 = children[2];
        children[2] = children[4];
        children[4] = temp1;


        for (var i = 0; i < children.length; i++) {
            children[i].remove();
        }

        for (var i = 0; i < children.length; i++) {
            $('.grid-container').append($(children[i]))
        }
    }
    else if (children.length === 5) {
        var temp1 = children[1];
        children[1] = children[3];
        children[3] = temp1;

        temp1 = children[1];
        children[1] = children[2];
        children[2] = temp1;

        temp1 = children[2];
        children[2] = children[4];
        children[4] = temp1;

        for (var i = 0; i < children.length; i++) {
            children[i].remove();
        }

        for (var i = 0; i < children.length; i++) {
            $('.grid-container').append($(children[i]))
        }
    }

    else if (children.length === 4) {
        var temp1 = children[1];
        children[1] = children[3];
        children[3] = temp1;

        temp1 = children[1];
        children[1] = children[2];
        children[2] = temp1;


        for (var i = 0; i < children.length; i++) {
            children[i].remove();
        }

        for (var i = 0; i < children.length; i++) {
            $('.grid-container').append($(children[i]))
        }
    }
}

if($(window).width() >= 767) {
    swap();
    isDesktop = true;
}
else{
    isMobile =true;
}
/**
 * Template script to add SmithD2L script if missing.
 */
(function () {
    if (!window.top.SmithD2L) {
        let script = document.createElement('script');
        script.setAttribute('src', '/shared/js/smithu.js');
        window.top.document.body.appendChild(script);
    }

    /**
     * Checks if view is the user view.
     */
    var d2lIframe = parent.document.body.querySelector('iframe.d2l-iframe.d2l-iframe-fit-user-content');
    if(d2lIframe){
        if(d2lIframe.parentElement.classList.contains('d2l-fileviewer-text')){
            document.body.classList.add('viewing');
        }
    }
})();

/**
 * Masonry code for styling the objects as a grid
 */


$('.grid-container').masonry({
    itemSelector: '.cell-contents',
    gutter: 4,
    columnWidth: '.cell-contents',
    percentPosition: true,

});

/**
 * Changes cells based on the screen size
 */
$(window).resize(function(){
    var windowWidth = $(this).width();

    if(windowWidth >= 767) {
        $('.grid-container').masonry('destroy');
        if(!isDesktop) {
            swap();
            isDesktop = true;
        }
        $('.grid-container').masonry({
            itemSelector: '.cell-contents',
            gutter: 4,
            columnWidth: '.cell-contents',
            percentPosition: true,

        });
        isMobile = false;
    }
    else{
        $('.grid-container').masonry('destroy');
        if(!isMobile) {
            swap();
            isMobile = true;
        }
        for(var i = 0; i < children.length; i++){
            children.remove();
        }

        for(var i = 0; i < children.length; i++){
            $('.grid-container').append($(childrenCache[i]))
        }

        $('.grid-container').masonry({
            itemSelector: '.cell-contents',
            gutter: 4,
            columnWidth: '.cell-contents',
            percentPosition: true,
        });

        children = childrenCache;
        isDesktop = false;
    }

});
