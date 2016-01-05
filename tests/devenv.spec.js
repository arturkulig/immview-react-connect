var immview = require('immview');
var Immutable = require('immutable');
var React = require('react');
var ReactDOMserver = require('react-dom/server');

describe('dev environment contains', () => {
    it('immview', () => {
        expect(immview).toBeDefined();
    });
    it('Immutable', () => {
        expect(Immutable).toBeDefined();
    });
    it('React', () => {
        expect(React).toBeDefined();
        expect(ReactDOMserver).toBeDefined();
    });
});

describe('Can test', () => {
    it('React component', () => {
        var TestComponent = React.createClass({
            render: () => (
                <div>42</div>
            ),
        });

        var element = (
            <TestComponent></TestComponent>
        );

        var result = ReactDOMserver.renderToStaticMarkup(element);

        expect(result).toBe('<div>42</div>');
    });
});
