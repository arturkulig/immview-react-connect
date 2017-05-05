import * as IV from 'immview'
import * as React from 'react'
import * as ReactDOMserver from 'react-dom/server'

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
        class TestComponent extends React.Component<{}, {}> {
            render() {
                return (
                    <div>42</div>
                )
            }
        }

        const element = (
            <TestComponent></TestComponent>
        );

        const result = ReactDOMserver.renderToStaticMarkup(element);

        expect(result).toBe('<div>42</div>');
    });
});
