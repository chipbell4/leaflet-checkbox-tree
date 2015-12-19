(function() {
  L.Control.CheckboxTree.stubParentRow = function(options) {
    // defaults
    options.onClick = options.onClick || function() {};
    options.text = options.text || '';
    options.children = options.children || [];
  };
})();
