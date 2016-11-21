import * as IV from 'immview';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMserver from 'react-dom/server';
import connect from '../src/index.js';

const testComponent = React.createClass({
    render() {
        return (
            <div>{this.props.testProp || 'noval'}{this.props.children}</div>
        );
    },
});

const testData = new IV.Data({ testField: 42 });

describe('connect', () => {

    it('with noop', () => {

        const WrappedComponent = connect(
            testComponent,
            testData
        );

        const result = ReactDOMserver.renderToStaticMarkup(<WrappedComponent />);

        expect(result).toBe('<div>noval</div>');

    });

    it('with Immutable.Map', () => {
        const WrappedComponent = connect(
            testComponent,
            testData,
            data => ({ toObject: () => ({ testProp: data.testField }) })
        );

        const result = ReactDOMserver.renderToStaticMarkup(<WrappedComponent />);

        expect(result).toBe('<div>42</div>');

    });

    it('with Object', () => {

        const WrappedComponent = connect(
            testComponent,
            testData,
            data => ({ testProp: data.testField })
        );

        const result = ReactDOMserver.renderToStaticMarkup(<WrappedComponent />);

        expect(result).toBe('<div>42</div>');

    });

    it('and change data', () => {
        const liveTestData = new IV.Data({});

        const WrappedComponent = connect(
            testComponent,
            liveTestData
        );

        const tmpMount = document.createElement('DIV');
        ReactDOM.render(<WrappedComponent />, tmpMount);

        expect(tmpMount.innerText).toBe('noval');

        liveTestData.write({ testProp: 43 });

        expect(tmpMount.innerText).toBe('43');

    });

    it('passes props down', () => {

        const sourceData = new IV.Data({});
        const sourceView = new IV.View(sourceData, sourceData => {
            if (sourceData.ready) {
                return { testProp: 45 };
            }

            return {};
        });

        const WrappedComponent = connect(
            testComponent,
            sourceView,
        );

        const tmpMount = document.createElement('DIV');
        ReactDOM.render(<WrappedComponent testProp={44} />, tmpMount);
        expect(tmpMount.innerText).toBe('44');

        sourceData.write({ ready: 1 });
        expect(tmpMount.innerText).toBe('45');

        sourceData.write({ ready: null });
        expect(tmpMount.innerText).toBe('44');

    });

    it('mixes props and source', () => {

        const source = new IV.Data({ secret: 42 });

        const WrappedComponent = connect(
            testComponent,
            source,
            (sourceData, props) => ({ testProp: sourceData[props.secretKey] || 0 })
        );

        let setState;

        const ControllingComponent = React.createClass({
            render() {
                setState = s => this.setState(s);

                return (
                    <WrappedComponent secretKey={this.state && this.state.secretKey}>
                        {this.props.children}
                    </WrappedComponent>
                );
            },
        });

        const tmpMount = document.createElement('DIV');
        ReactDOM.render(<ControllingComponent>__controlled</ControllingComponent>, tmpMount);
        expect(tmpMount.innerText).toBe('noval__controlled');

        setState({ secretKey: 'secret' });
        expect(tmpMount.innerText).toBe('42__controlled');

        source.write({ secret: 43 });
        expect(tmpMount.innerText).toBe('43__controlled');

    });

});
