import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateTodo,editTodo, deleteTodo } from '../actions'

export class EditableInputCell extends React.Component { 
 
    constructor(props, context) { 
      super(props, context); 
      
    }

    handleEdit = (e) => {
      e.preventDefault();
      console.log('EditableInputCell.handleEdit...')
      const data = {}
      data[this.props.cellData.type] = this.inputObj.value
      this.props.cellData.update(data)
    }
   
    render() { 
      return ( 
        <div style={{display: 'table-cell', padding: '3px'}}> 
          <input type='text' 
          defaultValue={this.props.cellData.todo[this.props.cellData.type]}
          ref={(node) => this.inputObj = node} 
          onChange={(e)=>this.handleEdit(e)}/> 
        </div> 
      ); 
    } 
  } 
  
  export class EditableSelectCell extends React.Component { 
  
    constructor(props, context) { 
      super(props, context); 
      
    }

    handleEdit = (e) => {
      e.preventDefault();
      console.log('EditableSelectCell.handleEdit...');
      const data = {};
      data[this.props.cellData.type] = this.inputObj.value;
      this.props.cellData.update(data);
    }

    render() { 
      
      return ( 
        <div style={{display: 'table-cell', padding: '3px'}}> 
          <select defaultValue={this.props.cellData.todo[this.props.cellData.type]}
          defaultValue={this.props.cellData.todo[this.props.cellData.type]}
          ref={(node) => this.inputObj = node} 
          onChange={(e)=>this.handleEdit(e)}> 
                    <option value="Low">low</option> 
                    <option value="Med">med</option> 
                    <option value="High">high</option> 
          </select> 
        </div> 
      ); 
    } 
  } 
  
class EditTodo  extends React.Component {
    
    constructor(props, context) { 
      console.log('EditTodo...');
      super(props, context);
      this.changes = null;
    }


    updateChanges = (change) => {
      //console.log('updateChanges...'+JSON.stringify(change))
      this.changes = Object.assign({}, this.changes, change);
      console.log('updateChanges...'+JSON.stringify(this.changes));
    }

    saveChanges = (e, isDelete) => {

      if(isDelete){
        this.props.dispatch(deleteTodo(this.props.todo.id));
      }else{
        const modifiedTodo = Object.assign({},this.props.todo, this.changes);
        console.log('updateChanges...'+JSON.stringify(modifiedTodo));
        this.props.dispatch(updateTodo(modifiedTodo));
      }
    }

    cancelChanges = (e) => {
      e.stopPropagation();
      this.changes = null;
      this.props.dispatch(editTodo(this.props.todo.id));
      console.log('Cancelled Update...');
    }

    render() { 
      return( 
        <div style={{display: 'table-row'}}> 
           <EditableInputCell cellData={{ 
              "type": "text", 
              todo: this.props.todo, 
              id: this.props.todo.id,
              update: this.updateChanges
            }}/> 
            <EditableSelectCell  cellData={{ 
              "type": "priority", 
              todo: this.props.todo,
              update: this.updateChanges
            }}/> 
            <EditableInputCell cellData={{ 
              "type": "comments", 
              todo: this.props.todo, 
              id: this.props.todo.id,
              update: this.updateChanges 
            }}/>
            <div style={{display: 'table-cell', padding: '3px'}}>
              <img style={{width: '12px', height: '12px'}} 
              src={require('../images/Save.png')}
              onClick={
                (e)=>{
                  this.saveChanges(e);
                }}/>
            </div>
            <div style={{display: 'table-cell', padding: '3px'}}>
              <img style={{width: '12px', height: '12px'}} src={require('../images/Remove.png')}
              onClick={
                (e)=>{
                    e.stopPropagation();console.log('delete...');
                    this.saveChanges(e, true);
                  }}/>
            </div>
            <div style={{display: 'table-cell', padding: '3px'}}>
              <img style={{width: '15px', height: '12px'}} 
              src={require('../images/exit.png')}
              onClick={(e)=>{this.cancelChanges(e);}}/>
            </div>
        </div> 
      ) 
    }
  } 

  function mapStateToProps(state) {

    let i = 0;
    let id = undefined;
    while( i < state.root.byId.length) {
      let isEdit = state.root.todos[state.root.byId[i]]['inEdit'] === true 
      if(isEdit)
      {
        id = state.root.byId[i];
        break;
      }
      else
        i++;
    }
    
    return {todo: state.root.todos[id]};
  }
  
  // const mapDispatchToProps = (dispatch, ownProps) => ({
  //   onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
  // })
  export default connect(mapStateToProps)(EditTodo)
  //export default EditTodo