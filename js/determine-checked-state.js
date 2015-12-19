(function() {
  L.Control.CheckboxTree.determineCheckedState = function(container) {
    var ul = container.getElementsByTagName('ul')[0];
    var checkboxes = ul.getElementsByTagName('input');
    
    // Separate items by being checked or unchecked
    var uncheckedItems = [];
    var checkedItems = [];
    var N = checkboxes.length;
    for(var k = 0; k < N; k++) {
      if(checkboxes[k].checked) {
        checkedItems.push(checkboxes[k].nextSibling.textContent);
      } else {
        uncheckedItems.push(checkboxes[k].nextSibling.textContent);
      }
    }

    return { checkedItems: checkedItems, uncheckedItems: uncheckedItems };
  };
})();
