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
  if(parent.document.body.querySelector('iframe.d2l-iframe.d2l-iframe-fit-user-content')
      .parentElement.classList.contains('d2l-fileviewer-text')){


  }

})();


