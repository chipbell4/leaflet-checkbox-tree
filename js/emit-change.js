(function() {
  L.Control.CheckboxTree.emitChange = function(container, listener) {
    if(!listener) {
      return;
    }
    var evt = L.Control.CheckboxTree.determineCheckedState(container);
    evt.target = container;
    listener(evt);
  };
})();
