(function() {
  L.Control.CheckboxTree.toggleArrow = function(parentRow) {
    // remove the expanded class if its there. Otherwise, add it
    if(parentRow.className.indexOf('expanded') == -1) {
      parentRow.className += ' expanded';
      return;
    }

    parentRow.className = 'parent-row';
  };
})();
