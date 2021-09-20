/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 456:
/***/ ((module) => {

function clone(input) {
  return JSON.parse(JSON.stringify(input));
}

module.exports = {
  clone: clone
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
/* unused harmony export default */
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(456);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var TYPES = {
  EPIC: 'Epic',
  ACTION: 'Action'
};

var Redux = /*#__PURE__*/function () {
  function Redux() {
    _classCallCheck(this, Redux);

    this.enableDebug = false;
    this.listeners = [];
    this.store = {};
    this.actionListeners = [];
    this.actions = {};
    this.epics = {};
  }

  _createClass(Redux, null, [{
    key: "getInstance",
    value: function getInstance() {
      if (Redux.instance == null) {
        Redux.instance = new Redux();
      }

      return Redux.instance;
    }
  }, {
    key: "getActions",
    value: function getActions(reduxId) {
      return reduxId == null ? Redux.getInstance().actions : Redux.getInstance().actions[reduxId];
    }
  }, {
    key: "getEpics",
    value: function getEpics() {
      return Redux.getInstance().epics;
    }
  }, {
    key: "init",
    value: function init() {
      var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var defaultState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      Object.assign(Redux.getInstance().store, defaultState, initialState);
    }
  }, {
    key: "initChangeListener",
    value: function initChangeListener(pickerFunc) {
      var propSelectFunction = function propSelectFunction(newStore) {
        return (pickerFunc || function (a) {
          return a;
        })(newStore) || {};
      };

      var getInitialState = function getInitialState() {
        return propSelectFunction((0,_utils__WEBPACK_IMPORTED_MODULE_0__.clone)(Redux.getInstance().store));
      };

      return {
        propSelectFunction: propSelectFunction,
        getInitialState: getInitialState
      };
    }
  }, {
    key: "addChangeListener",
    value: function addChangeListener(changeListener) {
      if (typeof changeListener === 'function') {
        Redux.getInstance().listeners.push(changeListener);
      } else {
        throw new Error('Change listener must be of type function');
      }
    }
  }, {
    key: "removeChangeListener",
    value: function removeChangeListener(changeListener) {
      var index = Redux.getInstance().listeners.indexOf(changeListener);

      if (index !== -1) {
        Redux.getInstance().listeners.splice(index, 1);
      }
    }
    /*
    example usages:
    import { Actions } from './myRedux'
     //listen for Redux Actions and Epics
    Redux.addActionListener({
      [Actions.actionOne]: ({ id, type, time, payload, prevStore, store }) => {
        console.log(id, payload)
      }
    })
     Redux.addActionListener(function ({ id, type, time, payload, prevStore, store }) {
      if(id === Actions.actionOne.toString()) {
          console.log(id, payload)
      }
    })
     //can bind to multiple actions for a single callback
    Redux.addActionListener([
      { ids: [Actions.actionOne, Actions.actionTwo], 
        callback: ({ id, type, time, payload, prevStore, store }) => {
          console.log(id, payload)
        }
      }
    ])
    */

  }, {
    key: "addActionListener",
    value: function addActionListener(changeListener) {
      var type = changeListener && changeListener.constructor && changeListener.constructor.name;

      if (type === Function.name) {
        Redux.getInstance().actionListeners.push(changeListener);
      } else if (type === Object.name) {
        Object.entries(changeListener).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              callback = _ref2[1];

          if (callback == null) {
            throw new Error("Action listener for ".concat(key, " cannot be null"));
          }
        });
        Redux.getInstance().actionListeners.push(function (info) {
          var listenerForId = changeListener[info.id];

          if (listenerForId && listenerForId.constructor && listenerForId.constructor.name === Function.name) {
            listenerForId(info);
          }
        });
      } else if (type === Array.name) {
        changeListener.forEach(function (listener, i) {
          if (listener == null) {
            throw new Error("Action listener at index ".concat(i, " cannot be null"));
          }

          if (!Array.isArray(listener.ids)) {
            throw new Error("Action listener id list at index ".concat(i, " must be an array"));
          }

          if (listener.ids.length === 0) {
            throw new Error("Action listener id list at index ".concat(i, " must contain at least 1 id"));
          }

          if (listener.callback == null || listener.callback.constructor && listener.callback.constructor.name !== Function.name) {
            throw new Error("Action listener callback at index ".concat(i, " must be a function"));
          }
        }); //in case they use the Action function directly as the ID rather than the
        //string ID

        var formattedChangeListener = changeListener.map(function (listener) {
          return _objectSpread(_objectSpread({}, listener), {}, {
            ids: listener.ids.map(function (id) {
              return id.toString();
            })
          });
        });
        Redux.getInstance().actionListeners.push(function (info) {
          formattedChangeListener.forEach(function (_ref3) {
            var ids = _ref3.ids,
                callback = _ref3.callback;

            if (ids.includes(info.id)) {
              callback(info);
            }
          });
        });
      } else {
        throw new Error('Action listener must be of type function, object, or array');
      }
    }
  }, {
    key: "removeActionListener",
    value: function removeActionListener(changeListener) {
      var index = Redux.getInstance().actionListeners.indexOf(changeListener);

      if (index !== -1) {
        Redux.getInstance().actionListeners.splice(index, 1);
      }
    }
  }, {
    key: "updateState",
    value: function updateState() {
      var newStore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Object.assign(Redux.getInstance().store, newStore);
      Redux.getInstance().listeners.forEach(function (listener) {
        if (typeof listener === 'function') {
          listener(newStore);
        }
      });
    }
  }, {
    key: "createAction",
    value: function createAction(reduxId, func) {
      var actionName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      if (typeof func !== 'function') {
        throw new Error("Action func must be of type function. Instead got ".concat(_typeof(func)));
      }

      var actionId = func.name || actionName;

      var action = function action(payload) {
        //get new store
        //important to send a clone to prevent any possible data mutations
        var newStore = func((0,_utils__WEBPACK_IMPORTED_MODULE_0__.clone)(Redux.getInstance().store), payload); //send new action log to listeners

        Redux.getInstance().actionListeners.forEach(function (actionListener) {
          if (typeof actionListener === 'function') {
            actionListener({
              id: actionId,
              type: TYPES.ACTION,
              time: Date.now(),
              payload: payload,
              prevStore: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clone)(Redux.getInstance().store),
              store: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clone)(newStore)
            });
          }
        }); //update current store and notify everyone

        Redux.updateState(newStore);
      }; //add prototype toString so that it resolves to the actionId


      action.toString = function () {
        return actionId;
      };

      action.prototype.toString = function () {
        return actionId;
      }; //snapshot action


      Redux.getInstance().actions[reduxId] = Redux.getInstance().actions[reduxId] || {};

      if (Redux.getInstance().actions[reduxId][actionId] == null) {
        Redux.getInstance().actions[reduxId][actionId] = action;
      } else {
        throw new Error("An Action with the name ".concat(actionId, " already exists for redux ").concat(reduxId));
      }

      return action;
    }
  }, {
    key: "createActions",
    value: function createActions(reduxId, actions) {
      if (reduxId == null) {
        throw new Error("You must specify a non-null reduxId when creating redux actions");
      }

      return Object.fromEntries(Object.entries(actions || {}).map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            actionName = _ref5[0],
            func = _ref5[1];

        return [actionName, Redux.createAction(reduxId, func, actionName)];
      }));
    }
  }, {
    key: "createEpic",
    value: function createEpic(reduxId, func) {
      var actionName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      if (typeof func !== 'function') {
        throw new Error("Epic func must be of type function. Instead got ".concat(_typeof(func)));
      }

      var epicId = func.name || actionName;

      var epic = function epic(payload) {
        //send new action log to listeners
        Redux.getInstance().actionListeners.forEach(function (actionListener) {
          if (typeof actionListener === 'function') {
            actionListener({
              id: epicId,
              type: TYPES.EPIC,
              time: Date.now(),
              payload: payload,
              store: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clone)(Redux.getInstance().store)
            });
          }
        }); //important to send a clone to prevent any possible data mutations

        func((0,_utils__WEBPACK_IMPORTED_MODULE_0__.clone)(Redux.getInstance().store), payload);
      }; //snapshot epic


      Redux.getInstance().epics[reduxId] = Redux.getInstance().epics[reduxId] || {};

      if (Redux.getInstance().epics[reduxId][epicId] == null) {
        Redux.getInstance().epics[reduxId][epicId] = epic;
      } else {
        throw new Error("An Epic with the name ".concat(epicId, " already exists for redux ").concat(reduxId));
      }

      return epic;
    }
  }, {
    key: "createEpics",
    value: function createEpics(reduxId, actions) {
      if (reduxId == null) {
        throw new Error("You must specify a non-null reduxId when creating redux epics");
      }

      return Object.fromEntries(Object.entries(actions || {}).map(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            actionName = _ref7[0],
            func = _ref7[1];

        return [actionName, Redux.createEpic(reduxId, func, actionName)];
      }));
    }
  }]);

  return Redux;
}();


Redux.init(); //for global browser import

if (typeof window !== 'undefined') {
  window.Redux = {
    TYPES: TYPES,
    init: Redux.init,
    initChangeListener: Redux.initChangeListener,
    addChangeListener: Redux.addChangeListener,
    removeChangeListener: Redux.removeChangeListener,
    addActionListener: Redux.addActionListener,
    removeActionListener: Redux.removeActionListener,
    createActions: Redux.createActions,
    createEpics: Redux.createEpics,
    getStore: function getStore(reduxId) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clone)(reduxId ? Redux.getInstance().store[reduxId] : Redux.getInstance().store);
    },
    getActions: Redux.getActions,
    getEpics: Redux.getEpics,
    callAction: function callAction(reduxId, actionId, payload) {
      var allActions = Redux.getActions();
      var reduxActions = allActions && allActions[reduxId];
      var action = reduxActions && reduxActions[actionId];

      if (typeof action === 'function') {
        action(payload);
      }
    },
    callEpic: function callEpic(reduxId, epicId, payload) {
      var allEpics = Redux.getEpics();
      var reduxEpics = allEpics && allEpics[reduxId];
      var epic = reduxEpics && reduxEpics[epicId];

      if (typeof epic === 'function') {
        epic(payload);
      }
    }
  };
}
})();

/******/ })()
;