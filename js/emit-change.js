(function() {
  L.Control.CheckboxTree.emitChange = function(container, listener) {
    console.log(listener);
    if(!listener) {
      return;
    }
    var evt = L.Control.CheckboxTree.determineCheckedState(container);
    evt.target = container;
    listener(evt);
  };
})();
