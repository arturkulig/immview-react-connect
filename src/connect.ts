import * as React from 'react'
import { OpStream } from 'immview'

export default function connect
    <SourceT extends {}>
    (
    component: React.ComponentClass<SourceT> | React.StatelessComponent<SourceT>,
    source: OpStream<SourceT>
    ): React.ComponentClass<SourceT>
export default function connect
    <OriginalPropsT extends {}, SourceT extends {}, ResultPropsT extends {}>
    (
    component: React.ComponentClass<ResultPropsT> | React.StatelessComponent<ResultPropsT>,
    source: OpStream<SourceT>,
    connector?: (sourceValue: SourceT, props: OriginalPropsT) => ResultPropsT
    ): React.ComponentClass<OriginalPropsT>

export default function connect<T, U, V extends {}>
    (
    component: React.ComponentClass<V> | React.StatelessComponent<V>,
    source: OpStream<U>,
    connector?: (sourceValue: U, props: T) => V
    ): React.ComponentClass<T> {
    const instances: React.Component<T, { sourceValue?: U }>[] = []

    source.subscribe(value => {
        instances.forEach(instance => {
            instance.forceUpdate()
        })
    });
    class ImmviewConnector extends React.Component<T, { sourceReceived: boolean, sourceValue?: U }>{
        state = { sourceReceived: false }
        componentWillMount() {
            instances.push(this)
        }

        componentWillUnmount() {
            const pos = instances.indexOf(this)
            if (pos >= 0) {
                instances.splice(pos, 1)
            }
        }

        render(this: React.Component<T, { sourceReceived: boolean, sourceValue?: U }>) {
            if (!source.hasRef()) return null
            const nextProps: V = connector
                ? (connector(source.deref(), this.props) || {}) as V
                : (source.deref() || {}) as V
            return React.createElement(
                component as React.ComponentClass<V>,
                nextProps
            )
        }
    }

    return ImmviewConnector
}