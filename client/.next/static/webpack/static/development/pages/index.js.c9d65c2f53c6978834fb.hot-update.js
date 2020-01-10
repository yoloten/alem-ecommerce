webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/UI/Button.tsx":
/*!**********************************!*\
  !*** ./components/UI/Button.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Button; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/home/rustam/alem-ecommerce/client/components/UI/Button.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

var Styles;

(function (_Styles) {
  var Background = _Styles.Background = function (_ref) {
    var base = _ref.base,
        backgroundColor = _ref.backgroundColor;
    return backgroundColor ? "".concat(base ? "transaprent" : backgroundColor) : "".concat(base ? "transaprent" : "grey");
  };

  var Border = _Styles.Border = function (_ref2) {
    var base = _ref2.base,
        backgroundColor = _ref2.backgroundColor;
    return base ? "1px solid ".concat(backgroundColor ? backgroundColor : "grey") : "none";
  };

  var BorderRadius = _Styles.BorderRadius = function (_ref3) {
    var borderRadius = _ref3.borderRadius;
    return borderRadius ? borderRadius : "4px";
  };

  var FontSize = _Styles.FontSize = function (_ref4) {
    var fontSize = _ref4.fontSize;
    return fontSize ? fontSize : "14px";
  };

  var Height = _Styles.Height = function (_ref5) {
    var height = _ref5.height;
    return height ? height : "40px";
  };

  var Width = _Styles.Width = function (_ref6) {
    var width = _ref6.width;
    return width ? width : "150px";
  };

  var Color = _Styles.Color = function (_ref7) {
    var color = _ref7.color;
    return color ? color : "black";
  };
})(Styles || (Styles = {}));

var Btn;

(function (_Btn) {})(Btn || (Btn = {}));

function Button(props) {
  var base = props.base,
      backgroundColor = props.backgroundColor,
      width = props.width,
      height = props.height,
      color = props.color,
      fontSize = props.fontSize,
      borderRadius = props.borderRadius;
  var btnStyle = {
    backgroundColor: backgroundColor ? "".concat(base ? "transaprent" : backgroundColor) : "".concat(base ? "transaprent" : "grey"),
    border: base ? "1px solid ".concat(backgroundColor ? backgroundColor : "grey") : "none",
    borderRadius: borderRadius ? borderRadius : "4px",
    fontSize: fontSize ? fontSize : "14px",
    height: height ? height : "40px",
    width: width ? width : "150px",
    color: color ? color : "black",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    display: "flex"
  };
  return __jsx("div", {
    onClick: props.onClick,
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    style: btnStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }, props.content);
}

/***/ })

})
//# sourceMappingURL=index.js.c9d65c2f53c6978834fb.hot-update.js.map