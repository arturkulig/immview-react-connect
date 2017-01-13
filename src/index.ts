import * as React from 'react';
import { Observable } from 'immview';

function connect
    <SourceT extends {}>
    (
    component: React.ComponentClass<SourceT>,
    source: Observable<SourceT>
    ): React.ComponentClass<SourceT>
function connect
    <OriginalPropsT extends {}, SourceT extends {}, ResultPropsT extends {}>
    (
    component: React.ComponentClass<ResultPropsT>,
    source: Observable<SourceT>,
    connector?: (sourceValue: SourceT, props: OriginalPropsT) => ResultPropsT
    ): React.ComponentClass<OriginalPropsT>
function connect<T, U, V extends {}>
    (
    component: React.ComponentClass<V>,
    source: Observable<U>,
    connector?: (sourceValue: U, props: T) => V
    ): React.ComponentClass<T> {
    const instances: React.Component<T, { sourceReceived: boolean, sourceValue?: U }>[] = []

    source.subscribe(value => {
        instances.forEach(instance => {
            console.log('TEST DATA PUSH')
            instance.setState({ sourceReceived: true, sourceValue: value })
        })
    });

    const ImmviewConnector = React.createClass<T, { sourceReceived: boolean, sourceValue?: U }>({
        getInitialState() {
            return { sourceReceived: false }
        },

        componentWillMount() {
            instances.push(this)
        },

        componentWillUnmount() {
            const pos = instances.indexOf(this)
            if (pos >= 0) {
                instances.splice(pos, 1)
            }
        },

        render(this: React.Component<T, { sourceReceived: boolean, sourceValue?: U }>) {
            if (!this.state.sourceReceived) {
                if (source.previous() === undefined) return null
                this.state = { sourceReceived: true, sourceValue: source.previous() }
            }
            if (connector) {
                return React.createElement(
                    component,
                    ({
                        ...(
                            connector(this.state.sourceValue, this.props) || {}
                        )
                    }) as V
                );
            }
            return React.createElement(
                component,
                ({
                    ...(
                        this.state.sourceValue || {}
                    )
                }) as V
            );
        },

    });

    return ImmviewConnector;
}

export {
    connect,
    connect as default
}