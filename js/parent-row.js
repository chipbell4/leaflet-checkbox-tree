(function() {
  L.Control.CheckboxTree.stubParentRow = function(options) {
    // defaults
    options.id = options.id || '';
    options.onChange = options.onChange || function() {};
    options.text = options.text || '';
    options.children = options.children || [];
    options.container = options.container || null;

    var row = L.DomUtil.create('div', 'parent-row', options.container);
    row.id = options.id;
  
    var onChecked = function(evt) {
      L.Control.CheckboxTree.setAllCheckedState(row, evt.target.checked);
      options.onChange();
    };

    // Add the arrow
    var arrow = L.DomUtil.create('span', 'arrow', row);
    arrow.addEventListener('click', L.Control.CheckboxTree.toggleArrow.bind(this, row));

    var label = L.DomUtil.create('label', '', row);

    // Add the checkbox
    var checkbox = L.DomUtil.create('input', '', label);
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', onChecked);

    // Add the text label
    var text = L.DomUtil.create('span', '', label);
    text.innerText = options.text;

    var onChildClick = function() {
      options.onChange();

      // update parent checkbox state to match "total" of children
      var checkedState = L.Control.CheckboxTree.determineCheckedState(row);
      checkbox.indeterminate = checkedState.uncheckedItems.length !== 0 && checkedState.checkedItems.length !== 0;
      checkbox.checked = checkedState.uncheckedItems.length === 0;
    };

    // Add the container for the children
    var childrenContainer = L.DomUtil.create('ul', '', row);
    var N = options.children.length;
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
