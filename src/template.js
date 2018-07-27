/**
 * Template script to add SmithD2L script if missing.
 */
/* global jQuery */
(function ($) {

  //instatiates dialog code in html document
  if (!window.top.SmithD2L) {
    let script = document.createElement('script');
    script.setAttribute('src', '/shared/js/smithu.js');
    window.top.document.body.appendChild(script);
  }


    /**@var grid = grid container containing all of the cells
    **@var columns = gets all columns from the grid which will be used to move the cells
    **@var gridContainer =gridcontainer grid where the current cells are in edit mode, which will
    ** eventually be moved to the column videoContainers
    **@var children = cells that are in the edit mode to be moved to columns
    **/
    let grid = $('.grid-container');
    let columns = $(grid[0]).children();
    let gridContainer = $(grid[1]);
    let children = gridContainer.children();

   /**
   * return max rows
   */
    function getMaxRows(obj){
        return Math.ceil(obj.length/3);
    }

    /**
    * Regular condition for swapping cells. Deals with all cell except 7 and 4
    */
    function oneCondition(array, maxRows){
      let columnArray = [[],[],[]];
      let index = 0;

      for (let i = 0; i < array.length; i++) {
        columnArray[index].push(array[i]);
        if (i % maxRows === maxRows-1) {
          index++;
        }
      }
      return columnArray;
    }

  /**
   *  special condition for cell swapping. Deals with 7 and 4 cells
   */

    function twoCondition(array,maxRows){
      let columnArray = [[],[],[]];
      let index = 0;

      for (let i = 0; i < array.length; i++) {
        columnArray[index].push(array[i]);
        if(index === 0){
          if (i % maxRows === maxRows-1) {
            index++;
          }
        }
        else{
          if (i % maxRows === maxRows-2) {
            index++;
          }
        }
      }

      return columnArray;
    }

  /**
   *  Gets the values of the columns for the grid
   *
   */
    function splitRows(array, maxRows){
      let columnArray = [[],[],[]];

      if(maxRows === 3){
        if(array.length === 7){
          columnArray = twoCondition(array, maxRows);
        }
        else {
          columnArray = oneCondition(array, maxRows);
        }
      }
      else if(maxRows === 2){
        if(array.length === 4){
          columnArray = twoCondition(array, maxRows);
        }
        else {
          columnArray = oneCondition(array, maxRows);
        }
      }
      else{
        for(let i =0; i < array.length; i++){
          columnArray[i].push(array[i]);
        }
      }
      return columnArray;
    }

  /**
   *  Appends the columns from the grid container in edit mode
   *  to the corresponding column containers in the html doc
   */
    function addToColumns(column, rowValues){
      for(let i = 0; i < rowValues.length; i++){
        $(column).append($(rowValues[i]))
      }
    }


  /**
   * Super method for moving the cells from edit mode to column containers in user mode
   */
  function realign(){
      let maxRows = getMaxRows(children);
      let columnArray = splitRows(children,maxRows);

      for(let i = 0; i < columns.length; i++){
        addToColumns(columns[i], columnArray[i]);
      }
    }

    function rewriteImageSrc() {
      document.querySelectorAll('img').forEach(img => {
        let imgSrc = img.src;
        img.src = imgSrc.trim();
      });
    }

    function rewriteAHref() {
      document.querySelectorAll('.pop-up-container a').forEach(a => {
        let aHref = a.href;
        a.href = aHref.trim();
      });
    }

    /**
     * Checks if view is the user view, and swaps containers
     */
    let d2lIframe = parent.document.body.querySelector('iframe.d2l-iframe.d2l-iframe-fit-user-content');
    if(d2lIframe){
      if(d2lIframe.parentElement.classList.contains('d2l-fileviewer-text')){
        document.body.classList.add('viewing');
        realign();
        rewriteImageSrc();
        rewriteAHref();
      }
    }


  /**
   * Triggers the pop up
   */
  $('.cell-container').click(function(){
      let popUpTitle = $(this).parent().find('.pop-up-container')
        .find('.page-header').text();

      let popUpContents = $(this).parent().find('.pop-up-container')
        .find('.pop-up-contents').html();

      let obj = {
        'title': popUpTitle,
        'body' : popUpContents,
        'hideEnrollButton' : 'true'
      };

      window.top.SmithD2L.showDialog(obj);

     /**
     * centers videos
     */
      let videoContainers = window.top.document.getElementsByTagName("video");

      for(let i = 0; i < videoContainers.length; i++){
        videoContainers[i].parentElement.style.textAlign = "center"
      }

      /*
      * pushes back the table of contents arrow tool to hide it in D2L when the dialog pop up is activated
      * This is because the z index for tha tool is greater than the dialog so it shows up
      */
      if(parent.document.body.querySelector('.d2l-page-collapsepane-container')){
        parent.document.body.querySelector('.d2l-page-collapsepane-container').style.zIndex = '-10';
        parent.document.body.querySelector('.d2l-page-collapsepane-shadow').style.zIndex = '-10';
      }
    });

    //resets the z-index for the collapsible table of contents in D2L
    $(parent.document.querySelector('.smith-dialog-wrapper')).click(function() {
      if (parent.document.body.querySelector('.d2l-page-collapsepane-container')) {
        parent.document.body.querySelector('.d2l-page-collapsepane-container').style.zIndex = '';
        parent.document.body.querySelector('.d2l-page-collapsepane-shadow').style.zIndex = '';
      }
    })
})(jQuery);
