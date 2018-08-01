import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import EditTodo from './EditTodo'

const TodoList = ({ todos, byId, toggleTodo }) => {
  
  return <ul>
    {byId.map(id =>
      {
        if(todos[id]){
          if(!todos[id].inEdit){
            return <Todo
                key={todos[id].id}
                {...todos[id]}
                onClick={(e) => { e.preventDefault(); toggleTodo(todos[id].id)}}
              />
          }else{
            return <EditTodo key={todos[id].id} />
          }
        }
      }
    )}
  </ul>

  }

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  toggleTodo: PropTypes.func.isRequired
}

export default TodoList
