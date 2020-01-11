module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/UI/Button.tsx":
/*!**********************************!*\
  !*** ./components/UI/Button.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Button; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-properties */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-properties.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-descriptors */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-descriptor */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-symbols */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);







var _jsxFileName = "/home/rustam/alem-ecommerce/client/components/UI/Button.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default()(object); if (_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default.a) { var symbols = _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default()(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }); } else if (_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default.a) { _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default()(target, _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default()(source)); } else { ownKeys(Object(source)).forEach(function (key) { _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(target, key, _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(source, key)); }); } } return target; }


let Btn;

(function (_Btn) {})(Btn || (Btn = {}));

function Button(props) {
  const btnStyle = {
    backgroundColor: props.backgroundColor ? `${props.base ? "transaprent" : props.backgroundColor}` : `${props.base ? "transaprent" : "grey"}`,
    border: props.border ? `1px solid ${props.borderColor ? props.borderColor : "grey"}` : "none",
    borderRadius: props.borderRadius ? props.borderRadius : "4px",
    fontSize: props.fontSize ? props.fontSize : "14px",
    height: props.height ? props.height : "35px",
    width: props.width ? props.width : "120px",
    color: props.color ? props.color : "black",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    display: "flex"
  };
  const style = props.customStyleObject ? _objectSpread({}, btnStyle, {}, props.customStyleObject) : _objectSpread({}, btnStyle);
  return __jsx("div", {
    className: props.className,
    onClick: props.onClick,
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    style: style,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }, props.content);
}

/***/ }),

/***/ "./components/UI/Card.tsx":
/*!********************************!*\
  !*** ./components/UI/Card.tsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Card; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-properties */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-properties.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-descriptors */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-descriptor */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-symbols */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);







var _jsxFileName = "/home/rustam/alem-ecommerce/client/components/UI/Card.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default()(object); if (_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default.a) { var symbols = _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default()(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }); } else if (_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default.a) { _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default()(target, _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default()(source)); } else { ownKeys(Object(source)).forEach(function (key) { _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(target, key, _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(source, key)); }); } } return target; }


let CardNamespace;

(function (_CardNamespace) {})(CardNamespace || (CardNamespace = {}));

function Card(props) {
  const cardRef = Object(react__WEBPACK_IMPORTED_MODULE_7__["useRef"])();
  const {
    0: cardHeight,
    1: setHeight
  } = Object(react__WEBPACK_IMPORTED_MODULE_7__["useState"])();
  Object(react__WEBPACK_IMPORTED_MODULE_7__["useEffect"])(() => {
    setHeight(cardRef.current.getBoundingClientRect().height);
  }, []);

  const btnPosition = textPosition => {
    switch (textPosition) {
      case "center":
        return "center";

      case "left":
        return "flex-start";

      case "right":
        return "flex-end";

      default:
        break;
    }
  };

  const commonTextStyle = {
    textAlign: props.textPosition ? props.textPosition : "center",
    marginRight: props.textPosition === "right" ? "30px" : "",
    marginLeft: props.textPosition === "left" ? "30px" : "",
    color: props.color ? props.color : "#000"
  };

  const headerStyle = _objectSpread({}, commonTextStyle, {
    marginTop: "30px",
    alignSelf: props.textPosition ? btnPosition(props.textPosition) : "center"
  });

  const titleStyle = _objectSpread({}, commonTextStyle, {
    marginTop: "30px",
    fontSize: props.fontSize ? props.fontSize : "16px",
    width: "200px",
    alignSelf: props.textPosition ? btnPosition(props.textPosition) : "center"
  });

  const subTitleStyle = _objectSpread({}, commonTextStyle, {
    marginTop: "10px",
    fontSize: "14px",
    color: "#bababa"
  });

  const btnStyle = _objectSpread({
    marginTop: "40px",
    display: "flex",
    justifyContent: props.textPosition ? btnPosition(props.textPosition) : "center",
    marginRight: props.textPosition === "right" ? "10px" : "",
    marginLeft: props.textPosition === "left" ? "10px" : ""
  }, commonTextStyle);

  const footerStyle = _objectSpread({
    borderTop: "1px solid #d9d9d9",
    marginTop: "10px"
  }, commonTextStyle);

  const cardStyle = {
    height: props.height ? props.height : "",
    width: props.width ? props.width : "200px",
    border: props.border ? `1px solid ${props.borderColor ? props.borderColor : "#d9d9d9"}` : "none",
    backgroundImage: props.bgImage ? "url(" + props.bgImage + ")" : "",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: props.backgroundColor ? props.backgroundColor : "#fff",
    borderRadius: props.borderRadius ? props.borderRadius : "3px",
    paddingBottom: "10px",
    display: "flex"
  };
  return __jsx("div", {
    ref: cardRef,
    style: _objectSpread({}, cardStyle, {
      flexDirection: "column"
    }, props.customStyleObject),
    onClick: props.onClick,
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109
    },
    __self: this
  }, props.header ? __jsx("div", {
    style: headerStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116
    },
    __self: this
  }, props.header) : "", props.title ? __jsx("div", {
    style: titleStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117
    },
    __self: this
  }, props.title) : "", props.subTitle ? __jsx("div", {
    style: subTitleStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118
    },
    __self: this
  }, props.subTitle) : "", __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119
    },
    __self: this
  }, props.body ? props.body : ""), props.actionButton ? __jsx("div", {
    style: btnStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120
    },
    __self: this
  }, props.actionButton) : "");
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/assign.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/assign */ "core-js/library/fn/object/assign");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/define-properties.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/define-properties.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/define-properties */ "core-js/library/fn/object/define-properties");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/define-property */ "core-js/library/fn/object/define-property");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-descriptor */ "core-js/library/fn/object/get-own-property-descriptor");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-descriptors */ "core-js/library/fn/object/get-own-property-descriptors");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-symbols */ "core-js/library/fn/object/get-own-property-symbols");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/keys.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/keys */ "core-js/library/fn/object/keys");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _defineProperty; });
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _extends; });
/* harmony import */ var _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js");
/* harmony import */ var _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);

function _extends() {
  _extends = _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default.a || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _public_styles_LandingStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../public/styles/LandingStyle */ "./public/styles/LandingStyle.tsx");
/* harmony import */ var _public_icons_compiled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../public/icons/_compiled */ "./public/icons/_compiled/index.ts");
/* harmony import */ var _components_UI_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/UI/Button */ "./components/UI/Button.tsx");
/* harmony import */ var _components_UI_Card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/UI/Card */ "./components/UI/Card.tsx");
/* harmony import */ var nuka_carousel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! nuka-carousel */ "nuka-carousel");
/* harmony import */ var nuka_carousel__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(nuka_carousel__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "/home/rustam/alem-ecommerce/client/pages/index.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





function index() {
  const btnClick = () => {
    console.log("cliks");
  };

  const previousButton = ({
    previousSlide
  }) => __jsx("div", {
    className: "parent",
    style: {
      marginTop: "-80px"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, __jsx(_public_icons_compiled__WEBPACK_IMPORTED_MODULE_2__["ArrowRight"], {
    style: {
      cursor: "pointer"
    },
    onClick: previousSlide,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }));

  const nextButtom = ({
    nextSlide
  }) => __jsx("div", {
    className: "parent",
    style: {
      marginTop: "-80px"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, __jsx(_public_icons_compiled__WEBPACK_IMPORTED_MODULE_2__["ArrowLeft"], {
    style: {
      cursor: "pointer"
    },
    onClick: nextSlide,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }));

  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, __jsx("div", {
    className: "header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, __jsx("div", {
    className: "navbar",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, __jsx("div", {
    className: "logo",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, "\xE4lem"), __jsx("div", {
    className: "categories",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, __jsx("div", {
    className: "men",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }, "Men"), __jsx("div", {
    className: "women",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }, "Women")), __jsx("div", {
    className: "actions",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: this
  }, __jsx("div", {
    className: "search",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  }, __jsx(_public_icons_compiled__WEBPACK_IMPORTED_MODULE_2__["Search"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  })), __jsx("div", {
    className: "search",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  }, __jsx(_public_icons_compiled__WEBPACK_IMPORTED_MODULE_2__["Cart"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: this
  })), __jsx("div", {
    className: "search",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }, __jsx(_public_icons_compiled__WEBPACK_IMPORTED_MODULE_2__["Avatar"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  })))), __jsx("div", {
    className: "header-main",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }, __jsx("div", {
    className: "title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }, "Brand new January Collection"), __jsx(_components_UI_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    customStyleObject: {
      marginTop: "40px"
    },
    backgroundColor: "#ff7070",
    onClick: btnClick,
    content: "Check More",
    borderRadius: "30px",
    height: "50px",
    width: "150px",
    border: false,
    color: "#fff",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  }))), __jsx("div", {
    className: "main",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: this
  }, __jsx("div", {
    className: "promocards",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  }, __jsx(_components_UI_Card__WEBPACK_IMPORTED_MODULE_4__["default"], {
    height: "375px",
    width: "650px",
    backgroundColor: "black",
    title: "New arrivals are now in!",
    color: "#fff",
    fontSize: "30px",
    customStyleObject: {
      justifyContent: "center"
    },
    actionButton: __jsx(_components_UI_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
      content: "Show Collection",
      color: "#fff",
      backgroundColor: "#ff7070",
      borderRadius: "30px",
      height: "50px",
      width: "150px",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 72
      },
      __self: this
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: this
  }), __jsx(_components_UI_Card__WEBPACK_IMPORTED_MODULE_4__["default"], {
    height: "375px",
    width: "350px",
    title: "Jackets",
    subTitle: "$ 39.99",
    backgroundColor: "purple",
    color: "#fff",
    fontSize: "30px",
    customStyleObject: {
      justifyContent: "center"
    },
    actionButton: __jsx(_components_UI_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
      content: "Show All",
      color: "#fff",
      backgroundColor: "#ff7070",
      borderRadius: "30px",
      height: "50px",
      width: "150px",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 91
      },
      __self: this
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82
    },
    __self: this
  }), __jsx(_components_UI_Card__WEBPACK_IMPORTED_MODULE_4__["default"], {
    height: "375px",
    width: "350px",
    title: "Sale This Winter -50%",
    backgroundColor: "purple",
    color: "#fff",
    fontSize: "30px",
    customStyleObject: {
      justifyContent: "center"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101
    },
    __self: this
  })), __jsx("div", {
    className: "popular",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111
    },
    __self: this
  }, __jsx("div", {
    className: "popular-header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112
    },
    __self: this
  }, __jsx("div", {
    className: "popular-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113
    },
    __self: this
  }, "Popular"), __jsx(_components_UI_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    content: "Show More",
    color: "#fff",
    backgroundColor: "#ff7070",
    borderRadius: "30px",
    height: "50px",
    width: "120px",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114
    },
    __self: this
  })), __jsx(nuka_carousel__WEBPACK_IMPORTED_MODULE_5___default.a, {
    className: "carousel",
    height: "500px",
    slideWidth: "340px",
    cellSpacing: 45,
    wrapAround: false,
    renderCenterLeftControls: previousButton,
    renderCenterRightControls: nextButtom,
    renderBottomCenterControls: () => {},
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123
    },
    __self: this
  }, [0, 1, 2, 3, 4].map(i => __jsx("div", {
    className: "card",
    key: i,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 134
    },
    __self: this
  }, __jsx(_components_UI_Card__WEBPACK_IMPORTED_MODULE_4__["default"], {
    height: "375px",
    width: "350px",
    backgroundColor: "purple",
    color: "#fff",
    fontSize: "30px",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 135
    },
    __self: this
  }), __jsx("div", {
    className: "product-info",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142
    },
    __self: this
  }, __jsx("div", {
    className: "product-name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 143
    },
    __self: this
  }, "Jacket"), __jsx("div", {
    className: "product-price",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 144
    },
    __self: this
  }, __jsx("div", {
    className: "new-price",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 145
    },
    __self: this
  }, "$21.99"), __jsx("div", {
    className: "old-price",
    style: {
      textDecoration: "line-through"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 146
    },
    __self: this
  }, "$39.99"))))))), __jsx("div", {
    className: "pros-cards",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 155
    },
    __self: this
  }, __jsx("div", {
    className: "pros-header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 156
    },
    __self: this
  }, "Why you should choose us?"), __jsx("div", {
    className: "pros-list",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 157
    },
    __self: this
  }, prosCards.map(element => __jsx(_components_UI_Card__WEBPACK_IMPORTED_MODULE_4__["default"], {
    header: __jsx("div", {
      className: "pros-card-icon",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 160
      },
      __self: this
    }, element.iconSmall),
    height: "200px",
    width: "450px",
    title: element.title,
    subTitle: element.subTitle,
    color: "#000",
    textPosition: "left",
    border: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 159
    },
    __self: this
  })))), __jsx("div", {
    className: "popular",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 172
    },
    __self: this
  }, __jsx("div", {
    className: "pros-header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 173
    },
    __self: this
  }, "Products in today"), __jsx(nuka_carousel__WEBPACK_IMPORTED_MODULE_5___default.a, {
    className: "carousel",
    height: "500px",
    slideWidth: "340px",
    cellSpacing: 45,
    wrapAround: false,
    renderCenterLeftControls: previousButton,
    renderCenterRightControls: nextButtom,
    renderBottomCenterControls: () => {},
    __source: {
      fileName: _jsxFileName,
      lineNumber: 174
    },
    __self: this
  }, [0, 1, 2, 3, 4].map(i => __jsx("div", {
    className: "card",
    key: i,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 185
    },
    __self: this
  }, __jsx(_components_UI_Card__WEBPACK_IMPORTED_MODULE_4__["default"], {
    height: "375px",
    width: "350px",
    backgroundColor: "purple",
    color: "#fff",
    fontSize: "30px",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 186
    },
    __self: this
  }), __jsx("div", {
    className: "product-info",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 193
    },
    __self: this
  }, __jsx("div", {
    className: "product-name",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 194
    },
    __self: this
  }, "Jacket"), __jsx("div", {
    className: "product-price",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 195
    },
    __self: this
  }, __jsx("div", {
    className: "new-price",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 196
    },
    __self: this
  }, "$21.99"), __jsx("div", {
    className: "old-price",
    style: {
      textDecoration: "line-through"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 197
    },
    __self: this
  }, "$39.99"))))))), __jsx("div", {
    className: "footer",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 206
    },
    __self: this
  }, "Powered by Rustam Sahatov. All rights reserved."))), __jsx(_public_styles_LandingStyle__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 209
    },
    __self: this
  }));
}
const prosCards = [{
  iconSmall: __jsx(_public_icons_compiled__WEBPACK_IMPORTED_MODULE_2__["FreeShippingSmall"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 216
    },
    __self: undefined
  }),
  title: "Free Shipping",
  subTitle: "All purchases over $199 are eligible for free shipping"
}, {
  iconSmall: __jsx(_public_icons_compiled__WEBPACK_IMPORTED_MODULE_2__["Wallet"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 221
    },
    __self: undefined
  }),
  title: "Easy Payment",
  subTitle: "All payments are processed instantly over a secure payment protocol"
}, {
  iconSmall: __jsx(_public_icons_compiled__WEBPACK_IMPORTED_MODULE_2__["Guarantee"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 226
    },
    __self: undefined
  }),
  title: "Money-back Guarantee",
  subTitle: "If an item arrived damaged or you've changed your mind, you can send it back for a full refund"
}];

/***/ }),

/***/ "./public/icons/_compiled/ArrowLeft.tsx":
/*!**********************************************!*\
  !*** ./public/icons/_compiled/ArrowLeft.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "/home/rustam/alem-ecommerce/client/public/icons/_compiled/ArrowLeft.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;


function SvgArrowLeft(props) {
  return __jsx("svg", Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    width: 24.943,
    height: 21.679
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }), __jsx("path", {
    "data-name": "noun_Arrow Left_2682937",
    d: "M14.106 0l9.037 9.045 1.8 1.801-1.8 1.8-9.037 9.033-1.8-1.8 7.762-7.76H0V9.572h20.068l-7.763-7.767z",
    fill: "rgba(0,0,0,0.45)",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgArrowLeft);

/***/ }),

/***/ "./public/icons/_compiled/ArrowRight.tsx":
/*!***********************************************!*\
  !*** ./public/icons/_compiled/ArrowRight.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "/home/rustam/alem-ecommerce/client/public/icons/_compiled/ArrowRight.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;


function SvgArrowRight(props) {
  return __jsx("svg", Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    width: 24.943,
    height: 21.679
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }), __jsx("path", {
    "data-name": "noun_Arrow right_2682937",
    d: "M10.837 0L1.8 9.044 0 10.845l1.8 1.8 9.036 9.032 1.8-1.8-7.761-7.758h20.068V9.572H4.875L12.638 1.8z",
    fill: "#fff",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgArrowRight);

/***/ }),

/***/ "./public/icons/_compiled/Avatar.tsx":
/*!*******************************************!*\
  !*** ./public/icons/_compiled/Avatar.tsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "/home/rustam/alem-ecommerce/client/public/icons/_compiled/Avatar.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;


function SvgAvatar(props) {
  return __jsx("svg", Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    width: 16,
    height: 16
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }), __jsx("path", {
    "data-name": "noun_avatar_2102861 (2)",
    d: "M14.437 11.64L10.9 10.189a.5.5 0 01-.315-.462V8.9a.469.469 0 01.1-.294 6.96 6.96 0 001.449-4.235A4.031 4.031 0 008 0a4.031 4.031 0 00-4.135 4.372 6.961 6.961 0 001.449 4.236.469.469 0 01.1.293v.826a.5.5 0 01-.315.462L1.563 11.64A2.5 2.5 0 000 13.958v1.376A.667.667 0 00.667 16h14.666a.667.667 0 00.667-.667v-1.375a2.5 2.5 0 00-1.563-2.318zm.23 3.026H1.333v-.709a1.172 1.172 0 01.736-1.084l3.536-1.451a1.829 1.829 0 001.143-1.7V8.9a1.806 1.806 0 00-.394-1.128 5.667 5.667 0 01-1.155-3.4A2.71 2.71 0 018 1.333a2.71 2.71 0 012.8 3.039 5.667 5.667 0 01-1.155 3.4A1.807 1.807 0 009.251 8.9v.826a1.829 1.829 0 001.143 1.7l3.536 1.451a1.173 1.173 0 01.736 1.084z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgAvatar);

/***/ }),

/***/ "./public/icons/_compiled/Cart.tsx":
/*!*****************************************!*\
  !*** ./public/icons/_compiled/Cart.tsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "/home/rustam/alem-ecommerce/client/public/icons/_compiled/Cart.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;


function SvgCart(props) {
  return __jsx("svg", Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    width: 16,
    height: 16
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }), __jsx("g", {
    "data-name": "noun_cart_2102832 (4)",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, __jsx("path", {
    "data-name": "Path 5",
    d: "M.667 1.239H1.78l1.669 7a2.215 2.215 0 00-1.361 2.056 2.186 2.186 0 002.154 2.213h8.84a.621.621 0 100-1.239h-8.84a.988.988 0 010-1.948h8.84a.666.666 0 00.627-.41L15.961 3.1a.583.583 0 00-.082-.566.683.683 0 00-.546-.263H3.393L2.966.485A.657.657 0 002.315 0H.667a.621.621 0 100 1.239zm13.717 2.274L12.613 8.08H4.777L3.688 3.513z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }), __jsx("path", {
    "data-name": "Path 6",
    d: "M4.788 14.167a.917.917 0 000 1.833h1.164a.917.917 0 100-1.833z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }), __jsx("path", {
    "data-name": "Path 7",
    d: "M10.575 14.167a.917.917 0 000 1.833h1.164a.917.917 0 100-1.833z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  })));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgCart);

/***/ }),

/***/ "./public/icons/_compiled/FreeShipping.tsx":
/*!*************************************************!*\
  !*** ./public/icons/_compiled/FreeShipping.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "/home/rustam/alem-ecommerce/client/public/icons/_compiled/FreeShipping.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;


function SvgFreeShipping(props) {
  return __jsx("svg", Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    width: 281.269,
    height: 166.097
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }), __jsx("g", {
    "data-name": "Free Shipping",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, __jsx("g", {
    "data-name": "Group 181",
    fill: "rgba(0,0,0,0.06)",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }, __jsx("path", {
    "data-name": "Path 189",
    d: "M278.901 67.5l-13.027-30.2a29.82 29.82 0 00-27.535-18.06h-21.022v-7.7A11.561 11.561 0 00205.771 0H58.918a7.644 7.644 0 00-7.7 7.7 7.838 7.838 0 007.7 7.7H201.33v56.842a12.637 12.637 0 0012.728 12.731h51.221V120.8a2.654 2.654 0 01-2.665 2.665h-9.474a28.486 28.486 0 00-24.574-14.212 29.128 29.128 0 00-24.574 14.212h-79.049a28.486 28.486 0 00-24.574-14.212 29.128 29.128 0 00-24.574 14.212H48.558a7.7 7.7 0 100 15.4h23.39a28.449 28.449 0 0056.846 0h71.354a28.449 28.449 0 0056.846 0h6.218a18.132 18.132 0 0018.06-18.06v-41.45a33.758 33.758 0 00-2.371-11.855zm-178.532 83.2a13.027 13.027 0 1113.027-13.027 13.143 13.143 0 01-13.027 13.027zm128.2 0a13.027 13.027 0 1113.027-13.027 13.143 13.143 0 01-13.028 13.027zM217.021 34.937h21.021a13.87 13.87 0 0113.027 8.586l11.251 26.054h-45.3z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }), __jsx("path", {
    "data-name": "Path 190",
    d: "M36.715 47.672H91.19a7.7 7.7 0 100-15.4H36.715a7.644 7.644 0 00-7.7 7.7 7.838 7.838 0 007.7 7.7z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }), __jsx("path", {
    "data-name": "Path 191",
    d: "M22.208 77.279h54.475a7.7 7.7 0 100-15.4H22.208a7.644 7.644 0 00-7.7 7.7 7.838 7.838 0 007.7 7.7z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }), __jsx("path", {
    "data-name": "Path 192",
    d: "M70.169 99.187a7.644 7.644 0 00-7.7-7.7H7.7a7.7 7.7 0 100 15.4h54.475a7.54 7.54 0 007.994-7.7z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }))));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgFreeShipping);

/***/ }),

/***/ "./public/icons/_compiled/FreeShippingSmall.tsx":
/*!******************************************************!*\
  !*** ./public/icons/_compiled/FreeShippingSmall.tsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "/home/rustam/alem-ecommerce/client/public/icons/_compiled/FreeShippingSmall.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;


function SvgFreeShippingSmall(props) {
  return __jsx("svg", Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    "data-name": "Group 181",
    width: 36.777,
    height: 21.718
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }), __jsx("path", {
    "data-name": "Path 189",
    d: "M36.467 8.827l-1.7-3.949a3.9 3.9 0 00-3.6-2.361h-2.752V1.51A1.512 1.512 0 0026.905 0h-19.2a1 1 0 00-1.007 1.007 1.025 1.025 0 001.007 1.007h18.619v7.433a1.652 1.652 0 001.665 1.665h6.7v4.684a.347.347 0 01-.348.348h-1.242a3.725 3.725 0 00-3.213-1.858 3.809 3.809 0 00-3.213 1.858H16.336a3.725 3.725 0 00-3.213-1.858 3.809 3.809 0 00-3.213 1.858H6.349a1.007 1.007 0 100 2.013h3.058a3.72 3.72 0 007.433 0h9.33a3.72 3.72 0 007.433 0h.813a2.371 2.371 0 002.361-2.361v-5.42a4.414 4.414 0 00-.31-1.549zM13.123 19.7a1.7 1.7 0 111.7-1.7 1.718 1.718 0 01-1.7 1.7zm16.763 0a1.7 1.7 0 111.7-1.7 1.718 1.718 0 01-1.7 1.7zm-1.51-15.137h2.749a1.814 1.814 0 011.7 1.123L34.299 9.1h-5.923z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }), __jsx("path", {
    "data-name": "Path 190",
    d: "M4.801 6.233h7.123a1.007 1.007 0 100-2.013H4.801a1 1 0 00-1.007 1.007 1.025 1.025 0 001.007 1.006z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }), __jsx("path", {
    "data-name": "Path 191",
    d: "M2.904 10.104h7.123a1.007 1.007 0 100-2.013H2.904a1 1 0 00-1.007 1.007 1.025 1.025 0 001.007 1.006z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }), __jsx("path", {
    "data-name": "Path 192",
    d: "M9.175 12.969a1 1 0 00-1.007-1.007H1.007a1.007 1.007 0 100 2.013H8.13a.986.986 0 001.045-1.006z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgFreeShippingSmall);

/***/ }),

/***/ "./public/icons/_compiled/Guarantee.tsx":
/*!**********************************************!*\
  !*** ./public/icons/_compiled/Guarantee.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "/home/rustam/alem-ecommerce/client/public/icons/_compiled/Guarantee.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;


function SvgGuarantee(props) {
  return __jsx("svg", Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    width: 29,
    height: 30.613
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }), __jsx("path", {
    "data-name": "Path 91",
    d: "M28.227 3.949L14.8.045a1.074 1.074 0 00-.612 0L.763 3.949A1.074 1.074 0 000 4.98v11.723c0 10.2 13.657 13.733 14.242 13.878a1.052 1.052 0 00.537-.005C15.617 30.366 29 26.811 29 16.703V4.98a1.074 1.074 0 00-.773-1.031zm-1.375 12.754c0 7.841-10.547 11.224-12.352 11.724-1.8-.5-12.352-3.867-12.352-11.724V5.791L14.5 2.193l12.352 3.593z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }), __jsx("path", {
    "data-name": "Path 92",
    d: "M13.425 8.594V9.72a3.222 3.222 0 00.537 6.4h1.611a1.074 1.074 0 110 2.148h-3.221a1.074 1.074 0 000 2.148h1.073v1.074a1.074 1.074 0 102.148 0v-1.081a3.222 3.222 0 100-6.444h-1.61a1.074 1.074 0 010-2.148h3.222a1.074 1.074 0 000-2.148h-1.611V8.594a1.074 1.074 0 10-2.148 0z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgGuarantee);

/***/ }),

/***/ "./public/icons/_compiled/GuaranteeBig.tsx":
/*!*************************************************!*\
  !*** ./public/icons/_compiled/GuaranteeBig.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "/home/rustam/alem-ecommerce/client/public/icons/_compiled/GuaranteeBig.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;


function SvgGuaranteeBig(props) {
  return __jsx("svg", Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    width: 152.613,
    height: 161.1
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }), __jsx("g", {
    fill: "rgba(0,0,0,0.06)",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, __jsx("path", {
    "data-name": "Path 91",
    d: "M148.544 20.781L77.889.234a5.652 5.652 0 00-3.222 0L4.013 20.781A5.652 5.652 0 000 26.203v61.7c0 53.7 71.87 72.265 74.95 73.028a5.535 5.535 0 002.826-.028c4.409-1.1 74.837-19.811 74.837-73v-61.7a5.652 5.652 0 00-4.07-5.426zm-7.235 67.122c0 41.262-55.506 59.067-65 61.7-9.5-2.628-65-20.348-65-61.7V30.475l65-18.935 65 18.907z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }), __jsx("path", {
    "data-name": "Path 92",
    d: "M70.654 45.227v5.907a16.957 16.957 0 002.826 33.66h8.479a5.652 5.652 0 110 11.3H65.002a5.652 5.652 0 000 11.3h5.652v5.661a5.652 5.652 0 1011.3 0v-5.652a16.957 16.957 0 100-33.914H73.48a5.652 5.652 0 010-11.3h16.957a5.652 5.652 0 000-11.3h-8.478v-5.662a5.652 5.652 0 10-11.3 0z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  })));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgGuaranteeBig);

/***/ }),

/***/ "./public/icons/_compiled/Search.tsx":
/*!*******************************************!*\
  !*** ./public/icons/_compiled/Search.tsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "/home/rustam/alem-ecommerce/client/public/icons/_compiled/Search.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;


function SvgSearch(props) {
  return __jsx("svg", Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    width: 16,
    height: 16
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }), __jsx("path", {
    "data-name": "noun_Search_2102816 (2)",
    d: "M5.91 11.82a5.9 5.9 0 003.681-1.286l5.271 5.27a.667.667 0 10.943-.943l-5.271-5.27a5.915 5.915 0 10-4.624 2.228zM2.672 2.674a4.579 4.579 0 110 6.475 4.549 4.549 0 010-6.475z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgSearch);

/***/ }),

/***/ "./public/icons/_compiled/Wallet.tsx":
/*!*******************************************!*\
  !*** ./public/icons/_compiled/Wallet.tsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "/home/rustam/alem-ecommerce/client/public/icons/_compiled/Wallet.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;


function SvgWallet(props) {
  return __jsx("svg", Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    width: 22,
    height: 22
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }), __jsx("path", {
    d: "M18.827 5.5H3.173A3.316 3.316 0 000 8.938v9.625A3.316 3.316 0 003.173 22h15.654A3.316 3.316 0 0022 18.562V8.938A3.316 3.316 0 0018.827 5.5zM15.6.058L3.177 2.688A3.072 3.072 0 00.846 5.211a3.233 3.233 0 012.591-1.089h15.178V2.951A3.456 3.456 0 0017.88.797 2.378 2.378 0 0015.6.058z",
    fill: "rgba(0,0,0,0.87)",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgWallet);

/***/ }),

/***/ "./public/icons/_compiled/WalletBig.tsx":
/*!**********************************************!*\
  !*** ./public/icons/_compiled/WalletBig.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "/home/rustam/alem-ecommerce/client/public/icons/_compiled/WalletBig.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;


function SvgWalletBig(props) {
  return __jsx("svg", Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    width: 199.654,
    height: 168.044
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }), __jsx("path", {
    d: "M170.858 42.011H28.8C12.91 42.011 0 53.786 0 68.271v73.517c0 14.485 12.91 26.256 28.8 26.256h142.058c15.886 0 28.8-11.772 28.8-26.256V68.271c-.004-14.485-12.914-26.26-28.8-26.26zM141.534.442L28.8 20.528c-8.639 1.75-21.117 9.671-21.117 19.3 0 0 7.2-8.314 23.517-8.314h137.738v-8.973c0-5.514-2.4-12.559-6.671-16.454A24.163 24.163 0 00141.534.442z",
    fill: "rgba(0,0,0,0.08)",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgWalletBig);

/***/ }),

/***/ "./public/icons/_compiled/index.ts":
/*!*****************************************!*\
  !*** ./public/icons/_compiled/index.ts ***!
  \*****************************************/
/*! exports provided: ArrowLeft, ArrowRight, Avatar, Cart, FreeShipping, FreeShippingSmall, Guarantee, GuaranteeBig, Search, Wallet, WalletBig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ArrowLeft__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ArrowLeft */ "./public/icons/_compiled/ArrowLeft.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ArrowLeft", function() { return _ArrowLeft__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _ArrowRight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ArrowRight */ "./public/icons/_compiled/ArrowRight.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ArrowRight", function() { return _ArrowRight__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Avatar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Avatar */ "./public/icons/_compiled/Avatar.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Avatar", function() { return _Avatar__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Cart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Cart */ "./public/icons/_compiled/Cart.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cart", function() { return _Cart__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _FreeShipping__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FreeShipping */ "./public/icons/_compiled/FreeShipping.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FreeShipping", function() { return _FreeShipping__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _FreeShippingSmall__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FreeShippingSmall */ "./public/icons/_compiled/FreeShippingSmall.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FreeShippingSmall", function() { return _FreeShippingSmall__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _Guarantee__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Guarantee */ "./public/icons/_compiled/Guarantee.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Guarantee", function() { return _Guarantee__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _GuaranteeBig__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./GuaranteeBig */ "./public/icons/_compiled/GuaranteeBig.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GuaranteeBig", function() { return _GuaranteeBig__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Search */ "./public/icons/_compiled/Search.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Search", function() { return _Search__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _Wallet__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Wallet */ "./public/icons/_compiled/Wallet.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Wallet", function() { return _Wallet__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _WalletBig__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./WalletBig */ "./public/icons/_compiled/WalletBig.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WalletBig", function() { return _WalletBig__WEBPACK_IMPORTED_MODULE_10__["default"]; });













/***/ }),

/***/ "./public/styles/LandingStyle.tsx":
/*!****************************************!*\
  !*** ./public/styles/LandingStyle.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LandingStyle; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/home/rustam/alem-ecommerce/client/public/styles/LandingStyle.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function LandingStyle() {
  return __jsx("style", {
    jsx: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }, `          
                .header{
                    background: grey;
                    height: 750px
                }
                .navbar{
                    display: flex;
                    justify-content: space-between;
                    margin-left: 170px;
                    margin-right: 170px;
                    padding-top: 40px
                }
                .categories{
                    display: flex;
                    width: 100px;
                    justify-content: space-between;
                }
                .actions{
                    display: flex;
                    width: 120px;
                    justify-content: space-between;
                }
                .search{
                    cursor: pointer
                }
                .header-main{
                    margin-left: 210px;
                    margin-top: 80px
                }
                .title{
                    font-size: 50px;
                    width: 300px
                }
                .main{
                    margin-left: 170px;
                    margin-right: 170px;
                }
                .promocards{
                    margin-top: 40px;
                    display: flex;
                    justify-content: space-between
                }
                .popular{
                    margin-top: 120px;
                }
                .popular-header{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 60px;
                }
                .popular-title{
                    font-size: 29px
                }
                .product-info{
                    margin-top: 40px
                }
                .product-price {
                    width: 200px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 16px;
                }
                .new-price{
                    font-size: 20px;
                    color: red;
                }
                .old-price{
                    font-size: 20px;
                    color: grey;
                }
                .pros-cards{
                    margin-top: 80px;
                }
                .pros-header{
                    text-align: center;
                    font-size: 29px;
                    margin-bottom: 60px;
                }
                .pros-list{
                    display: flex;
                    justify-content: space-between;
                    font-family: 'SegoeUIBold', serif;
                }
                .pros-card-icon{
                    height: 70px;
                    width: 70px;
                    border-radius: 6px;
                    background: #d9d9d9;
                    display: flex;
                    justify-content: center;
                    align-items: center
                }
                .pros-card-subtitle{
                    font-family: 'SegoeUI', serif;
                }
                .footer{
                    margin-top: 120px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100px;
                    border-top: 1px solid #d9d9d9;
                    font-size: 18px;
                    color:  gray
                }
            `);
}

/***/ }),

/***/ 3:
/*!*******************************!*\
  !*** multi ./pages/index.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/rustam/alem-ecommerce/client/pages/index.tsx */"./pages/index.tsx");


/***/ }),

/***/ "core-js/library/fn/object/assign":
/*!***************************************************!*\
  !*** external "core-js/library/fn/object/assign" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/assign");

/***/ }),

/***/ "core-js/library/fn/object/define-properties":
/*!**************************************************************!*\
  !*** external "core-js/library/fn/object/define-properties" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-properties");

/***/ }),

/***/ "core-js/library/fn/object/define-property":
/*!************************************************************!*\
  !*** external "core-js/library/fn/object/define-property" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-property");

/***/ }),

/***/ "core-js/library/fn/object/get-own-property-descriptor":
/*!************************************************************************!*\
  !*** external "core-js/library/fn/object/get-own-property-descriptor" ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-descriptor");

/***/ }),

/***/ "core-js/library/fn/object/get-own-property-descriptors":
/*!*************************************************************************!*\
  !*** external "core-js/library/fn/object/get-own-property-descriptors" ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-descriptors");

/***/ }),

/***/ "core-js/library/fn/object/get-own-property-symbols":
/*!*********************************************************************!*\
  !*** external "core-js/library/fn/object/get-own-property-symbols" ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-symbols");

/***/ }),

/***/ "core-js/library/fn/object/keys":
/*!*************************************************!*\
  !*** external "core-js/library/fn/object/keys" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/keys");

/***/ }),

/***/ "nuka-carousel":
/*!********************************!*\
  !*** external "nuka-carousel" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nuka-carousel");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map