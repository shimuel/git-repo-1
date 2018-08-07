import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import EditTodo from './EditTodo'

//const TodoList = ({ todos, byId, toggleTodo }) => {
class TodoList extends React.Component {
    constructor(props) {
     
      super(props);
    }  

    render(){
      return <ul>
        {this.props.byId.map(id =>
          {
            if(this.props.todos[id]){
              if(!this.props.todos[id].inEdit){
                return <Todo
                    key={this.props.todos[id].id}
                    {...this.props.todos[id]}
                    onClick={(e) => { e.preventDefault(); this.props.toggleTodo(this.props.todos[id].id)}}
                  />
              }else{
                return <EditTodo key={this.props.todos[id].id} />
              }
            }
          }
        )}
      </ul>
    }
}

TodoList.propTypes = {
  todos: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    isComplete: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    comments: PropTypes.string.isRequired
    // inEdit: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  byId:PropTypes.arrayOf(Number).isRequired,
  toggleTodo: PropTypes.func.isRequired
}

export default TodoList
