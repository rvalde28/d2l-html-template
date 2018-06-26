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
     * Checks if view is the user view, and swaps containers
     */
    var d2lIframe = parent.document.body.querySelector('iframe.d2l-iframe.d2l-iframe-fit-user-content');
    if(d2lIframe){
      if(d2lIframe.parentElement.classList.contains('d2l-fileviewer-text')){
          document.body.classList.add('viewing');
          swap();
      }
    }

    /**
     * Function for swaping cells around
     */

    let colOne = $('#Column1');
    let colTwo = $('#Column2');
    let colThree = $('#Column3');
    let gridContiainer = $($('.grid-container')[1]);
    let children = gridContiainer.children();

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
                if(i % 3 === 0){
                    colOne.append($(children[i]))
                }
                else if(i % 3 === 1){
                    colTwo.append($(children[i]))
                }
                else if(i % 3 === 2){
                    colThree.append($(children[i]))
                }
                else{}
            }
        }
        else if (children.length === 7) {
            let temp1 = children[1];
            children[1] = children[3];
            children[3] = temp1;

            temp1 = children[2];
            children[2] = children[6];
            children[6] = temp1;

            temp1 = children[5];
            children[5] = children[2];
            children[2] = temp1;


            for (let i = 0; i < children.length; i++) {
                if(i % 3 === 0){
                    colOne.append($(children[i]))
                }
                else if(i % 3 === 1){
                    colTwo.append($(children[i]))
                }
                else if(i % 3 === 2){
                    colThree.append($(children[i]))
                }
                else{}
            }
        }
        else if (children.length === 6) {
            let temp1 = children[1];
            children[1] = children[3];
            children[3] = temp1;

            temp1 = children[2];
            children[2] = children[4];
            children[4] = temp1;

            temp1 = children[1];
            children[1] = children[4];
            children[4] = temp1;


            for (let i = 0; i < children.length; i++) {
                children[i].remove();
            }

            for (let i = 0; i < children.length; i++) {
                if(i % 3 === 0){
                    colOne.append($(children[i]))
                }
                else if(i % 3 === 1){
                    colTwo.append($(children[i]))
                }
                else if(i % 3 === 2){
                    colThree.append($(children[i]))
                }
                else{}
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
                if(i % 3 === 0){
                    colOne.append($(children[i]))
                }
                else if(i % 3 === 1){
                    colTwo.append($(children[i]))
                }
                else if(i % 3 === 2){
                    colThree.append($(children[i]))
                }
                else{}
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
                if(i % 3 === 0){
                    colOne.append($(children[i]))
                }
                else if(i % 3 === 1){
                    colTwo.append($(children[i]))
                }
                else if(i % 3 === 2){
                    colThree.append($(children[i]))
                }
                else{}
            }
        }
    }

    swap();

})();


