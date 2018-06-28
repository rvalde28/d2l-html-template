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

    function splitRows(array, maxRows){
      let columnArray = [[],[],[]];
      let index = 0;

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

    function addToColumns(column, rowValues){
      for(let i = 0; i < rowValues.length; i++){
        $(column).append($(rowValues[i]))
      }
    }

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


})();


window.centerVideos = function () {

};


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

  /**
   * centers videos
   */
  let videoContainers = parent.document.getElementsByTagName("video");

  for(let i = 0; i < videoContainers.length; i++){
    console.log(videoContainers[0].parentElement);

    videoContainers[i].parentElement.style.textAlign = "center"
  }
});

