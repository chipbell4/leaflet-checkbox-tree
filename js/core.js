L.Control.CheckboxTree = L.Control.extend({

  initialize: function(options) {
    L.Util.setOptions(this, options);
  },

  onAdd: function(map) {
    var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar checkbox-tree topright');
    container.innerText = 'Hello world';

    var onChange = (function() {
      L.Control.CheckboxTree.emitChange(container, this.options.onChange);
    }).bind(this);

    // Create a row for each group of items provided
    var items = this.options.items || {};
    var keys = Object.keys(items).sort();
    var N = keys.length;
    for(var i = 0; i < N; i++) {
      L.Control.CheckboxTree.stubParentRow({
        text: keys[i],
        id: keys[i], // TODO: Is this used
        container: container,
        onChange: onChange,
        children: items[keys[i]]
      }); 
    }

    return container;
  }
});
