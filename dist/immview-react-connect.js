(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("immview"), require("immutable"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "immview", "immutable"], factory);
	else if(typeof exports === 'object')
		exports["immview-react-connect"] = factory(require("react"), require("immview"), require("immutable"));
	else
		root["immview-react-connect"] = factory(root["react"], root["immview"], root["immutable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _immview = __webpack_require__(2);
	
	var _immutable = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function connect(component, sources, processor) {
	
	    var ImmviewConnector = _react2.default.createClass({
	        displayName: 'ImmviewConnector',
	        componentWillMount: function componentWillMount() {
	            var _this = this;
	
	            this.view = new _immview.View(sources);
	            this.updateChildProps = function (sourceData, props) {
	                var childProps = _extends({}, props, deImmubtablize(processor ? processor(sourceData, props) : sourceData));
	                if (childProps) {
	                    _this.setState({ childProps: childProps });
	                }
	            };
	
	            var cancelViewReaction = this.view.subscribe(function (data) {
	                _this.updateChildProps(data, _this.props);
	            });
	
	            this.destroyConnection = function () {
	                if (_this.view) {
	                    cancelViewReaction();
	                    _this.view.destroy();
	                    _this.view = null;
	                    _this.destroyConnection = null;
	                    _this.updateChildProps = null;
	                }
	            };
	        },
	        componentWillUnmount: function componentWillUnmount() {
	            this.destroyConnection && this.destroyConnection();
	        },
	        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	            this.updateChildProps(this.view.read(), nextProps);
	        },
	        render: function render() {
	            return _react2.default.createElement(component, this.state.childProps, this.state.childProps.children);
	        }
	    });
	
	    return ImmviewConnector;
	}
	
	function deImmubtablize(d) {
	    return _immutable.Iterable.isIterable(d) ? d.toObject() : d;
	}
	
	// for commonjs import
	module.exports = connect;
	
	// for es6 import
	module.exports.connect = connect;
	
	// for es6 default import
	module.exports.default = connect;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=immview-react-connect.js.map