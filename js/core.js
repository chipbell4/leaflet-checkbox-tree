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
