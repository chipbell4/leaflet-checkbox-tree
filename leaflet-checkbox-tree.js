L.Control.CheckboxTree = L.Control.extend({

  /**
   * Basic constructor for the checkbox tree. Essentially sets options
   *
   * @param {Object} options Options for the tree. First, an onChange function can be provided which will be called
   *                         when any checkbox changes. An event with an updated list of checked and unchecked items
   *                         will be provided. Also, an items object will be provided that specifies the items in the
   *                         tree. For instance:
   *                         items : [
   *                           {
   *                             text: 'Search Region',
   *                             children: null,
   *                             checked: true
   *                           },
   *                           {
   *                             text: 'Guys',
   *                             children: [
   *                               {
   *                                 text: 'Bob',
   *                                 checked: true
   *                               },
   *                               {
   *                                 text: 'Josh',
   *                                 checked: false
   *                               }
   *                             ]
   *                           }
   *                         ]
   *
   */
  initialize: function(options) {
    L.Util.setOptions(this, options);
  },

  /**
   * Lifecycle function for leaflet. Called when the control is added to the map
   *
   * @param {Map} map The map that the control is being added to
   *
   * @return {Node} The container DOM node for this control
   */
  onAdd: function(map) {
    var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar checkbox-tree topright');

    // set the container's height so that it fills the maps width
    var mapBounds = map._container.getBoundingClientRect();
    container.style.height = '' + (mapBounds.bottom - mapBounds.top - 50) + 'px';

    // The global listener for changes. Essentially forwards the new state of the tree to the passed listener
    var onChange = (function() {
      L.Control.CheckboxTree.emitChange(container, this.options.onChange);
    }).bind(this);

    // Create a row for each group of items provided
    var items = this.options.items || [];
    var N = items.length;
    for(var i = 0; i < N; i++) {
      L.Control.CheckboxTree.stubParentRow({
        text: items[i].text,
        checked: items[i].checked,
        container: container,
        onChange: onChange,
        children: items[i].children
      }); 
    }

    // stop event propagation for internal events that would cause the map to react
    container.addEventListener('mouseover', function() {
      map.dragging.disable();
    });
    container.addEventListener('mouseout', function() {
      map.dragging.enable();
    });
    L.DomEvent.on(container, 'mousewheel', L.DomEvent.stopPropagation);
    L.DomEvent.on(container, 'dblclick', L.DomEvent.stopPropagation);

    return container;
  }
});
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
    checkbox.checked = options.checked;

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
        text: options.children[i].text,
        checked: options.children[i].checked,
        onClick: onChildClick
      });
    }

    // update parent checkbox state to match "total" of children
    var checkedState = L.Control.CheckboxTree.determineCheckedState(row);
    checkbox.indeterminate = checkedState.uncheckedItems.length !== 0 && checkedState.checkedItems.length !== 0;
    checkbox.checked = checkedState.uncheckedItems.length === 0;
    return row;
  };
})();
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
    checkbox.checked = options.checked;

    // add the label
    var text = L.DomUtil.create('span', '', label);
    text.innerText = options.text;

    return listElement;
  };
})();
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
(function() {
  /**
   * Sets all checkboxes in a container to be checked or not
   *
   * @param {Node}    container The container to crawl
   * @param {Boolean} newValue  The new value state to set the checkboxes to
   */
  L.Control.CheckboxTree.setAllCheckedState = function(container, newValue) {
    var inputs = container.getElementsByTagName('input');
    for(var k in inputs) {
      inputs[k].checked = newValue;
    }
  };
})();
(function() {
  /**
   * Function to crawl the control and determine which checkboxes are checked, for passing to listeners via an event
   *
   * @param {Node} container The container for the checkboxes
   */
  L.Control.CheckboxTree.determineCheckedState = function(container) {
    var k, N, checkbox;

    // Get all checked and unchecked *child* items
    var li = container.getElementsByTagName('li');
    var uncheckedItems = [];
    var checkedItems = [];
    N = li.length;
    for(k = 0; k < N; k++) {
      checkbox = li[k].firstChild.firstChild;
      if(checkbox.checked) {
        checkedItems.push(checkbox.nextSibling.textContent);
      } else {
        uncheckedItems.push(checkbox.nextSibling.textContent);
      }
    }

    // get all parents with no children that are checked
    var rows = container.getElementsByClassName('no-children');
    N = rows.length;
    for(k = 0; k < N; k++) {
      checkbox = rows[k].getElementsByTagName('input')[0];
      if(checkbox.checked) {
        checkedItems.push(checkbox.nextSibling.textContent);
      } else {
        uncheckedItems.push(checkbox.nextSibling.textContent);
      }
    }

    return { checkedItems: checkedItems, uncheckedItems: uncheckedItems };
  };
})();
(function() {
  /**
   * Helper function to emit change events to listeners. Nothing special here
   *
   * @param {Node}     container The container to crawl to look for changes
   * @param {Function} listener  The listener to send the results to
   */
  L.Control.CheckboxTree.emitChange = function(container, listener) {
    if(!listener) {
      return;
    }
    var evt = L.Control.CheckboxTree.determineCheckedState(container);
    evt.target = container;
    listener(evt);
  };
})();
