import { clone } from './utils'

const TYPES = {
  EPIC: 'Epic',
  ACTION: 'Action',
}
export default class Redux {
  constructor() {
    this.enableDebug = false
    this.listeners = []
    this.store = {}
    this.actionListeners = []
    this.actions = {}
    this.epics = {}
  }

  static getInstance() {
    if (Redux.instance == null) {
      Redux.instance = new Redux()
    }

    return Redux.instance
  }

  static getActions() {
    return Redux.getInstance().actions
  }

  static getEpics() {
    return Redux.getInstance().epics
  }

  static init(initialState = {}, defaultState = {}) {
    Object.assign(Redux.getInstance().store, defaultState, initialState)
  }

  static initChangeListener(pickerFunc) {
    const propSelectFunction = (newStore) => (pickerFunc || ((a) => a))(newStore) || {}
    const getInitialState = () => propSelectFunction(clone(Redux.getInstance().store))

    return {
      propSelectFunction,
      getInitialState,
    }
  }

  static addChangeListener(changeListener) {
    if (typeof changeListener === 'function') {
      Redux.getInstance().listeners.push(changeListener)
    } else {
      throw new Error('Change listener must be of type function')
    }
  }

  static removeChangeListener(changeListener) {
    const index = Redux.getInstance().listeners.indexOf(changeListener)

    if (index !== -1) {
      Redux.getInstance().listeners.splice(index, 1)
    }
  }

  static addActionListener(changeListener) {
    const type = changeListener && changeListener.constructor && changeListener.constructor.name
    if (type === Function.name) {
      Redux.getInstance().actionListeners.push(changeListener)
    } else if (type === Object.name) {
      Object.entries(changeListener).forEach(([key, callback]) => {
        if (callback == null) {
          throw new Error(`Action listener for ${key} cannot be null`)
        }
      })

      Redux.getInstance().actionListeners.push((info) => {
        const listenerForId = changeListener[info.id]
        if (listenerForId && listenerForId.constructor && listenerForId.constructor.name === Function.name) {
          listenerForId(info)
        }
      })
    } else if (type === Array.name) {
      changeListener.forEach((listener, i) => {
        if (listener == null) {
          throw new Error(`Action listener at index ${i} cannot be null`)
        }

        if (!Array.isArray(listener.ids)) {
          throw new Error(`Action listener id list at index ${i} must an array`)
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

      Redux.getInstance().actionListeners.push((info) => {
        changeListener.filter(({ ids }) => ids.includes(info.id)).forEach(({ callback }) => callback(info))
      })
    } else {
      throw new Error('Action listener must be of type function, object, or array')
    }
  }

  static removeActionListener(changeListener) {
    const index = Redux.getInstance().actionListeners.indexOf(changeListener)

    if (index !== -1) {
      Redux.getInstance().actionListeners.splice(index, 1)
    }
  }

  static updateState(newStore = {}) {
    Object.assign(Redux.getInstance().store, newStore)

    Redux.getInstance().listeners.forEach((listener) => {
      if (typeof listener === 'function') {
        listener(newStore)
      }
    })
  }

  static createAction(reduxId, func, actionName = '') {
    if (typeof func !== 'function') {
      throw new Error(`Action func must be of type function. Instead got ${typeof func}`)
    }

    const actionId = func.name || actionName

    const action = (payload) => {
      //get new store
      //important to send a clone to prevent any possible data mutations
      const newStore = func(clone(Redux.getInstance().store), payload)

      //send new action log to listeners
      Redux.getInstance().actionListeners.forEach((actionListener) => {
        if (typeof actionListener === 'function') {
          actionListener({
            id: actionId,
            type: TYPES.ACTION,
            time: Date.now(),
            payload,
            prevStore: clone(Redux.getInstance().store),
            store: clone(newStore),
          })
        }
      })

      //update current store and notify everyone
      Redux.updateState(newStore)
    }

    //snapshot action
    Redux.getInstance().actions[reduxId] = Redux.getInstance().actions[reduxId] || {}

    if (Redux.getInstance().actions[reduxId][actionId] == null) {
      Redux.getInstance().actions[reduxId][actionId] = action
    } else {
      throw new Error(`An Action with the name ${actionId} already exists for redux ${reduxId}`)
    }

    return action
  }

  static createActions(reduxId, actions) {
    if (reduxId == null) {
      throw new Error(`You must specify a non-null reduxId when creating redux actions`)
    }

    return Object.fromEntries(
      Object.entries(actions || {}).map(([actionName, func]) => [
        actionName,
        Redux.createAction(reduxId, func, actionName),
      ])
    )
  }

  static createEpic(reduxId, func, actionName = '') {
    if (typeof func !== 'function') {
      throw new Error(`Epic func must be of type function. Instead got ${typeof func}`)
    }

    const epicId = func.name || actionName

    const epic = (payload) => {
      //send new action log to listeners
      Redux.getInstance().actionListeners.forEach((actionListener) => {
        if (typeof actionListener === 'function') {
          actionListener({
            id: epicId,
            type: TYPES.EPIC,
            time: Date.now(),
            payload,
            store: clone(Redux.getInstance().store),
          })
        }
      })

      //important to send a clone to prevent any possible data mutations
      func(clone(Redux.getInstance().store), payload)
    }

    //snapshot epic
    Redux.getInstance().epics[reduxId] = Redux.getInstance().epics[reduxId] || {}

    if (Redux.getInstance().epics[reduxId][epicId] == null) {
      Redux.getInstance().epics[reduxId][epicId] = epic
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
}

Redux.init()

//for global browser import
if (typeof window !== 'undefined') {
  window.Redux = {
    TYPES,
    init: Redux.init,
    initChangeListener: Redux.initChangeListener,
    addChangeListener: Redux.addChangeListener,
    removeChangeListener: Redux.removeChangeListener,
    addActionListener: Redux.addActionListener,
    removeActionListener: Redux.removeActionListener,
    createActions: Redux.createActions,
    createEpics: Redux.createEpics,
    getStore: function (reduxId) {
      return clone(reduxId ? Redux.getInstance().store[reduxId] : Redux.getInstance().store)
    },
    getActions: Redux.getActions,
    getEpics: Redux.getEpics,
    callAction: (reduxId, actionId, payload) => {
      const allActions = Redux.getActions()
      const reduxActions = allActions && allActions[reduxId]
      const action = reduxActions && reduxActions[actionId]

      if(typeof action === 'function') {
        action(payload)
      }
    },
    callEpic: (reduxId, epicId, payload) => {
      const allEpics = Redux.getEpics()
      const reduxEpics = allEpics && allEpics[reduxId]
      const epic = reduxEpics && reduxEpics[epicId]

      if(typeof epic === 'function') {
        epic(payload)
      }
    }
  }
}
