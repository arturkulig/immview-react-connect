import React from 'react';
import {View} from 'immview';
import {Iterable} from 'immutable';

function connect(component,
                 sources,
                 processor) {

    const ImmviewConnector = React.createClass({
        componentWillMount() {
            this.view = new View(sources);

            this.cancelViewReaction = this.view.subscribe(data => {
                this.updateChildProps(data, this.props);
            });
        },

        componentWillUnmount() {
            this.destroyConnection();
        },

        componentWillReceiveProps(nextProps) {
            this.updateChildProps(this.view.read(), nextProps);
        },
        
        shouldComponentUpdate(nextProps, nextState) {
            return this.state !== nextState;
        },

        updateChildProps(sourceData, props) {
            const processorProps = {
                ...props,
                ...deImmubtablize(
                    processor
                        ? processor(sourceData, props)
                        : sourceData
                ),
            };
            if (processorProps) {
                this.setState({ processorProps });
            }
        },

        destroyConnection() {
            if (this.view) {
                this.cancelViewReaction && this.cancelViewReaction();
                this.cancelViewReaction = null;
                this.view.destroy();
                this.view = null;
            }
        },

        render() {
            return React.createElement(
                component,
                this.state.processorProps
            );
        },

    });

    return ImmviewConnector;
}

function deImmubtablize(d) {
    return Iterable.isIterable(d) ? d.toObject() : d;
}

// for commonjs import
module.exports = connect;

// for es6 import
module.exports.connect = connect;

// for es6 default import
module.exports.default = connect;
