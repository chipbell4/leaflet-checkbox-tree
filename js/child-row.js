(function() {
  /**
   * Helper function to stub a child row, i.e. an expandable row underneath a parent
   *
   * @param {Object} options An options parameter for the row. Keys are a container for the object, the text to
   *                         display, and a click listener for the checkbox
   *
   * @return {Node} The containing <li/> element for the row
   */
  L.Control.CheckboxTree.stubChildRow = function(options) {
    // Set defaults for options
    options.container = options.container || null;
    options.text = options.text || '';
    options.onClick = options.onClick || function() { };

    // Create the containing element
    var listElement = L.DomUtil.create('li', 'child-row', options.container);

    // Add the label
    var label = L.DomUtil.create('label', '', listElement);

    // Add the checkbox, and hook up the listener
    var checkbox = L.DomUtil.create('input', '', label);
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', options.onClick);

    // add the label
    var text = L.DomUtil.create('span', '', label);
    text.innerText = options.text;

    return listElement;
  };
})();
