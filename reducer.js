const { get, keys, reduce } = require('@rybr/lenses')

class Reducer {
  constructor(newRedux) {
    if (newRedux) {
      this.Redux = newRedux
    } else if (typeof window !== 'undefined') {
      this.Redux = window.Redux
    } else {
      throw new Error('A Redux instance must be provided either globally via the window Object')
    }
  }

  init(reduxId, actions = {}, initialState = {}) {
    if (reduxId == null) {
      throw new Error('reduxId cannot be null')
    } else if (actions.constructor.name !== 'Object') {
      throw new Error('actions must be an object')
    }

    this.initialState = { ...initialState }

    this.ID = reduxId

    if (this.Redux.getStore(reduxId) == null) {
      this.Redux.init({
        [reduxId]: initialState,
      })
    }

    this.Actions = this.Redux.getActions(reduxId) || this.Redux.createActions(reduxId, actions)

    this.DelayedActions = get(
      this.Actions,
      keys(),
      reduce((acc, actionId) => {
        acc[actionId] = payload => this.Redux.chainAction(reduxId, actionId, payload)

        return acc
      }, {})
    )

    return this
  }

  reset(newState) {
    if (this.ID && this.Redux.getStore(this.ID) !== null) {
      this.Redux.init({
        [this.ID]: newState || this.initialState,
      })
    }
  }

  getStore() {
    return this.Redux.getStore(this.ID)
  }

  batchActions(...chainedActions) {
    this.Redux.callActions(chainedActions)
  }
}

module.exports = Reducer
