(function() {
  L.Control.CheckboxTree.stubChildRow = function(options) {
    options.container = options.container || null;
    options.text = options.text || '';
    options.onClick = options.onClick || function() { };

    var listElement = L.DomUtil.create('li', 'child-row', options.container);

    // Add the label
    var label = L.DomUtil.create('label', '', listElement);

    // Add the checkbox
    var checkbox = L.DomUtil.create('input', '', label);
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', options.onClick);

    // add the label
    var text = L.DomUtil.create('span', '', label);
    text.innerText = options.text

    return listElement;
  };
})();
