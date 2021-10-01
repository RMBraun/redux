import Redux, { TYPES } from './redux'

//for global browser import
if (typeof window !== 'undefined') {
  window.Redux = Redux
  window.Redux.TYPES = TYPES
}
