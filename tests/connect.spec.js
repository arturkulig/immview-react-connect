import * as IV from 'immview';
import * as I from 'immutable';
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

const testData = new IV.Data(I.Map({ testField: 42 }));

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
            data => data.set('testProp', data.get('testField'))
        );

        const result = ReactDOMserver.renderToStaticMarkup(<WrappedComponent />);

        expect(result).toBe('<div>42</div>');

    });

    it('with Object', () => {

        const WrappedComponent = connect(
            testComponent,
            testData,
            data => ({ testProp: data.get('testField') })
        );

        const result = ReactDOMserver.renderToStaticMarkup(<WrappedComponent />);

        expect(result).toBe('<div>42</div>');

    });

    it('and change data', () => {
        const liveTestData = new IV.Data(I.Map());

        const WrappedComponent = connect(
            testComponent,
            liveTestData
        );

        const tmpMount = document.createElement('DIV');
        ReactDOM.render(<WrappedComponent />, tmpMount);

        expect(tmpMount.innerText).toBe('noval');

        liveTestData.write(I.Map({ testProp: 43 }));

        expect(tmpMount.innerText).toBe('43');

    });

    it('passes props down', () => {

        const sourceData = new IV.Data(I.Map());
        const sourceView = new IV.View(sourceData, sourceData => {
            if (sourceData.get('ready')) {
                return I.Map({ testProp: 45 });
            }

            return I.Map({});
        });

        const WrappedComponent = connect(
            testComponent,
            sourceView,
        );

        const tmpMount = document.createElement('DIV');
        ReactDOM.render(<WrappedComponent testProp={44} />, tmpMount);
        expect(tmpMount.innerText).toBe('44');

        sourceData.write(I.Map({ ready: 1 }));
        expect(tmpMount.innerText).toBe('45');

        sourceData.write(I.Map({ ready: null }));
        expect(tmpMount.innerText).toBe('44');

    });

    it('mixes props and source', () => {

        const source = new IV.Data(I.Map({ secret: 42 }));

        const WrappedComponent = connect(
            testComponent,
            source,
            (sourceData, props) => ({ testProp: sourceData.get(props.secretKey || 0) })
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

        source.write(I.Map({ secret: 43 }));
        expect(tmpMount.innerText).toBe('43__controlled');

    });

});
