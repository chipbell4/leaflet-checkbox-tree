(function() {

  var setAllCheckedState = function(container, newValue) {
    var inputs = container.getElementsByTagName('input');
    for(var k in inputs) {
      inputs[k].checked = newValue;
    }
  };

  var onChecked = function(evt) {
    var isChecked = evt.target.checked;
    console.log('isChecked?', isChecked);
  };

  L.Control.CheckboxTree.stubParentRow = function(options) {
    // defaults
    options.id = options.id || '';
    options.onClick = options.onClick || function() {};
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
    checkbox.addEventListener('click', onChecked);

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
        onClick: function() { }
      });
    }

    return row;
  };
})();
