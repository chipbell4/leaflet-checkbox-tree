(function() {
  /**
   * Helper method to stub a parent row for a group of children
   *
   * @param {Object} options The options for the control. Just look at the function for what they are
   *
   * @return {Node} The container for the parent row
   */
  L.Control.CheckboxTree.stubParentRow = function(options) {
    // Sets some defaults for options
    options.id = options.id || ''; // The id attribute to set for the row
    options.onChange = options.onChange || function() {}; // an onChange listener for the row
    options.text = options.text || ''; // The text to display on the row
    options.children = options.children || []; // A list of strings with the children this parent should have
    options.container = options.container || null; // The container to place this row into

    // Create the initial row, marking it if it has no children
    var className = 'parent-row';
    if(options.children.length === 0) {
      className += ' no-children';
    }
    var row = L.DomUtil.create('div', className, options.container);
    row.id = options.id;
  
    // Add the arrow, but make it "dead" if there's no children to expand. We'll use CSS to make it invisible
    var arrow = L.DomUtil.create('span', 'arrow', row);
    if(options.children.length > 0) {
      arrow.addEventListener('click', L.Control.CheckboxTree.toggleArrow.bind(this, row));
    }

    // The containing label for the checkbox and text
    var label = L.DomUtil.create('label', '', row);

    // Listener for when the parent box changes. Essentially sets the child state for all entries to match the state of
    // the parent
    var onChecked = function(evt) {
      L.Control.CheckboxTree.setAllCheckedState(row, evt.target.checked);
      options.onChange();
    };

    // Add the checkbox
    var checkbox = L.DomUtil.create('input', '', label);
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', onChecked);

    // Add the text label
    var text = L.DomUtil.create('span', '', label);
    text.innerText = options.text;

    // The listener for when the child is clicked. Basically triggers the global change listener, but also makes sure
    // that the parent reflects the "global" state of the children (all are checked, all are unchecked, only some are
    // checked).
    var onChildClick = function() {
      options.onChange();

      // update parent checkbox state to match "total" of children
      var checkedState = L.Control.CheckboxTree.determineCheckedState(row);
      checkbox.indeterminate = checkedState.uncheckedItems.length !== 0 && checkedState.checkedItems.length !== 0;
      checkbox.checked = checkedState.uncheckedItems.length === 0;
    };

    // Add the container for the children, if there are children to add, and then add the children
    var N = options.children.length;
    if(N === 0) {
      return row;
    }
    var childrenContainer = L.DomUtil.create('ul', '', row);
    for(var i = 0; i < N; i++) {
      L.Control.CheckboxTree.stubChildRow({
        container: childrenContainer,
        text: options.children[i],
        onClick: onChildClick
      });
    }

    return row;
  };
})();
