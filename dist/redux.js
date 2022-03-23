/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 144:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }

function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }

function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _require = __webpack_require__(456),
    clone = _require.clone;

var TYPES = {
  EPIC: 'Epic',
  ACTION: 'Action',
  DELAYED_ACTION: 'DelayedAction'
};

var _listeners = /*#__PURE__*/new WeakMap();

var _store = /*#__PURE__*/new WeakMap();

var _actionListeners = /*#__PURE__*/new WeakMap();

var _actions = /*#__PURE__*/new WeakMap();

var _epics = /*#__PURE__*/new WeakMap();

var Redux = /*#__PURE__*/function () {
  function Redux() {
    _classCallCheck(this, Redux);

    _listeners.set(this, {
      writable: true,
      value: void 0
    });

    _store.set(this, {
      writable: true,
      value: void 0
    });

    _actionListeners.set(this, {
      writable: true,
      value: void 0
    });

    _actions.set(this, {
      writable: true,
      value: void 0
    });

    _epics.set(this, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _listeners, []);

    _classPrivateFieldSet(this, _store, {});

    _classPrivateFieldSet(this, _actionListeners, []);

    _classPrivateFieldSet(this, _actions, {});

    _classPrivateFieldSet(this, _epics, {});
  }

  _createClass(Redux, null, [{
    key: "getStore",
    value: function getStore(reduxId) {
      var store = reduxId ? _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _store)[reduxId] : _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _store);
      return store ? clone(store) : store;
    }
  }, {
    key: "getActions",
    value: function getActions(reduxId) {
      return reduxId == null ? _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _actions) : _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _actions)[reduxId];
    }
  }, {
    key: "getEpics",
    value: function getEpics() {
      return _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _epics);
    }
  }, {
    key: "init",
    value: function init() {
      var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var defaultState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (_typeof(initialState) !== 'object' || initialState.constructor !== {}.constructor) {
        throw new Error("Redux initial state must be an object ({}) but recieved ".concat(initialState && initialState.constructor));
      }

      Object.assign(_classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _store), defaultState, initialState);
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
        return propSelectFunction(clone(_classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _store)));
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
        _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _listeners).push(changeListener);
      } else {
        throw new Error('Change listener must be of type function');
      }
    }
  }, {
    key: "removeChangeListener",
    value: function removeChangeListener(changeListener) {
      var index = _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _listeners).indexOf(changeListener);

      if (index !== -1) {
        _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _listeners).splice(index, 1);
      }
    }
    /*
    example usages:
    import { Actions } from './myRedux'
     //listen for Redux Actions and Epics
    Redux.addActionListener({
      [Actions.actionOne]: ({ id, storeId, type, time, payload, prevStore, store }) => {
        console.log(id, payload)
      }
    })
     Redux.addActionListener(function ({ id, storeId, type, time, payload, prevStore, store }) {
      if(id === Actions.actionOne.toString()) {
          console.log(id, payload)
      }
    })
     //can bind to multiple actions for a single callback
    Redux.addActionListener([
      { ids: [Actions.actionOne, Actions.actionTwo], 
        callback: ({ id, storeId, type, time, payload, prevStore, store }) => {
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
        _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _actionListeners).push(changeListener);
      } else if (type === Object.name) {
        Object.entries(changeListener).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              callback = _ref2[1];

          if (callback == null) {
            throw new Error("Action listener for ".concat(key, " cannot be null"));
          }
        });

        _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _actionListeners).push(function (info) {
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

        _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _actionListeners).push(function (info) {
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
      var index = _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _actionListeners).indexOf(changeListener);

      if (index !== -1) {
        _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _actionListeners).splice(index, 1);
      }
    }
  }, {
    key: "createAction",
    value: function createAction(reduxId, func) {
      var actionName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      if (typeof func !== 'function') {
        throw new Error("Action func must be of type function. Instead got ".concat(_typeof(func)));
      }

      var actionId = func.name || actionName;

      var action = function action(payload, customStore, isLast) {
        //get new store
        //important to send a clone to prevent any possible data mutations
        var newStore = func(clone(customStore || _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _store)), payload); //send new action log to listeners

        _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _actionListeners).forEach(function (actionListener) {
          if (typeof actionListener === 'function') {
            actionListener({
              id: actionId,
              storeId: reduxId,
              type: TYPES.ACTION,
              time: Date.now(),
              payload: payload,
              prevStore: clone(_classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _store)),
              store: clone(newStore),
              isDelayed: !!customStore,
              isLast: isLast
            });
          }
        });

        if (!customStore) {
          //update current global store and notify everyone
          _classStaticPrivateMethodGet(Redux, Redux, _updateState).call(Redux, newStore);
        } else {
          //return the new store
          return newStore;
        }
      }; //add prototype toString so that it resolves to the actionId


      action.type = TYPES.ACTION;

      action.toString = function () {
        return actionId;
      };

      action.prototype.toString = function () {
        return actionId;
      }; //snapshot action


      _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _actions)[reduxId] = _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _actions)[reduxId] || {};

      if (_classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _actions)[reduxId][actionId] == null) {
        _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _actions)[reduxId][actionId] = action;
      } else {
        throw new Error("An Action with the name ".concat(actionId, " already exists for redux ").concat(reduxId));
      }

      return action;
    }
  }, {
    key: "createActions",
    value: function createActions(reduxId) {
      var actions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (reduxId == null || reduxId.constructor.name !== 'String') {
        throw new Error("You must specify a non-null String reduxId when creating redux actions");
      } else if (actions.constructor.name !== 'Object') {
        throw new Error('actions must be an Object');
      }

      return Object.fromEntries(Object.entries(actions).map(function (_ref4) {
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
        _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _actionListeners).forEach(function (actionListener) {
          if (typeof actionListener === 'function') {
            actionListener({
              id: epicId,
              storeId: reduxId,
              type: TYPES.EPIC,
              time: Date.now(),
              payload: payload,
              store: clone(_classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _store))
            });
          }
        }); //important to send a clone to prevent any possible data mutations


        func(clone(_classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _store)), payload);
      }; //add prototype toString so that it resolves to the actionId


      epic.type = TYPES.EPIC;

      epic.toString = function () {
        return epicId;
      };

      epic.prototype.toString = function () {
        return epicId;
      }; //snapshot epic


      _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _epics)[reduxId] = _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _epics)[reduxId] || {};

      if (_classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _epics)[reduxId][epicId] == null) {
        _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _epics)[reduxId][epicId] = epic;
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
  }, {
    key: "callAction",
    value: function callAction(reduxId, actionId, payload) {
      var _ref8 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
          _ref8$isDelayed = _ref8.isDelayed,
          isDelayed = _ref8$isDelayed === void 0 ? false : _ref8$isDelayed;

      var allActions = _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _actions);

      var reduxActions = allActions && allActions[reduxId];
      var action = reduxActions && reduxActions[actionId];

      if (typeof action !== 'function' && action.type !== TYPES.ACTION) {
        console.warn("The action ".concat(actionId, " is not a function for store ").concat(reduxId));
        return;
      }

      if (isDelayed) {
        var delayedAction = function delayedAction(customStore) {
          var isLast = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          return action(payload, customStore, isLast);
        };

        delayedAction.type = TYPES.DELAYED_ACTION;
        return delayedAction;
      } else {
        action(payload);
      }
    }
  }, {
    key: "chainAction",
    value: function chainAction(reduxId, actionId, payload) {
      return Redux.callAction(reduxId, actionId, payload, {
        isDelayed: true
      });
    }
  }, {
    key: "callActions",
    value: function callActions(actions) {
      var newStore = [].concat(actions).reduce(function (acc, delayedAction, i) {
        if (typeof delayedAction !== 'function' || delayedAction.type !== TYPES.DELAYED_ACTION) {
          throw new Error('Invalid Action recieved in CallActions. Expecting a Delayed Action');
        }

        return Object.assign(acc, delayedAction(acc, i === actions.length - 1) || {});
      }, _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _store)); //update current store and notify everyone

      _classStaticPrivateMethodGet(Redux, Redux, _updateState).call(Redux, newStore);
    }
  }, {
    key: "callEpic",
    value: function callEpic(reduxId, epicId, payload) {
      var allEpics = _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _epics);

      var reduxEpics = allEpics && allEpics[reduxId];
      var epic = reduxEpics && reduxEpics[epicId];

      if (typeof epic === 'function' && epic.type === TYPES.EPIC) {
        epic(payload);
      } else {
        console.warn("The epic ".concat(epicId, " is not a function for store ").concat(reduxId));
      }
    }
  }]);

  return Redux;
}();

function _getInstance() {
  if (_classStaticPrivateFieldSpecGet(Redux, Redux, _instance) == null) {
    _classStaticPrivateFieldSpecSet(Redux, Redux, _instance, new Redux());
  }

  return _classStaticPrivateFieldSpecGet(Redux, Redux, _instance);
}

function _updateState() {
  var newStore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  Object.assign(_classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _store), newStore);

  _classPrivateFieldGet(_classStaticPrivateMethodGet(Redux, Redux, _getInstance).call(Redux), _listeners).forEach(function (listener) {
    if (typeof listener === 'function') {
      listener(newStore);
    }
  });
}

var _instance = {
  writable: true,
  value: void 0
};
Redux.TYPES = TYPES;
Redux.init(); //Init globally for when imported in a web browser

if (typeof window !== 'undefined') {
  window.Redux = window.Redux || Redux;
}

module.exports = Redux;

/***/ }),

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(144);
/******/ 	
/******/ })()
;