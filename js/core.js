L.Control.CheckboxTree = L.Control.extend({
  onAdd: function(map) {
    var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar checkbox-tree topright');
    container.innerText = 'Hello world';
    return container;
  }
});
