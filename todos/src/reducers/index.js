import { combineReducers } from 'redux'
import root from './todos'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
  root,
  visibilityFilter
})
