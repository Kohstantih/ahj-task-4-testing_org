/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ (function(module) {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }
  if (!url) {
    return url;
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign

  url = String(url.__esModule ? url.default : url);
  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }
  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }
  return url;
};

/***/ }),

/***/ "./src/js/CheckPaymentSystem.js":
/*!**************************************!*\
  !*** ./src/js/CheckPaymentSystem.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CheckPaymentSystem; }
/* harmony export */ });
class CheckPaymentSystem {
  constructor(element, paymentSystems) {
    this.element = element;
    this.paymentSystems = paymentSystems;
    this.check = this.check.bind(this);
  }
  start() {
    this.element.addEventListener('input', this.check);
  }
  check() {
    const result = this.caller(this.element.value);
    CheckPaymentSystem.hiding(result);
  }
  caller(value) {
    for (let i = 0; i < this.paymentSystems.length; i += 1) {
      for (let j = 0; j < this.paymentSystems[i].numbers.length; j += 1) {
        if (value.startsWith(`${this.paymentSystems[i].numbers[j]}`)) {
          return this.paymentSystems[i].name;
        }
      }
    }
    return null;
  }
  static hiding(id) {
    const visible = document.getElementById(`${id}`);
    const curtains = Array.from(document.querySelectorAll('.curtain'));
    curtains.forEach(el => {
      el.classList.remove('curtain_on');
      if (el.previousElementSibling !== visible && visible !== null) el.classList.add('curtain_on');
    });
  }
}

/***/ }),

/***/ "./src/js/Validator.js":
/*!*****************************!*\
  !*** ./src/js/Validator.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Validator; }
/* harmony export */ });
class Validator {
  constructor(button, input) {
    this.button = button;
    this.input = input;
    this.validation = this.validation.bind(this);
  }
  start() {
    this.button.addEventListener('click', this.validation);
    this.input.addEventListener('input', Validator.hideInform);
  }
  validation(e) {
    e.preventDefault();
    if (this.input.value.length < 13) return Validator.showMessage('Номер слишком короткий', false);
    if (this.input.value.length > 19) return Validator.showMessage('Номер слишком длинный', false);
    const result = Validator.calculation(this.input.value);
    if (result) return Validator.showMessage('Введен действительный номер карты', true);
    return Validator.showMessage('Введен недействительный номер карты', false);
  }
  static calculation(value) {
    const arr = value.split('');
    let sum = 0;
    if (arr.length % 2 === 0) {
      for (let i = arr.length - 1; i >= 0; i -= 1) {
        if (i % 2 !== 0) {
          sum += +arr[i];
        } else {
          let x = +arr[i] * 2;
          if (x > 9) x -= 9;
          sum += x;
        }
      }
    } else {
      for (let i = arr.length - 1; i >= 0; i -= 1) {
        if (i % 2 === 0) {
          sum += +arr[i];
        } else {
          let x = +arr[i] * 2;
          if (x > 9) x -= 9;
          sum += x;
        }
      }
    }
    if (sum % 10 === 0) return true;
    return false;
  }
  static showMessage(text, toggle) {
    const inform = document.querySelector('.inform');
    const color = toggle ? 'valid' : 'fail';
    inform.classList.remove('valid');
    inform.classList.remove('fail');
    inform.classList.add(color);
    inform.textContent = text;
  }
  static hideInform() {
    const inform = document.querySelector('.inform');
    inform.classList.remove('valid');
    inform.classList.remove('fail');
    inform.textContent = '';
  }
}

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CheckPaymentSystem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CheckPaymentSystem */ "./src/js/CheckPaymentSystem.js");
/* harmony import */ var _Validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Validator */ "./src/js/Validator.js");
/* harmony import */ var _paymentSystems__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./paymentSystems */ "./src/js/paymentSystems.js");



const input = document.querySelector('.input');
const checker = new _CheckPaymentSystem__WEBPACK_IMPORTED_MODULE_0__["default"](input, _paymentSystems__WEBPACK_IMPORTED_MODULE_2__["default"]);
checker.start();
const button = document.querySelector('.button');
const validator = new _Validator__WEBPACK_IMPORTED_MODULE_1__["default"](button, input);
validator.start();

/***/ }),

/***/ "./src/js/paymentSystems.js":
/*!**********************************!*\
  !*** ./src/js/paymentSystems.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const numbersMastercard = [51, 52, 53, 54, 55];
for (let i = 2221; i <= 2720; i += 1) {
  numbersMastercard.push(i);
}
const numbersJsb = [];
for (let i = 3528; i <= 3589; i += 1) {
  numbersJsb.push(i);
}
const paymentSystems = [{
  name: 'visa',
  numbers: [4]
}, {
  name: 'mastercard',
  numbers: numbersMastercard
}, {
  name: 'mir',
  numbers: [2200, 2201, 2202, 2203, 2204]
}, {
  name: 'american-express',
  numbers: [34, 37]
}, {
  name: 'discover',
  numbers: [65, 6011, 644, 645, 646, 647, 648, 649]
}, {
  name: 'jsb',
  numbers: numbersJsb
}];
/* harmony default export */ __webpack_exports__["default"] = (paymentSystems);

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ "./node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./img/visa.png */ "./src/img/visa.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./img/mastercard.png */ "./src/img/mastercard.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./img/mir.png */ "./src/img/mir.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./img/american-express.png */ "./src/img/american-express.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./img/discover.png */ "./src/img/discover.png"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ./img/jsb.png */ "./src/img/jsb.png"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var ___HTML_LOADER_REPLACEMENT_1___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_1___);
var ___HTML_LOADER_REPLACEMENT_2___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_2___);
var ___HTML_LOADER_REPLACEMENT_3___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_3___);
var ___HTML_LOADER_REPLACEMENT_4___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_4___);
var ___HTML_LOADER_REPLACEMENT_5___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_5___);
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n    <title>Document</title>\n</head>\n<body>\n  <div class=\"container\">\n    <h1 class=\"title\">Credit Card Validator</h1>\n    <div class=\"cards_box\">\n        <div class=\"card\">\n          <img src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\" alt=\"VISA\" class=\"card_image\" id=\"visa\">\n          <div class=\"curtain\"></div>\n        </div>\n        <div class=\"card\">\n          <img src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\" alt=\"Mastercard\" class=\"card_image\" id=\"mastercard\">\n          <div class=\"curtain\"></div>\n        </div>\n        <div class=\"card\">\n          <img src=\"" + ___HTML_LOADER_REPLACEMENT_2___ + "\" alt=\"Mir\" class=\"card_image\" id=\"mir\">\n          <div class=\"curtain\"></div>\n        </div>\n        <div class=\"card\">\n          <img src=\"" + ___HTML_LOADER_REPLACEMENT_3___ + "\" alt=\"American-express\" class=\"card_image\" id=\"american-express\">\n          <div class=\"curtain\"></div>\n        </div>\n        <div class=\"card\">\n          <img src=\"" + ___HTML_LOADER_REPLACEMENT_4___ + "\" alt=\"Discover\" class=\"card_image\" id=\"discover\">\n          <div class=\"curtain\"></div>\n        </div>\n        <div class=\"card\">\n          <img src=\"" + ___HTML_LOADER_REPLACEMENT_5___ + "\" alt=\"JSB\" class=\"card_image\" id=\"jsb\">\n          <div class=\"curtain\"></div>\n        </div>\n    </div>\n    <form class=\"form_valid_card\">\n        <input type=\"number\" class=\"input\">\n        <button class=\"button\">Проверить</button>\n    </form>\n    <div class=\"inform\"></div>\n  </div>\n</body>\n</html>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/img/american-express.png":
/*!**************************************!*\
  !*** ./src/img/american-express.png ***!
  \**************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/american-express.png";

/***/ }),

/***/ "./src/img/discover.png":
/*!******************************!*\
  !*** ./src/img/discover.png ***!
  \******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/discover.png";

/***/ }),

/***/ "./src/img/jsb.png":
/*!*************************!*\
  !*** ./src/img/jsb.png ***!
  \*************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/jsb.png";

/***/ }),

/***/ "./src/img/mastercard.png":
/*!********************************!*\
  !*** ./src/img/mastercard.png ***!
  \********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/mastercard.png";

/***/ }),

/***/ "./src/img/mir.png":
/*!*************************!*\
  !*** ./src/img/mir.png ***!
  \*************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/mir.png";

/***/ }),

/***/ "./src/img/visa.png":
/*!**************************!*\
  !*** ./src/img/visa.png ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/visa.png";

/***/ }),

/***/ "./src/licenses.txt":
/*!**************************!*\
  !*** ./src/licenses.txt ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "licenses.txt";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/app */ "./src/js/app.js");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.html */ "./src/index.html");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css/style.css */ "./src/css/style.css");
/* harmony import */ var _licenses_txt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./licenses.txt */ "./src/licenses.txt");




}();
/******/ })()
;
//# sourceMappingURL=main.js.map