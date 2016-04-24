#immview-react-connect

Function to connect [immview](https://github.com/arturkulig/immview) `Domain`, `Data` or `View` to a React component.

##Installation

	npm i immview-react-connect --save

##Usage

###ES6

```javascript
import connect from 'immview-react-connect';
import React from 'react';

import dataStream from './someImmviewDataStream';

/* return what should be appended to props */
const processor = (data, props) => ({
    propKey: data.get('testKey'),
});

/* component definition */
const Component = React.createClass({
	render() {
		return (
			<div>{this.props.propKey}</div>
		)
	}
});

/* ... and finally combining all parts */
const wrappedComponent = connect(
	Component,
	dataStream,
	processor
);

export default wrappedComponent;
```

###ES5

```javascript
var connect = require('immview-react-connect');
var IV = require('immview');
var React = require('react');

var dataStream = require('./someImmviewDataStream');

/* return what should be appended to props */
function processor(data, props) {
	return {
		propKey: data.get('testKey')
	};
}

/* component definition */
var Component = React.createClass({
	render: function() {
		return (
			<div>{this.props.propKey}</div>
		)
	}
});

/* ... and finally combining all parts */
var wrappedComponent = connect(
	Component,
	dataStream,
	processor
);

module.exports = wrappedComponent;
```
