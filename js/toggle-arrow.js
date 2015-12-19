(function() {
  /**
   * Helper function to toggle arrow state, which is acheived by a class on the parent row
   *
   * @param {Node} parentRow The parent row of the arrow
   */
  L.Control.CheckboxTree.toggleArrow = function(parentRow) {
    // remove the expanded class if its there. Otherwise, add it
    if(parentRow.className.indexOf('expanded') == -1) {
      parentRow.className += ' expanded';
      return;
    }

    parentRow.className = 'parent-row';
  };
})();
