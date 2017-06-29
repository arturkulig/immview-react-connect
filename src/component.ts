import * as React from 'react'
import { Atom, OpStream, dispatcher } from 'immview'

export class StateAtom<T extends Object> extends Atom<T> {
    next(valueOrProducer: Partial<T> | ((p: T) => Partial<T>)) {
        const producer =
            typeof valueOrProducer === 'function'
                ? valueOrProducer
                : ((_: T) => valueOrProducer)
        Atom.prototype.next.call(
            this,
            prevState => ({
                ...prevState as Object,
                ...producer(prevState) as any as Object
            })
        )
    }
}

export default function component<PropsT extends {}>(getStream: (props$: Atom<PropsT>) => OpStream<JSX.Element>): React.ComponentClass<PropsT>
export default function component<PropsT extends {}, StateT>(getStream: (props$: Atom<PropsT>, state$: StateAtom<StateT>) => OpStream<JSX.Element>): React.ComponentClass<PropsT>
export default function component<PropsT extends {}, StateT>(getStream: (props$: Atom<PropsT>, state$: StateAtom<StateT>) => OpStream<JSX.Element>) {
    return class IVComponent extends React.Component<PropsT, { view: JSX.Element }> {
        props$: Atom<PropsT>
        state$: StateAtom<StateT>
        view$: OpStream<JSX.Element>
        dead = true

        constructor(props) {
            super(props)
            this.state = {
                view: null
            }
            this.props$ = new Atom(props)
            this.state$ = new StateAtom(null)
            if (dispatcher.isRunning) {
                Promise.resolve().then(this.initialize)
            } else {
                this.initialize()
            }
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
            this.view$ && this.view$.complete()
            this.props$.complete()
            this.state$.complete()
        }

        initialize = () => {
            this.view$ = getStream(this.props$, this.state$)
            this.view$.subscribe(view => {
                if (this.dead) {
                    this.state = { view }
                } else {
                    this.setState({ view })
                }
            })
        }

        render() {
            return this.state.view
        }
    }
}
