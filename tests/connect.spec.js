var IV = require('immview');
var I = require('immutable');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMserver = require('react-dom/server');
var connect = require('../src/index.js');

var testComponent = React.createClass({
    render() {
        return (
            <div>{this.props.testProp || 'noval'}</div>
        );
    },
});

var testData = new IV.Data({
    testField: 42,
});

describe('connect', () => {

    it('with noop', () => {
        var wrappedComponent = connect(
            testComponent,
            testData
        );

        var result = ReactDOMserver.renderToStaticMarkup(React.createElement(wrappedComponent));

        expect(result).toBe('<div>noval</div>');

    });

    it('with Immutable.Map', () => {

        var wrappedComponent = connect(
            testComponent,
            testData,
            data => data.set('testProp', data.get('testField'))
        );

        var result = ReactDOMserver.renderToStaticMarkup(React.createElement(wrappedComponent));

        expect(result).toBe('<div>42</div>');

    });

    it('with Object', () => {

        var wrappedComponent = connect(
            testComponent,
            testData,
            data => {
                return {testProp: data.get('testField')};
            }
        );

        var result = ReactDOMserver.renderToStaticMarkup(React.createElement(wrappedComponent));

        expect(result).toBe('<div>42</div>');

    });

    it('and change data', () => {
        var liveTestData = new IV.Data({
            testField: 42,
        });

        var wrappedComponent = connect(
            testComponent,
            liveTestData
        );

        var element = React.createElement(wrappedComponent);

        var tmpMount = document.createElement("DIV");
        ReactDOM.render(element, tmpMount);

        expect(tmpMount.innerText).toBe('noval');

        liveTestData.set('testProp', 4242);

        expect(tmpMount.innerText).toBe('4242');

    });

    it('passes props down', () => {

        var wrappedComponent = connect(
            testComponent,
            testData
        );

        var result = ReactDOMserver.renderToStaticMarkup(React.createElement(wrappedComponent, {testProp: 43}));

        expect(result).toBe('<div>43</div>');

    });
});
