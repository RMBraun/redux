import React from 'react'
import Redux from 'redux'

export default function listen(pickerFunc, Component) {
  const { getInitialState, propSelectFunction } = Redux.initChangeListener(pickerFunc)

  return function ReduxWrapper(props) {
    const [state, setState] = React.useState(getInitialState())

    React.useEffect(() => {
      let propListener = propListener
      if (propListener == null) {
        propListener = (newStore) => {
          setState(propSelectFunction(newStore))
        }

        Redux.addChangeListener(propListener)
      }

      return () => {
        Redux.removeChangeListener(propListener)
      }
    }, [])

    return <Component {...state} {...props} />
  }
}
