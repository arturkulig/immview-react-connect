var React = require('react');
var IV = require('immview');
var I = require('immutable');

function connect(component,
                 sources,
                 processor) {

    var ImmviewConnector = React.createClass({

        componentWillMount() {
            this.view = new IV.View(sources, processor);
            this.cancelViewReaction = this.view.subscribe(() => this.forceUpdate());
        },

        componentWillUnmount() {
            this.view.destroy();
            this.cancelViewReaction();
        },

        render() {

            var viewProps = I.Iterable.isIterable(this.view.structure) ? this.view.structure.toObject() : this.view.structure;

            var props = {
                ...this.props,
                ...viewProps,
            };

            if (this.view.structure) {
                return React.createElement(
                    component,
                    props,
                    this.children
                );
            } else {
                return null;
            }
        },

    });

    return ImmviewConnector;

}

module.exports = connect;
