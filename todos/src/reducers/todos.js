const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      )
    case 'RECEIVE_TODOS':
      return  [
        ...state,
        ...action.todos.map(t=>{
          return {
            id: t.id,
            text: t.name,
            priority:t.priority,
            comments:t.comments,
            completed: t.isComplete
          }
        })
      ]
    default:
      return state
  }
}

export default todos
