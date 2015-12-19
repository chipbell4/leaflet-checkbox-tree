# Leaflet Checkbox Tree
This is a simple checkbox tree for leaflet. It allows one level of nesting, and provides a hook for catching when state
changes which provides a list of changed items

## Installation
The easiest way to install is to use the include the bundled `leaflet-checkbox-tree.min.js` and
`leaflet-checkbox-tree.min.css` on your page. There are also unminified versions if you'd like to use those during
development.

If you'd like to build the files yourself, simply clone the repository down, run `npm install` to install some build
tools and then run `npm run dist` which should generate both the minified and unminified CSS and JS.

## Basic Usage
The included `index.html` shows an example usage. However, a simple explanation certainly helps. Given you've
instantiated a variable `map` that is a Leaflet `Map` instance, you can add a checkbox tree using the following
snippet:

```javascript
var tree = new L.Control.CheckboxTree({
  onChange: function(evt) {
    console.log(evt);
  },
  items: {
    'Parent 1' : null,
    'Parent 2' : ['Child 1', 'Child 2']
  }
});

map.addControl(tree);
```

The first thing to note is the `onChange` listener. The function you provide here will be called anytime a box is
checked and the passed event will provide a `target` that points to the DOM node of the container, a `checkedItems`
array, and an `uncheckedItems` array. Both `checkedItems` and `uncheckedItems` are arrays of strings with the current
list of checked and unchecked items respectively.

Also note the `items` object, which dictates the structure of the tree. The keys of this object denote the labels to
associate with parents. The values dictate the list of children to associate with that parent. If there are no children
the parent won't have an arrow, and will be also be included in the list of checked and unchecked items. For instance,
in the above case, "Parent 1" will be standalone and have no children, and "Parent 2" will have a two children:
"Child 1" and "Child 2". Moreover, if any checkbox changes, "Child 1", "Child 2" *and* "Parent 1" would be included in
either `checkedItems` or `uncheckedItems` during an change event depending on their checked state. For instance, if
"Parent 1" and "Child 2" were checked and then the user clicked "Child 1" to *uncheck it*, a change event would be
thrown and `checkedItems` would contain both "Parent 1" and "Child 2", and `uncheckedItems` would contain only
"Child 1".
