/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 456:
/***/ ((module) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function clone(input) {
  return JSON.parse(JSON.stringify(input));
} //based off of https://github.com/dashed/shallowequal/blob/master/index.js


function shallowCompare(a, b) {
  if (Object.is(a, b)) {
    return true;
  }

  if (_typeof(a) !== 'object' || !a || _typeof(b) !== 'object' || !b) {
    return false;
  }

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  var isInB = Object.prototype.hasOwnProperty.bind(b);
  var aKeysLength = aKeys.length;
  var key;

  for (var i = 0; i < aKeysLength; i++) {
    key = aKeys[i];

    if (!isInB(key)) {
      return false;
    }

    if (!Object.is(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

module.exports = {
  clone: clone,
  shallowCompare: shallowCompare
};

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(456);
/******/ 	
/******/ })()
;