import { Atom, dispatch, Combine } from 'immview'
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
        it('maintains state', () => {
            let state$$ = null
            const View = component<any, { key: string }>(
                (props$, state$) =>
                    (
                        state$$ = state$,
                        state$.next({ key: null }),
                        new Combine({ props: props$, state: state$ })
                            .map(({ props, state }) => (
                                <div>{props[state.key] || 'none'}</div>
                            ))
                    )
            )
            const hook = document.createElement('div')
            ReactDOM.render(<View details="devil" />, hook)
            expect(hook.innerText).toBe('none')
            state$$.next({ key: 'details' })
            expect(hook.innerText).toBe('devil')
        })
        it('applies to state', () => {
            let state$$ = null
            const View = component<{}, { chest: string, key: string }>(
                (_, state$) =>
                    (
                        state$$ = state$,
                        state$.next({ chest: null, key: null }),
                        state$
                            .map((state) => (
                                <div>{state[state.key] || 'none'}</div>
                            ))
                    )
            )
            const hook = document.createElement('div')

            ReactDOM.render(<View />, hook)
            expect(hook.innerText).toBe('none')

            state$$.next({ key: 'chest' })
            state$$.next({ chest: 'treasure' })
            expect(hook.innerText).toBe('treasure')
        })
        it('taking props as a stream', () => {
            let setState
            const View =
                component<{ testProp: number }>(
                    props$ => props$.map(testComponent)
                )
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
        it('state$.next always gets applied immediately', done => {
            const View = component<{}, { chest: string, key: string }>(
                (_, state$) =>
                    (
                        state$.next({ chest: 'treasure', key: 'chest' }),
                        expect(state$.deref()[state$.deref().key]).toBe('treasure'),
                        state$
                            .map((state) => (
                                expect(state[state.key]).toBe('treasure'),
                                <div>{state[state.key] || 'none'}</div>
                            ))
                    )
            )
            const hook = document.createElement('div')
            dispatch(() => {
                try {
                    ReactDOM.render(<View />, hook)
                } catch (e) { done.fail(e) }
            })
            Promise.resolve().then(() => {
                try {
                    expect(hook.innerText).toBe('treasure')
                    done()
                } catch (e) { done.fail(e) }
            })
        })
    })
})
