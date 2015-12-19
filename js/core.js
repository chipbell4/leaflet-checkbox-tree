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

    L.Control.CheckboxTree.stubParentRow({
      text: 'FAA',
      id: 'FAA',
      container: container,
      onChange: onChange,
      children: [
        'FAA 12345',
        'FAA 22345',
        'FAA 32345',
      ]
    }); 

    return container;
  }
});
