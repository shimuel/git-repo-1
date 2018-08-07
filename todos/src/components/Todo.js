import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { editTodo } from '../actions'
class Todo  extends React.Component {

  constructor(props, context) { 
    super(props, context); 
    
  }
  //onClick, id, completed, text,priority, comments
  render(){
    return <li
      onClick={this.props.onClick}
      style={{
        textDecoration: this.props.completed ? 'line-through' : 'none'
      }}>
      <div style={{display: 'table-row'}}>
        <div style={{display: 'table-cell', padding: '3px'}}>{this.props.text}</div>
        <div style={{display: 'table-cell', padding: '3px', fontWeight: 'bold'}}>{this.props.priority}</div>
        <div style={{display: 'table-cell', padding: '3px'}}>{this.props.comments}</div>
        <div style={{display: 'table-cell', padding: '3px'}}>
          <img style={{width: '15px', height: '15px'}} src={require('../images/edit2.png')} 
          onClick={
            (e, dispatch)=>{
                e.stopPropagation();
                console.log('update...');
                this.props.dispatch(editTodo(this.props.id));
              }}/>
        </div>
      </div>
    </li>
  }
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  isComplete: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
}

export default connect()(Todo)