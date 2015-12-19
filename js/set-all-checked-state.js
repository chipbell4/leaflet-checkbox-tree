(function() {
  L.Control.CheckboxTree.setAllCheckedState = function(container, newValue) {
    var inputs = container.getElementsByTagName('input');
    for(var k in inputs) {
      inputs[k].checked = newValue;
    }
  };
})();
