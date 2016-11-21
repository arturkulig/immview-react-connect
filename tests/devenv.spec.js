const IV = require('immview');
const React = require('react');
const ReactDOMserver = require('react-dom/server');

describe('dev environment contains', () => {
    it('immview', () => {
        expect(IV).toBeDefined();
    });
    it('React', () => {
        expect(React).toBeDefined();
        expect(ReactDOMserver).toBeDefined();
    });
});

describe('Can test', () => {
    it('React component', () => {
        const TestComponent = React.createClass({
            render: () => (
                <div>42</div>
            ),
        });

        const element = (
            <TestComponent></TestComponent>
        );

        const result = ReactDOMserver.renderToStaticMarkup(element);

        expect(result).toBe('<div>42</div>');
    });
});
