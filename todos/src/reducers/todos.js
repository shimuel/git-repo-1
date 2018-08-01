const root = (state = { isAuthenticated:false, byId: [],todos: {} }, action) => {

  switch (action.type) {
    case 'ADD_TODO':
    return {
      isAuthenticated: state.isAuthenticated,
      byId: [ ...state.byId, action.id],
      todos: {
        ...state.todos,
        [action.id]: {
          id: action.id,
          text: action.text,
          priority: action.priority,
          comments: action.comment,
          completed: false,
          inEdit: false
        }
      }
    }

    case 'TOGGLE_TODO':
      const isCompleted = !state.todos[action.id].isCompleted;
      let toggletodo = {...state.todos[action.id], completed:isCompleted}
      return {
        isAuthenticated: state.isAuthenticated,
        byId: [ ...state.byId],
        todos: {
          ...state.todos,
          [action.id]: toggletodo
        }
      }

    case 'EDIT_TODO':
      const isEdit = !state.todos[action.id].inEdit;
      let edittodo = {...state.todos[action.id], inEdit:isEdit}
      return {
        isAuthenticated: state.isAuthenticated,
        byId: [ ...state.byId],
        todos: {
          ...state.todos,
          [action.id]: edittodo
        }
      }
      //return state.todos.map((todo)=>todo.id === action.id ? {...todo,inEdit:!todo.inEdit}:todo)
    case 'SAVE_TODO':
      action.todo.inEdit = false;
      return {
        isAuthenticated: state.isAuthenticated,
        byId: [ ...state.byId],
        todos: {
          ...state.todos,
          [action.todo.id]: action.todo, 
        }
      }
    case 'DELETE_TODO':
    const prunedIds = state.byId.filter(item => {
      return item !== action.id // return all the items not matching the action.id
    })
    delete state.todos[action.id] // delete the hash associated with the action.id
    
    return {
      isAuthenticated: state.isAuthenticated,
      byId: prunedIds,
      todos: state.todos
    }
      //return state.filter((todo) => todo.id !== action.id)
      
    case 'RECEIVE_TODOS': 
      let ids = [];
      let objState =  {
        ...state,
      }
      action.todos.forEach(element => {
        objState.byId.push(element.id);
        objState.todos[element.id] = element
      });
      
      return objState;

    case 'ERROR_RESPONSE':
    default:
      return state
  }

  
}

export default root
