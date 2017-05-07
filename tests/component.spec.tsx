import { Atom, dispatch } from 'immview'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactDOMserver from 'react-dom/server'
import { component } from '../src/index'

const testComponent = (props: { testProp: number, children?: any }) => {
    return (
        <div>{props.testProp || 'noval'}{props.children}</div>
    )
}

const valuesPushed = () => new Promise(resolve => dispatch(resolve))

describe('component', () => {
    describe('to string', () => {
        it('renders', () => {
            const source$ = new Atom({ testProp: 42 })
            const View = component(() => source$.map(testComponent))
            const result = ReactDOMserver.renderToStaticMarkup(<View />)
            expect(result).toBe('<div>42</div>')
        })
        it('taking props as a stream', () => {
            const View = component<{ testProp: number }>(props$ => props$.map(testComponent))
            const result = ReactDOMserver.renderToStaticMarkup(<View testProp={42} />)
            expect(result).toBe('<div>42</div>')
        })
    })
    describe('to dom', () => {
        it('renders', () => {
            const source$ = new Atom({ testProp: 42 })
            const View = component(() => source$.map(testComponent))
            const hook = document.createElement('div')
            ReactDOM.render(<View />, hook)
            expect(hook.innerText).toBe('42')
            source$.next({ testProp: 43 })
            expect(hook.innerText).toBe('43')
        })
        it('taking props as a stream', () => {
            let setState
            const View = component<{ testProp: number }>(props$ => props$.map(testComponent))
            class Mount extends React.Component<{}, { testProp: number }> {
                state = { testProp: 42 }
                constructor(props) {
                    super(props)
                    setState = (...args) => (this as any).setState(...args)
                }
                render() {
                    return <View testProp={this.state.testProp} />
                }
            }
            const hook = document.createElement('div')
            ReactDOM.render(<Mount />, hook)
            expect(hook.innerText).toBe('42')
            setState({ testProp: 43 })
            expect(hook.innerText).toBe('43')
        })
    })
})
