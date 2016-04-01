import React from 'react';
import {View} from 'immview';
import {Iterable} from 'immutable';

function connect(component,
                 sources,
                 processor) {

    const ImmviewConnector = React.createClass({

        componentWillMount() {
            this.view = new View(sources, processor);
            const cancelViewReaction = this.view.subscribe(() => this.forceUpdate());
            this.destroyConnection = () => {
                cancelViewReaction();
                this.view.destroy();
            };
        },

        componentWillUnmount() {
            this.destroyConnection();
        },

        render() {
            const viewData = this.view.structure;
            const viewProps = Iterable.isIterable(viewData) ? viewData.toObject() : viewData;
            const props = {
                ...this.props,
                ...viewProps,
            };
            if (this.view.structure) {
                return React.createElement(
                    component,
                    props,
                    this.children
                );
            }

            return null;
        },

    });

    return ImmviewConnector;

}

// for es6 import
connect.default = connect;

module.exports = connect;
