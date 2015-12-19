(function() {

  var toggleArrow = function(evt) {
    var parentRow = evt.target.parentNode;

    // remove the expanded class if its there. Otherwise, add it
    if(parentRow.className.indexOf('expanded') == -1) {
      parentRow.className += ' expanded';
      return;
    }

    parentRow.className = 'parent-row';
  };

  var onChecked = function(evt) {
    console.log(evt);
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

    var arrow = L.DomUtil.create('span', 'arrow', row);
    arrow.addEventListener('click', toggleArrow);

    var label = L.DomUtil.create('label', '', row);
    var checkbox = L.DomUtil.create('input', '', label);
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', onChecked);
    var text = L.DomUtil.create('span', '', label);
    text.innerText = options.text;

    return row;
  };
})();
