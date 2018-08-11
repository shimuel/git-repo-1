import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import {todoAPI} from '../services/todosService'

const AddTodo = ({ dispatch }) => {
  let input1, pr1, comm1

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input1.value.trim()) {
          return
        }
        let todo = {
          name:input1.value,
          isComplete:false,
          priority: pr1.selectedOptions[0].value,
          comments: comm1.value.trim()
        }
        
        todoAPI.addTodo(todo, dispatch);

        //dispatch(addTodo(input1.value, pr1.selectedOptions[0].value, comm1.value.trim()))
        input1.value = ''
        comm1.value = ''
        pr1.selectedIndex = 0
      }}>
      <table>
        <tbody>
        <tr>
            <td>
              <label>Name: </label>
            </td>
            <td>
              <input ref={node => input1 = node} />
            </td>
        </tr>
        <tr>
            <td>
              <label>Priority: </label>
            </td>
            <td>
              <select ref={node => pr1 = node}>
                  <option value="Low">Low</option>
                  <option value="Med">Med</option>
                  <option value="High">High</option>
              </select>
            </td>
        </tr>
        <tr>
            <td>
              <label>Comments: </label>
            </td>
            <td>
              <textarea ref={node => comm1 = node}  />
            </td>
        </tr>
        </tbody>
      </table>
      <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default connect()(AddTodo)
