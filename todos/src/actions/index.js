
import fetch from 'cross-fetch'

let nextTodoId = 0
export const addTodo = (text, priority, comment) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text,
  priority: priority,
  comment: comment
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
export const receivedTodos = (data) => ({
  type:RECEIVE_TODOS,
  todos:  data
})

export function serverFetchTodos(/*subreddit*/) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    
    //To enable cross origin calls
    let headers = new Headers({
      origin:'http://localhost:3000/'
    });
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(fetchTodos(/*subreddit*/))
    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.
    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    return fetch(`https://localhost:5001/api/todo`,headers)
      .then(
        response => response.json(),//response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        dispatch(receivedTodos(/*subreddit,*/ json))
      )
  }
}