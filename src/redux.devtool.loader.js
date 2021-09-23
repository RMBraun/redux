import Redux from 'redux'
import { set } from '@rybr/lenses/set'
import { get } from '@rybr/lenses/get'

const jsondiffpatch = require('jsondiffpatch').create({})

//script data
const data = document.currentScript.dataset

//initialize and get redux dev tool config values
const localStorageConfigId = 'ReduxDevToolConfigs'
const DevToolConfigs = JSON.parse(localStorage.getItem(localStorageConfigId)) || {}
DevToolConfigs.columns = DevToolConfigs.columns || {}
DevToolConfigs.filters = DevToolConfigs.filters || {}
DevToolConfigs.maximumLines = DevToolConfigs.maximumLines || 200
DevToolConfigs.maximumMemory = DevToolConfigs.maximumMemory || 10000000

localStorage.setItem(localStorageConfigId, JSON.stringify(DevToolConfigs))

const setConfig = (keys, value) => {
  set(DevToolConfigs, ...[].concat(keys), value)
  localStorage.setItem(localStorageConfigId, JSON.stringify(DevToolConfigs))
}

const ReduxDevTool = (function () {
  const currTime = Date.now()
  let actionLog = []
  let actionLogIndex = 0
  let actionLogSize = 0
  const subscribers = []
  const setSubscriber = subscriber => {
    subscribers.push(subscriber)
  }
  const removeSubscriber = subscriber => {
    const index = subscribers.indexOf(subscriber)

    if (index !== -1) {
      subscribers.splice(index, 1)
    }
  }

  return {
    actionLog,
    actionListener: ({ id, storeId, type, time, prevStore, store, payload }) => {
      //limit array size
      if (actionLog.length >= DevToolConfigs.maximumLines || actionLogSize >= DevToolConfigs.maximumMemory) {
        let removedItem = actionLog.shift()
        actionLogSize = actionLogSize - JSON.stringify(removedItem).length
        removedItem = null
      }

      const newActionLogEntry = {
        storeId,
        actionId: id,
        type,
        index: actionLogIndex++,
        typeDisplay: type,
        time: ((time - currTime) / 1000).toFixed(3),
        payload,
        delta: type === Redux.TYPES.ACTION ? jsondiffpatch.diff(prevStore, store) : undefined,
      }

      actionLogSize += JSON.stringify(newActionLogEntry).length

      actionLog.push(newActionLogEntry)

      subscribers.forEach(subscriber => {
        if (typeof subscriber === 'function') {
          subscriber(actionLog)
        }
      })
    },
    startReduxDevTool: () => {
      const devToolWindow = window.open(
        '',
        'ReduxDevTool',
        'height=800,width=1200,status=no,toolbar=no,menubar=no,location=no,scrollbars=yes'
      )

      //global injection points
      devToolWindow.React = window.React
      devToolWindow.ReactDOM = window.ReactDOM
      devToolWindow.Redux = window.Redux
      devToolWindow.L = window.L

      //global helper functions
      devToolWindow.setSubscriber = setSubscriber
      devToolWindow.removeSubscriber = removeSubscriber
      devToolWindow.getActionLog = () => actionLog
      devToolWindow.clearActionLog = () => {
        actionLog = []
        actionLogIndex = 0
        actionLogSize = 0
      }
      devToolWindow.getDevToolConfigs = () => DevToolConfigs
      devToolWindow.setConfig = setConfig

      //clear orig html
      devToolWindow.document.querySelector('body').innerHTML = ''

      //create popup DOM structure
      devToolWindow.document.write(`
              <html>
                  <head>
                      <title>Redux Dev Tool</title>
                      <style>
                        html {
                          font-family: monospace;
                          background: #212121;
                        }

                        body {
                          margin: 0px;
                        }

                        #ReduxDevTool {
                          position: relative;
                          display: flex;
                          flex-direction: column;
                          height: 100vh;
                          width: 100vw;
                        }
                      </style>
                      <script>${null}</script>
                  </head>
                  <body>
                      <div id="ReduxDevTool"></div>
                      <script src="${data.devtoolScript}"></script>
                  </body>
              </html>
          `)

      //add stop function to main page window
      window.stopReduxDevTool = () => {
        setConfig('enablePopup', false)
        devToolWindow.close()
      }

      //add close function to main page window
      window.closeReduxDevTool = () => {
        devToolWindow.close()
      }
    },
  }
})()

Redux.addActionListener(ReduxDevTool.actionListener)
window.addEventListener('beforeunload', function () {
  Redux.removeActionListener(ReduxDevTool.actionListener)
  window.closeReduxDevTool()
})

console.log('Redux dev tool loaded')

if (DevToolConfigs.enablePopup) {
  ReduxDevTool.startReduxDevTool()
}

window.startReduxDevTool = () => {
  setConfig('enablePopup', true)
  ReduxDevTool.startReduxDevTool()
}
