import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import EditTodo from './EditTodo'

const TodoList = ({ todos, toggleTodo }) => (
  <ul>
    {todos.map(todo =>
      {
      
        if(!todo.inEdit){
         return <Todo
            key={todo.id}
            {...todo}
            onClick={(e) => { e.preventDefault(); toggleTodo(todo.id)}}
          />
        }else{
          return <EditTodo key={todo.id} todo={todo}/>
        }
      }
    )}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  toggleTodo: PropTypes.func.isRequired
}

export default TodoList
