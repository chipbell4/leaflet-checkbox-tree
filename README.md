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
  items: [
    {
      text: 'Parent 1',
      checked: true,
      children: null
    },
    {
      text: 'Parent 2',
      children: [
        {
          text: 'Child 1',
          checked: true
        },
        {
          text: 'Child 2',
          checked: false
        }
      ]
    }
  ]
});

map.addControl(tree);
```

The first thing to note is the `onChange` listener. The function you provide here will be called anytime a box is
checked and the passed event will provide a `target` that points to the DOM node of the container, a `checkedItems`
array, and an `uncheckedItems` array. Both `checkedItems` and `uncheckedItems` are arrays of strings with the current
list of checked and unchecked items respectively.

Also note the `items` array, which dictates the structure of the tree. Each element in this array is an object
dictating a parent item. For each of these items, the `text` key dictates the text to display, and `children` is an
array of objects dictating any child checkboxes to nest. If a parent has no children, then it will be treated as a
stand-alone checkbox that will also be included in `checkedItems` and `uncheckedItems` during events.

Parents without children, or children themselves can set their default checked state by setting the `checked` key to
true or false. This value defaults to false.
