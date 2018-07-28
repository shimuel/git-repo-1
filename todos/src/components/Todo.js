import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ onClick, completed, text,priority, comments }) => (
  /*<li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>*/
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    <div style={{display: 'table-row'}}>
      <div style={{display: 'table-cell', padding: '3px'}}>{text}</div>
      <div style={{display: 'table-cell', padding: '3px', fontWeight: 'bold'}}>{priority}</div>
      <div style={{display: 'table-cell'}}>{comments}</div>
    </div>
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
