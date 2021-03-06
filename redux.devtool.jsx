import Redux from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
import './formatters/html.css'
import { format as htmlDeltaFormatter } from './formatters/html'

import styled from '@emotion/styled'

import { get, defaults } from '@rybr/lenses/get'

const PlainButton = styled.button`
  position: relative;
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  border-radius: 0px;
  background: transparent;
  color: #000;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 2.6px;
  font-family: 'AzoSansRegular';
`

const ActionCss = props => `
  background: ${props.inverted ? '#fff' : '#000'};
  border: 1px solid ${props.inverted ? '#fff' : '#000'};
  color: ${props.inverted ? '#000' : '#fff'};

  transition: background 0.15s ease-in-out, color 0.15s ease-in-out;

  :hover {
    background: ${props.inverted ? '#000' : '#fff'};
    color: ${props.inverted ? '#fff' : '#000'};
  }

  :active {
    background: ${props.inverted ? '#fff' : '#000'};
    color: ${props.inverted ? '#000' : '#fff'};

  }
`

export const ActionButton = styled(PlainButton)`
  ${ActionCss}
  padding: 5px;
  min-width: 150px;
  font-family: 'AzoSansRegular';
  text-align: center;
  vertical-align: middle;
`

const Panel = styled.div`
  background: #333333;
  color: rgb(250, 250, 250);
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
  margin: 5px;
  border: 1px solid rgb(144, 144, 144);
`

const Toolbar = styled(Panel)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 5px;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  margin-bottom: 0px;
  flex: 1 0 auto;
  overflow: auto;
`

const ColumnToggles = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
`

const ClearLogsButton = styled(ActionButton)`
  font-size: 16px;
  margin: 5px;
`

const Filters = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
`

const CheckBox = styled.input``

const CheckBoxLabel = styled.label`
  margin-right: 10px;
  display: flex;
  align-items: center;
`

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: calc(100% - 85px);
  overflow: auto;
  flex: 1 0 auto;
`

const ActionList = styled(Panel)`
  position: relative;
`

const ActionListTable = styled.table`
  box-sizing: border-box;
  width: 100%;
  display: block;
  height: 100%;
  overflow-y: auto;

  * {
    box-sizing: border-box;
    font-size: 16px;
  }
`

const TableHeader = styled.th`
  position: sticky;
  height: 40px;
  ${props => (props.isShown ? null : 'display: none;')}
  top: 0;
  font-size: 18px;
  white-space: nowrap;
  background: #000;
  padding: 5px 15px;
  text-align: left;
  border: 1px solid #909090;
  color: white;
`

const TableRow = styled.tr`
  ${props => (props.isShown ? null : 'display: none;')}
  ${props => (props.isSelected ? 'background-color: rgba(255, 255, 255, 0.2);' : null)}

  ${props => (props.noUpdateEmitted ? 'opacity: 0.2;' : null)}

  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const TableData = styled.td`
  ${props => (props.isShown ? null : 'display: none;')}
  white-space: nowrap;
  max-width: 200px;
  overflow-x: scroll;
  padding: 5px;
  text-align: left;
  border: 1px solid #909090;
  color: white;
`

const ActionDiff = styled.div`
  width: calc(100% - 30px);
  padding: 15px;
`

const Payload = styled.div`
  width: calc(100% - 30px);
  white-space: pre;
  padding: 15px;
`

const TabContainer = styled(Panel)`
  width: 100%;
  min-width: 500px;
  display: flex;
  flex-direction: column;
  margin-left: 0px;
  overflow: auto;
`

const TabSelectors = styled.div`
  position: sticky;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: row;
  height: 40px;
`

const TabSelector = styled(PlainButton)`
  padding: 5px;
  flex: 1 0 auto;
  height: 100%;
  color: white;
  background: ${props => (props.isSelected ? '#444' : '#333')};
  border: 1px solid rgb(144, 144, 144);
  font-size: 16px;

  :focus {
    border: 1px solid rgb(144, 144, 144);
  }

  :hover {
    background: #444;
  }
`

const Tabs = styled.div`
  height: calc(100% - 40px);
`

const Tab = styled.div`
  width: 100%;
  ${props => (!props.isSelected ? 'display: none;' : null)}
`

const createTabs = tabsData => {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0)

  const { selectors, contents } = tabsData.reduce(
    (acc, { name, content, isShown }, i) => {
      if (isShown) {
        acc.selectors.push(
          <TabSelector
            key={`tab-selector-${i}`}
            isSelected={selectedTabIndex === i}
            onClick={() => setSelectedTabIndex(i)}
          >
            {name}
          </TabSelector>
        )

        acc.contents.push(
          <Tab key={`tab-content-${i}`} isSelected={selectedTabIndex === i}>
            {content}
          </Tab>
        )
      }

      return acc
    },
    {
      selectors: [],
      contents: [],
    }
  )

  return (
    <TabContainer>
      <TabSelectors>{selectors}</TabSelectors>
      <Tabs>{contents}</Tabs>
    </TabContainer>
  )
}

const createColumn = (name, key, defaultValue = true) => ({
  name,
  key,
  isShown: get(window.getDevToolConfigs(), 'columns', key, defaults(defaultValue)),
})

const getColumns = () => [
  createColumn('#', 'index'),
  createColumn('Type', 'typeDisplay'),
  createColumn('Store', 'storeId'),
  createColumn('Action', 'actionId'),
  createColumn('Time(s)', 'time'),
]

const getTypeFilters = () =>
  Object.entries(Redux.TYPES).reduce((acc, [key, value]) => {
    acc[value] = {
      name: value,
      key: value,
      isShown: get(window.getDevToolConfigs(), 'typeFilters', value, defaults(true)),
    }
    return acc
  }, {})

const getStoreFilters = actionLog =>
  (actionLog || []).reduce((acc, { storeId }) => {
    acc[storeId] = acc[storeId] || {
      name: storeId,
      key: storeId,
      isShown: get(window.getDevToolConfigs(), 'storeFilters', storeId, defaults(true)),
    }

    return acc
  }, {})

const actionLogSnapshot = window.getActionLog().slice(0)

const ReduxDevTool = () => {
  const [storeFilters, setStoreFilters] = React.useState(getStoreFilters(actionLogSnapshot))
  const [typeFilters, setTypeFilters] = React.useState(getTypeFilters())
  const [columns, setColumns] = React.useState(getColumns())
  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const [actionLogs, setActionLogs] = React.useState(actionLogSnapshot)
  const [actionDiffHtml, setActionDiffHtml] = React.useState('')
  const [payload, setPayload] = React.useState('')
  const [showDiffTab, setShowDiffTab] = React.useState(true)

  React.useEffect(() => {
    let actionListener = actionListener
    if (actionListener == null) {
      actionListener = newActionLog => {
        const newActionLogSnapshot = newActionLog.slice(0)

        setActionLogs(newActionLogSnapshot)
        setStoreFilters(getStoreFilters(newActionLogSnapshot))
      }

      window.setSubscriber(actionListener)
    }

    return () => {
      window.removeSubscriber(actionListener)
    }
  }, [])

  return (
    <>
      <Toolbar>
        <ColumnToggles>
          {columns.map(({ name, key, isShown }, i) => (
            <CheckBoxLabel htmlFor={name}>
              <CheckBox
                name={name}
                key={`${key}-configs-${i}`}
                type="checkbox"
                checked={isShown}
                onChange={() => {
                  setConfig(['columns', key], !isShown)
                  setColumns(getColumns())
                }}
              />
              {name}
            </CheckBoxLabel>
          ))}
        </ColumnToggles>
        <ClearLogsButton
          onClick={() => {
            window.clearActionLog()
            setActionLogs(window.getActionLog().slice(0))
          }}
        >
          Clear Logs
        </ClearLogsButton>
        <Filters>
          {Object.values(typeFilters).map(({ name, key, isShown }, i) => (
            <CheckBoxLabel htmlFor={name}>
              <CheckBox
                name={name}
                key={`${key}-configs-${i}`}
                type="checkbox"
                checked={isShown}
                onChange={() => {
                  setConfig(['typeFilters', key], !isShown)
                  setTypeFilters(getTypeFilters())
                }}
              />
              {name}
            </CheckBoxLabel>
          ))}
        </Filters>
      </Toolbar>
      <Toolbar>
        <ColumnToggles>
          {Object.values(storeFilters).map(({ name, key, isShown }, i) => (
            <CheckBoxLabel htmlFor={name}>
              <CheckBox
                name={name}
                key={`${key}-configs-${i}`}
                type="checkbox"
                checked={isShown}
                onChange={() => {
                  setConfig(['storeFilters', key], !isShown)
                  setStoreFilters(getStoreFilters(actionLogs))
                }}
              />
              {name}
            </CheckBoxLabel>
          ))}
        </ColumnToggles>
      </Toolbar>
      <MainContainer>
        <ActionList>
          <ActionListTable>
            <thead>
              <TableRow isShown={true}>
                {columns.map(({ name, key, isShown }) => (
                  <TableHeader isShown={isShown} key={key}>
                    {name}
                  </TableHeader>
                ))}
              </TableRow>
            </thead>
            <tbody>
              {actionLogs.map((rowData, index) => (
                <TableRow
                  key={index}
                  noUpdateEmitted={rowData.isDelayed && !rowData.isLast}
                  onClick={() => {
                    if (rowData.typeDisplay === Redux.TYPES.ACTION) {
                      setActionDiffHtml(htmlDeltaFormatter(rowData.delta))
                      setShowDiffTab(true)
                    } else if (rowData.typeDisplay === Redux.TYPES.EPIC) {
                      setActionDiffHtml('')
                      setShowDiffTab(false)
                    }

                    setPayload(`${JSON.stringify(rowData.payload, null, 2)}`)
                    setSelectedIndex(index)
                  }}
                  isSelected={index === selectedIndex}
                  isShown={get(typeFilters, rowData.type, 'isShown') && get(storeFilters, rowData.storeId, 'isShown')}
                >
                  {columns.map(({ key, isShown }, i) => (
                    <TableData isShown={isShown} key={`${key}-${i}`}>
                      {rowData[key]}
                    </TableData>
                  ))}
                </TableRow>
              ))}
            </tbody>
          </ActionListTable>
        </ActionList>
        {createTabs([
          {
            name: 'Diff',
            isShown: showDiffTab,
            content: <ActionDiff dangerouslySetInnerHTML={{ __html: actionDiffHtml }} />,
          },
          { name: 'Payload', isShown: true, content: <Payload>{payload}</Payload> },
        ])}
      </MainContainer>
    </>
  )
}

ReactDOM.render(React.createElement(ReduxDevTool), document.getElementById('ReduxDevTool'))

const onParentRefresh = function () {
  const ReduxDevToolEle = document.getElementById('ReduxDevTool')
  //remove from React DOM
  ReactDOM.unmountComponentAtNode(ReduxDevToolEle)
  //remove from physical DOM
  ReduxDevToolEle.remove()
}

//if you refresh the main page, refresh the redux dev tool
window.opener.addEventListener('beforeunload', onParentRefresh)

window.addEventListener('beforeunload', function () {
  window.opener.removeEventListener('beforeunload', onParentRefresh)
})
