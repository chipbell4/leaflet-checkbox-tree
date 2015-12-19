L.Control.CheckboxTree = L.Control.extend({
  onAdd: function(map) {
    var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar checkbox-tree topright');
    container.innerText = 'Hello world';

    L.Control.CheckboxTree.stubParentRow({
      text: 'FAA',
      id: 'FAA',
      container: container,
      children: [
        'FAA 12345',
        'FAA 22345',
        'FAA 32345',
      ]
    }); 

    return container;
  }
});
