var IV = require('immview');
var I = require('immutable');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMserver = require('react-dom/server');
var connect = require('../src/index.js');

var testComponent = React.createClass({
    render() {
        return (
            <div>{this.props.testProp || 'noval'}{this.props.children}</div>
        );
    },
});

var testData = new IV.Data(I.Map({testField: 42}));

describe('connect', () => {

    it('with noop', () => {

        var WrappedComponent = connect(
            testComponent,
            testData
        );

        var result = ReactDOMserver.renderToStaticMarkup(<WrappedComponent />);

        expect(result).toBe('<div>noval</div>');

    });

    it('with Immutable.Map', () => {

        var WrappedComponent = connect(
            testComponent,
            testData,
            data => data.set('testProp', data.get('testField'))
        );

        var result = ReactDOMserver.renderToStaticMarkup(<WrappedComponent />);

        expect(result).toBe('<div>42</div>');

    });

    it('with Object', () => {

        var WrappedComponent = connect(
            testComponent,
            testData,
            data => {
                return {testProp: data.get('testField')};
            }
        );

        var result = ReactDOMserver.renderToStaticMarkup(<WrappedComponent />);

        expect(result).toBe('<div>42</div>');

    });

    it('and change data', () => {
        var liveTestData = new IV.Data(I.Map());

        var WrappedComponent = connect(
            testComponent,
            liveTestData
        );

        var tmpMount = document.createElement('DIV');
        ReactDOM.render(<WrappedComponent />, tmpMount);

        expect(tmpMount.innerText).toBe('noval');

        liveTestData.write(I.Map({testProp: 43}));

        expect(tmpMount.innerText).toBe('43');

    });

    it('passes props down', () => {

        var WrappedComponent = connect(
            testComponent,
            testData
        );

        var result = ReactDOMserver.renderToStaticMarkup(
            <WrappedComponent testProp={43}/>
        );

        expect(result).toBe('<div>43</div>');

    });

    it('mixes props and source', () => {

        var source = new IV.Data(I.Map({secret: 42}));

        var WrappedComponent = connect(
            testComponent,
            source,
            (sourceData, props) => ({testProp: sourceData.get(props.secretKey || 0)})
        );

        var setState = null;

        var ControllingComponent = React.createClass({
            render() {
                setState = s => this.setState(s);

                return (
                    <WrappedComponent secretKey={this.state && this.state.secretKey}>
                        {this.props.children}
                    </WrappedComponent>
                );
            },
        });

        var tmpMount = document.createElement('DIV');
        ReactDOM.render(<ControllingComponent>__controlled</ControllingComponent>, tmpMount);
        expect(tmpMount.innerText).toBe('noval__controlled');

        setState({secretKey: 'secret'});
        expect(tmpMount.innerText).toBe('42__controlled');

        source.write(I.Map({secret: 43}));
        expect(tmpMount.innerText).toBe('43__controlled');

    });
});
