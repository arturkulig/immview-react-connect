(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("immview"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "immview"], factory);
	else if(typeof exports === 'object')
		exports["immview-react-connect"] = factory(require("react"), require("immview"));
	else
		root["immview-react-connect"] = factory(root["react"], root["immview"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
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

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function connect(e,t,n){var o=_react2.default.createClass({displayName:"ImmviewConnector",componentWillMount:function(){var e=this;this.view=new _immview.View(t),this.cancelViewReaction=this.view.subscribe(function(t){e.updateChildProps(t,e.props)})},componentWillUnmount:function(){this.destroyConnection()},componentWillReceiveProps:function(e){this.updateChildProps(this.view.read(),e)},shouldComponentUpdate:function(e,t){return this.state!==t},updateChildProps:function(e,t){var o=_extends({},t,deImmubtablize(n?n(e,t):e));o&&this.setState({processorProps:o})},destroyConnection:function(){this.view&&(this.cancelViewReaction&&this.cancelViewReaction(),this.cancelViewReaction=null,this.view.destroy(),this.view=null)},render:function(){return _react2.default.createElement(e,this.state.processorProps)}});return o}function deImmubtablize(e){return"object"!==("undefined"==typeof e?"undefined":_typeof(e))||null===e?e:"function"==typeof e.toObject?e.toObject():e}var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},_react=__webpack_require__(1),_react2=_interopRequireDefault(_react),_immview=__webpack_require__(2);module.exports=connect,module.exports.connect=connect,module.exports.default=connect;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=immview-react-connect.js.map