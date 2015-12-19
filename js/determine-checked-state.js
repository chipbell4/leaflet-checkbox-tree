(function() {
  L.Control.CheckboxTree.determineCheckedState = function(container) {
    var li = container.getElementsByTagName('li');
    
    // Separate items by being checked or unchecked
    var uncheckedItems = [];
    var checkedItems = [];
    var N = li.length;
    for(var k = 0; k < N; k++) {
      var checkbox = li[k].firstChild.firstChild;
      if(checkbox.checked) {
        checkedItems.push(checkbox.nextSibling.textContent);
      } else {
        uncheckedItems.push(checkbox.nextSibling.textContent);
      }
    }

    return { checkedItems: checkedItems, uncheckedItems: uncheckedItems };
  };
})();
