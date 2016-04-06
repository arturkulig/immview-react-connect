import React from 'react';
import {View} from 'immview';
import {Iterable} from 'immutable';

function connect(component,
                 sources,
                 processor) {

    const ImmviewConnector = React.createClass({
        componentWillMount() {
            this.view = new View(sources);
            this.updateChildProps = (sourceData, props) => {
                const childProps = {
                    ...props,
                    ...deImmubtablize(
                        processor
                            ? processor(sourceData, props)
                            : sourceData
                    ),
                };
                if (childProps) {
                    this.setState({childProps});
                }
            };

            const cancelViewReaction = this.view.subscribe(data => {
                this.updateChildProps(data, this.props);
            });

            this.destroyConnection = () => {
                if (this.view) {
                    cancelViewReaction();
                    this.view.destroy();
                    this.view = null;
                    this.destroyConnection = null;
                    this.updateChildProps = null;
                }
            };
        },

        componentWillUnmount() {
            this.destroyConnection && this.destroyConnection();
        },

        componentWillReceiveProps(nextProps) {
            this.updateChildProps(this.view.read(), nextProps);
        },

        render() {
            return React.createElement(
                component,
                this.state.childProps,
                this.state.childProps.children
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
