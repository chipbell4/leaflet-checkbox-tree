(function() {
  /**
   * Function to crawl the control and determine which checkboxes are checked, for passing to listeners via an event
   *
   * @param {Node} container The container for the checkboxes
   */
  L.Control.CheckboxTree.determineCheckedState = function(container) {
    var k, N, checkbox;

    // Get all checked and unchecked *child* items
    var li = container.getElementsByTagName('li');
    var uncheckedItems = [];
    var checkedItems = [];
    N = li.length;
    for(k = 0; k < N; k++) {
      checkbox = li[k].firstChild.firstChild;
      if(checkbox.checked) {
        checkedItems.push(checkbox.nextSibling.textContent);
      } else {
        uncheckedItems.push(checkbox.nextSibling.textContent);
      }
    }

    // get all parents with no children that are checked
    var rows = container.getElementsByClassName('no-children');
    N = rows.length;
    for(k = 0; k < N; k++) {
      checkbox = rows[k].getElementsByTagName('input')[0];
      if(checkbox.checked) {
        checkedItems.push(checkbox.nextSibling.textContent);
      } else {
        uncheckedItems.push(checkbox.nextSibling.textContent);
      }
    }

    return { checkedItems: checkedItems, uncheckedItems: uncheckedItems };
  };
})();
