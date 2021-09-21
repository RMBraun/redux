/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 885:
/***/ ((module) => {

const getConstructorName = input =>
  input == null ? `${input}` : input.constructor ? input.constructor.name : 'Unknown'

const getOperationType = operation =>
  TYPES.STRING.is(operation) && operation.trim().length > 0
    ? TYPES.STRING
    : TYPES.NUMBER.is(operation) && operation >= 0
    ? TYPES.NUMBER
    : TYPES.FUNCTION.is(operation)
    ? TYPES.FUNCTION
    : TYPES.INVALID

const isType = (input, type, typeofName, constructor) =>
  input === type ||
  typeof input === typeofName ||
  input instanceof constructor ||
  getConstructorName(input) === constructor.name

const TYPES = {
  STRING: {
    is: input => isType(input, TYPES.STRING, 'string', String),
    toString: () => 'STRING',
  },
  FUNCTION: {
    is: input => isType(input, TYPES.FUNCTION, 'function', Function),
    toString: () => 'FUNCTION',
  },
  NUMBER: {
    is: input => isType(input, TYPES.NUMBER, 'number', Number),
    toString: () => 'NUMBER',
  },
  OBJECT: {
    is: input => isType(input, TYPES.OBJECT, 'object', Object),
    toString: () => 'OBJECT',
  },
  ARRAY: {
    is: input => input === TYPES.ARRAY || Array.isArray(input),
    toString: () => 'ARRAY',
  },
  INVALID: {
    is: input => input === TYPES.INVALID,
    toString: () => 'INVALID',
  },
}

//for browser static import
const loadGlobal = (globals = {}) => {
  if (typeof window !== 'undefined') {
    window.L = {
      ...window.L,
      ...globals,
    }
  }
}

module.exports = {
  getConstructorName,
  getOperationType,
  TYPES,
  loadGlobal,
}


/***/ }),

/***/ 300:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { loadGlobal, getConstructorName, TYPES, getOperationType } = __webpack_require__(885)

const getChild = (input, operation, defaultValue, i) => {
  if (TYPES.STRING.is(operation) && !TYPES.OBJECT.is(input)) {
    throw new Error(
      `Invalid Set operation at index: ${i}: cannot get key ${operation} from ${getConstructorName(input)}`
    )
  } else if (TYPES.NUMBER.is(operation) && !TYPES.ARRAY.is(input)) {
    throw new Error(
      `Invalid Set operation at index: ${i}: cannot get index ${operation} from ${getConstructorName(input)}`
    )
  } else {
    return Object.prototype.hasOwnProperty.call(input, operation) ? input[operation] : defaultValue
  }
}

//Curried version
const _set =
  (...operationInputs) =>
  input => {
    if (!TYPES.OBJECT.is(input) && !TYPES.ARRAY.is(input) && input != null) {
      throw new Error(
        `Invalid Set input: expecting an Object, Array, null, or undefined but received ${getConstructorName(input)}`
      )
    }

    const rawOperations = [...operationInputs]
    if (input == null) {
      input = TYPES.STRING.is(getOperationType(rawOperations[0])) ? {} : []
    }

    if (rawOperations.length < 2) {
      throw new Error(`Invalid Set: expecting a minimum of 3 arguments but received only ${rawOperations.length + 1}`)
    }

    const value = rawOperations.pop()
    let objectRef = input

    rawOperations
      //operation validation
      .map((operation, i) => {
        const operationType = getOperationType(operation)

        if (!TYPES.STRING.is(operationType) && !TYPES.NUMBER.is(operationType)) {
          throw new Error(
            `Invalid Set operation at index: ${i}: expecting a String or Number but received ${getConstructorName(
              operation
            )}`
          )
        }

        const nextOperationType = getOperationType(rawOperations[i + 1])

        return {
          operation,
          defaultValue: TYPES.STRING.is(nextOperationType) ? {} : [],
        }
      })
      //operation execution
      .forEach(({ operation, defaultValue }, i, operations) => {
        if (!TYPES.OBJECT.is(objectRef) && !TYPES.ARRAY.is(objectRef) && !TYPES.FUNCTION.is(objectRef)) {
          throw new Error(
            `Invalid set operation at index: ${i}: cannot set nested value on non-Object, non-Array, and non-Function entities`
          )
        }

        objectRef = objectRef[operation] =
          i === operations.length - 1
            ? TYPES.FUNCTION.is(value)
              ? value(objectRef[operation])
              : value
            : getChild(objectRef, operation, defaultValue, i)
      })

    return input
  }

const set = (input, ...operationInputs) => _set(...operationInputs)(input)

module.exports._set = _set
module.exports.set = set

//for browser static import
loadGlobal(module.exports)


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: external "Redux"
const external_Redux_namespaceObject = Redux;
var external_Redux_default = /*#__PURE__*/__webpack_require__.n(external_Redux_namespaceObject);
// EXTERNAL MODULE: ./node_modules/@rybr/lenses/set.js
var set = __webpack_require__(300);
;// CONCATENATED MODULE: ./src/redux.devtool.loader.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


 //script data

var data = document.currentScript.dataset; //initialize and get redux dev tool config values

var localStorageConfigId = 'ReduxDevToolConfigs';
var DevToolConfigs = JSON.parse(localStorage.getItem(localStorageConfigId)) || {};
DevToolConfigs.columns = DevToolConfigs.columns || {};
DevToolConfigs.filters = DevToolConfigs.filters || {};
localStorage.setItem(localStorageConfigId, JSON.stringify(DevToolConfigs));

var setConfig = function setConfig(keys, value) {
  set.set.apply(void 0, [DevToolConfigs].concat(_toConsumableArray(keys), [value]));
  localStorage.setItem(localStorageConfigId, JSON.stringify(DevToolConfigs));
};

var ReduxDevTool = function () {
  var currTime = Date.now();
  var actionLog = [];

  var getActionLog = function getActionLog() {
    return actionLog;
  };

  var subscribers = [];

  var setSubscriber = function setSubscriber(subscriber) {
    subscribers.push(subscriber);
  };

  var removeSubscriber = function removeSubscriber(subscriber) {
    var index = subscribers.indexOf(subscriber);

    if (index !== -1) {
      subscribers.splice(index, 1);
    }
  };

  return {
    actionLog: actionLog,
    actionListener: function actionListener(_ref) {
      var id = _ref.id,
          storeId = _ref.storeId,
          type = _ref.type,
          time = _ref.time,
          prevStore = _ref.prevStore,
          store = _ref.store,
          payload = _ref.payload;
      actionLog.push({
        storeId: storeId,
        actionId: id,
        type: type,
        index: actionLog.length + 1,
        typeDisplay: type,
        time: ((time - currTime) / 1000).toFixed(3),
        payload: payload,
        delta: type === (external_Redux_default()).TYPES.ACTION ? window.jsondiffpatch.diff(prevStore, store) : undefined
      });
      subscribers.forEach(function (subscriber) {
        if (typeof subscriber === 'function') {
          subscriber(actionLog);
        }
      });
    },
    startReduxDevTool: function startReduxDevTool() {
      var injectionPointId = 'ReduxDevTool';
      var devToolWindow = window.open('', 'ReduxDevTool', 'height=800,width=1200,status=no,toolbar=no,menubar=no,location=no,scrollbars=yes'); //global injection points

      devToolWindow.React = window.React;
      devToolWindow.ReactDOM = window.ReactDOM;
      devToolWindow.jsondiffpatch = jsondiffpatch;
      devToolWindow.Redux = window.Redux;
      devToolWindow.L = window.L; //global helper functions

      devToolWindow.setSubscriber = setSubscriber;
      devToolWindow.removeSubscriber = removeSubscriber;
      devToolWindow.getActionLog = getActionLog;

      devToolWindow.getDevToolConfigs = function () {
        return DevToolConfigs;
      };

      devToolWindow.setConfig = setConfig; //clear orig html

      devToolWindow.document.querySelector('body').innerHTML = ''; //create popup DOM structure

      devToolWindow.document.write("\n              <html>\n                  <head>\n                      <title>Redux Dev Tool</title>\n                      <style>\n                        html {\n                          font-family: monospace;\n                          background: #212121;\n                        }\n\n                        body {\n                          margin: 0px;\n                        }\n\n                        #".concat(injectionPointId, " {\n                          height: 100vh;\n                          width: 100vw;\n                        }\n                      </style>\n                  </head>\n                  <body>\n                      <div id=\"").concat(injectionPointId, "\"></div>\n                      <script src=\"").concat(data.devtoolScript, "\" data-injection-point-id=").concat(injectionPointId, "></script>\n                  </body>\n              </html>\n          ")); //add stop function to main page window

      window.stopReduxDevTool = function () {
        setConfig('enablePopup', false);
        devToolWindow.close();
      }; //add close function to main page window


      window.closeReduxDevTool = function () {
        devToolWindow.close();
      };
    }
  };
}();

external_Redux_default().addActionListener(ReduxDevTool.actionListener);
window.addEventListener('beforeunload', function () {
  external_Redux_default().removeActionListener(ReduxDevTool.actionListener);
  window.closeReduxDevTool();
});
console.log('Redux dev tool loaded');

if (DevToolConfigs.enablePopup) {
  ReduxDevTool.startReduxDevTool();
}

window.startReduxDevTool = function () {
  setConfig('enablePopup', true);
  ReduxDevTool.startReduxDevTool();
};
})();

/******/ })()
;