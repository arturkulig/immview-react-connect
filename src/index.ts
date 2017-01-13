import * as React from 'react';
import { Observable } from 'immview';

function connect
    <SourceT extends {}, OriginalPropsT extends {}, SourcedProps extends {}>
    (
    component: React.ComponentClass<OriginalPropsT & SourcedProps>,
    source: Observable<SourceT>,
    connector: (sourceValue: SourceT, props: OriginalPropsT) => SourcedProps
    ) {
    const ImmviewConnector = React.createClass<OriginalPropsT, { source: SourceT }>({
        componentWillMount() {
            this.cancelViewReaction = source.subscribe(source => {
                this.setState({ source })
            });
        },

        componentWillUnmount() {
            if (!this.cancelViewReaction) return
            this.cancelViewReaction()
            this.cancelViewReaction = null
        },

        render(this: React.Component<OriginalPropsT, { source: SourceT }>) {
            return React.createElement(
                component,
                {
                    ...this.props as Object,
                    ...connector(this.state.source, this.props) as Object,
                } as OriginalPropsT & SourcedProps
            );
        },

    });

    return ImmviewConnector;
}

export {
    connect,
    connect as default
}
