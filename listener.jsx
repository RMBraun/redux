const React = require('react')

function listener(pickerFunc, Component) {
  const { getInitialState, propSelectFunction } = this.Redux.initChangeListener(pickerFunc)

  return React.forwardRef(function ReduxWrapper(props, forwardedRef) {
    const [state, setState] = React.useState(getInitialState())

    React.useEffect(() => {
      let propListener = propListener
      if (propListener == null) {
        propListener = newStore => {
          setState(propSelectFunction(newStore))
        }

        this.Redux.addChangeListener(propListener)
      }

      return () => {
        this.Redux.removeChangeListener(propListener)
      }
    }, [])

    return <Component ref={forwardedRef} {...state} {...props} />
  })
}

listener.prototype.init = function(Redux) {
  this.Redux = Redux
}

if(typeof window !== null) {
  listener.init(window.Redux)
}

module.exports = listener