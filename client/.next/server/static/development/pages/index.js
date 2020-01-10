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


let Styles;

(function (_Styles) {
  const Background = _Styles.Background = ({
    base,
    backgroundColor
  }) => backgroundColor ? `${base ? "transaprent" : backgroundColor}` : `${base ? "transaprent" : "grey"}`;

  const Border = _Styles.Border = ({
    base,
    backgroundColor
  }) => base ? `1px solid ${backgroundColor ? backgroundColor : "grey"}` : "none";

  const BorderRadius = _Styles.BorderRadius = ({
    borderRadius
  }) => borderRadius ? borderRadius : "4px";

  const FontSize = _Styles.FontSize = ({
    fontSize
  }) => fontSize ? fontSize : "14px";

  const Height = _Styles.Height = ({
    height
  }) => height ? height : "40px";

  const Width = _Styles.Width = ({
    width
  }) => width ? width : "150px";

  const Color = _Styles.Color = ({
    color
  }) => color ? color : "black";
})(Styles || (Styles = {}));

let Btn;

(function (_Btn) {})(Btn || (Btn = {}));

function Button(props) {
  const btnStyle = {
    backgroundColor: props.backgroundColor ? `${props.base ? "transaprent" : props.backgroundColor}` : `${props.base ? "transaprent" : "grey"}`,
    border: props.base ? `1px solid ${props.backgroundColor ? props.backgroundColor : "grey"}` : "none",
    borderRadius: props.borderRadius ? props.borderRadius : "4px",
    fontSize: props.fontSize ? props.fontSize : "14px",
    height: props.height ? props.height : "40px",
    width: props.width ? props.width : "150px",
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
      lineNumber: 54
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/home/rustam/alem-ecommerce/client/components/UI/Card.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function Card(props) {
  return __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  });
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
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "styled-jsx/style");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _public_icons_compiled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../public/icons/_compiled */ "./public/icons/_compiled/index.ts");
/* harmony import */ var _components_UI_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/UI/Card */ "./components/UI/Card.tsx");
/* harmony import */ var _components_UI_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/UI/Button */ "./components/UI/Button.tsx");
var _jsxFileName = "/home/rustam/alem-ecommerce/client/pages/index.tsx";


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;



function index() {
  return __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx("div", {
    className: "jsx-485249738",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-485249738" + " " + "header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-485249738" + " " + "navbar",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-485249738" + " " + "logo",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, "\xE4lem"), __jsx("div", {
    className: "jsx-485249738" + " " + "categories",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-485249738" + " " + "men",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, "Men"), __jsx("div", {
    className: "jsx-485249738" + " " + "women",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, "Women")), __jsx("div", {
    className: "jsx-485249738" + " " + "actions",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-485249738" + " " + "search",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, __jsx(_public_icons_compiled__WEBPACK_IMPORTED_MODULE_2__["Search"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  })), __jsx("div", {
    className: "jsx-485249738" + " " + "search",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, __jsx(_public_icons_compiled__WEBPACK_IMPORTED_MODULE_2__["Cart"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  })), __jsx("div", {
    className: "jsx-485249738" + " " + "search",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, __jsx(_public_icons_compiled__WEBPACK_IMPORTED_MODULE_2__["Avatar"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  })))), __jsx("div", {
    className: "jsx-485249738" + " " + "header-main",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-485249738" + " " + "title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, "Brand new January Collection"), __jsx(_components_UI_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    customStyleObject: {
      marginTop: "40px"
    },
    backgroundColor: "#ff7070",
    className: "btn-check",
    content: "Check More",
    borderRadius: "30px",
    height: "50px",
    width: "150px",
    base: false,
    color: "#fff",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }))), __jsx("div", {
    className: "jsx-485249738" + " " + "main",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-485249738" + " " + "promocards",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: this
  }, __jsx(_components_UI_Card__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-485249738" + " " + "new-arrivals",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }, "New arrivals are on now!")), __jsx(_components_UI_Card__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-485249738" + " " + "card-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }, "Jackets"), __jsx("div", {
    className: "jsx-485249738" + " " + "card-price",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, "$ 39.99")), __jsx(_components_UI_Card__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-485249738" + " " + "sale",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: this
  }, "Sale this winter"), __jsx("div", {
    className: "jsx-485249738" + " " + "percent",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    },
    __self: this
  }, "-50%"))), __jsx("div", {
    className: "jsx-485249738" + " " + "popular",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-485249738" + " " + "popular-header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-485249738" + " " + "popular-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  }, "Popular")), __jsx("div", {
    className: "jsx-485249738" + " " + "popular-cards",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66
    },
    __self: this
  }, __jsx(_components_UI_Card__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67
    },
    __self: this
  }), __jsx(_components_UI_Card__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    },
    __self: this
  }), __jsx(_components_UI_Card__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: this
  }))))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "485249738",
    __self: this
  }, ".header.jsx-485249738{background:grey;height:750px;}.navbar.jsx-485249738{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;margin-left:170px;margin-right:170px;padding-top:40px;}.categories.jsx-485249738{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:100px;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}.actions.jsx-485249738{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:120px;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}.search.jsx-485249738{cursor:pointer;}.header-main.jsx-485249738{margin-left:210px;margin-top:80px;}.title.jsx-485249738{font-size:50px;width:300px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1c3RhbS9hbGVtLWVjb21tZXJjZS9jbGllbnQvcGFnZXMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlFd0IsQUFHcUMsQUFJSCxBQU9BLEFBS0EsQUFNbEIsQUFFdUIsQUFJSCxlQU5uQixBQVFELENBNUJBLEVBd0JBLFNBSUMsRUE1QkEsS0F3QkEsd0NBckJrQyxBQU9sQixBQUtBLFlBSmtCLEFBS0EsdUdBWlosWUFRdEIsQUFLQSxNQVp1QixtQkFFeEIsaUJBQUMiLCJmaWxlIjoiL2hvbWUvcnVzdGFtL2FsZW0tZWNvbW1lcmNlL2NsaWVudC9wYWdlcy9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXG5pbXBvcnQgKiBhcyBJY29ucyBmcm9tIFwiLi4vcHVibGljL2ljb25zL19jb21waWxlZFwiXG5pbXBvcnQgQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9VSS9DYXJkXCJcbmltcG9ydCBCdXR0b24gZnJvbSBcIi4uL2NvbXBvbmVudHMvVUkvQnV0dG9uXCJcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5kZXgoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZiYXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nb1wiPsOkbGVtPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhdGVnb3JpZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lblwiPk1lbjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid29tZW5cIj5Xb21lbjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SWNvbnMuU2VhcmNoIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb25zLkNhcnQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SWNvbnMuQXZhdGFyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLW1haW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5CcmFuZCBuZXcgSmFudWFyeSBDb2xsZWN0aW9uPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbVN0eWxlT2JqZWN0PXt7bWFyZ2luVG9wOiBcIjQwcHhcIn19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yPVwiI2ZmNzA3MFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLWNoZWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PVwiQ2hlY2sgTW9yZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwiMzBweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiNTBweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9XCIxNTBweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCIjZmZmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7LyogY2Fyb3VzZWwgKi99XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWluXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvbW9jYXJkc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPENhcmQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuZXctYXJyaXZhbHNcIj5OZXcgYXJyaXZhbHMgYXJlIG9uIG5vdyE8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogPEJ1dHRvbiBjbGFzc05hbWU9XCJidG4tY2hlY2tcIiBjb250ZW50PVwiU2hvdyBDb2xsZWN0aW9uXCIvPiAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQ2FyZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDYXJkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC10aXRsZVwiPkphY2tldHM8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtcHJpY2VcIj4kIDM5Ljk5PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIDxCdXR0b24gY2xhc3NOYW1lPVwiYnRuLWNoZWNrXCI+U2hvdyBDb2xsZWN0aW9uPC9CdXR0b24+ICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9DYXJkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPENhcmQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzYWxlXCI+U2FsZSB0aGlzIHdpbnRlcjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGVyY2VudFwiPi01MCU8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQ2FyZD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9wdWxhclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3B1bGFyLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9wdWxhci10aXRsZVwiPlBvcHVsYXI8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogPEJ1dHRvbj5TaG93IE1vcmU8L0J1dHRvbj4gKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9wdWxhci1jYXJkc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDYXJkIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENhcmQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2FyZCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3R5bGUganN4PntgXG4gICAgICAgICAgICAgICAgLmhlYWRlcntcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogZ3JleTtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA3NTBweFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAubmF2YmFye1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxNzBweDtcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxNzBweDtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZy10b3A6IDQwcHhcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLmNhdGVnb3JpZXN7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBweDtcbiAgICAgICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAuYWN0aW9uc3tcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMHB4O1xuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC5zZWFyY2h7XG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAuaGVhZGVyLW1haW57XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAyMTBweDtcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXRvcDogODBweFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAudGl0bGV7XG4gICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogNTBweDtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMHB4XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYH08L3N0eWxlPlxuICAgICAgICA8Lz5cbiAgICApXG59XG4iXX0= */\n/*@ sourceURL=/home/rustam/alem-ecommerce/client/pages/index.tsx */"));
}

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

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "styled-jsx/style":
/*!***********************************!*\
  !*** external "styled-jsx/style" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map