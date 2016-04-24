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

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function connect(e,t,n){var i=_react2["default"].createClass({displayName:"ImmviewConnector",componentWillMount:function(){var e=this;this.view=new _immview.View(t),this.cancelViewReaction=this.view.subscribe(function(t){e.updateChildProps(t,e.props)})},componentWillUnmount:function(){this.destroyConnection()},componentWillReceiveProps:function(e){this.updateChildProps(this.view.read(),e)},shouldComponentUpdate:function(e,t){return this.state!==t},updateChildProps:function(e,t){var i=_extends({},t,deImmubtablize(n?n(e,t):e));i&&this.setState({processorProps:i})},destroyConnection:function(){this.view&&(this.cancelViewReaction&&this.cancelViewReaction(),this.cancelViewReaction=null,this.view.destroy(),this.view=null)},render:function(){return _react2["default"].createElement(e,this.state.processorProps)}});return i}function deImmubtablize(e){return _immutable.Iterable.isIterable(e)?e.toObject():e}var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},_react=__webpack_require__(1),_react2=_interopRequireDefault(_react),_immview=__webpack_require__(2),_immutable=__webpack_require__(3);module.exports=connect,module.exports.connect=connect,module.exports["default"]=connect;

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