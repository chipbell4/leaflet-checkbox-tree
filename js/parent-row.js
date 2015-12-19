(function() {

  var onChecked = function(container, evt) {
    L.Control.CheckboxTree.setAllCheckedState(container, evt.target.checked);
  };

  L.Control.CheckboxTree.stubParentRow = function(options) {
    // defaults
    options.id = options.id || '';
    options.onChange = options.onChange || function() {};
    options.text = options.text || '';
    options.children = options.children || [];
    options.container = options.container || null;

    var row = L.DomUtil.create('div', 'parent-row', options.container);
    row.id = options.id;

    // Add the arrow
    var arrow = L.DomUtil.create('span', 'arrow', row);
    arrow.addEventListener('click', L.Control.CheckboxTree.toggleArrow.bind(this, row));

    var label = L.DomUtil.create('label', '', row);

    // Add the checkbox
    var checkbox = L.DomUtil.create('input', '', label);
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', onChecked.bind(this, row));

    // Add the text label
    var text = L.DomUtil.create('span', '', label);
    text.innerText = options.text;

    // Add the container for the children
    var childrenContainer = L.DomUtil.create('ul', '', row);
    var N = options.children.length;
    for(var i = 0; i < N; i++) {
      L.Control.CheckboxTree.stubChildRow({
        container: childrenContainer,
        text: options.children[i],
        onClick: options.onChange
      });
    }

    return row;
  };
})();
