L.Control.CheckboxTree = L.Control.extend({

  /**
   * Basic constructor for the checkbox tree. Essentially sets options
   *
   * @param {Object} options Options for the tree. First, an onChange function can be provided which will be called
   *                         when any checkbox changes. An event with an updated list of checked and unchecked items
   *                         will be provided. Also, an items object will be provided that specifies the items in the
   *                         tree. For instance:
   *                         items : {
   *                           'Search Region' : null, // This is a parent item with no children
   *                           'GUYS'          : ['Bob', 'Chip'], // These are the children to show
   *                         }
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

    // The global listener for changes. Essentially forwards the new state of the tree to the passed listener
    var onChange = (function() {
      L.Control.CheckboxTree.emitChange(container, this.options.onChange);
    }).bind(this);

    // Create a row for each group of items provided
    var items = this.options.items || {};
    var keys = Object.keys(items);
    var N = keys.length;
    for(var i = 0; i < N; i++) {
      L.Control.CheckboxTree.stubParentRow({
        text: keys[i],
        id: keys[i],
        container: container,
        onChange: onChange,
        children: items[keys[i]]
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
