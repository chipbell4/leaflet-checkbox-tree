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
