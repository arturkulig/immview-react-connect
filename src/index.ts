import * as React from 'react';
import { Observable, NO_VALUE } from 'immview';

function connect
    <SourceT extends {}>
    (
    component: React.ComponentClass<SourceT> | React.StatelessComponent<SourceT>,
    source: Observable<SourceT>
    ): React.ComponentClass<SourceT>
function connect
    <OriginalPropsT extends {}, SourceT extends {}, ResultPropsT extends {}>
    (
    component: React.ComponentClass<ResultPropsT> | React.StatelessComponent<ResultPropsT>,
    source: Observable<SourceT>,
    connector?: (sourceValue: SourceT, props: OriginalPropsT) => ResultPropsT
    ): React.ComponentClass<OriginalPropsT>
function connect<T, U, V extends {}>
    (
    component: React.ComponentClass<V> | React.StatelessComponent<V>,
    source: Observable<U>,
    connector?: (sourceValue: U, props: T) => V
    ): React.ComponentClass<T> {
    const instances: React.Component<T, { sourceReceived: boolean, sourceValue?: U }>[] = []

    source.subscribe(value => {
        instances.forEach(instance => {
            instance.setState({ sourceReceived: true, sourceValue: value })
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
            if (!this.state.sourceReceived) {
                const previous = source.previous()
                if (source.previous() === NO_VALUE) return null
                const previousWithValue = previous as U
                this.state = { sourceReceived: true, sourceValue: previousWithValue }
            }
            const nextProps: V = connector
                ? (connector(this.state.sourceValue, this.props) || {}) as V
                : (this.state.sourceValue || {}) as V
            return React.createElement(
                component as React.ComponentClass<V>,
                nextProps
            )
        }
    }

    return ImmviewConnector;
}

export {
    connect,
    connect as default
}
