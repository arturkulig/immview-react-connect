import { Atom, dispatch } from 'immview'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactDOMserver from 'react-dom/server'
import { connect } from '../src/index'

const testComponent = (props: { testProp: number, children?: any }) => {
    return (
        <div>{props.testProp || 'noval'}{props.children}</div>
    )
}

const valuesPushed = () => new Promise(resolve => dispatch(resolve))

describe('connect', () => {
    it('with noop', async () => {
        const WrappedComponent = connect(
            testComponent,
            new Atom({ testField: 42 }),
            v => null
        )

        const result = ReactDOMserver.renderToStaticMarkup(<WrappedComponent />)

        expect(result).toBe('<div>noval</div>')
    })

    it('with Object', async () => {
        const WrappedComponent = connect(
            testComponent,
            new Atom({ testField: 42 }),
            data => ({ testProp: data.testField })
        )

        const result = ReactDOMserver.renderToStaticMarkup(<WrappedComponent />)

        expect(result).toBe('<div>42</div>')
    })

    it('and change data', async () => {
        const liveTestData = new Atom<{ testProp: number }>({ testProp: undefined })

        const WrappedComponent = connect(
            testComponent,
            liveTestData,
            v => v
        )

        const tmpMount = document.createElement('DIV')
        ReactDOM.render(<WrappedComponent />, tmpMount)
        expect(tmpMount.innerText).toBe('noval')

        liveTestData.next({ testProp: 43 })
        await valuesPushed()
        expect(tmpMount.innerText).toBe('43')
    })

    it('passes props down', async () => {
        const source = new Atom<{ testProp?: number }>({})

        const WrappedComponent = connect(
            testComponent,
            source,
            (sourceValue, props: { testProp: number }) => ({ ...props, ...sourceValue })
        )

        const tmpMount = document.createElement('DIV')
        ReactDOM.render(<WrappedComponent testProp={44} />, tmpMount)
        await valuesPushed()
        expect(tmpMount.innerText).toBe('44')

        source.next({ testProp: 45 })
        await valuesPushed()
        expect(tmpMount.innerText).toBe('45')

        source.next({})
        await valuesPushed()
        expect(tmpMount.innerText).toBe('44')
    })

    it('mixes props and source', async () => {
        type SourceT = { secret: number }
        const source = new Atom<SourceT>({ secret: 42 })

        const WrappedComponent = connect(
            testComponent,
            source,
            (sourceData, props: { secretKey: string }) => ({ ...props, testProp: sourceData[props.secretKey] | 0 })
        )

        let setState

        class ControllingComponent extends React.Component<{}, { secretKey?: string }>{
            state = { secretKey: null }

            render() {
                setState = s => this.setState(s)

                return (
                    <WrappedComponent secretKey={this.state.secretKey}>
                        {this.props.children}
                    </WrappedComponent>
                )
            }
        }

        const tmpMount = document.createElement('DIV')
        ReactDOM.render(<ControllingComponent>__controlled</ControllingComponent>, tmpMount)
        expect(tmpMount.innerText).toBe('noval__controlled')

        setState({ secretKey: 'secret' })
        expect(tmpMount.innerText).toBe('42__controlled')

        source.next({ secret: 43 })
        await valuesPushed()
        expect(tmpMount.innerText).toBe('43__controlled')
    })
})
