const root = (state = { byId: [],todos: {} }, action) => {

  switch (action.type) {
    case 'ADD_TODO':
      return {
        byId: [ ...state.byId, action.id],
        todos: {
          ...state.todos,
          [action.id]: {
            id: action.id,
            name: action.name,
            priority: action.priority,
            comments: action.comments,
            isComplete: false,
            inEdit: false
          }
        }
      }
    // case 'GET_TODO':
    //   let todo = {...state.todos[action.id]}
    //   return {
    //     todo
    //   }
    case 'TOGGLE_TODO':
      const isComplete = !state.todos[action.id].isComplete;
      let toggletodo = {...state.todos[action.id], isComplete}
      return {
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
        objState.todos[element.id].comments = element.comments === null ? '' : element.comments
      });
      
      return objState;

    case 'RESET_TODOS': 
      return { byId: [],todos: {} };
    case 'ERROR_RESPONSE':
    default:
      return state
  }

  
}

export default root
