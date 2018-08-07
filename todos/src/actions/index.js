
let nextTodoId = 0
export const addTodo = (text, priority, comment) => {
  return {
    type: 'ADD_TODO',
    id: ++nextTodoId,
    name:text,
    isComplete:false,
    priority: priority,
    comment: comment
  }
}

export const EDIT_TODO = 'EDIT_TODO'
export const editTodo = id => ({
  type: EDIT_TODO,
  id
})

export const SAVE_TODO = 'SAVE_TODO'
export const updateTodo = todo => ({
  type: SAVE_TODO,
  todo
})

export const DELETE_TODO = 'DELETE_TODO'
export const deleteTodo = id => ({
  type: DELETE_TODO,
  id
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
export const FETCH_TODOS = 'FETCH_TODOS'
export const fetchTodos = () => ({
  type: FETCH_TODOS
})

export const RECEIVE_TODOS = 'RECEIVE_TODOS'
export const receivedTodos = (data) => {
  nextTodoId = data.length;
  return {
    type: RECEIVE_TODOS,
    todos: data
  }
}

export const setAuthentication = user => {
 const flag = user && user.token ? AuthenticationFlags.AUTHENTICATED : AuthenticationFlags.NOT_AUTHENTICATED
  const obj = {
    type: 'SET_AUTHENTICATON',
    flag:flag
  }
  return obj;
}

export const AuthenticationFlags = {
  AUTHENTICATED: true,
  NOT_AUTHENTICATED: false
}

export const ERROR_RESPONSE = 'ERROR_RESPONSE'
export const handleError = (data) => {
  return{
  type:ERROR_RESPONSE,
  code:  data
  }
}