const React = require('react')
const { shallowCompare } = require('./utils')

var Redux

if (typeof window !== 'undefined') {
  Redux = window.Redux
}

function bindRedux(newRedux) {
  Redux = newRedux
}

function listen(pickerFunc, Component) {
  if (Redux == null) {
    throw new Error("No Redux bound to this listener. Please call 'bindRedux'")
  }

  const { getInitialState, propSelectFunction } = Redux.initChangeListener(pickerFunc)

  const MemoizedComponent = React.memo(Component)

  return React.forwardRef(function ReduxWrapper(props, forwardedRef) {
    const [state, setState] = React.useState(getInitialState())

    React.useEffect(() => {
      var propListener = typeof propListener === 'undefined' ? null : propListener
      if (propListener == null) {
        propListener = newState => {
          //Only update state if the state has changed
          //Performing a shallow comparison
          if (!shallowCompare(state, newState)) {
            setState(propSelectFunction(newState))
          }
        }

        Redux.addChangeListener(propListener)
      }

      return () => {
        Redux.removeChangeListener(propListener)
      }
    }, [])

    return React.createElement(MemoizedComponent, {
      ref: forwardedRef,
      ...state,
      ...props,
    })
  })
}

module.exports = {
  bindRedux,
  listen,
}
