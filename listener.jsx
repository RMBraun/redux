const React = require('react')

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

  return React.forwardRef(function ReduxWrapper(props, forwardedRef) {
    const [state, setState] = React.useState(getInitialState())

    React.useEffect(() => {
      var propListener = typeof propListener === 'undefined' ? null : propListener
      if (propListener == null) {
        propListener = newStore => {
          setState(propSelectFunction(newStore))
        }

        Redux.addChangeListener(propListener)
      }

      return () => {
        Redux.removeChangeListener(propListener)
      }
    }, [])

    return React.createElement(Component, {
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
