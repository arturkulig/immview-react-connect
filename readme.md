#immview-react-connect

Function to connect [immview](https://github.com/arturkulig/immview) Reactor (Data or View) to a React component.

Usage:

```javascript
var connect = require('immview-react-connect');
var IV = require('immview');
var React = require('react');

var dataSource = new IV.Data({
	/* source definition */
	dataSourceTestVar: 1
});

function processor(data) {
	/* return transformed data, prepared for component */
	return {
		processedTestVar: data.get('dataSourceTestVar');
	}
}

var component = React.createClass({
	/* component definition */
	render() {
		return (
			<div>{this.props.processedTestVar}</div>
		)
	}
});

var wrappedComponent = connect(
	component,
	dataSource,
	processor
);

module.exports = wrappedComponent;
```
