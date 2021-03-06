const EE = require('eventemitter3')
const { EVENTS, TYPES } = require('./const')
const { produce } = require('immer')
class Redux {
  #EventEmitter
  #store
  #actionListeners
  #actions
  #epics
  #reducers
  static #instance

  constructor() {
    this.#store = {}
    this.#actionListeners = new Map()
    this.#actions = {}
    this.#epics = {}
    this.#EventEmitter = new EE()
    this.#reducers = {}

    //add event listener for actions
    this.#EventEmitter.on(EVENTS.ACTION, action => {
      action()
    })
  }

  static getReducers() {
    return Redux.#getInstance().#reducers
  }

  static getReducer(reducerId) {
    return Redux.#getInstance().#reducers[reducerId]
  }

  static setReducer(reducer) {
    if (reducer == null || reducer.ID == null || reducer.constructor.name !== 'Reducer') {
      throw new Error('Invalid Reducer. Must of type Reducer with a valid non-empty ID attribute')
    }

    Redux.#getInstance().#reducers[reducer.ID] = reducer
  }

  static removeReducer(ID) {
    Redux.#getInstance().#reducers = Object.fromEntries(
      Object.entries(Redux.#getInstance().#reducers).filter(([key]) => key !== ID)
    )
  }

  static getEventEmitter() {
    return Redux.#getInstance().#EventEmitter
  }

  static #getInstance() {
    if (Redux.#instance == null) {
      Redux.#instance = new Redux()
    }

    return Redux.#instance
  }

  static getStore(reduxId) {
    const store = reduxId ? Redux.#getInstance().#store[reduxId] : Redux.#getInstance().#store
    return store
  }

  static getActions(reduxId) {
    return reduxId == null ? Redux.#getInstance().#actions : Redux.#getInstance().#actions[reduxId]
  }

  static getEpics() {
    return Redux.#getInstance().#epics
  }

  static init(initialState = {}, defaultState = {}) {
    if (typeof initialState !== 'object' || initialState.constructor !== {}.constructor) {
      throw new Error(
        `Redux initial state must be an object ({}) but recieved ${initialState && initialState.constructor}`
      )
    }

    Redux.#getInstance().#store = produce(Redux.#getInstance().#store, draft => {
      Object.assign(draft, defaultState, initialState)
    })
  }

  static initChangeListener(pickerFunc) {
    const propSelectFunction = (...props) => (pickerFunc || (a => a))(...props) || {}
    const getInitialState = props => propSelectFunction(Redux.#getInstance().#store, props)

    return {
      propSelectFunction,
      getInitialState,
    }
  }

  static addChangeListener(changeListener) {
    if (typeof changeListener === 'function') {
      Redux.#getInstance().#EventEmitter.addListener(EVENTS.UPDATE, changeListener)
    } else {
      throw new Error('Change listener must be of type function')
    }
  }

  static removeChangeListener(changeListener) {
    Redux.#getInstance().#EventEmitter.removeListener(EVENTS.UPDATE, changeListener)
  }

  /*
  example usages:
  import { Actions } from './myRedux'

  Redux.addActionListener(function ({ id, storeId, type, time, payload, prevStore, store }) {
    if(id === Actions.actionOne.toString()) {
        console.log(id, payload)
    }
  })

  //listen for Redux Actions and Epics
  Redux.addActionListener({
    [Actions.actionOne]: ({ id, storeId, type, time, payload, prevStore, store }) => {
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
  static addActionListener(changeListener) {
    const type = changeListener && changeListener.constructor && changeListener.constructor.name

    if (type === Function.name) {
      Redux.#getInstance().#EventEmitter.addListener(EVENTS.ACTION_LISTENER, changeListener)
    } else if (type === Object.name) {
      Object.entries(changeListener).forEach(([key, callback]) => {
        if (callback == null) {
          throw new Error(`Action listener for ${key} cannot be null`)
        }

        if (typeof callback !== 'function') {
          throw new Error(`Action listener for ${key} must be a Function`)
        }

        if (typeof key !== 'string') {
          throw new Error('All action listener keys must be Strings')
        }
      })

      const actionListenerMapFunc = info => {
        const listenerForId = changeListener[info.id]
        if (listenerForId) {
          listenerForId(info)
        }
      }

      Redux.#getInstance().#actionListeners.set(changeListener, actionListenerMapFunc)

      Redux.#getInstance().#EventEmitter.addListener(EVENTS.ACTION_LISTENER, actionListenerMapFunc)
    } else if (type === Array.name) {
      changeListener.forEach((listener, i) => {
        if (listener == null) {
          throw new Error(`Action listener at index ${i} cannot be null`)
        }

        if (!Array.isArray(listener.ids)) {
          throw new Error(`Action listener id list at index ${i} must be an array`)
        }

        if (listener.ids.length === 0) {
          throw new Error(`Action listener id list at index ${i} must contain at least 1 id`)
        }

        if (
          listener.callback == null ||
          (listener.callback.constructor && listener.callback.constructor.name !== Function.name)
        ) {
          throw new Error(`Action listener callback at index ${i} must be a function`)
        }
      })

      //in case they use the Action function directly as the ID rather than the string ID
      const formattedChangeListener = changeListener.map(listener => ({
        ...listener,
        ids: listener.ids.map(id => id.toString()),
      }))

      const actionListenerMapFunc = info => {
        formattedChangeListener.forEach(({ ids, callback }) => {
          if (ids.includes(info.id)) {
            callback(info)
          }
        })
      }

      Redux.#getInstance().#actionListeners.set(changeListener, actionListenerMapFunc)

      Redux.#getInstance().#EventEmitter.addListener(EVENTS.ACTION_LISTENER, actionListenerMapFunc)
    } else {
      throw new Error('Action listener must be of type function, object, or array')
    }
  }

  static removeActionListener(changeListener) {
    if (Redux.#getInstance().#actionListeners.has(changeListener)) {
      Redux.#getInstance().#EventEmitter.removeListener(
        EVENTS.ACTION_LISTENER,
        Redux.#getInstance().#actionListeners.get(changeListener)
      )

      Redux.#getInstance().#actionListeners.delete(changeListener)
    }
  }

  static createAction(reduxId, func, actionName = '') {
    if (typeof func !== 'function') {
      throw new Error(`Action func must be of type function. Instead got ${typeof func}`)
    }

    const actionId = func.name || actionName

    const rawAction = function (payload, isDelayed = false, isLast = false) {
      //get new store
      const newStore = produce(Redux.#getInstance().#store, draft => func(draft, payload))
      Redux.#getInstance().#store = newStore

      //send new action log to listeners
      Redux.#getInstance().#EventEmitter.emit(EVENTS.ACTION_LISTENER, {
        id: actionId,
        storeId: reduxId,
        type: TYPES.ACTION,
        time: Date.now(),
        payload,
        prevStore: newStore, //TODO remove diff
        store: newStore,
        isDelayed: !!isDelayed,
        isLast,
      })

      if (!isDelayed) {
        //notify everyone
        Redux.#getInstance().#EventEmitter.emit(EVENTS.UPDATE, newStore)
      } else {
        //return the new store
        return newStore
      }
    }
    const action = function (...props) {
      return new Promise(res => {
        Redux.#getInstance().#EventEmitter.emit(EVENTS.ACTION, () => {
          rawAction(...props)
          res()
        })
      })
    }

    //add prototype toString so that it resolves to the actionId
    action.type = TYPES.ACTION
    action.toString = () => actionId
    action.prototype.toString = () => actionId

    //snapshot action
    Redux.#getInstance().#actions[reduxId] = Redux.#getInstance().#actions[reduxId] || {}

    if (Redux.#getInstance().#actions[reduxId][actionId] == null) {
      Redux.#getInstance().#actions[reduxId][actionId] = action
    } else {
      throw new Error(`An Action with the name ${actionId} already exists for redux ${reduxId}`)
    }

    return action
  }

  static createActions(reduxId, actions = {}) {
    if (reduxId == null || reduxId.constructor.name !== 'String') {
      throw new Error(`You must specify a non-null String reduxId when creating redux actions`)
    } else if (actions.constructor.name !== 'Object') {
      throw new Error('actions must be an Object')
    }

    return Object.fromEntries(
      Object.entries(actions).map(([actionName, func]) => [actionName, Redux.createAction(reduxId, func, actionName)])
    )
  }

  static createEpic(reduxId, func, actionName = '') {
    if (typeof func !== 'function') {
      throw new Error(`Epic func must be of type function. Instead got ${typeof func}`)
    }

    const epicId = func.name || actionName

    const rawEpic = function (payload) {
      const store = Redux.#getInstance().#store

      //send new action log to listeners
      Redux.#getInstance().#EventEmitter.emit(EVENTS.ACTION_LISTENER, {
        id: epicId,
        storeId: reduxId,
        type: TYPES.EPIC,
        time: Date.now(),
        payload,
        store: store,
      })

      func(store, payload)
    }

    const epic = function (...props) {
      return new Promise(res => {
        Redux.#getInstance().#EventEmitter.emit(EVENTS.ACTION, () => {
          rawEpic(...props)
          res()
        })
      })
    }

    //add prototype toString so that it resolves to the actionId
    epic.type = TYPES.EPIC
    epic.toString = () => epicId
    epic.prototype.toString = () => epicId

    //snapshot epic
    Redux.#getInstance().#epics[reduxId] = Redux.#getInstance().#epics[reduxId] || {}

    if (Redux.#getInstance().#epics[reduxId][epicId] == null) {
      Redux.#getInstance().#epics[reduxId][epicId] = epic
    } else {
      throw new Error(`An Epic with the name ${epicId} already exists for redux ${reduxId}`)
    }

    return epic
  }

  static createEpics(reduxId, actions) {
    if (reduxId == null) {
      throw new Error(`You must specify a non-null reduxId when creating redux epics`)
    }

    return Object.fromEntries(
      Object.entries(actions || {}).map(([actionName, func]) => [
        actionName,
        Redux.createEpic(reduxId, func, actionName),
      ])
    )
  }

  static callAction(reduxId, actionId, payload, { isDelayed = false } = {}) {
    const allActions = Redux.#getInstance().#actions
    const reduxActions = allActions && allActions[reduxId]
    const action = reduxActions && reduxActions[actionId]

    if (typeof action !== 'function' && action.type !== TYPES.ACTION) {
      console.warn(`The action ${actionId} is not a function for store ${reduxId}`)
      return
    }

    if (isDelayed) {
      const delayedAction = function (isLast = false) {
        return action(payload, true, isLast)
      }

      delayedAction.type = TYPES.DELAYED_ACTION

      return delayedAction
    } else {
      action(payload)
    }
  }

  static chainAction(reduxId, actionId, payload) {
    return Redux.callAction(reduxId, actionId, payload, { isDelayed: true })
  }

  static callActions(rawActions) {
    const actions = [].concat(rawActions)

    actions.forEach((delayedAction, i) => {
      if (typeof delayedAction !== 'function' || delayedAction.type !== TYPES.DELAYED_ACTION) {
        throw new Error('Invalid Action recieved in CallActions. Expecting a Delayed Action')
      }

      delayedAction(i === actions.length - 1)
    })

    //notify everyone
    Redux.#getInstance().#EventEmitter.emit(EVENTS.UPDATE, Redux.#getInstance().#store)
  }

  static callEpic(reduxId, epicId, payload) {
    const allEpics = Redux.#getInstance().#epics
    const reduxEpics = allEpics && allEpics[reduxId]
    const epic = reduxEpics && reduxEpics[epicId]

    if (typeof epic === 'function' && epic.type === TYPES.EPIC) {
      epic(payload)
    } else {
      console.warn(`The epic ${epicId} is not a function for store ${reduxId}`)
    }
  }
}

Redux.TYPES = TYPES
Redux.init()

//Init globally for when imported in a web browser
if (typeof window !== 'undefined') {
  window.Redux = window.Redux || Redux
}

module.exports = Redux
