(function() {
  /**
   * Sets all checkboxes in a container to be checked or not
   *
   * @param {Node}    container The container to crawl
   * @param {Boolean} newValue  The new value state to set the checkboxes to
   */
  L.Control.CheckboxTree.setAllCheckedState = function(container, newValue) {
    var inputs = container.getElementsByTagName('input');
    for(var k in inputs) {
      inputs[k].checked = newValue;
    }
  };
})();
