#immview-react-connect

Function to connect [immview](https://github.com/arturkulig/immview) `Data` or `View` to a React component.

##Installation

	npm i immview-react-connect --save

##Usage

```javascript
var connect = require('immview-react-connect');
var IV = require('immview');
var React = require('react');

var dataStream = new IV.Data({
	/* source definition */
	testKey: 1
});

function processor(data, props) {
	/* return transformed data, prepared for component */
	return {
		propKey: data.get('testKey');
	}
}

var component = React.createClass({
	/* component definition */
	render() {
		return (
			<div>{this.props.propKey}</div>
		)
	}
});

var wrappedComponent = connect(
	component,
	dataStream,
	processor
);

module.exports = wrappedComponent;
```
