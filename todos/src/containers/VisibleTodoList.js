import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { VisibilityFilters } from '../actions'

const getVisibleTodos = (todos, filter, ids) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return filterTodos(filter,todos,ids, (todo) => {
        const rtn = todo['completed'] === true
        return rtn;
      })//todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return filterTodos(filter,todos,ids, (todo) => {
        const rtn = todo['completed'] !== true
        return rtn;
      })//todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const filterTodos = (type, todos, byIds, handler) => {
  let i = 0;
  let filteredTodos = {};
  while( i < byIds.length) {
    const id = byIds[i];
    const todo = todos[id];
    if( handler(todo) === true)
          filteredTodos[id] = todo;
    i++;
  }
  return filteredTodos;
}

const mapStateToProps = state => {
  let todos = state.root.byId && state.root.byId.length > 0 ? state.root.todos : {};
  let ids = !state.root.byId ? null : state.root.byId;
  return {todos:getVisibleTodos( todos, state.visibilityFilter,ids), byId:ids}
}

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
