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
	
	var React = __webpack_require__(1);
	var IV = __webpack_require__(2);
	var I = __webpack_require__(3);
	
	function connect(component, sources, processor) {
	
	    var ImmviewConnector = React.createClass({
	        displayName: 'ImmviewConnector',
	        componentWillMount: function componentWillMount() {
	            var _this = this;
	
	            this.view = new IV.View(sources, processor);
	            this.cancelViewReaction = this.view.subscribe(function () {
	                return _this.forceUpdate();
	            });
	        },
	        componentWillUnmount: function componentWillUnmount() {
	            this.view.destroy();
	            this.cancelViewReaction();
	        },
	        render: function render() {
	
	            var viewProps = I.Iterable.isIterable(this.view.structure) ? this.view.structure.toObject() : this.view.structure;
	
	            var props = _extends({}, this.props, viewProps);
	
	            if (this.view.structure) {
	                return React.createElement(component, props, this.children);
	            } else {
	                return null;
	            }
	        }
	    });
	
	    return ImmviewConnector;
	}
	
	module.exports = connect;

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