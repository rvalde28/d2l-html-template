/**
 * Template script to add SmithD2L script if missing.
 */
/* global jQuery */
(function ($) {
  if (!window.top.SmithD2L) {
    let script = document.createElement('script');
    script.setAttribute('src', '/shared/js/smithu.js');
    window.top.document.body.appendChild(script);
  }



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
   *  Appends the columns from to the corresponding columns in the html doc
   */
    function addToColumns(column, rowValues){
      for(let i = 0; i < rowValues.length; i++){
        $(column).append($(rowValues[i]))
      }
    }


  /**
   * Super method for moving the cells from edit mode to column containers in usre mode
   */
  function realign(){
      let maxRows = getMaxRows(children);
      let columnArray = splitRows(children,maxRows);

      for(let i = 0; i < columns.length; i++){
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
    });
})(jQuery);


