/**
 * Template script to add SmithD2L script if missing.
 */
(function () {
    let gridContiainer = $('.grid-container');
    let children = gridContiainer.children();
    let isDesktop = false;
    let isMobile = false;

    /**
     * Function for swaping cells around
     */
    function swap() {

        if (children.length >= 8) {
            let temp1 = children[1];
            children[1] = children[3];
            children[3] = temp1;

            temp1 = children[2];
            children[2] = children[6];
            children[6] = temp1;

            temp1 = children[5];
            children[5] = children[7];
            children[7] = temp1;

            for (let i = 0; i < children.length; i++) {

                children[i].remove();
            }

            for (let i = 0; i < children.length; i++) {
                gridContiainer.append($(children[i]))
            }
        }
        else if (children.length === 7) {
            let temp1 = children[1];
            children[1] = children[3];
            children[3] = temp1;

            temp1 = children[2];
            children[2] = children[6];
            children[6] = temp1;


            for (let i = 0; i < children.length; i++) {
                children[i].remove();
            }

            for (let i = 0; i < children.length; i++) {
                gridContiainer.append($(children[i]))
            }
        }
        else if (children.length === 6) {
            let temp1 = children[1];
            children[1] = children[3];
            children[3] = temp1;

            temp1 = children[2];
            children[2] = children[4];
            children[4] = temp1;


            for (let i = 0; i < children.length; i++) {
                children[i].remove();
            }

            for (let i = 0; i < children.length; i++) {
                gridContiainer.append($(children[i]))
            }
        }
        else if (children.length === 5) {
            let temp1 = children[1];
            children[1] = children[3];
            children[3] = temp1;

            temp1 = children[1];
            children[1] = children[2];
            children[2] = temp1;

            temp1 = children[2];
            children[2] = children[4];
            children[4] = temp1;

            for (let i = 0; i < children.length; i++) {
                children[i].remove();
            }

            for (let i = 0; i < children.length; i++) {
                gridContiainer.append($(children[i]))
            }
        }

        else if (children.length === 4) {
            let temp1 = children[1];
            children[1] = children[3];
            children[3] = temp1;

            temp1 = children[1];
            children[1] = children[2];
            children[2] = temp1;


            for (let i = 0; i < children.length; i++) {
                children[i].remove();
            }

            for (let i = 0; i < children.length; i++) {
                gridContiainer.append($(children[i]))
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


    if (!window.top.SmithD2L) {
        let script = document.createElement('script');
        script.setAttribute('src', '/shared/js/smithu.js');
        window.top.document.body.appendChild(script);
    }

    /**
     * Checks if view is the user view.
     */
    let d2lIframe = parent.document.body.querySelector('iframe.d2l-iframe.d2l-iframe-fit-user-content');
    if(d2lIframe){
        if(d2lIframe.parentElement.classList.contains('d2l-fileviewer-text')){
            document.body.classList.add('viewing');
        }
    }


    /**
     * Masonry code for styling the objects as a grid
     */


    gridContiainer.masonry({
        itemSelector: '.cell-contents',
        gutter: 4,
        columnWidth: '.cell-contents',
        percentPosition: true,

    });

    /**
     * Changes cells based on the screen size
     */
    $(window).resize(function(){
        let windowWidth = $(this).width();

        if(windowWidth >= 767) {
            gridContiainer.masonry('destroy');
            if(!isDesktop) {
                swap();
                isDesktop = true;
            }
            gridContiainer.masonry({
                itemSelector: '.cell-contents',
                gutter: 4,
                columnWidth: '.cell-contents',
                percentPosition: true,

            });
            isMobile = false;
        }
        else{
            gridContiainer.masonry('destroy');
            if(!isMobile) {
                swap();
                isMobile = true;
            }
            for(let i = 0; i < children.length; i++){
                children.remove();
            }

            for(let i = 0; i < children.length; i++){
                gridContiainer.append($(children[i]))
            }

            gridContiainer.masonry({
                itemSelector: '.cell-contents',
                gutter: 4,
                columnWidth: '.cell-contents',
                percentPosition: true,
            });

            isDesktop = false;
        }

    });

})();
