#immview-react-connect

Usage:

```javascript
var connect = require('immview-react-connect');
var IV = require('immview');
var React = require('react');

var dataSource = new IV.Data({
	/* source definition */
});

var component = React.createClass({
	/* component definition */
});

function processor(data) {
	/* return transformed data, prepared for component */
}

var wrappedComponent = connect(
	component,
	dataSource,
	processor
);

module.exports = wrappedComponent;
```
