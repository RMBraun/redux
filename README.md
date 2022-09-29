# Description
Simplified Redux like Flux implementation for React.  
Works in both NodeJs and client side JS (React).  
Works natively out of the box with NextJs.  
</br>
</br>
Uses `Immer` to enforce store immutability.  
Uses `React` combined with `React.memo` to only trigger updates when specified store values have changed.
  
**NOTE:** This is still a work in progress

# Installation
## Browsers / \<script\>
```js
// production
<script src="https://unpkg.com/@rybr/redux/dist/redux.min.js"></script>

// development
<script src="https://unpkg.com/@rybr/lenses/dist/redux.js"></script>
```

## React / NextJs / NodeJs
```
npm install -D @rybr/redux
```  
# Terminology and Key Concepts
## Stores
- An `Object` that contains state information
- Each Redux can contain multiple `stores`
- Each `store` is identified by a unique Id that is bound to that store
- `Stores` are **READ ONLY** and **immutable**. Attempting to modify the `store` or a value within the `store` outside of an `action` will throw an error. 

## Actions
- Function that allows you to modify the `stores`.
- `actions` are grouped under a store Id. This means you can have 2 `actions` with the same name but they are bound to different stores.
- All `actions` have access to all `stores` and can modify any `store` but should ideally only modify the `store` that they are bound to

## Picker Function
- Function that pulls back specific values from the `stores`
- Theses functions are uniquely bound to a `listener`
- Has access to both the input `props` being sent to the `React` component as well as access to all `stores`

## Listeners
- Function that wraps a `React` component and listens for changes in the store(s)  
- Each `listener` must be provided a `picker function` that pulls values back from the `stores` and returns an `Object` that contains these values. 
- After every `action`, *all* `listeners` are called. Only the `listeners` whose `picker function` returned new values will trigger a re-render.

## Epics
- Function that has access to the current `stores` state information but cannot modify the store
- Function call order is synchronized with `actions`. This guarantees that your `epic` function receives the latest `store` value
  - E.g. If you call an `action` and then try to access the `store` manually via `Redux.getStore()`, there is no guarantee that the `action` has finished running and has updated the `store` in time. `Epics` are queued with `actions` and the queue is run sychronously
- Does **not** trigger `listeners`

## Reducer
- Instantiating a `reducer` will automatically create the `store` with initial state and bind the provided `actions` to it
- Has the ability to call multiple `actions` in a row and **only once all the batched `actions` are called** will the `listeners` be notified that a change has occured

# Usage
Either include the desired distribution script in the `<head>` or include the import in your React file.

```
#Browser
<script src="https://unpkg.com/@rybr/redux/dist/redux.min.js"></script>

#React
import Redux from '@rybr/redux'

```
## Store initialization
By default there are no stores initialized. 

The simplest way to initialize a `store` is to instantiate a `Reducer`. Alternatively, you can manually instiate `stores` using `Redux.init(newStore)` (note that this merges `newStore` into the current `stores`)  

The main reason to use a `Reducer` is for simplicitly. It will also not try to re-instantiate the same `store`/`actions` if the file is reloaded or if the `store` already exists.  

### Manual Initialization
```js
import Redux from '@rybr/redux'
import Reducer from '@rybr/redux/reducer'

const STORE_ID = 'storeOne'

Redux.init({
    //Optional initiale state for storeOne
    [STORE_ID]: {
        displayText: 'some default display text',
        shouldShow: true
    },
})

Redux.createActions(
    //store Id
    STORE_ID, 
    //All the actions bound to this tore
    {
        setDisplayText: (store, payload) => {
         store[STORE_ID].displayText = payload

            return store
        },
    }
)
```

### Instantiating a Reducer
```js
import Redux from '@rybr/redux'
import Reducer from '@rybr/redux/reducer'

const STORE_ID = 'storeOne'

const INITIAL_STATE = {
  displayText: 'some default display text',
  shouldShow: true,
  count: 0
}

export default new Reducer(Redux).init(
  //store Id
  STORE_ID,
  //All the actions bound to this tore
  {
    setDisplayText: (store, payload) => {
        store[STORE_ID].displayText = payload

        return store
    },
    setShouldShow: (store, payload) => {
        store[STORE_ID].shouldShow = payload

        return store
    },
    incCount: (store, payload) => {
        store[STORE_ID].count = store[STORE_ID].count + 1

        return store
    }
  },
  //Optional initiale state for storeOne
  INITIAL_STATE
)
```
A `Reducer` will provide a few utility functions:   
`Reducer.ID`: The `ID` associated to this store  
`Reducer.Actions`: A map of all `actions` boun to this store  
`Reducer.batchActions`: function used to chain multiple `actions` in a row where only once the last `action` is called will the `store` be updated and trigger the `listeners`  
`Reducer.DelayedActions`: To be used in conjunction with `Reducer.batchActions`. 

## Listening for Changes
In order to listen for changes, you must wrap your component in a `listener` and provide a `picker function`.  
  
Whenever an `action` is called, once the `stores` are updated, all `listeners` will call their `picker function` which will pull back values from the `stores`. If any of those values change for a given `listeners`, then a re-render happens for that given component. 
  
### Create a listener function that binds to the current Redux
```js
//listener.js

/*
NOTE: If you are using `NextJs` or if you are **NOT** including this package using a `<script>` tag in the header, you will most likely need to create this listener wrapper that binds your listener to the bundled es module.
*/

import Redux from '@rybr/redux'
import Listener from '@rybr/redux/listener'

Listener.bindRedux(Redux)

export default Listener.listen
```

```js
//MyComponent.js

import React from 'react'

//If you included Redux globally via a <script> tag
import Listener from '@rybr/redux/listener'
//If you are only importing Reduxing into your JSX files
import Listener from './listener'

//Created using the Reducer
import myRedux from './myRedux.js'

const onHideClick = () => {
    myRedux.Actions.setShouldShow(false)
}

const onShowClick = () => {
    //Prevents 2 re-renders form occuring
    //Chains the actions (store is updated after each action is called)
    //Only once the last action is called are listeners notified of a change
    myRedux.batchActions(
        myRedux.DelayedActions.setShouldShow(true),
        myRedux.DelayedActions.incCount()
    )
}

export default listen(
    //This is the picker function.
    //First argument is the current store value
    //Second argument is any props passed into the component
    (store, props) => {
        //pull back specific values you want
        const { shouldShow, displayText } = store[myRedux.ID]

        //return a new object with the explicit values
        return {
            shouldShow,
            displayText
        }
    },
    //object returned from the picker function is passed 
    //into your React component function along with any props
    function MyComponent({ shouldShow, displayText, someOtherProp }) {
        return <div>
            {shouldShow ? <p>{displayText}</p> : null }
            <button onClick={onHideClick}>
                {'hide display text'}
            </button>
            <button onClick={onShowClick}>
                {'show display text'}
            </button>
        </div>
    }
)
```