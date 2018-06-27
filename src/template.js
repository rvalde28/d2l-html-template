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
     * Function for swaping cells around
     */

    let columns = $($('.grid-container')[0]).children();
    let gridContiainer = $($('.grid-container')[1]);
    let children = gridContiainer.children();

    function getMaxRows(obj){
        return Math.ceil(obj.length/3);
    }

    function splitRows(array, maxRows){
      let columnArray = [[],[],[]];
      let index = 0;

      if(maxRows === 3){
        if(array.length === 7){
          console.log(array.length);
          for (let i = 0; i < array.length; i++) {
            console.log(index);

            columnArray[index].push(array[i]);

            if(index === 0){
              if (i % 3 === 2) {
                index++;
              }
            }
            else{
              if (i % 3 === 1) {
                index++;
              }
            }
          }
        }
        else {
          for (let i = 0; i < array.length; i++) {
            columnArray[index].push(array[i]);
            if (i % 3 === 2) {
              index++;
            }
          }
        }
      }
      else if(maxRows === 2){
        if(array.length === 4){
          for (let i = 0; i < array.length; i++) {
            columnArray[index].push(array[i]);
            if(index === 0){
              if (i % 2 === 1) {
                index++;
              }
            }
            else{


              if (i % 2 === 0) {
                index++;
              }
            }
          }
        }
        else {
          for (let i = 0; i < array.length; i++) {
            columnArray[index].push(array[i]);
            if (i % 2 === 1) {
              index++;
            }
          }
        }
      }
      else{
        for(let i =0; i < array.length; i++){
          columnArray[i].push(array[i]);
        }
      }

      return columnArray;
    }

    function addToColumns(column, rowValues){
      for(let i = 0; i < rowValues.length; i++){
        $(column).append($(rowValues[i]))
      }
    }

    function realign(){
      let maxRows = getMaxRows(children);
      let columnArray = splitRows(children,maxRows);

      for(let i = 0; i < columns.length; i++){
        console.log(columns[i]);
        addToColumns(columns[i], columnArray[i]);
      }
    }

    /**
     * Checks if view is the user view, and swaps containers
     */
    let d2lIframe = parent.document.body.querySelector('iframe.d2l-iframe.d2l-iframe-fit-user-content');
    if(d2lIframe){
      if(d2lIframe.parentElement.classList.contains('d2l-fileviewer-text')){
        document.body.classList.add('viewing');
        realign()
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

