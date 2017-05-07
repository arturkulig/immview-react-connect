import * as React from 'react'
import { Atom, OpStream } from 'immview'

export default function component<PropsT extends {}>(getStream: (props$: Atom<PropsT>) => OpStream<JSX.Element>): React.ComponentClass<PropsT>
export default function component<PropsT extends {}, StateT>(getStream: (props$: Atom<PropsT>, state$: Atom<StateT>) => OpStream<JSX.Element>): React.ComponentClass<PropsT>
export default function component<PropsT extends {}, StateT>(getStream: (props$: Atom<PropsT>, state$: Atom<StateT>) => OpStream<JSX.Element>) {
    return class IVComponent extends React.Component<PropsT, { view: JSX.Element }> {
        props$: Atom<PropsT>
        state$: Atom<StateT>
        view$: OpStream<JSX.Element>
        dead = true

        constructor(props) {
            super(props)
            this.props$ = new Atom(props)
            this.state$ = new Atom(null)
            this.view$ = getStream(this.props$, this.state$)
            this.state = {
                view: this.view$.deref()
            }
            this.view$.subscribe(view => {
                if (this.dead) return
                this.setState({ view })
            })
        }

        componentWillReceiveProps(nextProps) {
            this.props$.next(nextProps)
        }

        shouldComponentUpdate(nextProps, nextState) {
            return nextState !== this.state
        }

        componentDidMount() {
            this.dead = false
        }

        componentWillUnmount() {
            this.dead = true
            this.view$.complete()
            this.props$.complete()
            this.state$.complete()
        }

        render() {
            return this.state.view
        }
    }
}