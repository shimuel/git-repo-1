import { combineReducers } from 'redux'
import root from './todos'
import visibilityFilter from './visibilityFilter'
import isAuthorized from './auth'

export default combineReducers({
  root,
  visibilityFilter,
  isAuthorized
})
