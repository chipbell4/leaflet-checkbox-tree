(function() {
  L.Control.CheckboxTree.determineCheckedState = function(container) {
    var ul = container.getElementsByTagName('ul')[0];
    var checkboxes = ul.getElementsByTagName('input');
    
    // Add only checked items to the checked items list
    var checkedItems = [];
    for(var k in checkboxes) {
      if(checkboxes[k].checked) {
        checkedItems.push(checkboxes[k].nextSibling.textContent);
      }
    }

    return checkedItems;
  };
})();
