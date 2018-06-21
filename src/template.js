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
 *  Masonry code for aligning containers in columns
 */
var added = true;

$('.grid-container').masonry({
    itemSelector: '.cell-contents',
    gutter: 4,
    columnWidth: '.cell-contents',
    horizontalOrder: true,
    percentPosition: true,

});

//depending onscreen size it changes the view from desktop to mobile view
$(window).resize(function(){
  var windowWidth = $(this).width();

  //desktop view
  if(windowWidth >= 767) {
      if(!added) {
          added = true;
          $('.grid-container').masonry({
              itemSelector: '.cell-contents',
              gutter: 4,
              columnWidth: '.cell-contents',
              percentPosition: true,
          });
      }
  }
  //mobile view
  else{
    if(added) {
        $('.grid-container').masonry('destroy');
        added = false;
    }
  }
});


/**
 * Click events for cells to trigger pop ups
 */
$('.cell-container').click(function(){
    var popUpTitle = $(this).parent().find('.pop-up-container')
        .find('.page-header').text();

    var popUpContents = $(this).parent().find('.pop-up-container')
        .find('.pop-up-contents').html();
    

    var obj = {
        'title': popUpTitle,
        'body' : popUpContents,
        'hideEnrollButton' : 'true'
    };

    window.top.SmithD2L.showDialog(obj);

});

