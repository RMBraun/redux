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

  //TODO remove memo? This is causing shallow compares to prevent re-rendering
  const MemoizedComponent = React.memo(Component)

  var isUnmounted = false

  return React.forwardRef(function ReduxWrapper(props, forwardedRef) {
    const [state, setState] = React.useState(getInitialState({ ...props }))

    React.useEffect(() => {
      isUnmounted = false
      var propListener = typeof propListener === 'undefined' ? null : propListener
      if (propListener == null) {
        propListener = newStore => {
          //early abort if the component was unmounted or in the process of unmounting
          if (isUnmounted) {
            return
          }

          //get new state
          const newState = propSelectFunction(newStore, { ...props })

          //memo should prevent needless re-renders
          setState(newState)
        }

        Redux.addChangeListener(propListener)
      }

      return () => {
        isUnmounted = true
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
